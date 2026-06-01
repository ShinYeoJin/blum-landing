"use client";

import { useEffect } from "react";

type Version = "v1" | "v2" | "v3";

const CARD_SEL: Record<Version, string> = {
  v1: ".product-card",
  v2: ".v2-product-card",
  v3: ".v3-product-card",
};

const TEXT_CFG: Record<Version, { duration: number; ease: string }> = {
  v1: { duration: 1.3, ease: "power2.out" },
  v2: { duration: 1.0, ease: "power3.out" },
  v3: { duration: 0.55, ease: "back.out(1.5)" },
};

const CURSOR_CFG: Record<Version, { background: string; border: string; borderRadius: string; boxShadow?: string }> = {
  v1: { background: "#ffffff", border: "2px solid #18181b", borderRadius: "0px" },
  v2: { background: "#faf7f2", border: "none", borderRadius: "12px", boxShadow: "0 16px 56px rgba(0,0,0,0.18)" },
  v3: { background: "#0a0a0a", border: "2px solid #c8102e", borderRadius: "0px", boxShadow: "0 0 0 1px #c8102e, 0 16px 40px rgba(200,16,46,0.25)" },
};

const SEQ_CFG: Record<Version, { duration: number; ease: string; delayPerItem: number }> = {
  v1: { duration: 0.9, ease: "power2.out", delayPerItem: 0.1 },
  v2: { duration: 0.75, ease: "power3.out", delayPerItem: 0.09 },
  v3: { duration: 0.45, ease: "back.out(1.4)", delayPerItem: 0.06 },
};

export default function BlumGSAP({ version }: { version: Version }) {
  useEffect(() => {
    const kills: Array<() => void> = [];
    let previewEl: HTMLDivElement | null = null;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const textCfg = TEXT_CFG[version];
      document.querySelectorAll<HTMLElement>("section h2").forEach((el) => {
        if (el.dataset.gsapMask) return;
        el.dataset.gsapMask = "1";

        const origOverflow = el.style.overflow;
        el.style.overflow = "hidden";

        const wrap = document.createElement("span");
        wrap.style.cssText = "display:block;will-change:transform;";
        while (el.firstChild) wrap.appendChild(el.firstChild);
        el.appendChild(wrap);

        gsap.set(wrap, { y: "110%", opacity: 0 });

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 84%",
          once: true,
          onEnter: () => {
            gsap.to(wrap, {
              y: "0%",
              opacity: 1,
              duration: textCfg.duration,
              ease: textCfg.ease,
            });
          },
        });

        kills.push(() => {
          st.kill();
          while (wrap.firstChild) el.insertBefore(wrap.firstChild, wrap);
          wrap.remove();
          el.style.overflow = origOverflow;
          delete el.dataset.gsapMask;
        });
      });

      document.querySelectorAll<HTMLElement>("section").forEach((sec, i) => {
        if (i === 0) return;

        sec.querySelectorAll<HTMLElement>(".overflow-hidden img").forEach((img) => {
          if (img.className.includes("hover:scale") || img.className.includes("group-hover:scale")) return;
          const parent = img.closest<HTMLElement>(".overflow-hidden");
          if (!parent || parent.offsetHeight < 120) return;

          gsap.set(img, { willChange: "transform" });
          const t = gsap.to(img, {
            y: 80,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          });
          kills.push(() => {
            t.kill();
            gsap.set(img, { clearProps: "willChange,y" });
          });
        });
      });

      const cursorCfg = CURSOR_CFG[version];
      const cards = document.querySelectorAll<HTMLElement>(CARD_SEL[version]);
      if (cards.length > 0) {
        previewEl = document.createElement("div");
        previewEl.id = "blum-cursor-preview";
        const cursorStyles = [
          "position:fixed", "pointer-events:none", "z-index:9999",
          "width:260px", "height:172px",
          "overflow:hidden", "opacity:0",
          "transition:opacity 0.28s ease",
          "transform:translateZ(0)",
          `background:${cursorCfg.background}`,
          `border:${cursorCfg.border}`,
          `border-radius:${cursorCfg.borderRadius}`,
        ];
        if (cursorCfg.boxShadow) cursorStyles.push(`box-shadow:${cursorCfg.boxShadow}`);
        previewEl.style.cssText = cursorStyles.join(";");
        const pi = document.createElement("img");
        pi.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
        previewEl.appendChild(pi);
        document.body.appendChild(previewEl);

        const evts: Array<[HTMLElement, string, EventListener]> = [];
        let rafId = 0;

        cards.forEach((card) => {
          const img = card.querySelector<HTMLImageElement>("img");
          if (!img) return;

          const onEnter = () => {
            pi.src = img.src;
            previewEl!.style.opacity = "1";
          };
          const onLeave = () => {
            previewEl!.style.opacity = "0";
          };
          const onMove = (ev: Event) => {
            const me = ev as MouseEvent;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              if (!previewEl) return;
              previewEl.style.left = me.clientX + 28 + "px";
              previewEl.style.top = me.clientY - 86 + "px";
            });
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          card.addEventListener("mousemove", onMove);
          evts.push(
            [card, "mouseenter", onEnter],
            [card, "mouseleave", onLeave],
            [card, "mousemove", onMove],
          );
        });

        kills.push(() => {
          evts.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
          cancelAnimationFrame(rafId);
        });
      }

      const seqCfg = SEQ_CFG[version];
      document.querySelectorAll<HTMLElement>(
        "section .grid > div, section .grid > a",
      ).forEach((grid) => {
        if ((grid as HTMLElement).style.opacity === "0") return;
        if ((grid as HTMLElement).dataset.gsapSeq) return;
        (grid as HTMLElement).dataset.gsapSeq = "1";

        const siblings = Array.from(grid.parentElement!.children) as HTMLElement[];
        const idx = siblings.indexOf(grid);

        const t = gsap.from(grid, {
          y: 40,
          opacity: 0,
          duration: seqCfg.duration,
          delay: idx * seqCfg.delayPerItem,
          ease: seqCfg.ease,
          scrollTrigger: {
            trigger: grid.parentElement!,
            start: "top 82%",
            once: true,
          },
        });
        kills.push(() => t.kill());
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (el.dataset.gsapCount) return;
        el.dataset.gsapCount = "1";
        const target = parseFloat(el.dataset.count!);
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.v).toLocaleString() + suffix;
              },
            });
          },
        });
        kills.push(() => st.kill());
      });

      /* ── 6. 구분선 draw 애니메이션 ── */
      document.querySelectorAll<HTMLElement>("section hr, .gsap-line").forEach((line) => {
        if (line.dataset.gsapLine) return;
        line.dataset.gsapLine = "1";
        gsap.set(line, { scaleX: 0, transformOrigin: "left" });
        const t = gsap.to(line, {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 88%",
            once: true,
          },
        });
        kills.push(() => t.kill());
      });

      await new Promise(r => setTimeout(r, 100));
      ScrollTrigger.refresh();
    };

    run();

    return () => {
      kills.forEach((fn) => fn());
      previewEl?.remove();
    };
  }, [version]);

  return null;
}
