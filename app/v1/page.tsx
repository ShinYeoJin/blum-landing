"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import BlumGSAP from "@/components/BlumGSAP";
import StatsSection from "@/components/v1/StatsSection";
import ProductSection from "@/components/v1/ProductSection";
import CtaSection from "@/components/v1/CtaSection";

const BASE = "https://www.blum.com";

/* ── Data ───────────────────────────────────────────────────────── */
const VALUES = [
  { num: "01", title: "삶의 질", body: "편리함을 높이고 삶의 질을 향상시키는 고품질 가구용 피팅을 제조합니다." },
  { num: "02", title: "영감", body: "고객의 질문이 혁신의 원동력입니다. blum은 끊임없이 움직여 더 나은 아이디어를 만들어 갑니다." },
  { num: "03", title: "신뢰", body: "사회, 환경, 직원에 대한 기업 책임. 자연 자원을 미래 세대를 위해 보존하는 것이 blum의 핵심 가치입니다." },
];

const SERVICES = [
  {
    title: "계획 / 설계 지원",
    body: "구역 플래너와 캐비닛 구성 시뮬레이터로 최적의 레이아웃을 설계할 수 있습니다.",
    href: "/v1/services",
    img: `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`,
  },
  {
    title: "E-Services",
    body: "CAD/CAM 데이터부터 주문 관리까지 디지털로 완결되는 온라인 서비스 포털.",
    href: "/v1/services",
    img: `${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`,
  },
];

