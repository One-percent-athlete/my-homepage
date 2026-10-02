export type Lesson = { id:number; customer:string; instructor:string; date:string; accepted:boolean; fee:number };
export function lessonTotals(lessons:Lesson[], instructor:string) {
  const accepted=lessons.filter(lesson=>lesson.accepted && lesson.instructor===instructor);
  return {lessons:accepted.length, revenue:accepted.reduce((total,lesson)=>total+lesson.fee,0), earnings:accepted.reduce((total,lesson)=>total+lesson.fee*0.7,0)};
}
export type MealOrder = { employee:string; meal:string };
export function mealCounts(orders:MealOrder[], menu:readonly string[]) {
  return menu.map(meal=>({meal,count:orders.filter(order=>order.meal===meal).length}));
}
export type UniformOrder = { id:number; employee:string; factory:string; garment:string; size:string; quantity:number; price:number; deducted:boolean };
export function uniformTotal(order:UniformOrder) { return order.quantity*order.price; }
export function uniformGroups(orders:UniformOrder[]) {
  const groups:Record<string,number>={};
  for(const order of orders) {const key=order.factory+' · '+order.garment;groups[key]=(groups[key]??0)+order.quantity;}
  return Object.entries(groups).map(([label,quantity])=>({label,quantity}));
}
export function demoReply(input:string) {
  const text=input.toLowerCase();
  if(/person|human|contact|ryu/.test(text)) return 'You can discuss a project with Ryu through the Contact page. This demo does not send a message or collect contact details.';
  if(/accept|invoice|earning/.test(text)) return 'Accept a pending lesson in the Instructor view. It becomes confirmed, appears in the invoice list, and updates instructor earnings. The demo uses a sample 70% instructor / 30% school split.';
  if(/ski|lesson|instructor/.test(text)) return 'Open the Ski School demo, choose an instructor and date, and request a lesson. Then switch to Instructor to accept it, or School finances to review invoices and earnings.';
  if(/meal|food|kitchen|cutoff|lunch/.test(text)) return 'Employees choose a meal before the ordering cutoff. The Kitchen view totals portions for each menu item. Try Simulate cutoff to close ordering, then inspect Popularity to see the order breakdown.';
  if(/uniform|pants|salary|deduct/.test(text)) return 'Place a uniform order with an employee, factory, garment, size and quantity. Factory totals group the items, while Payroll ledger shows each order cost. Salary deduction is simulated; no payroll system is connected.';
  if(/cycl|guide|travel|match/.test(text)) return 'In Meet Beyond, filter by destination and activity, save a guide and open a conversation. Request an experience, then accept it as the guide in Requests. All profiles and bookings are fictional.';
  if(/car|vehicle|rent|inspection|shaken/.test(text)) return 'Garage Desk lets you register a vehicle, change its inspection date, report a problem, assign staff work and reserve a rental. Overlapping rental dates are rejected.';
  if(/hello|hi\b|hey/.test(text)) return 'Hello! What would you like to explore: ski lessons, company meals, uniforms, vehicle management or local guides?';
  return 'That question is outside this scripted demo. Try asking about ski lessons, meal ordering, uniforms, vehicles or local guides—or ask how to contact a person.';
}
