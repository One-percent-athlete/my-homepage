"use client";

import type { IconType } from "react-icons";

export default function LogoShowcase({tools}:{tools:{title:string;icon:IconType}[]}) {
  return <div className="toolkit-orbit">
    <div className="toolkit-orbit-track">{[0,1].map(copy=><ul key={copy} className="toolkit-orbit-group" aria-hidden={copy===1 ? true : undefined}>{tools.map(tool=><li key={tool.title}><tool.icon aria-hidden="true"/><span>{tool.title}</span></li>)}</ul>)}</div>
  </div>;
}
