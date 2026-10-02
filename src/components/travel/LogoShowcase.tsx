"use client";
import {useLanguage} from "@/app/context/LanguageContext";
const countries = [
  "ar","au","at","be","bo","br","bw","ca","cl","cn","co","cr",
  "hr","cz","ec","eg","sv","fr","de","gr","hu","is","in","it",
  "jp","jo","ke","li","lk","my","mm","mx","na","nl","nz","ni",
  "np","pa","py","pe","pt","sg","sk","si","za","es","ch","tw",
  "th","tr","gb","us","uy","vn","xk","ba","mk","me","mc","va",
  "kh","la","bd"
];
export default function LogoShowcase({direction="left"}:{direction?:"left"|"right"}){
 const {language}=useLanguage();const labels=new Intl.DisplayNames([language],{type:"region"});
 const split=Math.ceil(countries.length/2);const strip=direction==="left"?countries.slice(0,split):countries.slice(split);
 return <div className="travel-flags-strip"><div className={"travel-flags-loop "+(direction==="right"?"reverse":"")}>
 {[0,1].map(copy=><div key={copy} className="travel-flags-copy" aria-hidden={copy===1?true:undefined}>{strip.map(code=><span key={code} className={`fi fi-${code}`} role="img" aria-label={labels.of(code.toUpperCase())??code.toUpperCase()} title={labels.of(code.toUpperCase())??code.toUpperCase()}/>)}</div>)}
 </div></div>;
}
