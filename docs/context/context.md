# StyleShop 프로젝트 컨텍스트

## 1. 프로젝트 개요

### StyleShop이란?

StyleShop은 Next.js 15 기반의 패션 이커머스 데모 사이트이다. 상품 브라우징, 장바구니, 결제까지 전체 쇼핑 플로우를 갖추고 있으며, Amplitude 애널리틱스가 통합되어 있다.

### 이 리포지토리의 존재 이유

**StyleShop은 독립적인 프로젝트가 아니다.** [Pulse AI](https://github.com/v6x/pulse-ai) 프로젝트의 E2E 데모 및 핵심 기능 검증을 위한 타겟 리포지토리로 존재한다.

Pulse AI의 세 가지 핵심 기능(Event Context System, Prompt-Driven Event Updates, Auto-Heal)을 실제 프로덕션 환경에서 시연하기 위해, 의도적으로 설계된 이벤트 트래킹 코드(정상/고장/레거시)를 포함하고 있다.

### 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| 언어 | TypeScript 5 |
| 애널리틱스 | Amplitude (`@amplitude/analytics-browser` v2.11) |
| 배포 | Vercel (main 브랜치 자동 배포) |
| 패키지 매니저 | npm |

---

## 2. Pulse AI 소개

### Pulse AI란?

Pulse AI는 B2B SaaS **"Event Intelligence Layer"** 플랫폼이다. Amplitude, Mixpanel 같은 기존 애널리틱스 도구 위에서 동작하며, PM이 개발자 도움 없이 이벤트 트래킹을 관리할 수 있게 해준다.

### 해결하는 문제

- **계측 병목**: PM이 이벤트 추가/수정을 위해 개발자를 2~3주 기다려야 하는 문제
- **데이터 고고학**: 레거시 이벤트(`btn_v1`, `submit_final` 등)의 원래 의도가 소실되는 문제
- **컨텍스트 부패**: 코드 변경으로 트래킹이 깨지면서 데이터 신뢰성이 하락하는 문제

### 3대 핵심 기능

1. **Event Context System** (이벤트 컨텍스트 시스템)
   - 모든 이벤트의 의도(intent), 이력(lineage), 코드 위치, 속성 스키마, 관계를 AI가 관리하는 살아있는 지식 베이스
   - Amplitude API + GitHub 코드 분석 + 런타임 메타데이터를 결합하여 구축

2. **Prompt-Driven Event Updates** (프롬프트 기반 이벤트 업데이트)
   - PM이 자연어로 이벤트 변경을 요청하면, AI가 코드를 분석하고 Draft PR을 자동 생성
   - 예: "click_buy_now에 price, product_name 속성을 추가해줘" → 코드 변경 → PR 생성

3. **Auto-Heal** (자동 복구)
   - Git webhook으로 코드 변경을 감지하고, 이벤트 트래킹에 영향이 있으면 자동으로 EventContext를 업데이트
   - 신뢰도 기반(≥0.8) 자동 복구: 이름 변경 → alias 갱신, 코드 이동 → 위치 참조 갱신

---

## 3. 통합 아키텍처

### 연결 구조

```
┌──────────────────────────────────────────────────┐
│  StyleShop (v6x/styleshop)                       │
│  - 11개 Amplitude 이벤트                          │
│  - Next.js 15 + Vercel 자동 배포                   │
└─────────┬──────────────────────────┬─────────────┘
          │                          │
    GitHub API                 Amplitude API
   (코드 읽기/PR 생성)           (이벤트 데이터 읽기)
          │                          │
┌─────────┴──────────────────────────┴─────────────┐
│  Pulse AI (v6x/pulse-ai)                         │
│  - Event Context System 구축                      │
│  - Prompt-Driven PR 생성                          │
│  - Auto-Heal 감지/복구                             │
│  - Gemini 2.5 Flash (LLM)                        │
│  - Supabase PostgreSQL (17개 테이블)               │
└──────────────────────────────────────────────────┘
```

### 데모 플로우

1. PM이 Pulse AI 데모 페이지(`/demo`)에서 자연어로 이벤트 변경 요청
2. Pulse AI가 GitHub API를 통해 StyleShop 코드를 분석
3. LLM이 코드 변경 사항을 생성하고 Draft PR을 자동 생성
4. Vercel이 PR에 대해 Preview URL을 자동 생성
5. PM이 Preview에서 변경 사항을 확인
6. PR merge 시 Vercel이 Production에 자동 배포
7. 실제 Amplitude 이벤트가 변경된 상태로 발생

---

## 4. 이벤트 설계 전략

StyleShop의 11개 이벤트는 Pulse AI의 각 기능을 검증하기 위해 **의도적으로 3가지 카테고리**로 설계되어 있다.

### 정상 이벤트 (5개)

Event Context System의 정확한 컨텍스트 구축을 검증한다.

| 이벤트 | 위치 | 설명 |
|--------|------|------|
| `page_viewed` | `src/lib/analytics/page-tracker.ts` | 페이지 이동 시 경로/제목 추적 |
| `product_viewed` | `src/app/products/[id]/page.tsx` | 상품 상세 페이지 조회 |
| `add_to_cart` | `src/components/add-to-cart-button.tsx` | 장바구니 추가 |
| `purchase_complete` | `src/app/checkout/page.tsx` | 주문 완료 |
| `search_executed` | `src/app/products/page.tsx` | 상품 검색 실행 |

### 고장 이벤트 (3개)

Auto-Heal과 Prompt-Driven Updates의 수정 능력을 검증한다.

| 이벤트 | 위치 | 의도적 결함 |
|--------|------|-------------|
| `click_buy_now` | `src/components/buy-now-button.tsx` | `price`, `product_name`, `source` 속성 누락 |
| `promo_banner_click` | `src/components/promo-banner.tsx` | `discount_percentage` 속성 누락 |
| `cart_abandon` | `src/app/cart/page.tsx` | `setInterval` cleanup 없음 → 3~5회 중복 발생 |

### 레거시 이벤트 (3개)

데이터 고고학(Data Archaeology) 기능을 검증한다.

| 이벤트 | 위치 | 의도적 결함 |
|--------|------|-------------|
| `apply_coupon` | `src/components/coupon-input.tsx` | 정상 버전 |
| `coupon_applied` | `src/app/checkout/page.tsx` | `apply_coupon`과 중복 (같은 동작, 다른 이름) |
| `evt_purchase` | `src/lib/analytics/track.ts` | `purchase_complete`와 중복 (축약된 속성명: `oid`, `amt`, `cnt`) |

---

## 5. 개발 시 주의사항

### 의도적 버그를 수정하지 말 것

고장 이벤트와 레거시 이벤트의 결함은 **Pulse AI 테스트를 위해 의도적으로 포함**된 것이다. 이를 임의로 수정하면 Pulse AI 데모가 정상 동작하지 않는다. 수정이 필요한 경우 Pulse AI 데모를 통해 PR을 생성하는 방식으로 진행한다.

### 이벤트 변경 시 영향 범위 고려

이벤트를 추가/수정/삭제할 경우, Pulse AI의 다음 요소에 영향을 미친다:
- **Event Context System**: Amplitude에서 읽어온 이벤트 메타데이터
- **데모 시스템 프롬프트**: `pulse-ai/src/lib/demo/system-prompt.ts`에 하드코딩된 이벤트 정보
- **Amplitude 대시보드**: 실제 프로덕션 이벤트 데이터

### 환경 변수

- `NEXT_PUBLIC_AMPLITUDE_API_KEY`: Amplitude API 키 (Vercel 환경변수에 설정)
- Vercel 프로젝트와 연결되어 있으며, main 브랜치 push 시 자동 배포됨

### 관련 프로젝트 참조

- **Pulse AI 리포지토리**: `https://github.com/v6x/pulse-ai`
- **Pulse AI 문서**: `pulse-ai/docs/` (product.md, architecture.md, schema.md, milestones.md)
- **데모 관련 문서**: `pulse-ai/docs/task-plans/demo-site/summary.md`, `styleshop-repo.md`
