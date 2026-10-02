import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function mountContact(fetchResponse,language='en'){
 const hooks=[];let cursor=0;const requests=[];const exports={};
 const source=readFileSync(new URL('../src/components/Contact.tsx',import.meta.url),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const jsx=(type,props)=>({type,props});
 vm.runInNewContext(compiled,{exports,requestAnimationFrame:fn=>fn(),fetch:async(url,options)=>{requests.push({url,...options});return fetchResponse();},require:id=>{
  if(id==='react')return {useEffect(){},useState(initial){const slot=cursor++;if(!(slot in hooks))hooks[slot]=initial;return [hooks[slot],value=>{hooks[slot]=value;}];},useRef(initial){const slot=cursor++;if(!(slot in hooks))hooks[slot]={current:initial};return hooks[slot];}};
  if(id==='react/jsx-runtime')return {jsx,jsxs:jsx,Fragment:'fragment'};
  if(id==='framer-motion')return {motion:new Proxy({},{get:(_,tag)=>tag})};
  if(id==='@/app/context/LanguageContext')return {useLanguage:()=>({language})};
  if(id==='lucide-react'||id==='react-icons/fa')return new Proxy({},{get:(_,icon)=>icon});
  if(id==='next/image'||id.startsWith('@/components/'))return {__esModule:true,default:id};
  throw new Error('Unexpected import '+id);
 }});
 const render=()=>{cursor=0;return exports.default({embedded:true});};
 const fill=(id,value)=>find(render(),node=>node.props?.id===id).props.onChange({target:{value}});
 return {render,fill,requests,submit:()=>find(render(),node=>node.type==='form').props.onSubmit({preventDefault(){}})};
}
function all(node,predicate){if(Array.isArray(node))return node.flatMap(child=>all(child,predicate));if(!node||typeof node!=='object')return [];return [...(predicate(node)?[node]:[]),...all(node.props?.children,predicate)];}
function find(node,predicate){return all(node,predicate)[0];}
function text(node){if(Array.isArray(node))return node.map(text).join(' ');if(typeof node==='string')return node;return node&&typeof node==='object'?text(node.props?.children):'';}
function draft(form){form.fill('contact-name','Alex');form.fill('contact-email','alex@example.com');form.fill('contact-message','A booking app for our local school.');}

test('confirmed delivery replaces the form with a personal receipt and supports a fresh message',async()=>{
 const form=mountContact(()=>({ok:true,json:async()=>({status:'success',id:42})}));draft(form);await form.submit();
 const tree=form.render();assert.equal(all(tree,node=>node.type==='input').length,0);
 assert.match(text(tree),/Thanks for reaching out, Alex/);assert.match(text(tree),/alex@example.com/);assert.match(text(tree),/A booking app for our local school/);
 assert.equal(form.requests[0].url,'/api/contact');assert.equal(JSON.parse(form.requests[0].body).message,'A booking app for our local school.');
 find(tree,node=>node.type==='button'&&text(node)==='Send another message').props.onClick();
 assert.equal(find(form.render(),node=>node.props?.id==='contact-message').props.value,'');
});
test('failed or unconfirmed delivery preserves the draft for retry',async()=>{
 for(const response of [()=>({ok:false,json:async()=>({status:'error'})}),()=>({ok:true,json:async()=>({status:'error'})}),()=>({ok:true,json:async()=>{throw new Error('Invalid JSON');}}),()=>{throw new Error('Offline');}]){
  const form=mountContact(response);draft(form);await form.submit();const tree=form.render();
  assert.equal(find(tree,node=>node.props?.id==='contact-message').props.value,'A booking app for our local school.');
  assert.match(text(tree),/Your message hasn’t been sent/);
 }
});
test('repeat submission cannot send a second request while the first is pending',async()=>{
 let finish;const form=mountContact(()=>new Promise(resolve=>{finish=resolve;}));draft(form);
 const first=form.submit();await form.submit();assert.equal(form.requests.length,1);
 assert.equal(find(form.render(),node=>node.type==='fieldset').props.disabled,true);
 finish({ok:true,json:async()=>({status:'success',id:42})});await first;
});
test('the invitation is personal in each supported language',()=>{
 for(const [language,title] of [['en','What would you like to build together?'],['ja','一緒に、何をつくりましょうか？'],['zh','你想和我一起创造什么？']]){
  const form=mountContact(()=>{},language);assert.equal(text(find(form.render(),node=>node.type==='h1')),title);
 }
});

test('a failed submission can be retried and confirmed successfully',async()=>{
 let attempts=0;const form=mountContact(()=>({ok:++attempts>1,json:async()=>({status:attempts>1?'success':'error'})}));draft(form);
 await form.submit();await form.submit();assert.equal(form.requests.length,2);assert.match(text(form.render()),/Your message has been received/);
});
