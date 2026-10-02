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

test('world map destinations remain available when the labels are collapsed',()=>{
  const map=mountMap();
  const [panel]=map.find(node=>node.props.id==='world-navigator-panel');
  assert.equal(panel.props['aria-hidden'],undefined);
  const links=map.find(node=>node.type==='Link');
  assert.equal(links.length,7);
  assert.ok(links.every(node=>node.props['aria-label'] && typeof node.props.onClick==='function'));
  const [languages]=map.find(node=>node.props.className==='dock-languages');
  assert.equal(languages.props.inert,true,'collapsed language controls do not intercept keyboard focus');
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

test('map labels collapse on selection and Escape restores focus to the map control',()=>{
  const map=mountMap();
  const toggle=()=>map.find(node=>node.props.className==='dock-trigger')[0];
  let focused=false;map.refs[1].current={focus(){focused=true;}};
  toggle().props.onClick();map.render();
  assert.equal(toggle().props['aria-expanded'],true);
  const key=new Event('keydown');Object.assign(key,{key:'Escape'});map.document.dispatchEvent(key);map.render();
  assert.equal(toggle().props['aria-expanded'],false);assert.equal(focused,true);
  toggle().props.onClick();map.render();
  map.find(node=>node.type==='Link'&&node.props.href==='/travel')[0].props.onClick();map.render();
  assert.equal(toggle().props['aria-expanded'],false);
  map.unmount();
});
