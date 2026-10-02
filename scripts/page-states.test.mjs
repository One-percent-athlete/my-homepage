import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

function render(path,props={},language='en'){
  const source=readFileSync(new URL(path,import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports={};const jsx=(type,props)=>({type,props});
  vm.runInNewContext(compiled,{exports,require(id){
    if(id==='react/jsx-runtime')return{jsx,jsxs:jsx};
    if(id==='@/app/context/LanguageContext')return{useLanguage:()=>({language,setLanguage(){}})};
    if(id==='next/navigation')return{usePathname:()=>'/'};
    if(id==='next/link')return{__esModule:true,default:'Link'};
    if(id.startsWith('@/components/'))return{__esModule:true,default:id};
    throw new Error(id);
  }});
  return exports.default(props);
}
function find(node,predicate){if(Array.isArray(node))return node.flatMap(child=>find(child,predicate));if(!node||typeof node!=='object')return[];return[...(predicate(node)?[node]:[]),...find(node.props?.children,predicate)];}

test('the header contains identity and language selection without duplicating the map',()=>{
  const tree=render('../src/components/PublicHeader.tsx');
  assert.equal(find(tree,node=>node.type==='nav').length,0);
  assert.equal(find(tree,node=>node.type==='button').length,0);
  assert.equal(find(tree,node=>node.type==='select').length,1);
  assert.equal(find(tree,node=>node.type==='Link')[0].props.href,'/');
});

test('loading has a visible, accessible status in every language',()=>{
  for(const language of ['en','ja','zh']){
    const tree=render('../src/components/LoadingScreen.tsx',{},language);
    assert.equal(tree.props['data-page-state'],'loading');
    assert.equal(tree.props.role,'status');
    assert.equal(tree.props['aria-live'],'polite');
    assert.ok(find(tree,node=>node.type==='p')[0].props.children.length>0);
  }
});

test('missing pages show 404 and errors offer a working retry without a misleading 404',()=>{
  for(const language of ['en','ja','zh']){
    const missing=render('../src/components/RecoveryScreen.tsx',{kind:'missing'},language);
    assert.equal(missing.props['data-page-state'],'not-found');
    assert.equal(find(missing,node=>node.props.className==='recovery-code')[0].props.children,'404');
    assert.equal(find(missing,node=>node.type==='Link')[0].props.href,'/');
    let retried=false;
    const error=render('../src/components/RecoveryScreen.tsx',{kind:'error',retry:()=>{retried=true;}},language);
    assert.equal(error.props['data-page-state'],'error');
    assert.equal(find(error,node=>node.props.className==='recovery-code')[0].props.children,'SIGNAL LOST');
    find(error,node=>node.type==='button')[0].props.onClick();
    assert.equal(retried,true);
  }
});
