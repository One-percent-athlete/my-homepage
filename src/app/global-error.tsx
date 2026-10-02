"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body style={{ margin: 0, background: "#03121b", color: "#c5edf7", fontFamily: "system-ui" }}><main style={{ minHeight: "100vh", display: "grid", alignContent: "center", justifyItems: "center", gap: 20, padding: 24, boxSizing: "border-box", textAlign: "center" }}>
    <p>SIGNAL LOST</p><h1>The signal was interrupted.</h1><p>This page couldn’t load. Try again or return to Home.</p>
    <button onClick={reset} style={{ padding: "12px 24px", cursor: "pointer" }}>Try again</button><button onClick={() => window.location.assign("/")} style={{ color: "#b1ecff", background: "transparent", border: 0, cursor: "pointer" }}>Return to Home</button>
  </main></body></html>;
}
