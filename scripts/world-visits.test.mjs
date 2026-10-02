import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function visitStore({ saved = new Map(), blocked = false } = {}) {
  const source=readFileSync(new URL('../src/lib/world-visits.ts',import.meta.url),'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const window=new EventTarget();
  window.localStorage={getItem(key){if(blocked)throw new Error('Storage unavailable');return saved.get(key)??null;},setItem(key,value){if(blocked)throw new Error('Storage unavailable');saved.set(key,value);}};
  const exports={};vm.runInNewContext(compiled,{exports,window,CustomEvent});
  return{...exports,saved};
}

test('finishing Home, Work and Contact leaves the other four worlds unexplored',()=>{
  const store=visitStore();
  for(const world of ['/','/web','/contact','/web','/'])store.recordWorldVisit(world);
  const progress=store.explorationProgress(store.getVisitedWorlds());
  assert.equal(progress.count,3);assert.equal(progress.total,7);assert.equal(progress.percentage,43);
  for(const world of ['/travel','/ski','/blog','/gallery'])store.recordWorldVisit(world);
  assert.equal(store.explorationProgress(store.getVisitedWorlds()).percentage,100);
});

test('visited worlds survive reload and repeated or bonus visits do not inflate progress',()=>{
  const first=visitStore();first.recordWorldVisit('/');first.recordWorldVisit('/travel');first.recordWorldVisit('/between');
  const second=visitStore({saved:first.saved});
  assert.equal(second.explorationProgress(second.getVisitedWorlds()).count,2);
  second.recordWorldVisit('/travel');assert.equal(second.explorationProgress(second.getVisitedWorlds()).count,2);
});

test('missing, private and invalid stored routes are excluded from exploration',()=>{
  const saved=new Map([['ryu-worlds',JSON.stringify(['/no-such-world','/gallery','/gallery',123])]]);
  const store=visitStore({saved});
  for(const route of ['/unknown','/mission-control','/blog/create','/demos/example'])store.recordWorldVisit(route);
  assert.equal(store.explorationProgress(store.getVisitedWorlds()).count,1);
  store.recordWorldVisit('/blog/a-real-story');assert.equal(store.explorationProgress(store.getVisitedWorlds()).count,2);
});

test('exploration still works with malformed or unavailable browser storage',()=>{
  const corrupt=visitStore({saved:new Map([['ryu-worlds','invalid JSON']])});
  corrupt.recordWorldVisit('/ski');assert.equal(corrupt.explorationProgress(corrupt.getVisitedWorlds()).count,1);
  const blocked=visitStore({blocked:true});
  blocked.recordWorldVisit('/');blocked.recordWorldVisit('/web');
  assert.equal(blocked.explorationProgress(blocked.getVisitedWorlds()).count,2);
});

test('next destination excludes visited worlds and disappears when exploration is complete',()=>{
 const store=visitStore();store.recordWorldVisit('/');store.recordWorldVisit('/case-studies');
 assert.equal(store.nextUnvisitedWorld(store.getVisitedWorlds()),'/travel');
 const reloaded=visitStore({saved:store.saved});assert.equal(reloaded.nextUnvisitedWorld(reloaded.getVisitedWorlds()),'/travel');
 for(const world of reloaded.PUBLIC_WORLDS)reloaded.recordWorldVisit(world);
 assert.equal(reloaded.nextUnvisitedWorld(reloaded.getVisitedWorlds()),null);
 assert.equal(reloaded.explorationProgress(reloaded.getVisitedWorlds()).percentage,100);
});
