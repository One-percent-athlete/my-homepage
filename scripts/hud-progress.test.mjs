import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

function mountHUD({loading=false}={}){
  const window=new EventTarget();const saved=new Map();
  window.localStorage={getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value)};
  const document={body:{dataset:{}},querySelector:()=>loading?{}:null};
  const compile=path=>ts.transpileModule(readFileSync(new URL(path,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText;
  const store={};vm.runInNewContext(compile('../src/lib/world-visits.ts'),{exports:store,window,CustomEvent});
  const states=[],effects=[];let stateIndex=0,effectIndex=0,tree;
  const exports={};const jsx=(type,props)=>({type,props});
  vm.runInNewContext(compile('../src/components/HelmetHUD.tsx'),{exports,window,document,require(id){
    if(id==='react')return{
      useState(initial){const i=stateIndex++;if(!(i in states))states[i]=initial;return[states[i],next=>{states[i]=next;}];},
      useEffect(callback,deps){const i=effectIndex++;if(!effects[i])effects[i]={callback,deps,pending:true};},
    };
    if(id==='react/jsx-runtime')return{jsx,jsxs:jsx};
    if(id==='next/navigation')return{usePathname:()=>'/'};
    if(id==='@/app/context/LanguageContext')return{useLanguage:()=>({language:'en'})};
    if(id==='@/lib/world-visits')return store;
    if(id==='@/components/ReadingModeSwitch')return {__esModule:true,default:'ReadingModeSwitch'};
    throw new Error(id);
  }});
  function render(){stateIndex=effectIndex=0;tree=exports.default();effects.forEach(effect=>{if(effect.pending){effect.pending=false;effect.cleanup=effect.callback();}});}
  function find(node,predicate){if(Array.isArray(node))return node.flatMap(child=>find(child,predicate));if(!node||typeof node!=='object')return[];return[...(predicate(node)?[node]:[]),...find(node.props?.children,predicate)];}
  render();render();
  return{
    percentage(){return find(tree,node=>node.type==='span'&&node.props.title?.startsWith('Worlds explored'))[0].props.children;},
    navigate(route){document.body.dataset.journeyPage=route;window.dispatchEvent(new CustomEvent('journey-page',{detail:route}));render();},
    scroll(){window.dispatchEvent(new Event('scroll'));render();},
    ready(){loading=false;window.dispatchEvent(new Event('journey-ready'));render();},
    fail(){loading=true;},
    unmount(){effects.forEach(effect=>effect.cleanup?.());},
  };
}

test('the visible HUD counts visited worlds, not the end of the scroll track',()=>{
  const hud=mountHUD();assert.equal(hud.percentage(),'14%');
  hud.scroll();assert.equal(hud.percentage(),'14%');
  hud.navigate('/web');hud.navigate('/contact');assert.equal(hud.percentage(),'43%');
  hud.scroll();assert.equal(hud.percentage(),'43%');
  hud.unmount();
});

test('loading and failed worlds do not increase progress until their content is ready',()=>{
  const hud=mountHUD({loading:true});assert.equal(hud.percentage(),'0%');
  hud.ready();assert.equal(hud.percentage(),'14%');
  hud.fail();hud.navigate('/ski');assert.equal(hud.percentage(),'14%');
  hud.ready();assert.equal(hud.percentage(),'29%');hud.unmount();
});
