"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the last section that has crossed the reading line (classic scrollspy).
 * Returns "" while the page is still above the first tracked section.
 * `ids` must be a stable (module-level) array so the effect does not re-subscribe
 * on every render.
 */
export function useActiveSection(ids: string[], viewportRatio = 0.35) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const update = () => {
      const probe = window.innerHeight * viewportRatio;
      let current = "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= probe) {
          current = id;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, viewportRatio]);

  return activeId;
}