/* ══════════════════════════════════════════════════════════════════ */
export default function V1() {
  const [openValue, setOpenValue] = useState<number | null>(null);

  /* ── Divider ("SINCE 1952") refs ────────────────────────────── */
  const dividerWrapRef = useRef<HTMLDivElement>(null);
  const dividerImgRef  = useRef<HTMLDivElement>(null);   // scaling wrapper
  const dividerLblRef  = useRef<HTMLParagraphElement>(null);
  const dividerTxtRef  = useRef<HTMLParagraphElement>(null);

  /* ── Hero → Brand transition refs ───────────────────────────── */
  const transitionOuterRef = useRef<HTMLDivElement>(null);
  const heroLayerRef       = useRef<HTMLDivElement>(null);
  const heroTextRef        = useRef<HTMLDivElement>(null);
  const scrollIndicRef     = useRef<HTMLDivElement>(null);
  const gridLayerRef       = useRef<HTMLDivElement>(null);
  const g1Ref              = useRef<HTMLImageElement>(null);
  const g2Ref              = useRef<HTMLImageElement>(null);
  const g3Ref              = useRef<HTMLImageElement>(null);
  const g4Ref              = useRef<HTMLImageElement>(null);
  const g5Ref              = useRef<HTMLImageElement>(null);
  const g6Ref              = useRef<HTMLImageElement>(null);
  const g7Ref              = useRef<HTMLImageElement>(null);
  const g8Ref              = useRef<HTMLImageElement>(null);
  const g9Ref              = useRef<HTMLImageElement>(null);
  const heroPinRef         = useRef<HTMLElement>(null);
  const spotlightRef       = useRef<HTMLDivElement>(null);
  const spotlightOverRef   = useRef<HTMLDivElement>(null);
  const aboutLayerRef      = useRef<HTMLDivElement>(null);
  const aboutLblRef        = useRef<HTMLParagraphElement>(null);
  const aboutH2Ref         = useRef<HTMLHeadingElement>(null);
  const aboutLineRef       = useRef<HTMLDivElement>(null);
  const aboutB1Ref         = useRef<HTMLParagraphElement>(null);
  const aboutB2Ref         = useRef<HTMLParagraphElement>(null);
  const aboutLinkRef       = useRef<HTMLAnchorElement>(null);

  /* ── Brand snap-sequence refs ───────────────────────────────── */
  const snapRef           = useRef<HTMLDivElement>(null); // scroll-snap container
  const snapStep1TextRef  = useRef<HTMLDivElement>(null); // step 1 text block
  const snapBeigePanelRef = useRef<HTMLDivElement>(null); // step 2 beige panel
  const snapServicesRef   = useRef<HTMLElement>(null);    // exit target

  /* ── Services snap refs ──────────────────────────────────────── */
  const svcTitleRef       = useRef<HTMLDivElement>(null); // snap 1 title
  const svcPlanImgRef     = useRef<HTMLImageElement>(null); // snap 2 fullscreen img (scale)
  const svcPlanRef        = useRef<HTMLDivElement>(null); // snap 3 left content
  const svcEsvcImgRef     = useRef<HTMLImageElement>(null); // snap 4 fullscreen img (scale)
  const svcEsvcRef        = useRef<HTMLDivElement>(null); // snap 5 right content

  /* ── Pre-hide before first paint ────────────────────────────── */
  useLayoutEffect(() => {
    if (aboutH2Ref.current) aboutH2Ref.current.dataset.gsapMask = "1";
    document.querySelectorAll<HTMLElement>("#products .product-card").forEach((el) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(100px)";
      el.style.transition = "none";
    });
  }, []);

  /* ── GSAP: hero→brand ScrollTrigger + product stagger ────────── */
  useEffect(() => {
    const kills: Array<() => void> = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ═══════════════════════════════════════════════════════════
         HERO → BRAND TRANSITION  (ScrollTrigger scrub)

         STEP 1 (0→1):  Hero scale 1→0.7 + fade, grid appears
         STEP 2 (1→2):  Spotlight appears at g1 position, expands
                        to fullscreen; other grid images fade out
         STEP 3 (2→3):  Text overlay appears

         Spotlight = g1 image cloned as position:absolute inside
         sticky section. getBoundingClientRect() gives the grid
         cell's viewport coords → used as GSAP from-values so the
         expansion starts exactly from the grid cell.
         ═══════════════════════════════════════════════════════════ */
      const outer   = transitionOuterRef.current;
      const pinEl   = heroPinRef.current;
      const g1El    = g1Ref.current;
      const spl     = spotlightRef.current;
      const splOver = spotlightOverRef.current;

      if (outer && pinEl && g1El && spl) {
        /* ── Measure g1 position relative to sticky section ── */
        const pinRect = pinEl.getBoundingClientRect();
        const g1Rect  = g1El.getBoundingClientRect();
        const startTop    = g1Rect.top    - pinRect.top;
        const startLeft   = g1Rect.left   - pinRect.left;
        const startWidth  = g1Rect.width;
        const startHeight = g1Rect.height;

        /* ── Initial hidden states ── */
        gsap.set(gridLayerRef.current, { opacity: 0 });
        gsap.set(
          [g1Ref.current, g2Ref.current, g3Ref.current, g4Ref.current,
           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current],
          { opacity: 0, scale: 0.94 }
        );
        /* Spotlight starts at the g1 grid-cell position, invisible */
        gsap.set(spl, {
          top: startTop, left: startLeft,
          width: startWidth, height: startHeight,
          opacity: 0,
        });
        if (splOver) gsap.set(splOver, { opacity: 0 });

        gsap.set(aboutLayerRef.current, { opacity: 0 });
        ([aboutLblRef, aboutH2Ref, aboutB1Ref, aboutB2Ref, aboutLinkRef] as React.RefObject<HTMLElement>[]).forEach(
          (r) => { if (r.current) gsap.set(r.current, { opacity: 0, y: 40 }); }
        );
        if (aboutLineRef.current) gsap.set(aboutLineRef.current, { scaleX: 0, transformOrigin: "left" });

        const allImgs   = [g1Ref.current, g2Ref.current, g3Ref.current, g4Ref.current,
                           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current];
        const otherImgs = [g2Ref.current, g3Ref.current, g4Ref.current,
                           g5Ref.current, g6Ref.current, g7Ref.current, g8Ref.current, g9Ref.current];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        /* ── STEP 1: Hero shrinks, grid appears ── */
        tl
          .to(heroLayerRef.current,   { scale: 0.7, opacity: 0, duration: 1 }, 0)
          .to(heroTextRef.current,    { opacity: 0, y: -24, duration: 0.55 }, 0)
          .to(scrollIndicRef.current, { opacity: 0, duration: 0.35 }, 0)
          .to(gridLayerRef.current,   { opacity: 1, duration: 0.5 }, 0.25)
          .to(allImgs, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.7 }, 0.35)

        /* ── STEP 2: Feature image (g1) expands to fullscreen ── */
          /* 2a — spotlight appears flush over g1's grid cell */
          .to(spl, { opacity: 1, duration: 0.12 }, 1.35)
          /* 2b — other grid images fade; g1 fades under spotlight */
          .to(otherImgs, { opacity: 0, stagger: 0.06, duration: 0.45 }, 1.4)
          .to(g1Ref.current, { opacity: 0, duration: 0.25 }, 1.48)
          /* 2c — spotlight expands from g1 cell → full viewport */
          .to(spl, {
            top: 0, left: 0, width: "100%", height: "100%",
            duration: 1.15, ease: "power2.inOut",
          }, 1.4)
          .to(gridLayerRef.current, { opacity: 0, duration: 0.3 }, 1.65)
          /* 2d — dark overlay fades in during expansion */
          .to(splOver, { opacity: 0.62, duration: 0.9 }, 1.75)

        /* ── STEP 3: Text overlay ── */
          .to(aboutLayerRef.current, { opacity: 1, duration: 0.45 }, 2.25)
          .to(aboutLblRef.current,   { opacity: 1, y: 0, duration: 0.55 }, 2.35)
          .to(aboutH2Ref.current,    { opacity: 1, y: 0, duration: 0.65 }, 2.5)
          .to(aboutLineRef.current,  { scaleX: 1,        duration: 0.45 }, 2.7)
          .to(aboutB1Ref.current,    { opacity: 1, y: 0, duration: 0.55 }, 2.75)
          .to(aboutB2Ref.current,    { opacity: 1, y: 0, duration: 0.55 }, 2.9)
          .to(aboutLinkRef.current,  { opacity: 1, y: 0, duration: 0.55 }, 3.05);

        kills.push(() => { tl.scrollTrigger?.kill(); tl.kill(); });
      }

      /* ═══════════════════════════════════════════════════════════
         DIVIDER IMAGE — scale 0.6 → 1.0 (scrub), then text reveal
         ═══════════════════════════════════════════════════════════ */
      const divWrap = dividerWrapRef.current;
      if (divWrap && dividerImgRef.current && dividerLblRef.current && dividerTxtRef.current) {
        gsap.set(dividerImgRef.current, { scale: 0.6, transformOrigin: "center" });
        gsap.set(dividerLblRef.current, { opacity: 0 });
        gsap.set(dividerTxtRef.current, { opacity: 0, y: 50 });

        const divTl = gsap.timeline({
          scrollTrigger: {
            trigger: divWrap,
            start: "top 78%",
            end: "center 25%",
            scrub: 0.9,
          },
        });
        /* image scale first, then text sequentially */
        divTl
          .to(dividerImgRef.current, { scale: 1.0, duration: 1, ease: "none" })
          .to(dividerLblRef.current, { opacity: 1, duration: 0.35 }, 0.88)
          .to(dividerTxtRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.08);

        kills.push(() => { divTl.scrollTrigger?.kill(); divTl.kill(); });
      }

      /* ═══════════════════════════════════════════════════════════
         PRODUCT CARDS — individual ScrollTrigger per card
         Cards pre-hidden by useLayoutEffect (opacity:0, y:100px).
         Each card animates translateY 100px→0 + fade as it enters.
         ═══════════════════════════════════════════════════════════ */
      const cards = document.querySelectorAll<HTMLElement>("#products .product-card");
      if (cards.length > 0) {
        cards.forEach((c) => {
          c.style.transition = "";
          const tw = gsap.to(c, {
            y: 0, opacity: 1,
            duration: 0.85, ease: "power2.out",
            scrollTrigger: { trigger: c, start: "top 88%", once: true },
          });
          kills.push(() => tw.kill());
        });
      }

      await new Promise<void>((r) => setTimeout(r, 100));
      ScrollTrigger.refresh();
    };

    init();
    return () => kills.forEach((fn) => fn());
  }, []);

  /* ── Brand snap: wheel-driven beige panel + section overlap guard ── */
  useEffect(() => {
    const snapEl     = snapRef.current;
    const step1Text  = snapStep1TextRef.current;
    const beigePanel = snapBeigePanelRef.current;
    const svcEl      = snapServicesRef.current as HTMLElement | null;
    if (!snapEl || !step1Text || !beigePanel) return;

    /* Initial states */
    step1Text.style.opacity    = "0";
    step1Text.style.transform  = "translateY(30px)";
    step1Text.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)";

    beigePanel.style.transform  = "translateX(100%)";
    beigePanel.style.transition = "transform 0.8s cubic-bezier(0.76,0,0.24,1)";

    const philItems = beigePanel.querySelectorAll<HTMLElement>(".snap-phil-item");
    philItems.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(24px)"; });

    /* IO: step 1 text fades in when brand section enters outer viewport */
    const io1 = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      step1Text.style.opacity   = "1";
      step1Text.style.transform = "translateY(0)";
      io1.disconnect();
    }, { threshold: 0.3 });
    io1.observe(step1Text);

    /* Panel state */
    let panelOpen = false;
    let busy      = false;

    const openPanel = () => {
      panelOpen = true;
      beigePanel.style.transform = "translateX(0)";
      philItems.forEach((el, i) => {
        el.style.transition = `opacity 0.6s ease ${350 + i * 150}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${350 + i * 150}ms`;
        el.style.opacity = "1"; el.style.transform = "translateY(0)";
      });
    };
    const closePanel = () => {
      panelOpen = false;
      beigePanel.style.transform = "translateX(100%)";
      philItems.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(24px)"; });
    };

    /* Wheel handler on brand snap: controls panel + exit to services */
    const onSnapWheel = (e: WheelEvent) => {
      if (busy) { e.preventDefault(); return; }
      if (e.deltaY > 30) {
        e.preventDefault();
        if (!panelOpen) {
          busy = true; openPanel();
          /* panel slide-in takes 0.8s; release lock after 900ms */
          setTimeout(() => { busy = false; }, 900);
        } else if (svcEl) {
          busy = true;
          svcEl.scrollTop = 0; // reset to snap 1 so CTA section is never visible
          const top = svcEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
          setTimeout(() => {
            const corrected = svcEl!.getBoundingClientRect().top + window.scrollY;
            if (Math.abs(window.scrollY - corrected) > 2) window.scrollTo({ top: corrected });
            busy = false;
          }, 950);
        }
      } else if (e.deltaY < -30) {
        e.preventDefault();
        if (panelOpen) {
          busy = true; closePanel();
          setTimeout(() => { busy = false; }, 900);
        }
      }
    };
    snapEl.addEventListener("wheel", onSnapWheel, { passive: false });

    return () => {
      io1.disconnect();
      snapEl.removeEventListener("wheel", onSnapWheel);
    };
  }, []);

  /* ── Services snap: scroll-listener animations (reversible) ─── */
  useEffect(() => {
    const container = snapServicesRef.current as HTMLElement | null;

    /* Snap 1 title: IO on outer viewport (outer page scroll triggers this) */
    const titleEl = svcTitleRef.current;
    let titleIO: IntersectionObserver | null = null;
    if (titleEl) {
      titleEl.style.opacity    = "0";
      titleEl.style.transform  = "translateY(40px)";
      titleEl.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      titleIO = new IntersectionObserver(([e]) => {
        titleEl.style.opacity   = e.isIntersecting ? "1" : "0";
        titleEl.style.transform = e.isIntersecting ? "translateY(0)" : "translateY(40px)";
      }, { threshold: 0.2 });
      titleIO.observe(titleEl);
    }

    if (!container) return () => { titleIO?.disconnect(); };

    const pi = svcPlanImgRef.current;  // snap 2 right image
    const pt = svcPlanRef.current;     // snap 2 left text
    const ei = svcEsvcImgRef.current;  // snap 3 left image
    const et = svcEsvcRef.current;     // snap 3 right text

    /* Initial hidden states */
    if (pi) { pi.style.transform = "scale(1.8)"; pi.style.transition = "transform 1s cubic-bezier(0.16,1,0.3,1)"; }
    if (pt) { pt.style.opacity = "0"; pt.style.transform = "translateY(40px)"; pt.style.transition = "opacity 0.9s ease 1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1s"; }
    if (ei) { ei.style.opacity = "0"; ei.style.transform = "scale(0.5)"; ei.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)"; }
    if (et) { et.style.opacity = "0"; et.style.transform = "translateY(-40px)"; et.style.transition = "opacity 0.9s ease 0.7s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s"; }

    let inS2 = false;
    let inS3 = false;

    const onSvcScroll = () => {
      const vh = window.innerHeight;
      const st = container.scrollTop;
      const nowS2 = st > vh * 0.4;
      const nowS3 = st > vh * 1.4;

      /* Snap 2 transition */
      if (nowS2 !== inS2) {
        inS2 = nowS2;
        if (pi) pi.style.transform = inS2 ? "scale(1)" : "scale(1.8)";
        if (pt) {
          if (inS2) {
            /* forward: text slides up 1s after image starts */
            pt.style.transition = "opacity 0.9s ease 1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1s";
            pt.style.opacity = "1"; pt.style.transform = "translateY(0)";
          } else {
            /* reverse: quick reset, then restore delay for next play */
            pt.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)";
            pt.style.opacity = "0"; pt.style.transform = "translateY(40px)";
            setTimeout(() => { if (pt) pt.style.transition = "opacity 0.9s ease 1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 1s"; }, 450);
          }
        }
      }

      /* Snap 3 transition */
      if (nowS3 !== inS3) {
        inS3 = nowS3;
        if (ei) { ei.style.opacity = inS3 ? "1" : "0"; ei.style.transform = inS3 ? "scale(1)" : "scale(0.5)"; }
        if (et) {
          if (inS3) {
            et.style.transition = "opacity 0.9s ease 0.7s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s";
            et.style.opacity = "1"; et.style.transform = "translateY(0)";
          } else {
            et.style.transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)";
            et.style.opacity = "0"; et.style.transform = "translateY(-40px)";
            setTimeout(() => { if (et) et.style.transition = "opacity 0.9s ease 0.7s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s"; }, 450);
          }
        }
      }
    };

    container.addEventListener("scroll", onSvcScroll, { passive: true });

    /* Wheel-up at services snap 1 top → scroll back to brand section */
    const brandEl = snapRef.current as HTMLElement | null;
    let svcWheelBusy = false;
    const onSvcWheel = (e: WheelEvent) => {
      if (svcWheelBusy || !brandEl) return;
      if (e.deltaY >= -30) return;           // only upward flick
      if (container.scrollTop > 20) return;  // only when at snap 1 top
      e.preventDefault();
      svcWheelBusy = true;
      const top = brandEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { svcWheelBusy = false; }, 900);
    };
    container.addEventListener("wheel", onSvcWheel, { passive: false });

    return () => {
      titleIO?.disconnect();
      container.removeEventListener("scroll", onSvcScroll);
      container.removeEventListener("wheel", onSvcWheel);
    };
  }, []);

  /* ── Window wheel lock: brand/services 섹션에서 외부 스크롤 방지 ── */
  useEffect(() => {
    const brandEl = snapRef.current as HTMLElement | null;
    const svcEl   = snapServicesRef.current as HTMLElement | null;
    if (!brandEl || !svcEl) return;

    const absTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
    let snapping = false;

    const onWinWheel = (e: WheelEvent) => {
      const scrollY   = window.scrollY;
      const brandTop  = absTop(brandEl);
      const svcTop    = absTop(svcEl);
      const onBrand   = scrollY >= brandTop - 20 && scrollY <= brandTop + 20;
      const onSvc     = Math.abs(scrollY - svcTop)   <= 20;
      const between   = !onBrand && !onSvc && scrollY > brandTop + 20 && scrollY < svcTop - 20;

      /* 스냅 진행 중이면 무조건 기본 스크롤 차단 */
      if (snapping) { e.preventDefault(); return; }

      /* 두 섹션 사이 중간에 걸렸을 때 → 항상 brand로 복귀 (베이지 패널 시퀀스를 반드시 거치게) */
      if (between) {
        e.preventDefault();
        snapping = true;
        window.scrollTo({ top: brandTop, behavior: "smooth" });
        setTimeout(() => { snapping = false; }, 1000);
        return;
      }

      /* brand 섹션 위치인데 커서가 brand div 밖(예: nav) → brand 핸들러로 전달 */
      if (onBrand && !brandEl.contains(e.target as Node)) {
        e.preventDefault();
        brandEl.dispatchEvent(new WheelEvent("wheel", {
          deltaY: e.deltaY, deltaMode: e.deltaMode, bubbles: false, cancelable: true,
        }));
        return;
      }

      /* services 섹션 위치인데 커서가 services div 밖 → 방향에 따라 처리 */
      if (onSvc && !svcEl.contains(e.target as Node)) {
        e.preventDefault();
        if (e.deltaY < -30) {
          /* wheel-up: services 핸들러로 전달 (brand로 돌아가기) */
          svcEl.dispatchEvent(new WheelEvent("wheel", {
            deltaY: e.deltaY, deltaMode: e.deltaMode, bubbles: false, cancelable: true,
          }));
        } else if (e.deltaY > 30) {
          /* wheel-down: services 내부 다음 스냅으로 이동 */
          const vh      = window.innerHeight;
          const nextSnap = Math.min(Math.round(svcEl.scrollTop / vh) + 1, 2);
          svcEl.scrollTo({ top: nextSnap * vh, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("wheel", onWinWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWinWheel);
  }, []);

  return (
    /*
      IMPORTANT: Do NOT add overflow-x: hidden here.
      `overflow-x: hidden` implicitly sets `overflow-y: auto` which
      creates a new scroll container and BREAKS position: sticky.
      Overflow clipping is applied per-section instead.
    */
    <div className="bg-white text-zinc-900" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @keyframes v1-scrollbar { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
        @keyframes v1-word-in   { from{opacity:0;transform:translateY(110%)} to{opacity:1;transform:translateY(0)} }
        @keyframes v1-bounce    { 0%,100%{transform:translateY(0) rotate(90deg)} 50%{transform:translateY(5px) rotate(90deg)} }

        .v1-scrollbar  { animation: v1-scrollbar 2.2s cubic-bezier(0.4,0,0.2,1) infinite; }
        .v1-bounce-txt { animation: v1-bounce 1.8s ease-in-out infinite; display:inline-block; }
        .v1-word       { display:inline-block; animation: v1-word-in 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .product-card { transition: box-shadow 0.55s ease; }
        .product-card:hover { box-shadow: 0 28px 64px rgba(0,0,0,0.12); }
        .product-card:hover .product-img { transform: scale(1.06); }
        .product-card .card-text { transition: transform 0.5s cubic-bezier(0.25,1,0.5,1); }
        .product-card:hover .card-text { transform: translateY(-4px); }

        .value-row:hover .value-num { color: #18181b; }

        /* ── Fix 1: 제품 라인 섹션 50:50 모바일 ── */
        @media (max-width: 768px) {
          .v1-prod-row { gap: 0.75rem !important; }
          .v1-prod-left { width: 50% !important; overflow: hidden !important; flex-shrink: 0 !important; }
          .v1-prod-right { width: 50% !important; overflow: hidden !important; min-width: 0 !important; }
          .v1-prod-right .card-text { padding: 6px 5px !important; }
          .v1-prod-right .card-text h3 { font-size: 10px !important; line-height: 1.3 !important; margin-bottom: 2px !important; }
          .v1-prod-right .card-text p { font-size: 8px !important; line-height: 1.4 !important; }
          .v1-prod-right .card-text span { font-size: 7px !important; letter-spacing: 0.1em !important; }
        }

        /* ── Fix 3: 터치 스크롤 정상 작동 ── */
        .v1-brand-section { touch-action: pan-y; }
        .v1-services-section { touch-action: pan-y; overflow-y: scroll; }

        /* ── 홈 서비스 스냅 이미지 모바일 정사각형 ── */
        @media (max-width: 768px) {
          .v1-svc-snap-panel {
            display: flex !important;
            flex-direction: column !important;
          }
          .v1-svc-plan-img-wrap {
            position: relative !important;
            width: 100% !important;
            aspect-ratio: 1 / 1 !important;
            height: auto !important;
            overflow: hidden !important;
            flex-shrink: 0 !important;
          }
          .v1-svc-plan-img-wrap img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }
          .v1-svc-esvc-img-wrap {
            width: 100% !important;
            aspect-ratio: 1 / 1 !important;
            height: auto !important;
            padding: 0 !important;
            overflow: hidden !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: stretch !important;
          }
          .v1-svc-esvc-img-wrap img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO + BRAND TRANSITION
          Outer 400vh container provides scroll space.
          Inner 100vh sticky section holds all animation layers.
          ScrollTrigger scrubs the GSAP timeline through 3 phases.
      ══════════════════════════════════════════════════════════════ */}
      <div ref={transitionOuterRef} style={{ position: "relative", zIndex: 10 }}>
        <div style={{ height: "400vh" }}>
          <section
            ref={heroPinRef}
            style={{
              position: "sticky", top: 0,
              height: "100vh", minHeight: 600,
              overflow: "hidden",
              backgroundColor: "#09090b",
            }}
          >
            {/* ── Layer A: Hero background image (scale 1 → 0.85) ── */}
            <div
              ref={heroLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "center" }}
            >
              <img
                src={`${BASE}/images/560/258/4215000/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`}
                alt="blum hero"
                className="w-full h-full object-cover"
                style={{ opacity: 0.42 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #09090b 32%, rgba(9,9,11,0.55) 65%, rgba(9,9,11,0.15) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(9,9,11,0.65) 0%, transparent 55%)" }} />
            </div>

            {/* ── Layer B: Masonry grid of 9 images (phase 1) ── */}
            <div
              ref={gridLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.9fr 0.95fr",
                gridTemplateRows: "repeat(10, 1fr)",
                height: "100%",
                gap: "22px",
                padding: "22px",
              }}>
                {/* col 1, rows 1-5 — tall portrait */}
                <img ref={g1Ref} src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`} alt="blum 01" style={{ gridColumn: "1", gridRow: "1 / 6", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 1-3 — medium portrait */}
                <img ref={g2Ref} src={`${BASE}/images/560/258/4210767/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96878552_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="blum 02" style={{ gridColumn: "2", gridRow: "1 / 4", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 1-4 — taller portrait */}
                <img ref={g3Ref} src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`} alt="blum 03" style={{ gridColumn: "3", gridRow: "1 / 5", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 4-7 — medium */}
                <img ref={g4Ref} src={`${BASE}/images/560/258/4215047/corporate/media/bilder/produkte/klappensysteme/aventos-hki/Blum-AVENTOS-HKi-ME44188536_4:3.jpg`} alt="blum 04" style={{ gridColumn: "2", gridRow: "4 / 8", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 5-7 — medium */}
                <img ref={g5Ref} src={`${BASE}/images/560/258/4207901/corporate/media/bilder/produkte/klappensysteme/aventos-top/kla1119_mc_4:3.jpg`} alt="blum 05" style={{ gridColumn: "3", gridRow: "5 / 8", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 1, rows 6-10 — tall portrait */}
                <img ref={g6Ref} src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`} alt="blum 06" style={{ gridColumn: "1", gridRow: "6 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 2, rows 8-10 — bottom middle */}
                <img ref={g7Ref} src={`${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`} alt="blum 07" style={{ gridColumn: "2", gridRow: "8 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, rows 8-9 — small */}
                <img ref={g8Ref} src={`${BASE}/images/560/258/4207766/corporate/media/bilder/produkte/klappensysteme/aventos-top/me96565125_aa_fot_fo_bau_-sall_-amc_-v1_4:3.jpg`} alt="blum 08" style={{ gridColumn: "3", gridRow: "8 / 10", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                {/* col 3, row 10 — small */}
                <img ref={g9Ref} src={`${BASE}/images/560/258/4215892/corporate/media/bilder/produkte/boxsysteme/lbx0458_ab_fot_fo_bau_-sall_-apr6i_-v1_4:3.jpg`} alt="blum 09" style={{ gridColumn: "3", gridRow: "10 / 11", width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>

            {/* ── Layer C: Spotlight — g1 image, expands from grid cell → fullscreen ── */}
            {/* GSAP animates top/left/width/height from g1's bounding rect to 0/0/100%/100% */}
            <div
              ref={spotlightRef}
              style={{ position: "absolute", zIndex: 3, overflow: "hidden" }}
            >
              <img
                src={`${BASE}/images/560/258/4214766/corporate/media/bilder/unternehmen/ME177281_AA_FOT_FO_BAU_-SALL_-AMC_-V1_4:3.jpg`}
                alt="blum factory"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.backgroundColor = "#1a1a1a"; }}
              />
              {/* Dark overlay fades in as spotlight expands */}
              <div ref={spotlightOverRef} style={{ position: "absolute", inset: 0, backgroundColor: "#000000" }} />
            </div>

            {/* ── Layer D: Text overlay (phase 3) ── */}
            <div
              ref={aboutLayerRef}
              style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center" }}
            >
              <div className="max-w-7xl mx-auto px-8 w-full">
                <p ref={aboutLblRef} style={{ fontSize: "9px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
                  About Blum
                </p>
                <h2
                  ref={aboutH2Ref}
                  style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", fontWeight: 200, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#ffffff", marginBottom: "1.5rem" }}
                >
                  가구의 움직임을<br />재정의합니다
                </h2>
                <div ref={aboutLineRef} style={{ width: "2.5rem", height: "1px", backgroundColor: "rgba(255,255,255,0.25)", marginBottom: "2rem" }} />
                <p ref={aboutB1Ref} style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 2, fontWeight: 300, maxWidth: "28rem", marginBottom: "1rem" }}>
                  1952년 오스트리아 포어알베르크에서 시작된 blum은 현재 전 세계 120개국에서 사용되는 프리미엄 가구 피팅 제조사입니다.
                </p>
                <p ref={aboutB2Ref} style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 2, fontWeight: 300, maxWidth: "28rem", marginBottom: "3rem" }}>
                  힌지, 서랍, 리프트 시스템을 통해 매일 수백만 명의 일상을 더 편리하고 아름답게 만들고 있습니다.
                </p>
                <Link
                  ref={aboutLinkRef}
                  href="/v1/company"
                  className="group"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  브랜드 스토리
                  <span style={{ display: "inline-block", transition: "transform 0.3s" }} className="group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* ── "moving / ideas." hero text (fades out in phase 1) ── */}
            <div
              ref={heroTextRef}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}
              className="max-w-7xl mx-auto px-8 pb-20 w-full"
            >
              <h1 className="text-white select-none" style={{
                fontSize: "clamp(3.5rem, 11vw, 10rem)",
                fontWeight: 200,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}>
                <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
                  <span className="v1-word" style={{ animationDelay: "220ms" }}>moving</span>
                </span>
                <br />
                <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
                  <span className="v1-word" style={{ color: "rgba(161,161,170,0.85)", fontStyle: "italic", animationDelay: "380ms" }}>ideas.</span>
                </span>
              </h1>
            </div>

            {/* ── Scroll indicator ── */}
            <div ref={scrollIndicRef} className="absolute bottom-8 right-8 flex flex-col items-center gap-3" style={{ zIndex: 5 }}>
              <span className="v1-bounce-txt text-[8px] tracking-[0.4em] uppercase text-white/25 origin-center mb-2" style={{ writingMode: "vertical-rl" }}>scroll</span>
              <div className="w-px h-14 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <div className="w-full bg-white/50 absolute top-0 v1-scrollbar" style={{ height: "45%" }} />
              </div>
            </div>

          </section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — ALL REMAINING CONTENT
          position: relative + z-index: 30 ensures this block renders
          on top of both sticky sections as it scrolls into view.
          overflow-x: hidden is safe here (not an ancestor of sticky).
      ══════════════════════════════════════════════════════════════ */}
      {/*
        overflow-x: hidden을 이 wrapper에 두면 overflow-y가 auto로 강제되어
        새 스크롤 컨테이너가 생성되고 position: sticky 가 동작하지 않는다.
        대신 overflow-x 클리핑이 필요한 각 섹션에 직접 적용한다.
      */}
      <div style={{ position: "relative", zIndex: 30, backgroundColor: "#ffffff" }}>

        {/* ── MARQUEE ── */}
        <div className="overflow-hidden border-b border-zinc-100 py-4 bg-white">
          <div className="v1-ticker flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[10px] tracking-[0.35em] uppercase text-zinc-300 pr-16">
                CLIP top · AVENTOS · LEGRABOX · TIP-ON · MOVENTO · REVEGO · BLUMOTION · SINCE 1952 ·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <StatsSection />

        {/* ── DIVIDER IMAGE ── */}
        {/* GSAP: dividerImgRef (scaling wrapper) scale 0.6→1, then text reveal */}
        <div ref={dividerWrapRef}>
          <div className="relative w-full" style={{ height: "clamp(280px, 45vw, 600px)", overflow: "hidden" }}>
            {/* Scaling wrapper — image + gradient scale together */}
            <div ref={dividerImgRef} style={{ position: "absolute", inset: 0, transformOrigin: "center", willChange: "transform" }}>
              <img
                src={`${BASE}/images/560/336/4195996/corporate/media/bilder/unternehmen/img2630_aa_fot_fo_bau_-sall_-am_-v1_5:3.jpg`}
                alt="blum workspace"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 50%)" }} />
            </div>
            {/* Text layer — NOT scaled, reveals after image */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <p ref={dividerLblRef} className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Since 1952</p>
                <p ref={dividerTxtRef} className="text-2xl md:text-4xl font-extralight text-zinc-900 leading-snug max-w-xs" style={{ letterSpacing: "-0.01em" }}>
                  오스트리아 정밀<br />제조의 전통
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        <ProductSection />

        {/* ══════════════════════════════════════════════════════════════
            BRAND SECTION  (단일 100vh, beige panel = absolute 오버레이)
            이미지 + 텍스트 위에 beige 패널이 오른쪽에서 슬라이드인
            wheel-down: 패널 열기 → 한 번 더 → services 이동
            wheel-up:   패널 닫기
        ══════════════════════════════════════════════════════════════ */}
        <div
          ref={snapRef}
          className="v1-brand-section"
          style={{ height: "100vh", position: "relative", overflow: "hidden" }}
        >
          {/* 배경 이미지 */}
          <img
            src={`${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`}
            alt="blum showcase"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4213161/corporate/media/bilder/produkte/bewegungstechnologien/blum_box1596_aa_fot_fo_bau_-sall_-aof4_-v1_4:3.jpg`; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9,9,11,0.68) 0%, rgba(9,9,11,0.18) 65%)" }} />

          {/* 텍스트 오버레이 */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
            <div ref={snapStep1TextRef} className="max-w-7xl mx-auto px-8 pb-16 w-full">
              <p className="text-[9px] tracking-[0.45em] uppercase text-white/40 mb-4">Brand Showcase</p>
              <p className="text-white font-extralight leading-tight" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "-0.02em" }}>
                세계가 인정한<br />오스트리아의 기술
              </p>
              <div className="mt-6">
                <Link
                  href="/v1/company"
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  브랜드 알아보기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 베이지 패널: absolute 오버레이, 오른쪽에서 슬라이드인 */}
          <div
            ref={snapBeigePanelRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#F5F0E8",
              overflowY: "auto",
              scrollbarWidth: "none",
            } as React.CSSProperties}
            className="[&::-webkit-scrollbar]:hidden"
          >
            <div className="px-12 py-20">
              <p className="snap-phil-item text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Our Philosophy</p>
              <h2 className="snap-phil-item text-3xl md:text-4xl font-extralight mb-5" style={{ letterSpacing: "-0.02em" }}>
                blum이 추구하는 것
              </h2>
              <div className="snap-phil-item w-10 h-px bg-zinc-300 mb-6" />
              {VALUES.map((v, i) => (
                <div
                  key={v.num}
                  className="snap-phil-item value-row border-t border-zinc-200 group cursor-pointer"
                  onClick={() => setOpenValue(openValue === i ? null : i)}
                >
                  <div className="py-6 grid grid-cols-12 gap-4 items-start">
                    <span className="col-span-2 text-[9px] text-zinc-300 tracking-widest transition-colors group-hover:text-zinc-500 mt-1">{v.num}</span>
                    <div className="col-span-8">
                      <h3 className="text-lg md:text-xl font-light text-zinc-700 group-hover:text-zinc-500 transition-colors">{v.title}</h3>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-zinc-300 text-sm group-hover:text-zinc-500 transition-colors inline-block">{openValue === i ? "−" : "+"}</span>
                    </div>
                  </div>
                  <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openValue === i ? "200px" : "0px", opacity: openValue === i ? 1 : 0 }}>
                    <p className="text-sm text-zinc-500 leading-relaxed pb-6 pl-8" style={{ fontWeight: 300 }}>{v.body}</p>
                  </div>
                </div>
              ))}
              <div className="snap-phil-item border-t border-zinc-200" />
            </div>
          </div>
        </div>{/* end brand section */}

        {/* ══════════════════════════════════════════════════════════════
            SERVICES SNAP SEQUENCE  (CSS scroll-snap, 3 × 100vh)
            Snap 1: 서비스 제목 (IO 슬라이드 업 / 역방향)
            Snap 2: 계획/설계 콘텐츠 (좌: IO 슬라이드 업 / 역방향, 우: scale 1.8→1 / 역방향)
            Snap 3: E-Services (좌: scale 0.5→1 / 역방향, 우: 슬라이드 다운 0.7s 딜레이 / 역방향)
        ══════════════════════════════════════════════════════════════ */}
        <section
          ref={snapServicesRef}
          style={{
            height: "100vh",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
            touchAction: "pan-y",
          } as React.CSSProperties}
          className="[&::-webkit-scrollbar]:hidden v1-services-section"
        >

          {/* ── Snap 1: 서비스 제목 ── */}
          <div style={{ height: "100vh", scrollSnapAlign: "start", display: "flex", alignItems: "center", backgroundColor: "#ffffff" }}>
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div ref={svcTitleRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-5">Services</p>
                <h2 className="font-extralight text-zinc-900 leading-tight" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em" }}>
                  전문 서비스<br />지원
                </h2>
                <div className="w-12 h-px bg-zinc-200 mt-8 mb-6" />
                <p className="text-sm text-zinc-400 max-w-md leading-7" style={{ fontWeight: 300 }}>
                  계획·설계부터 디지털 서비스까지,<br />blum의 전문 서비스가 함께합니다.
                </p>
              </div>
            </div>
          </div>

          {/* ── Snap 2: 계획/설계 콘텐츠 ── */}
          {/* 우측 이미지: scale(1.8)→scale(1) 축소 효과 (overflow:hidden 으로 클리핑) */}
          <div className="v1-svc-snap-panel" style={{ height: "100vh", scrollSnapAlign: "start", display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#ffffff" }}>
            {/* 좌: 텍스트 슬라이드 업 */}
            <div style={{ display: "flex", alignItems: "center", padding: "0 5vw" }}>
              <div ref={svcPlanRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">Plan &amp; Design</p>
                <h3 className="text-3xl md:text-4xl font-extralight text-zinc-900 mb-6" style={{ letterSpacing: "-0.02em" }}>
                  계획/설계<br />지원
                </h3>
                <div className="w-8 h-px bg-zinc-300 mb-6" />
                <p className="text-sm text-zinc-500 leading-7 mb-8 max-w-sm" style={{ fontWeight: 300 }}>
                  공간에 최적화된 blum 솔루션을 함께 설계합니다. 전문 컨설턴트가 처음부터 끝까지 함께합니다.
                </p>
                <ul className="flex flex-col gap-3">
                  {["3D 계획 도구 지원", "맞춤형 공간 설계", "전문 컨설팅 서비스", "설치 전 시뮬레이션"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-zinc-500 tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/v1/services" className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group" style={{ textDecoration: "none" }}>
                    자세히 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* 우: 이미지 — overflow:hidden 으로 scale 클리핑 */}
            <div className="v1-svc-plan-img-wrap" style={{ position: "relative", overflow: "hidden" }}>
              <img
                ref={svcPlanImgRef}
                src={`${BASE}/images/560/420/4207482/corporate/media/bilder/services/services-overview/technischer_support_w2_220916_4927_enlarged_4:3.jpg`}
                alt="계획/설계 지원"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: "center" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
              />
            </div>
          </div>

          {/* ── Snap 3: E-Services ── */}
          <div className="v1-svc-snap-panel" style={{ height: "100vh", scrollSnapAlign: "start", display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#ffffff" }}>
            {/* 좌: 이미지 scale 0.5→1 */}
            <div className="v1-svc-esvc-img-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "40px" }}>
              <img
                ref={svcEsvcImgRef}
                src={`${BASE}/images/560/420/4207498/corporate/media/bilder/services/services-overview/me19632151_all_src_4:3.jpg`}
                alt="E-Services"
                style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: "center" }}
                onError={(e) => { (e.target as HTMLImageElement).src = `${BASE}/images/560/258/4214413/corporate/media/bilder/services/services-overview/keyvisual-services_4:3.jpg`; }}
              />
            </div>
            {/* 우: 텍스트 슬라이드 다운 (0.7s 딜레이) */}
            <div style={{ display: "flex", alignItems: "center", padding: "0 5vw" }}>
              <div ref={svcEsvcRef}>
                <p className="text-[9px] tracking-[0.45em] uppercase text-zinc-400 mb-4">E-Services</p>
                <h3 className="text-3xl md:text-4xl font-extralight text-zinc-900 mb-6" style={{ letterSpacing: "-0.02em" }}>
                  디지털<br />서비스
                </h3>
                <div className="w-8 h-px bg-zinc-300 mb-6" />
                <p className="text-sm text-zinc-500 leading-7 mb-8 max-w-sm" style={{ fontWeight: 300 }}>
                  언제 어디서든 접근 가능한 blum의 디지털 플랫폼. 제품 선택부터 주문까지 한 곳에서 해결합니다.
                </p>
                <ul className="flex flex-col gap-3">
                  {["온라인 주문 시스템", "제품 카탈로그 다운로드", "CAD 데이터 제공", "기술 지원 채널"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs text-zinc-500 tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/v1/services" className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors group" style={{ textDecoration: "none" }}>
                    자세히 보기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ── CTA ── */}
        <CtaSection />

        {/* ── FOOTER STRIP ── */}
        <div className="border-t border-zinc-100 bg-white py-8">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400 tracking-wider" style={{ fontWeight: 300 }}>Julius Blum GmbH · Industriestrasse 1 · 6973 Höchst, Austria</p>
            <div className="flex gap-8">
              {[["V1", "/v1"], ["V2", "/v2"], ["V3", "/v3"]].map(([l, h]) => (
                <Link key={l} href={h} className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 hover:text-zinc-700 transition-colors" style={{ textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>

      </div>{/* end z-30 wrapper */}

      <BlumGSAP version="v1" />
    </div>
  );
}
