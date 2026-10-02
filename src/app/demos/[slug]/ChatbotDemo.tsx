"use client";
import {useState,type FormEvent,useRef,useEffect} from 'react';
import styles from './workflow.module.css';
import {demoReply} from '@/lib/workflow-demos';
const welcome={role:'assistant',text:'Hi! I’m the demo product assistant. Ask about ski lessons, meal ordering, uniform orders or working with Ryu.'};
export default function ChatbotDemo(){
 const [messages,setMessages]=useState([welcome]),[draft,setDraft]=useState('');
 const log=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=log.current;if(node)node.scrollTop=node.scrollHeight;},[messages]);
 const send=(text:string)=>{if(!text.trim())return;setMessages(items=>[...items,{role:'you',text:text.trim()},{role:'assistant',text:demoReply(text)}]);setDraft('');};
 const submit=(event:FormEvent)=>{event.preventDefault();send(draft);};
 return <section className={[styles.app,styles.chatStudio].join(' ')}><aside className={styles.chatSidebar}><div className={styles.assistantBrand}><span>✳</span><strong>Signal</strong><small>PRODUCT ASSISTANT</small></div><button onClick={()=>{setMessages([welcome]);setDraft('');}}>＋ New conversation</button><h2>Explore a topic</h2><div className={styles.promptList}>{['How do I request a ski lesson?','What happens after a lesson is accepted?','How does the meal cutoff work?','How are uniform costs deducted?','How do I find a cycling guide?','Can I talk to a person?'].map((prompt,index)=><button key={prompt} onClick={()=>send(prompt)}><span>0{index+1}</span>{prompt}</button>)}</div><p>Scripted prototype<br/>No AI service connected.<br/>Messages stay in this tab.</p></aside><div className={styles.chatWorkspace}><header><div><span className={styles.onlineDot}/><h1>Ask the assistant</h1></div><small>{Math.max(0,(messages.length-1)/2)} questions explored</small></header><div ref={log} className={styles.chatLog} role="log" aria-live="polite" aria-label="Chat conversation">{messages.map((m,index)=><article key={index} data-speaker={m.role}><span className={styles.speakerIcon}>{m.role==='you'?'Y':'✳'}</span><div><small>{m.role==='you'?'YOU':'SIGNAL'}</small><p>{m.text}</p></div></article>)}</div><form className={styles.chatComposer} onSubmit={submit}><label htmlFor="signal-message">Your message</label><div><textarea id="signal-message" required value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Ask about a workflow…" maxLength={1000} rows={2}/><button disabled={!draft.trim()} aria-label="Send message">↑</button></div><p>Try a suggested topic, then ask in your own words. Sample answers, no external messages.</p></form></div></section>;
}
