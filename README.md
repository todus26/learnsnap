# LearnSnap

전문 지식을 짧은 영상 콘텐츠로 학습할 수 있는 웹 기반 플랫폼

---

## 📋 전체 목차

### Git 워크플로우
- [작업 시작하기](#-작업-시작하기)
- [작업 완료 후 커밋하기](#-작업-완료-후-커밋하기)
- [커밋 컨벤션](#-커밋-컨벤션)
- [Pull Request 워크플로우](#-pull-request-워크플로우)
- [작업 완료 후 정리](#-작업-완료-후-정리)

### 프로젝트 정보
- [서버 실행 방법](#️-서버-실행-방법)
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#️-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)


---

## Git 워크플로우 가이드

이 문서는 프로젝트에서 Git을 효율적으로 사용하기 위한 워크플로우와 규칙을 정리한 가이드입니다.

---

## 🚀 작업 시작하기

### 1. 이슈 생성
새로운 작업을 시작하기 전에 GitHub에서 이슈를 먼저 생성합니다.

#### 이슈 제목 형식

[타입] 기능명

#### 이슈 내용 예시

## [feat] 로그인 기능

### 요구사항
- [ ] 소셜로그인이 가능해야함
- [ ] JWT로 구현할 예정임
- [ ] 로그인 상태 유지 기능

### 상세 설명
사용자가 소셜 계정(Google, GitHub)을 통해 로그인할 수 있는 기능을 구현합니다.

### 2. 브랜치 생성

#### GitHub에서 브랜치 생성 (권장)
1. 이슈 페이지 우측 사이드바의 **"Development"** 섹션 클릭
2. **"Create a branch"** 클릭하여 자동 생성된 브랜치명 사용

#### 로컬에서 브랜치 생성

방법 1: git switch 사용 (권장)
`git switch -c 브랜치이름`

방법 2: git checkout 사용
`git checkout -b 브랜치이름`

#### 브랜치 네이밍 규칙
- **자동 생성된 브랜치명 사용 권장**: GitHub에서 제안하는 브랜치명을 그대로 사용
- **수동 생성 시 규칙**: `타입/간단한-설명` 또는 `이슈번호-간단한-설명`

#### 브랜치명 예시

GitHub 자동 생성 예시
`123-feat-user-login-feature`
`456-fix-database-connection-error`

수동 생성 예시
`feature/user-login`
`fix/database-connection`
`docs/readme-update`

### 3. 브랜치 확인
현재 생성된 브랜치 목록을 확인합니다.

`git branch`

### 4. 개발 작업 진행
이제 생성한 브랜치에서 실제 개발 작업을 진행합니다.

---

## 💻 작업 완료 후 커밋하기

개발 작업이 완료되면 변경사항을 커밋합니다.

### 1. 변경사항 스테이징

`git add .`

### 2. 커밋 생성
커밋 컨벤션에 따라 커밋 메시지를 작성합니다.

`git commit -m "(#123) ⭐ feat: 사용자 로그인 기능 구현"`

### 3. 리모트 저장소에 푸시

`git push origin 작업한브랜치`

---

## 📝 커밋 컨벤션

### 커밋 메시지 형식

`(#이슈번호) 이모지 및 타입: 간단한 설명`

### 주요 커밋 타입 및 이모지

#### == Code Related ==
| Emoji | Code | Type | Description | Example |
|:---:|:---:|------|------|------|
| ⭐ | `:star:` | `feat` | Code implementation | `(#123) ⭐ feat: Implement user login functionality` |
| 🔥 | `:fire:` | `remove` | Code removal | `(#123) 🔥 remove: Remove unused functions` |
| 🐛 | `:bug:` | `fix` | Bug fixes | `(#123) 🐛 fix: Fix login component issues` |
| 🎨 | `:art:` | `style` | UI/Style changes | `(#123) 🎨 style: Improve login page design` |

#### == Documentation & Refactoring ==
| Emoji | Code | Type | Description | Example |
|:---:|:---:|------|------|------|
| 📝 | `:memo:` | `docs` | Create new files | `(#123) 📝 docs: Create API documentation file` |
| ♻️ | `:recycle:` | `refactor` | Code refactoring | `(#123) ♻️ refactor: Refactor unused component files` |
| 📚 | `:books:` | `docs` | Documentation writing | `(#123) 📚 docs: Write project structure documentation` |

#### == Performance & Configuration ==
| Emoji | Code | Type | Description | Example |
|:---:|:---:|------|------|------|
| 🦋 | `:butterfly:` | `perf` | Performance improvement | `(#301) 🦋 perf: Optimize database queries` |
| 🔧 | `:wrench:` | `config` | Configuration changes | `(#301) 🔧 config: Apply webpack configuration improvements` |
| 🎀 | `:ribbon:` | `deploy` | Deployment | `(#301) 🎀 deploy: Deploy to production environment` |

#### == Other ==
| Emoji | Code | Type | Description | Example |
|:---:|:---:|------|------|------|
| 🎵 | `:musical_note:` | `fix` | Bug fix implementation | `(#301) 🎵 fix: Fix database connection bug` |
| 🏗️ | `:building_construction:` | `chore` | Initial setup | `(#301) 🏗️ chore: Initial project setup` |

### 💡 사용 방법

#### 이모지 직접 사용

`git commit -m "(#301) ⭐ feat: 사용자 로그인 기능 구현"`

#### 이모지 코드 사용 (터미널에서 이모지가 안 보일 때)

`git commit -m "(#301) :star: feat: 사용자 로그인 기능 구현"`

### 📋 커밋 메시지 예시

코드 작성
`git commit -m "(#123) ⭐ feat: 소셜 로그인 기능 구현"`
`git commit -m "(#123) :star: feat: 소셜 로그인 기능 구현"`

새 파일 생성  
`git commit -m "(#301) 📝 docs: README 파일 생성"`
`git commit -m "(#301) :memo: docs: README 파일 생성"`

버그 수정
`git commit -m "(#301) 🎵 fix: 데이터베이스 연결 이슈 해결"`
`git commit -m "(#301) :musical_note: fix: 데이터베이스 연결 이슈 해결"`

파일 제거
`git commit -m "(#301) 🔥 refactor: 미사용 컴포넌트 파일 제거"`
`git commit -m "(#301) :fire: refactor: 미사용 컴포넌트 파일 제거"`

---

## 🔄 Pull Request 워크플로우

### 1. GitHub에서 PR 생성
- 작업 완료 후 GitHub에서 Pull Request를 생성합니다
- **⚠️ 에러 발생 시 즉시 팀에 알려주세요**

### PR 제목 형식

(#이슈번호) 이모지 및 타입: 제목

### PR 제목 예시

(#123) ⭐ feat: 사용자 로그인 기능 구현
(#123) 🐛 fix: 데이터베이스 연결 오류 수정
(#123) 📝 docs: 프로젝트 README 업데이트

### 2. 코드 리뷰 및 병합
- 팀원들의 코드 리뷰를 받습니다
- 승인 후 PR을 병합합니다

---

## 🧹 작업 완료 후 정리

### PR 병합 후 로컬 업데이트
PR이 병합되면 로컬의 main 브랜치를 최신 상태로 업데이트합니다.

main 브랜치로 이동
`git checkout main`

최신 변경사항 가져오기
`git pull origin main`

### 기존 브랜치 재사용 (필요시)
이전에 작업하던 브랜치를 계속 사용해야 하는 경우:

원하는 브랜치로 이동
`git checkout 원하는브랜치`

main 브랜치의 최신 변경사항 병합
`git merge main`

---

## 🔗 참고 자료

- [Git 커밋 컨벤션 가이드](https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [GitHub Flow 워크플로우](https://guides.github.com/introduction/flow/)
- [Gitmoji - 커밋 이모지 가이드](https://gitmoji.dev/)


---

## 🖥️ 서버 실행 방법

### Backend 서버 실행

1. backend 폴더로 이동
`cd backend`

2. Gradle 실행 (Windows)
`.\gradlew.bat bootRun`

Linux/Mac
`./gradlew bootRun`

3. 서버 실행 확인
http://localhost:8080/api/hello

### Frontend 서버 실행

1. frontend 폴더로 이동
`cd frontend`

2. 의존성 설치 (최초 1회)
`npm install`

3. 개발 서버 실행
`npm run dev`

4. 프론트엔드 접속
http://localhost:5173

### 서버 종료

Backend/Frontend 모두 동일
`Ctrl + C`

---

## 🎯 프로젝트 소개

**"Show, Code, Learn! 배움은 짧게, 성장은 길게"**

LearnSnap은 듀오링고의 gamification 요소와 매일메일의 콘텐츠 전문성을 결합하여, 개발자들이 언제 어디서나 부담 없이 전문 지식을 습득할 수 있는 환경을 제공합니다.

### 핵심 가치
- **접근성**: 3-5분 숏폼 영상으로 언제 어디서나 학습 가능
- **전문성**: 검증된 강사의 고품질 콘텐츠
- **동기부여**: 게이미피케이션을 통한 지속적인 학습 습관 형성
- **커뮤니티**: 학습자 간 경쟁과 협력을 통한 성장

---

## 🚀 주요 기능

### 학습자 기능
- **카테고리별 학습 트랙**: 백엔드, 프론트엔드, DevOps, 데이터베이스, AI/ML 등
- **숏폼 영상 콘텐츠**: 3-5분 내외의 전문 강의 영상, 자막 및 코드 스니펫 제공
- **게이미피케이션**: 일일 학습 스트릭, 포인트 및 뱃지 시스템, 리더보드
- **인터랙티브 학습**: 실시간 퀴즈, 코드 챌린지, 학습 진도 트래킹
- **개인화**: 학습 목표 설정, 맞춤형 콘텐츠 추천, 학습 통계 및 리포트

### 강사 기능
- **콘텐츠 업로드**: 영상 업로드 및 편집, 썸네일/제목/설명 설정
- **퀴즈 생성**: 강의 내용 기반 퀴즈 작성, 정답 및 해설 등록
- **강사 대시보드**: 콘텐츠 조회수 및 완강률, 학습자 피드백 확인

### 관리자 기능
- **콘텐츠 승인 및 관리**
- **사용자 관리**
- **통계 및 분석 대시보드**

---

## 🛠️ 기술 스택

### Backend
- **Framework**: Spring Boot 3.2.x
- **Language**: Java 17
- **Database**: PostgreSQL 15+
- **ORM**: Spring Data JPA (Hibernate)
- **Build Tool**: Gradle
- **Authentication**: Spring Security + JWT (예정)
- **File Storage**: AWS S3 + CloudFront (예정)
- **Real-time**: WebSocket (STOMP) (예정)

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: JavaScript
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand (예정)
- **Routing**: React Router v6 (예정)
- **HTTP Client**: Axios
- **Video Player**: Video.js 또는 React Player (예정)
- **Charts**: Recharts 또는 Chart.js (예정)
- **Form Management**: React Hook Form + Zod (예정)

### Infrastructure
- **Database**: PostgreSQL
- **Cache**: Redis (예정)
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions (예정)
- **Hosting**: AWS (예정)

---

## 📁 프로젝트 구조

learnsnap/
├── backend/                  # Spring Boot 백엔드
│   ├── src/
│   │   └── main/
│   │       ├── java/com/learnsnap/
│   │       │   ├── LearnSnapApplication.java
│   │       │   ├── controller/       # REST API 컨트롤러
│   │       │   ├── service/          # 비즈니스 로직
│   │       │   ├── repository/       # JPA Repository
│   │       │   ├── domain/           # 엔티티
│   │       │   ├── dto/              # Request/Response DTO
│   │       │   ├── config/           # 설정
│   │       │   ├── security/         # JWT, UserDetails
│   │       │   ├── util/             # 유틸리티
│   │       │   └── exception/        # 예외 처리
│   │       └── resources/
│   │           ├── application.yml
│   │           └── application-example.yml
│   └── build.gradle
│
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/       # React 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── hooks/            # Custom Hooks
│   │   ├── services/         # API 서비스
│   │   ├── store/            # 상태 관리
│   │   ├── utils/            # 유틸리티
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── .gitignore
└── README.md

