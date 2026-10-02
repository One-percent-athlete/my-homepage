import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import {readFileSync} from 'node:fs';

function mount({saved, writeBlocked=false, readBlocked=false}={}) {
  const window=new EventTarget();
  const document={body:{dataset:{}}};
  window.localStorage={getItem(){if(readBlocked)throw Error('blocked');return saved;},setItem(key,value){if(writeBlocked)throw Error('blocked');saved=value;}};
  const exports={};
  const source=ts.transpileModule(readFileSync(new URL('../src/lib/reading-mode.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  vm.runInNewContext(source,{exports,window,document,CustomEvent});
  return{...exports,window,document,saved:()=>saved};
}

test('the viewing preference survives a new visit and emits the chosen mode',()=>{
  const view=mount();let changed;
  view.window.addEventListener(view.READING_MODE_EVENT,event=>{changed=event.detail;});
  assert.equal(view.getReadingMode(),'journey');view.setReadingMode('read');
  assert.equal(changed,'read');assert.equal(view.document.body.dataset.readingMode,'read');
  assert.equal(mount({saved:view.saved()}).getReadingMode(),'read');
  view.setReadingMode('journey');assert.equal(view.saved(),'journey');
});

test('switching works when storage reads or writes are blocked',()=>{
  for(const options of [{writeBlocked:true},{readBlocked:true,writeBlocked:true}]){
    const view=mount(options);view.setReadingMode('read');assert.equal(view.getReadingMode(),'read');
    view.setReadingMode('journey');assert.equal(view.getReadingMode(),'journey');
  }
});

test('invalid saved preferences use Journey',()=>{
  assert.equal(mount({saved:'unknown'}).getReadingMode(),'journey');
});
