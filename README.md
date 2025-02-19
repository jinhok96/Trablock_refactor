# ✈️ Trablock

![Version](https://img.shields.io/badge/version-1.0.7.3-blue) ![Vercel](https://vercelbadge.vercel.app/api/jinhok96/trablock)

<p align="center"><img src = "https://github.com/user-attachments/assets/99672beb-659d-43f8-9501-1b58826d4660" width="100%"></p>
여행 계획을 쉽고 편하게 작성하고 공유할 수 있는 웹 플랫폼입니다.<br>

<br>

## 🚀 Live Demo

[https://www.trablock.site](https://www.trablock.site)

<br>

## ⏰ Project Timeline

> 팀 개발 기간: 2024.05.28 ~ 2024.06.25  
> 리팩토링 기간: 2024.07.04 ~ 2025.02.15

- FE 5명, BE 2명, DE 1명으로 구성된 팀으로 진행했던 프로젝트를 리팩토링했습니다.
- 기획부터 완성까지 모든 단계를 재검토하며 FE 1명, BE 1명으로 진행했습니다.
- [FE(이전 팀) Github Repository](https://github.com/TravelLaboratory/frontend)
- [BE Github Repository](https://github.com/TravelLaboratory/travel-laboratory-was)

<br>

## ✨ Core Features

### 여행 계획 작성

- 장소를 검색해서 일정 추가
- 드래그 앤 드롭으로 일정 순서 변경
- 일정별 방문 시간, 소요 시간, 메모, 비용 작성
- 구글맵 지도에 날짜별 일정 위치 및 동선 표시

### 여행 계획 조회

- 다른 사용자의 여행 계획 북마크
- 여행 계획 링크 & 카카오톡 공유

### 여행 계획 검색

- 도시별 여행 계획 검색
- 검색 결과 최신순, 인기순 정렬

### 사용자 인증

- JWT 토큰 인증 방식
- 카카오 OAuth 연동

### 사용자 경험

- 반응형 디자인
- 모바일 브라우저 및 터치 동작 고려

<br>

## 🛠 Tech Stack

### Core

<div>
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react&logoColor=#61DAFB">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

### State Management & Data Fetching

<div>
  <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
</div>

### Styling

<div>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white">
</div>

### Form & UI Components

<div>
  <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/react modal-61DAFB?style=for-the-badge&logo=react&logoColor=white">
</div>

### Maps & Location

<div>
  <img src="https://img.shields.io/badge/google maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white">
</div>

### OAuth & Social

<div>
  <img src="https://img.shields.io/badge/kakao js sdk-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">
</div>

### Utilities

<div>
  <img src="https://img.shields.io/badge/lodash-3492FF?style=for-the-badge&logo=lodash&logoColor=white">
  <img src="https://img.shields.io/badge/sharp-99CC00?style=for-the-badge&logo=sharp&logoColor=white">
</div>

### Development Tools

<div>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
  <img src="https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=husky&logoColor=white">
</div>

### Deployment

<div>
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

### Communication

<div>
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
  <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>

<br>

## 📂 Project Structure

```
├── public/                           # 정적 파일 (폰트, 아이콘, 이미지)
│   ├── fonts/                        # 웹 폰트
│   ├── icons/                        # SVG 아이콘
│   └── images/                       # 정적 이미지
│
└── src/
    ├── apis/                         # API 통합
    │   ├── constants/                # API 공통 상수
    │   ├── providers/                # React Query Provider
    │   ├── services/                 # API 서비스 모듈
    │   ├── types/                    # API 공통 타입 정의
    │   └── utils/                    # API 공통 유틸리티 함수
    │
    ├── app/                          # Next.js App Router
    │   ├── (auth)/                   # 인증 관련 레이아웃 (로그인, 회원가입, 비밀번호 찾기)
    │   ├── (main)/                   # 메인 레이아웃
    │   ├── (focused)/                # 콘텐츠에 집중된 레이아웃 (푸터 X)
    │   ├── (fullscreen)/             # 뷰포트 기준 전체화면 레이아웃 (푸터 X, 스크롤 X)
    │   ├── actions/                  # 서버 액션 (쿠키 읽기, 쓰기)
    │   └── api/                      # API 라우트 (카카오 OAuth, 이미지 압축)
    │
    ├── components/                   # React 컴포넌트
    │   ├── common/                   # 공통 UI 컴포넌트
    │   ├── features/                 # 기능별 컴포넌트
    │   └── modals/                   # 모달 컴포넌트
    │
    ├── libs/                         # 유틸리티 및 설정
    │   ├── constants/                # 공통 상수 및 객체
    │   ├── contexts/                 # React Context
    │   ├── hooks/                    # 커스텀 React Hook
    │   ├── types/                    # 프로젝트 설정 관련 타입 정의
    │   └── utils/                    # 유틸리티 함수
    │
    └── styles/                       # 전역 스타일
        └── globals.css               # 전역 CSS 스타일
```

<br>

## 💻 Development

```bash
# Installation
npm install

# Development
npm run dev
npm run dev:https

# Production Build
npm run build
```

<br>

## 🎯 What I Learned

### Technical Challenges

1. **Next.js App Router에서 Fetch 전략**

   - Next.js App Router에서 Fetch API를 활용하여 데이터 캐싱과 재검증 전략을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Next-js-App-Router-Fetch-15b6513baf2780a3a33ecd129ef868a1?pvs=4)

2. **Next.js App Router에서 데이터 캐싱 전략**

   - Next.js App Router에서 태그 기반 데이터 캐싱과 재검증 설정을 통해 데이터 일관성을 유지하는 방법을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Next-js-App-Router-1626513baf27803582a0dcd7e97940ff?pvs=4)

3. **Tanstack Query 전략**

   - Tanstack Query를 사용하여 클라이언트 측 데이터 페칭 상태를 효율적으로 관리하기 위한 데이터 캐싱 및 상태 관리 로직을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Tanstack-Query-1626513baf278084b949eec7076bb0d2?pvs=4)

4. **Next.js App Router에서 쿠키 관리 전략**

   - Next.js App Router에서 서버 컴포넌트, 클라이언트 컴포넌트, 미들웨어, 라우트 핸들러 등 다양한 환경에서 쿠키를 안전하게 관리하고 조작하는 로직을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Next-js-App-Router-1696513baf2780189a55e2cd8c7fec8e?pvs=4)

