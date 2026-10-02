"use client";

import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/app/context/LanguageContext";
import { buildStories, storyLabels } from "@/lib/build-stories";

interface ProjectCardGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  startIndex?: number;
  count?: number;
}

export default function ProjectCardGrid({sectionTitle="Selected builds",startIndex=0,count=buildStories.en.length}:ProjectCardGridProps) {
  const {language}=useLanguage();
  const t=storyLabels[language];
  return <div className="build-stories">{buildStories[language].slice(startIndex,startIndex+count).map((project,index)=><article className="build-feature build-case-study" key={project.slug}>
    <header><p>{sectionTitle}</p><span>{String(startIndex+index+1).padStart(2,"0")} / {String(buildStories[language].length).padStart(2,"0")}</span></header>
    <div className="build-feature-body">
      <div className="build-feature-copy">
        <small>{project.demoHref ? t.demo : t.project} · {project.category}</small>
        <h2>{project.title}</h2>
        <p>{project.intro}</p>
        <div className="build-feature-stack">{project.features.map(feature=><span key={feature}>{feature}</span>)}</div>
        <a href={project.demoHref ?? "/contact"}>{project.demoHref ? t.live : t.contact}<FiExternalLink aria-hidden="true"/></a>
      </div>
      <dl className="build-story">{(["problem","built","result"] as const).map((key,index)=><div key={key}><dt><span>{String(index+1).padStart(2,"0")}</span>{t[key]}</dt><dd>{project[key]}</dd></div>)}</dl>
    </div>
  </article>)}</div>;
}
