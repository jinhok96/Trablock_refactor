# Trablock
<br>
<br>
<p align="center"><img src = "https://github.com/user-attachments/assets/95d81f39-c6a2-4374-a98e-848361a33598" width="50%" height="50%"></p>
<br>
<br>
여행 계획을 시각적 UI를 통해 쉽고 편하게 작성하고, 다른 사람들과 공유할 수 있는 웹 플랫폼입니다.<br>

<br>

## 🚀 Live Demo
[https://trablockapp.vercel.app](https://trablockapp.vercel.app/)

<br>

## ⏰ Project Timeline
> 팀 개발 기간: 2024.05.28 ~ 2024.06.25  
> 리팩토링 기간: 2024.07.04 ~ 2024.12.04

- FE 5명, BE 2명, DE 1명으로 구성된 팀으로 진행했던 프로젝트를 리팩토링했습니다.
- 기획부터 완성까지 모든 단계를 재검토하며 FE 1명, BE 1명으로 진행했습니다.
- [FE(이전 팀) Github Repository](https://github.com/TravelLaboratory/frontend)
- [BE Github Repository](https://github.com/TravelLaboratory/travel-laboratory-was)

<br>

## ✨ Core Features

### 여행 계획 작성
- 시각적 UI를 통한 직관적인 일정 작성
- 드래그 앤 드롭으로 일정 순서 변경
- 구글맵 지도를 통한 날짜별 동선 표시

### 여행 계획 공유
- 여행 계획 링크/카카오톡 공유
- 도시별 여행 계획 검색, 열람 및 북마크

### 사용자 경험
- 반응형 디자인
- 모바일 브라우저 및 터치 동작을 고려한 UX/UI

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
  <img src="https://img.shields.io/badge/return fetch-000000?style=for-the-badge&logo=fetch&logoColor=white">
</div>

### Styling & UI
<div>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white">
  <img src="https://img.shields.io/badge/embla carousel-000000?style=for-the-badge&logo=carousel&logoColor=white">
  <img src="https://img.shields.io/badge/hello pangea dnd-000000?style=for-the-badge&logo=dnd&logoColor=white">
</div>

### Form & UI Components
<div>
  <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/react modal-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/react day picker-0088CC?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/react toastify-FFB4B4?style=for-the-badge&logo=react&logoColor=white">
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

## 🖼 Project Preview

### 메인 페이지
![메인 페이지](./images/main.png)

### 여행 계획 작성
![메인 페이지](./images/main.png)

### 여행 계획 공유
![메인 페이지](./images/main.png)

<br>

## 📂 Project Structure

```
src
├── common
│   ├── config
│   ├── types
│   └── utils
│       ├── types
│       └── utils
├── controller
├── entity
├── infrastructure
│   ├── express
│   └── typeorm
├── repository
└── ser
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
1. **문제 해결 1**
   - 요약
   - [노션](링크)

2. **문제 해결 2**
   - 요약
   - [노션](링크)

3. **문제 해결 3**
   - 요약
   - [노션](링크)

### Future Improvements
- 여행 계획 여러 인원 동시 작성 기능
- 여행 후기 작성 및 열람 기능
- 다른 유저 프로필 열람 기능
- 여행 계획 검색 필터 기능
- 소셜 연동 추가
- UX/UI 개선
- 성능 최적화
- Jest 테스트 코드 추가

<br>

## 👨‍💻 Author

**Frontend Developer 강진호**
- Email: jinhok96a@gmail.com
- Notion: [https://blog.example.com](https://blog.example.com)
- GitHub: [@jinhok96](https://github.com/jinhok96)
