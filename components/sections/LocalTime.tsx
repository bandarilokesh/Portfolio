"use client";

import { useEffect, useState } from "react";

/** Live clock for a given IANA time zone; renders nothing until mounted to avoid hydration mismatch. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <span className="inline-block w-[7ch]" />;

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {time}
    </time>
  );
}
