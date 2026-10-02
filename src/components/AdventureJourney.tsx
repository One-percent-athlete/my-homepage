"use client";
import HomeTunnel from "@/components/HomeTunnel";
import FloatingButtons from "@/components/FloatingButtons";
import {useTravelJourney} from "@/components/travel/TravelChapters";
import {useSkiJourney} from "@/components/ski/SkiChapters";
export default function AdventureJourney({initialWorld="travel"}:{initialWorld?:"travel"|"ski"}){
 const travel=useTravelJourney(),ski=useSkiJourney();
 return <main className="home-tunnel adventure-journey"><FloatingButtons/><HomeTunnel world="travel" labels={[...travel.labels,...ski.labels]} instruction={travel.instruction} skiStart={travel.labels.length} initialChapter={initialWorld==="ski"?travel.labels.length:0} showNavigation={false} holdLastChapter>{travel.content}{ski.content}</HomeTunnel></main>;
}
