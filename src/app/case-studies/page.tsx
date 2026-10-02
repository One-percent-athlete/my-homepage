"use client";
import Link from 'next/link';
import {useLanguage} from '@/app/context/LanguageContext';
import {buildCaseStudies,storyLabels} from '@/lib/build-stories';
import styles from './case-studies.module.css';
const copy={en:{title:'Real project stories',intro:'The systems I have worked on, and the workflows they support.',back:'Back to Work'},ja:{title:'実際のプロジェクト',intro:'取り組んだシステムと、それぞれが支える業務。',back:'Workに戻る'},zh:{title:'真实项目故事',intro:'我参与的系统，以及它们支持的工作流程。',back:'返回作品'}};
export default function CaseStudies(){const {language}=useLanguage();const t=copy[language],labels=storyLabels[language];return <main className={styles.caseStudies}><Link href="/web">← {t.back}</Link><h1>{t.title}</h1><p>{t.intro}</p>{buildCaseStudies[language].map(project=><article key={project.slug} id={project.slug}><small>{project.category}</small><h2>{project.title}</h2><p>{project.intro}</p><dl>{(['problem','built','result'] as const).map(key=><div key={key}><dt>{labels[key]}</dt><dd>{project[key]}</dd></div>)}</dl></article>)}</main>;}
