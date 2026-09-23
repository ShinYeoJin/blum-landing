# blum Landing Page

## ✨ 주요 구현 기능

### 공통
- 반응형 디자인 (모바일 / 태블릿 / 데스크탑)
- 햄버거 메뉴 (모바일)
- 페이지 이동 시 스크롤 최상단 복귀

### V1 - 미니멀/모던
- Hero → Brand 섹션 GSAP ScrollTrigger 전환 애니메이션 (400vh scrub)
- Brand 섹션 wheel/touch 기반 snap 시퀀스 (베이지 패널 열림 → Services 진입)
- Services 섹션 scroll-snap 3단 패널 (title / 계획·설계 / E-Services)
- 서비스 이미지 scale·텍스트 fade-in 스크롤 애니메이션
- 3단계 제품 카드 애니메이션
- 서비스 hover 확장 애니메이션
- 아코디언 메뉴

### V2 - 볼드/블랙+레드
- Sticky 스크롤 기반 제품 카드 3D flip 애니메이션 (랜덤 방향)
- 스택 구조 서비스 섹션 (섹션이 위로 쌓이는 방식)
- 카드 갤러리 확대/축소 전환 애니메이션
- 숫자 카운트업 애니메이션
- 버튼 hover 텍스트 교체 효과

### V3 - 시네마틱/딥네이비+골드
- 시네마틱 풀스크린 스크롤 스토리텔링
- 제품 슬라이드 드래그 인터랙션
- 서비스 섹션 배경 오버레이 텍스트
- 숫자 스크롤 단계별 등장 애니메이션

## 🚀 로컬 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000) 접속

## 📋 버전 히스토리

### v0.3.0 — 2026-09-23

#### V2 버그 수정
- `app/v2/layout.tsx`가 V3Nav/V3Footer를 잘못 참조하던 문제 수정
- V2 전용 `V2Nav` / `V2Footer` 컴포넌트 신규 생성
- 이로 인해 V2의 Products / Services / Company / Contact 라우팅 전부 정상화

#### V1 모바일 개선
- **서비스 섹션 snap 2/3 이미지·텍스트 레이아웃**: 모바일에서 이미지를 배경으로, 텍스트를 오버레이로 재배치 (dark gradient 포함)
- **brand → services 전환 스크롤 충돌 수정**: `toServiceRef` 플래그로 `between` 가드와의 피드백 루프 차단
- **snap 3 → CTA 섹션 진입 불가 수정**: `atLastSnap` 조건에서 `window.scrollTo`로 명시적 전환
- **연속 스크롤 시 snap 단계 건너뜀 수정**: `snapping` 락(600ms)으로 중복 호출 차단
- **모바일 네비게이션 "문의하기" 링크 수정**: `/contact` → `/v1/contact`
- **모바일 터치 스크롤 부분 지원**: brand~services 구간 touch swipe로 섹션 전환 가능
- **데스크탑 그라디언트 오버레이 노출 수정**: gradient div를 CSS class(`display: none` 기본값)로 전환

#### 알려진 제약사항 (V1 모바일)
- 서비스 섹션 snap 2/3의 이미지 위 텍스트 오버레이는 **모바일에서 표시되지 않음**
  - 원인: JS 애니메이션(`opacity: 0` 인라인 스타일)이 모바일에서도 실행되어 CSS로 재정의 불가
  - 향후 개선 방향: 모바일 분기(`isMobile`) 처리 또는 Intersection Observer 기반 대안 검토 예정
- 터치 스와이프로 brand 베이지 패널 열기 및 서비스 진입이 **일부 케이스에서 불안정**할 수 있음
  - wheel 이벤트 dispatch 방식의 한계로 인한 구조적 제약

---

### v0.2.0 — 이전

- V1 / V2 / V3 초기 구현
- GSAP ScrollTrigger 기반 Hero → Brand 전환
- 각 버전별 제품·서비스·회사 소개·문의 페이지 구성
- 공통 컴포넌트 분리 (StatsSection, ProductSection, CtaSection 등)

## 📌 참고 사항

- 모든 콘텐츠(텍스트, 이미지)는 [blum 공식 사이트](https://www.blum.com/kr/ko/)를 참고하여 제작
- 상업적 목적이 아닌 포트폴리오 용도로 제작된 프로젝트입니다
