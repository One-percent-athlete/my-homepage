import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function mountChrome() {
  const source=readFileSync(new URL('../src/components/PublicChrome.tsx',import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const document=new EventTarget();
  document.body={dataset:{}};
  const timers=new Map();
  let now=0, sequence=0;
  const effects=[];
  const exports={};
  vm.runInNewContext(compiled,{
    exports,document,
    setTimeout(fn,delay){const id=++sequence;timers.set(id,{fn,at:now+delay});return id;},
    clearTimeout(id){timers.delete(id);},
    require(id){
      if(id==='react')return{useEffect:fn=>effects.push(fn)};
      if(id==='next/navigation')return{usePathname:()=>'/'};
      throw new Error(id);
    },
  });
  exports.default();
  const cleanup=effects.map(fn=>fn());
  return{
    document,
    scroll(){document.dispatchEvent(new Event('scroll'));},
    advance(ms){now+=ms;for(const[id,timer]of[...timers])if(timer.at<=now){timers.delete(id);timer.fn();}},
    unmount(){cleanup.forEach(fn=>fn?.());},
  };
}

test('header and footer hide during scrolling and return only after scrolling stops',()=>{
  const view=mountChrome();
  assert.equal(view.document.body.dataset.chromeScrolling,undefined);
  view.scroll();
  assert.equal(view.document.body.dataset.chromeScrolling,'true');
  view.advance(200);view.scroll();view.advance(200);
  assert.equal(view.document.body.dataset.chromeScrolling,'true','continued scrolling extends the hidden interval');
  view.advance(80);
  assert.equal(view.document.body.dataset.chromeScrolling,undefined);
  view.unmount();
});

test('leaving a page clears hidden chrome and removes stale scroll work',()=>{
  const view=mountChrome();view.scroll();view.unmount();
  assert.equal(view.document.body.dataset.chromeScrolling,undefined);
  view.scroll();view.advance(1000);
  assert.equal(view.document.body.dataset.chromeScrolling,undefined);
});
