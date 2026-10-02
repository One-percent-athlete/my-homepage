"use client";

import { Children, Fragment, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { gateOrigin, homeGateProjection, subscribeJourneyFrame, type JourneyFrame, travelDistance } from "@/lib/space-journey";

import LoadingScreen from "@/components/LoadingScreen";
import { getReadingMode, READING_MODE_EVENT } from "@/lib/reading-mode";

type TunnelWorld = "home" | "web" | "travel" | "ski" | "contact" | "between";
const worldClasses: Record<TunnelWorld, string> = { home: "mission-site", web: "web-world", travel: "travel-world", ski: "ski-world", contact: "contact-world", between: "between-world" };

function flattenChapters(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => isValidElement<{ children: ReactNode }>(child) && child.type === Fragment ? flattenChapters(child.props.children) : [child]);
}

export default function HomeTunnel({ children, labels, instruction, world = "home", workStart, contactStart, skiStart, initialChapter = 0, showNavigation = true, holdLastChapter = false }: { children: ReactNode; labels: string[]; instruction: string; world?: TunnelWorld; workStart?: number; contactStart?: number; skiStart?: number; initialChapter?: number; showNavigation?: boolean; holdLastChapter?: boolean }) {
  const chapters = flattenChapters(children);
  const [ready, setReady] = useState(false);
  const painted = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [reading, setReading] = useState(false);
  const staticMode = reduced || reading;
  const previousMode = useRef<boolean | null>(null);
  const pendingChapter = useRef<number | null>(initialChapter);
  const initialHashHandled = useRef(false);
  const [active, setActive] = useState(0);
  const gates = useRef<(HTMLDivElement | null)[]>([]);
  const layer = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const announcedWorld = useRef("");
  const chapterWorld = (index: number): TunnelWorld => skiStart !== undefined ? index >= skiStart ? "ski" : "travel" : contactStart !== undefined && index >= contactStart ? "contact" : workStart === undefined ? world : index >= (workStart ?? Infinity) ? "web" : "home";

  useEffect(() => {
    if (ready || (mounted && staticMode)) window.dispatchEvent(new Event("journey-ready"));
  }, [ready, mounted, staticMode]);

  function goTo(index: number) {
    if (index < 0 || index >= chapters.length) return;
    const distance = gateOrigin(index) - gateOrigin(0);
    window.scrollTo({ top: distance / 1.5 * window.innerHeight, behavior: "instant" });
  }

  useEffect(() => {
    const row = navigation.current;
    if (!row || typeof row.querySelector !== "function") return;
    const button = row.querySelector<HTMLButtonElement>('button[aria-current="step"]');
    if (button) row.scrollTop = button.offsetTop - row.offsetTop - row.clientHeight / 2 + button.offsetHeight / 2;
  }, [active, mounted, reduced]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { pendingChapter.current = activeRef.current; setReduced(media.matches); };
    const mode = () => { pendingChapter.current = activeRef.current; setReading(getReadingMode() === "read"); };
    setReading(getReadingMode() === "read");
    update();
    setMounted(true);
    media.addEventListener("change", update);
    window.addEventListener(READING_MODE_EVENT, mode);
    window.addEventListener("storage", mode);
    return () => { media.removeEventListener("change", update); window.removeEventListener(READING_MODE_EVENT, mode); window.removeEventListener("storage", mode); };
  }, []);

  useEffect(() => {
    if (!mounted || previousMode.current === staticMode) return;
    let index = previousMode.current === null ? initialChapter : pendingChapter.current ?? activeRef.current;
    if (previousMode.current === null && window.location.hash) {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = gates.current.findIndex(gate => Array.from(gate?.querySelectorAll("[id]") ?? []).some(node => node.id === id));
        if (target >= 0) index = target;
      } catch { /* An invalid fragment leaves the normal entry chapter intact. */ }
    }
    initialHashHandled.current = true;
    previousMode.current = staticMode;
    pendingChapter.current = null;
    activeRef.current = index;
    setActive(index);
    if (staticMode) {
      if (world === "travel" || world === "ski") gates.current.forEach(element => element?.querySelectorAll<HTMLVideoElement>("video").forEach(video => { if (typeof video.pause === "function") video.pause(); }));
      gates.current.forEach(element => { if (element) { element.inert = false; element.setAttribute("aria-hidden", "false"); } });
      const element = gates.current[index];
      if (element) window.scrollTo({ top: Math.max(0, window.scrollY + element.getBoundingClientRect().top - 150), behavior: "instant" });
    } else {
      painted.current = false;
      setReady(false);
      window.scrollTo({ top: index * 2 / 1.5 * window.innerHeight, behavior: "instant" });
    }
  }, [mounted, staticMode, initialChapter, world]);

  useEffect(() => {
    if (!mounted || staticMode) return;
    function paint(frame: JourneyFrame) {
      if (!painted.current && Math.abs(frame.distance - travelDistance(window.scrollY, frame.height)) > 0.05) return;
      const index = Math.min(chapters.length - 1, Math.max(0, Math.floor((frame.distance + 0.7) / 2)));
      const finished = !holdLastChapter && workStart === undefined && frame.distance > gateOrigin(chapters.length - 1) - 0.2;
      if (layer.current) layer.current.dataset.finished = String(finished);
      if (index !== activeRef.current) { activeRef.current = index; setActive(index); }
      if (workStart !== undefined || skiStart !== undefined) {
        const route = skiStart !== undefined ? index >= skiStart ? "/ski" : "/travel" : contactStart !== undefined && index >= contactStart ? "/contact" : index >= (workStart ?? Infinity) ? "/web" : "/";
        if (route !== announcedWorld.current) {
          announcedWorld.current = route;
          document.body.dataset.journeyPage = route;
          document.body.dataset.motionWorld = route === "/ski" ? "summit" : route === "/travel" ? "travel" : route === "/contact" ? "contact" : route === "/web" ? "build" : "base";
          window.dispatchEvent(new CustomEvent("journey-page", { detail: route }));
        }
      }
      gates.current.forEach((element, chapter) => {
        if (!element) return;
        const gate = homeGateProjection(chapter, frame);
        const baseWidth = frame.width < 700 ? 420 : 1280;
        const fade = Math.min(1, Math.max(0, (gate.depth - 0.25) / 0.55));
        const visible = gate.opacity > 0 && gate.depth < 12;
        const interactive = chapter === index && visible && gate.depth > 0.45 && gate.depth < 2.5;
        element.style.width = `${baseWidth}px`;
        element.style.height = `${baseWidth * gate.ratio}px`;
        element.style.left = `${gate.centerX}px`;
        element.style.top = `${gate.centerY}px`;
        element.style.transform = `translate(-50%, -50%) scale(${gate.width / baseWidth})`;
        element.style.opacity = String(gate.opacity * fade * Math.min(1, 2 / Math.max(0.2, gate.depth)));
        element.style.visibility = visible ? "visible" : "hidden";
        element.style.zIndex = String(chapters.length - chapter);
        element.style.pointerEvents = interactive ? "auto" : "none";
        if ((world === "travel" || world === "ski") && element.dataset.active !== String(interactive)) {
          element.dataset.active = String(interactive);
          element.querySelectorAll<HTMLVideoElement>("video").forEach(video => {
            if (interactive && typeof video.play === "function") void video.play().catch(() => {});
            else if (typeof video.pause === "function") video.pause();
          });
        }
        element.inert = !interactive;
        element.setAttribute("aria-hidden", String(!interactive));
        element.dataset.depth = gate.depth.toFixed(3);
      });
      if (!painted.current) { painted.current = true; setReady(true); }
    }
    const unsubscribe = subscribeJourneyFrame(paint);

    // Anchors retain their meaning even though the section itself lives in a gate.
    const navigateToHash = (hash: string) => {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
      if (!id) return;
      const index = gates.current.findIndex(gate => Array.from(gate?.querySelectorAll("[id]") ?? []).some(node => node.id === id));
      if (index < 0) return false;
      window.scrollTo({ top: (gateOrigin(index) - gateOrigin(0)) / 1.5 * window.innerHeight, behavior: "instant" });
      return true;
    };
    const onHash = () => { navigateToHash(window.location.hash); };
    const onAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const routeLink = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (skiStart !== undefined && routeLink && !routeLink.hasAttribute("download") && (!routeLink.target || routeLink.target === "_self")) {
        const url = new URL(routeLink.href,window.location.href);
        if (url.origin === window.location.origin && ["/travel","/ski"].includes(url.pathname) && !url.hash && !url.search) {event.preventDefault();window.scrollTo({top:(url.pathname === "/ski" ? skiStart : 0)*2/1.5*window.innerHeight,behavior:"instant"});return;}
      }
      if (workStart !== undefined && routeLink && !routeLink.hasAttribute("download") && (!routeLink.target || routeLink.target === "_self")) {
        const url = new URL(routeLink.href, window.location.href);
        if (url.origin === window.location.origin && ["/", "/web", ...(contactStart !== undefined ? ["/contact"] : [])].includes(url.pathname) && (!url.hash || url.pathname === "/contact") && !url.search) {
          event.preventDefault();
          if (url.hash && navigateToHash(url.hash)) {
            window.history.pushState(null, "", url.hash);
            window.dispatchEvent(new Event("hashchange"));
            return;
          }
          window.scrollTo({ top: (url.pathname === "/contact" ? contactStart! : url.pathname === "/web" ? workStart : 0) * 2 / 1.5 * window.innerHeight, behavior: "instant" });
          return;
        }
      }
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const hash = anchor?.getAttribute("href");
      if (!hash || !navigateToHash(hash)) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onAnchor, true);
    if (!initialHashHandled.current) { initialHashHandled.current = true; onHash(); }
    return () => { unsubscribe(); window.removeEventListener("hashchange", onHash); document.removeEventListener("click", onAnchor, true); delete document.body.dataset.journeyPage; };
  }, [mounted, staticMode, chapters.length, workStart, contactStart, skiStart, holdLastChapter, world]);

  useEffect(() => {
    if (!mounted || !staticMode) return;
    const update = () => {
      const point = window.innerHeight * .35;
      let chapter = 0;
      gates.current.forEach((element,index) => { if (element && element.getBoundingClientRect().top <= point) chapter = index; });
      activeRef.current = chapter;
      if (workStart === undefined && skiStart === undefined) return;
      const route = skiStart !== undefined ? chapter >= skiStart ? "/ski" : "/travel" : contactStart !== undefined && chapter >= contactStart ? "/contact" : chapter >= (workStart ?? Infinity) ? "/web" : "/";
      document.body.dataset.journeyPage = route;
      document.body.dataset.motionWorld = route === "/ski" ? "summit" : route === "/travel" ? "travel" : route === "/contact" ? "contact" : route === "/web" ? "build" : "base";
      window.dispatchEvent(new CustomEvent("journey-page", { detail: route }));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, window.location.href);
      if (skiStart !== undefined && url.origin === window.location.origin && ["/travel","/ski"].includes(url.pathname) && !url.hash && !url.search) {
        event.preventDefault(); gates.current[url.pathname === "/ski" ? skiStart : 0]?.scrollIntoView(); return;
      }
      if (workStart === undefined || url.origin !== window.location.origin || !["/", "/web", ...(contactStart !== undefined ? ["/contact"] : [])].includes(url.pathname) || url.hash || url.search) return;
      event.preventDefault();
      if (url.pathname === "/contact") document.getElementById("journey-contact-start")?.scrollIntoView();
      else if (url.pathname === "/web") document.getElementById("journey-work-start")?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    };
    document.addEventListener("click", navigate, true);
    return () => { window.removeEventListener("scroll", update); document.removeEventListener("click", navigate, true); delete document.body.dataset.journeyPage; };
  }, [mounted, staticMode, workStart, contactStart, skiStart]);

  if (!mounted) return <LoadingScreen />;


  const renderChapter = (chapter: ReactNode, index: number) => <div className="home-tunnel-gate" data-reading-chapter={index} id={index === contactStart ? "journey-contact-start" : index === workStart ? "journey-work-start" : undefined} inert={staticMode ? false : undefined} aria-hidden={staticMode ? false : undefined} key={index} ref={element => { gates.current[index] = element; }}>
        <div className={`home-gate-content ${worldClasses[chapterWorld(index)]}${chapterWorld(index) !== "home" ? " tunnel-world-content" : ""}`}>{chapter}</div>
      </div>;
  return <>
    {!staticMode && <div className="home-tunnel-runway" style={{ height: `${100 + (chapters.length - (workStart === undefined && !holdLastChapter ? 0 : 1)) * 2 / 1.5 * 100}${workStart === undefined && !holdLastChapter ? "svh" : "vh"}` }} aria-hidden="true" />}
    {createPortal(<div ref={layer} className={staticMode ? "home-tunnel-static reading-layout" : "home-tunnel-layer"} data-world={skiStart !== undefined ? "adventure" : world}>
      <div className={staticMode ? "reading-chapters" : "home-tunnel-stage"} style={{ visibility: staticMode || ready ? "visible" : "hidden" }}>{staticMode && skiStart !== undefined ? <>{["travel","ski"].map((group,groupIndex)=><div key={group} className="reading-layout reading-world-group" data-world={group}><div className="reading-chapters">{chapters.slice(groupIndex===0?0:skiStart,groupIndex===0?skiStart:chapters.length).map((chapter,index)=>renderChapter(chapter,index+(groupIndex===0?0:skiStart)))}</div></div>)}</> : chapters.map(renderChapter)}</div>
      {showNavigation && !staticMode && <nav className="home-tunnel-navigation" aria-label={instruction}>
        <span>{instruction}</span>
        <button type="button" aria-label={labels[Math.max(0, active - 1)]} disabled={active === 0} onClick={() => goTo(active - 1)}>↑</button>
        <div ref={navigation}>{labels.map((label, index) => <button type="button" key={index} onClick={() => goTo(index)} aria-label={label} aria-current={index === active ? "step" : undefined}>{String(index + 1).padStart(2, "0")}</button>)}</div>
        <button type="button" aria-label={labels[Math.min(chapters.length - 1, active + 1)]} disabled={active === chapters.length - 1} onClick={() => goTo(active + 1)}>↓</button>
      </nav>}
    </div>, document.body)}
    {!staticMode && !ready && <LoadingScreen />}
  </>;
}
