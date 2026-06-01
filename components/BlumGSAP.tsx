"use client";

import { useEffect } from "react";

type Version = "v1" | "v2" | "v3";

const CARD_SEL: Record<Version, string> = {
  v1: ".product-card",
  v2: ".v2-product-card",
  v3: ".v3-product-card",
};

export default function BlumGSAP({ version }: { version: Version }) {
  useEffect(() => {
    const kills: Array<() => void> = [];
    let previewEl: HTMLDivElement | null = null;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── 1. 텍스트 마스크 reveal: section h2 ──────────────────── */
      document.querySelectorAll<HTMLElement>("section h2").forEach((el) => {
        if (el.dataset.gsapMask) return;
        el.dataset.gsapMask = "1";

        /* 원본 overflow 저장 후 hidden 처리 */
        const origOverflow = el.style.overflow;
        el.style.overflow = "hidden";

        /* inner wrapper 삽입 */
        const wrap = document.createElement("span");
        wrap.style.cssText = "display:block;will-change:transform;";
        while (el.firstChild) wrap.appendChild(el.firstChild);
        el.appendChild(wrap);

        gsap.set(wrap, { y: "110%" });

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 84%",
          once: true,
          onEnter: () => {
            gsap.to(wrap, {
              y: "0%",
              duration: 1.3,
              ease: "power4.out",
            });
          },
        });

        kills.push(() => {
          st.kill();
          /* DOM 원상 복구 */
          while (wrap.firstChild) el.insertBefore(wrap.firstChild, wrap);
          wrap.remove();
          el.style.overflow = origOverflow;
          delete el.dataset.gsapMask;
        });
      });

      /* ── 2. 이미지 패럴렉스 (비-히어로, 비-카드 이미지) ──────── */
      document.querySelectorAll<HTMLElement>("section").forEach((sec, i) => {
        if (i === 0) return; // 히어로 섹션 제외

        sec.querySelectorAll<HTMLElement>(".overflow-hidden img").forEach((img) => {
          /* hover:scale 클래스가 있는 이미지는 충돌 방지를 위해 제외 */
          if (img.className.includes("hover:scale") || img.className.includes("group-hover:scale")) return;
          /* 작은 섬네일 제외 */
          const parent = img.closest<HTMLElement>(".overflow-hidden");
          if (!parent || parent.offsetHeight < 120) return;

          gsap.set(img, { willChange: "transform" });
          const t = gsap.to(img, {
            y: 55,
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

      /* ── 3. 커서 따라다니는 이미지 미리보기 ─────────────────────── */
      const cards = document.querySelectorAll<HTMLElement>(CARD_SEL[version]);
      if (cards.length > 0) {
        previewEl = document.createElement("div");
        previewEl.id = "blum-cursor-preview";
        previewEl.style.cssText = [
          "position:fixed", "pointer-events:none", "z-index:9999",
          "width:270px", "height:178px",
          "overflow:hidden", "opacity:0",
          "transition:opacity 0.28s ease",
          "box-shadow:0 16px 56px rgba(0,0,0,0.32)",
          "transform:translateZ(0)",
          "border-radius:2px",
        ].join(";");
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
              previewEl.style.top = me.clientY - 89 + "px";
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

      /* ── 4. 섹션 진입 시 요소 순차 등장 (그리드 아이템) ─────── */
      document.querySelectorAll<HTMLElement>(
        "section .grid > div, section .grid > a",
      ).forEach((grid) => {
        /* 이미 Reveal로 감싸진 요소(인라인 opacity 0)는 스킵 */
        if ((grid as HTMLElement).style.opacity === "0") return;
        /* 이미 처리된 요소 스킵 */
        if ((grid as HTMLElement).dataset.gsapSeq) return;
        (grid as HTMLElement).dataset.gsapSeq = "1";

        const siblings = Array.from(grid.parentElement!.children) as HTMLElement[];
        const idx = siblings.indexOf(grid);

        const t = gsap.from(grid, {
          y: 24,
          opacity: 0,
          duration: 0.85,
          delay: idx * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid.parentElement!,
            start: "top 82%",
            once: true,
          },
        });
        kills.push(() => t.kill());
      });

      /* ── 5. 숫자 카운팅 (data-count 속성 기반) ──────────────── */
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
