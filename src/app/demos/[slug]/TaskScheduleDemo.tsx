"use client";

import { FormEvent, useMemo, useState } from "react";
import { BarChart3, CalendarDays, Check, ChevronLeft, ChevronRight, Circle, Clock3, Columns3, LayoutDashboard, ListFilter, Plus, RotateCcw, Search, Sparkles, Trash2, Users, X } from "lucide-react";
import styles from "./demo.module.css";

type Status = "Backlog" | "In progress" | "Review" | "Done";
type Priority = "High" | "Medium" | "Low";
type Task = { id: number; title: string; project: string; status: Status; priority: Priority; day: number; owner: string; estimate: string };

const seedTasks: Task[] = [
  { id: 1, title: "Map the new onboarding journey", project: "Horizon", status: "Backlog", priority: "High", day: 27, owner: "AS", estimate: "4h" },
  { id: 2, title: "Write empty-state microcopy", project: "Horizon", status: "Backlog", priority: "Low", day: 29, owner: "MK", estimate: "2h" },
  { id: 3, title: "Build account preferences", project: "Atlas", status: "In progress", priority: "High", day: 26, owner: "RY", estimate: "6h" },
  { id: 4, title: "QA responsive breakpoints", project: "Atlas", status: "In progress", priority: "Medium", day: 28, owner: "JT", estimate: "3h" },
  { id: 5, title: "Review launch analytics events", project: "Nova", status: "Review", priority: "Medium", day: 26, owner: "MK", estimate: "2h" },
  { id: 6, title: "Approve visual direction", project: "Nova", status: "Done", priority: "High", day: 25, owner: "AS", estimate: "1h" },
];

const columns: Status[] = ["Backlog", "In progress", "Review", "Done"];
const days = [25, 26, 27, 28, 29, 30, 31];

