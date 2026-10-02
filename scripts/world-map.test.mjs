import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

function mountMap() {
  const source=readFileSync(new URL('../src/components/FloatingButtons.tsx',import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const states=[], refs=[], effects=[];
  let stateIndex=0,refIndex=0,effectIndex=0,tree;
  const window=new EventTarget(),document=new EventTarget();
  document.body={dataset:{}};
  document.querySelector=()=>null;
  const saved=new Map();
  window.localStorage={getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value)};
  const jsx=(type,props)=>({type,props});
  const exports={};
  vm.runInNewContext(compiled,{
    exports,window,document,setTimeout,clearTimeout,
    require(id){
      if(id==='react')return{
        useState(initial){const i=stateIndex++;if(!(i in states))states[i]=initial;return[states[i],next=>{states[i]=next;}];},
        useRef(initial){const i=refIndex++;return refs[i]??={current:initial};},
        useEffect(callback,deps){const i=effectIndex++;const previous=effects[i];if(!previous||deps.some((dep,j)=>dep!==previous.deps[j])){previous?.cleanup?.();effects[i]={callback,deps,pending:true};}},
      };
      if(id==='react/jsx-runtime')return{jsx,jsxs:jsx};
      if(id==='next/navigation')return{usePathname:()=>'/'};
      if(id==='@/app/context/LanguageContext')return{useLanguage:()=>({language:'en',setLanguage(){}})};
      if(id==='@/lib/world-visits') return {getVisitedWorlds:()=>JSON.parse(saved.get('ryu-worlds')||'[]'), recordWorldVisit:route=>{const visits=[...new Set([...JSON.parse(saved.get('ryu-worlds')||'[]'),route])];saved.set('ryu-worlds',JSON.stringify(visits));return visits;}};
      if(id==='@/lib/exploration')return{getFragments:()=>[],getBetweenAccessRemainingMs:()=>0};
      if(id==='lucide-react')return new Proxy({},{get:(_,key)=>key});
      if(id==='next/link')return{__esModule:true,default:'Link'};
      throw new Error(id);
    },
  });
  function render(){
    stateIndex=refIndex=effectIndex=0;tree=exports.default();
    effects.forEach(effect=>{if(effect.pending){effect.pending=false;effect.cleanup=effect.callback();}});
  }
  function find(node,predicate){if(Array.isArray(node))return node.flatMap(child=>find(child,predicate));if(!node||typeof node!=='object')return[];return[...(predicate(node)?[node]:[]),...find(node.props?.children,predicate)];}
  render();render();
  return{
    render,window,document,refs,
    find:predicate=>find(tree,predicate),
    navigate(route){window.dispatchEvent(new CustomEvent('journey-page',{detail:route}));render();render();},
    unmount(){effects.forEach(effect=>effect.cleanup?.());},
  };
}

test('permanent world map destinations remain directly available',()=>{
  const map=mountMap();
  const [panel]=map.find(node=>node.props.id==='world-navigator-panel');
  assert.equal(panel.props['aria-hidden'],undefined);
  const links=map.find(node=>node.type==='Link');
  assert.equal(links.length,7);
  assert.ok(links.every(node=>node.props['aria-label'] ));
  map.unmount();
});

test('world map follows the active journey location in both directions',()=>{
  const map=mountMap();
  for(const route of ['/web','/contact','/web','/']){
    map.navigate(route);
    const active=map.find(node=>node.type==='Link'&&node.props['aria-current']==='page');
    assert.equal(active.length,1);assert.equal(active[0].props.href,route);
  }
  map.unmount();
});

test('map remains permanently labeled with no toggle or duplicated language controls',()=>{
  const map=mountMap();
  assert.ok(map.find(node=>node.type==='aside')[0].props.className.includes('permanent'));
  assert.equal(map.find(node=>node.type==='button').length,0);
  assert.equal(map.find(node=>node.type==='strong').length,7);
  map.unmount();
});
