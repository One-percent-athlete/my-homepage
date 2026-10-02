import test from 'node:test';
import assert from 'node:assert/strict';
import { demoReply,lessonTotals,mealCounts,uniformGroups,uniformTotal } from '../src/lib/workflow-demos.ts';
test('pending lessons do not generate revenue; acceptance updates instructor earnings',()=>{
 const lesson={id:1,customer:'Guest',instructor:'Aki',date:'2026-12-22',accepted:false,fee:18000};
 assert.deepEqual(lessonTotals([lesson],'Aki'),{lessons:0,revenue:0,earnings:0});
 assert.deepEqual(lessonTotals([{...lesson,accepted:true}],'Aki'),{lessons:1,revenue:18000,earnings:12600});
 assert.equal(lessonTotals([{...lesson,accepted:true}],'Mika').earnings,0);
});
test('kitchen quantities count each selected menu including unselected items',()=>{
 assert.deepEqual(mealCounts([{employee:'A',meal:'Curry'},{employee:'B',meal:'Curry'},{employee:'C',meal:'Fish'}],['Curry','Fish','Rice']),[{meal:'Curry',count:2},{meal:'Fish',count:1},{meal:'Rice',count:0}]);
});
test('uniform totals separate factory and garment and price the full quantity',()=>{
 const order={id:1,employee:'A',factory:'North',garment:'Pants',size:'M',quantity:2,price:3200,deducted:false};
 assert.equal(uniformTotal(order),6400);
 assert.deepEqual(uniformGroups([order,{...order,id:2,quantity:1},{...order,id:3,factory:'South'},{...order,id:4,garment:'Jacket'}]),[{label:'North · Pants',quantity:3},{label:'South · Pants',quantity:2},{label:'North · Jacket',quantity:2}]);
});

test('chatbot handles supported workflows and gives a clear fallback',()=>{
 assert.match(demoReply('How are uniform costs deducted?'),/salary deduction/i);
 assert.match(demoReply('What happens after a lesson is accepted?'),/invoice/i);
 assert.match(demoReply('unrelated question'),/outside this scripted demo/i);
});