export default function TaskScheduleDemo() {
  const [tasks, setTasks] = useState(seedTasks);
  const [view, setView] = useState<"Board" | "Calendar" | "Analytics">("Board");
  const [query, setQuery] = useState("");
  const [project, setProject] = useState("All projects");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [dragged, setDragged] = useState<number | null>(null);
  const visible = useMemo(() => tasks.filter((task) => (project === "All projects" || task.project === project) && task.title.toLowerCase().includes(query.toLowerCase())), [tasks, project, query]);
  const completion = Math.round(tasks.filter((task) => task.status === "Done").length / tasks.length * 100);
  const addTask = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((items) => [...items, { id: Date.now(), title: title.trim(), project: project === "All projects" ? "Horizon" : project, status: "Backlog", priority: "Medium", day: 30, owner: "RY", estimate: "2h" }]);
    setTitle(""); setShowForm(false);
  };
  return <section className={`${styles.product} ${styles.scheduler}`}>
    <aside className={styles.schedulerSide}>
      <div className={styles.scheduleLogo}><Sparkles/><b>DAYFLOW</b></div>
      <small>WORKSPACE</small>
      {[{name:"My work",icon:LayoutDashboard},{name:"Schedule",icon:CalendarDays},{name:"Team",icon:Users},{name:"Reports",icon:BarChart3}].map(({name,icon:Icon}, index) => <button key={name} className={index===1?styles.active:""} onClick={() => index===3 ? setView("Analytics") : index===1 ? setView("Calendar") : setView("Board")}><Icon/>{name}</button>)}
      <small>PROJECTS</small>
      {["All projects","Horizon","Atlas","Nova"].map((name,index)=><button key={name} className={project===name?styles.active:""} onClick={()=>setProject(name)}><i className={styles[`projectDot${index}`]}/>{name}<span>{name==="All projects"?tasks.length:tasks.filter(t=>t.project===name).length}</span></button>)}
      <button className={styles.resetButton} onClick={()=>{setTasks(seedTasks);setProject("All projects");setQuery("");}}><RotateCcw/>Reset demo</button>
    </aside>
    <div className={styles.schedulerMain}>
      <header className={styles.schedulerHeader}><div><small>WEEK 35 · AUG 25–31</small><h1>Product launch sprint</h1><p>{tasks.length} tasks · {completion}% complete · browser-only demo data</p></div><div className={styles.schedulePeople}><i>AS</i><i>MK</i><i>RY</i><button onClick={()=>setShowForm(true)}><Plus/>New task</button></div></header>
      <div className={styles.scheduleTools}><div className={styles.viewTabs}>{(["Board","Calendar","Analytics"] as const).map(item=><button key={item} className={view===item?styles.active:""} onClick={()=>setView(item)}>{item==="Board"?<Columns3/>:item==="Calendar"?<CalendarDays/>:<BarChart3/>}{item}</button>)}</div><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tasks"/></label><button className={styles.filterButton} onClick={()=>setProject(project==="All projects"?"Horizon":"All projects")}><ListFilter/>{project}</button></div>
      {view==="Board" && <div className={styles.scheduleBoard}>{columns.map((status,index)=><section key={status} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(dragged)setTasks(items=>items.map(t=>t.id===dragged?{...t,status}:t));setDragged(null);}}><header><i className={styles[`status${index}`]}/><b>{status}</b><span>{visible.filter(t=>t.status===status).length}</span></header>{visible.filter(t=>t.status===status).map(task=><article draggable onDragStart={()=>setDragged(task.id)} key={task.id}><div><span className={styles[task.priority.toLowerCase()]}>{task.priority}</span><button onClick={()=>setTasks(items=>items.filter(t=>t.id!==task.id))} aria-label={`Delete ${task.title}`}><Trash2/></button></div><h2>{task.title}</h2><p>{task.project}</p><footer><i>{task.owner}</i><span><CalendarDays/>{task.day} Aug</span><span><Clock3/>{task.estimate}</span></footer></article>)}</section>)}</div>}
      {view==="Calendar" && <div className={styles.scheduleCalendar}><header><button><ChevronLeft/></button><h2>August 25–31, 2026</h2><button><ChevronRight/></button></header><div className={styles.calendarGrid}>{days.map((day,index)=><section key={day}><header><small>{["MON","TUE","WED","THU","FRI","SAT","SUN"][index]}</small><b>{day}</b></header>{visible.filter(t=>t.day===day).map(task=><button key={task.id} onClick={()=>setTasks(items=>items.map(t=>t.id===task.id?{...t,status:t.status==="Done"?"Backlog":"Done"}:t))}><i className={styles[task.priority.toLowerCase()]}/><span>{task.title}<small>{task.owner} · {task.estimate}</small></span>{task.status==="Done"?<Check/>:<Circle/>}</button>)}</section>)}</div></div>}
      {view==="Analytics" && <div className={styles.scheduleAnalytics}><article><small>SPRINT HEALTH</small><strong>{completion}%</strong><div><i style={{width:`${completion}%`}}/></div><p>Completion across all seeded tasks</p></article><article><small>WORK BY STATUS</small>{columns.map(status=><div key={status}><span>{status}</span><b>{tasks.filter(t=>t.status===status).length}</b><i style={{width:`${tasks.filter(t=>t.status===status).length/tasks.length*100}%`}}/></div>)}</article><article><small>TEAM CAPACITY</small>{["AS","MK","RY","JT"].map(owner=><div key={owner}><i>{owner}</i><span>{tasks.filter(t=>t.owner===owner).length} assigned</span><b>{[72,54,88,41][["AS","MK","RY","JT"].indexOf(owner)]}%</b></div>)}</article></div>}
    </div>
    {showForm&&<div className={styles.demoModal} onClick={()=>setShowForm(false)}><form onSubmit={addTask} onClick={e=>e.stopPropagation()}><header><div><small>QUICK CREATE</small><h2>Add a sprint task</h2></div><button type="button" onClick={()=>setShowForm(false)}><X/></button></header><label>Task name<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="What needs to happen?"/></label><div className={styles.modalFields}><label>Project<select value={project==="All projects"?"Horizon":project} onChange={e=>setProject(e.target.value)}><option>Horizon</option><option>Atlas</option><option>Nova</option></select></label><label>Priority<select><option>Medium</option><option>High</option><option>Low</option></select></label></div><footer><button type="button" onClick={()=>setShowForm(false)}>Cancel</button><button type="submit"><Plus/>Create task</button></footer></form></div>}
  </section>;
}