5. **사용자 인증 및 보안 (토큰, 쿠키)**

   - Next.js App Router에서 JWT 토큰을 활용해 사용자를 인증하고 쿠키를 안전하게 관리하며 미들웨어를 통해 토큰 검증 및 재발급을 자동화하는 방법을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/1646513baf27804d9adecbe867e637d8?pvs=4)

6. **Edge 런타임과 JWT Decode 구현**

   - Edge 런타임 환경에서 JWT 토큰을 복호화하고 토큰의 구조 및 시간 기반 유효성 검증을 수행하는 로직을 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Edge-JWT-Decode-16b6513baf278051b529daf2de0dfc80?pvs=4)

7. **Context API 관리 전략**

   - Context API를 사용할 때 상태와 참조를 분리하여 불필요한 리렌더링을 방지했습니다.
   - [노션](https://regular-turn-c64.notion.site/Context-API-1706513baf2780f782cffcdaa0a637bc?pvs=4)

8. **Input에서 Composition 이벤트 핸들링**

   - 입력 시 입력값 실시간 포맷팅과 Composition 이벤트 간 충돌 문제를 해결하기 위해 조합 중인 입력값을 안전하게 처리하는 로직을 추가했습니다.
   - [노션](https://regular-turn-c64.notion.site/Input-Composition-1706513baf27806f8c19c145e4335777?pvs=4)

9. **Next.js 이미지 최적화**
   - Next.js의 Image 컴포넌트를 활용하여 이미지 최적화를 수행하고 클라이언트와 서버 측에서 각각 이미지를 효율적으로 처리하는 커스텀 Image 컴포넌트를 구현했습니다.
   - [노션](https://regular-turn-c64.notion.site/Next-js-1646513baf2780a78a22c1716b6d20c8?pvs=4)
10. **조건부 렌더링과 선언형 프로그래밍**

    - 조건부 렌더링을 선언적으로 처리할 방법을 구현했습니다.
    - [노션](https://regular-turn-c64.notion.site/1926513baf27804ebacec3cf2c9c86d0?pvs=4)

11. **Transform과 픽셀 보간 문제**

    - `transform`을 사용할 때 발생할 수 있는 픽셀 보간 문제를 이해하고 서브픽셀 렌더링 방식을 사용해 흐려진 UI 문제를 해결했습니다.
    - [노션](https://regular-turn-c64.notion.site/Transform-1756513baf2780a68970c31cb8b8d361?pvs=4)

12. **로딩 UI 애니메이션 작동하지 않는 문제**

    - SSR 환경에서 작동하지 않는 SVG 애니메이션을 CSS를 활용하여 클라이언트와 서버 측에서 모두 동작하는 로딩 UI를 구현했습니다.
    - [노션](https://regular-turn-c64.notion.site/UI-1756513baf27809d8c0dd996c31e1aac?pvs=4)

13. **모바일 브라우저에서 드래그 창 크기 변경 문제**

    - 모바일 브라우저에서 드래그 동작 시 브라우저 기본 동작과 충돌하는 문제를 이해하고, 이를 해결하기 위해 터치 환경에서 드래그 대신 클릭으로 동작을 처리하는 기능을 추가했습니다.
    - [노션](https://regular-turn-c64.notion.site/1756513baf278066978bcf87ea2a2446?pvs=4)

14. **구글 Places API 도시 주소 포맷팅**

    - 구글 Places API를 활용하여 도시 주소를 일관된 포맷으로 추출하고 자동 완성 API와 장소 세부정보 API를 결합하여 도시 이름과 주소를 정제하는 로직을 구현했습니다.
    - [노션](https://regular-turn-c64.notion.site/Places-API-1776513baf27807197dcfb916c105ff5?pvs=4)

15. **Lighthouse 성능 검사** - Lighthouse를 활용하여 웹 페이지의 성능을 측정하고 점수를 하락시키는 원인을 수정해 사용자 경험을 개선했습니다. - [노션](https://regular-turn-c64.notion.site/Lighthouse-17c6513baf2780c6ab00dd9181bc74b4?pvs=4)
    <br>

### Future Improvements

- 여행 계획 여러 인원 동시 작성 기능
- 여행 후기 작성 및 열람 기능
- 여행 계획 검색 필터 기능
- 구글, 네이버 등 소셜 연동 추가
- UI/UX 개선
- 성능, 코드 최적화
- 접근성 설정 강화
- 오류 핸들링 강화
- Jest 테스트 코드 추가

<br>

## 👨‍💻 Author

**Frontend Developer 강진호**

- Email: jinhok96a@gmail.com
- Notion: [Trablock 기술 문서](https://regular-turn-c64.notion.site/Trablock-1636513baf2780bab598c721d77f95d5?pvs=4)
- GitHub: [@jinhok96](https://github.com/jinhok96)
