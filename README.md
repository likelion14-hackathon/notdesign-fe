# notdesign-fe

Vite + React 19 + TypeScript 프론트엔드 프로젝트.

## 스택

- **빌드**: Vite 8
- **UI**: React 19, Tailwind CSS 4 (`@tailwindcss/vite`)
- **라우팅**: React Router 7 (`createBrowserRouter`)
- **서버 상태**: TanStack Query 5
- **클라이언트 상태**: Zustand 5
- **HTTP**: Axios
- **품질**: ESLint, Prettier (+ `prettier-plugin-tailwindcss`)

## 시작하기

```bash
npm install
cp .env.example .env   # 필요 시 VITE_API_BASE_URL 설정
npm run dev
```

## 스크립트

| 명령어                 | 설명                                |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | 개발 서버 실행                      |
| `npm run build`        | 타입체크(`tsc -b`) 후 프로덕션 빌드 |
| `npm run preview`      | 빌드 결과 미리보기                  |
| `npm run lint`         | ESLint 검사                         |
| `npm run format`       | Prettier 포맷 적용                  |
| `npm run format:check` | Prettier 포맷 검사                  |

## 구조 (기능별 아키텍처)

```
src/
├── App.tsx                  # 루트 레이아웃 (라우터 Outlet)
├── main.tsx                 # 진입점 (QueryClient + Router Provider)
│
├── features/                # 도메인(기능)별 모듈
│   ├── auth/
│   │   ├── components/      # 이 기능 전용 컴포넌트
│   │   ├── pages/           # 라우트에 연결되는 페이지
│   │   ├── hooks/           # 이 기능 전용 훅
│   │   ├── api/             # 이 기능의 API 호출/쿼리
│   │   ├── store/           # 이 기능의 Zustand 스토어
│   │   └── constants.ts
│   └── user/
│       └── ...              # (동일 구조)
│
├── shared/                  # 여러 기능이 공유하는 코드
│   ├── components/          # 공용 컴포넌트 (예: NotFoundPage)
│   ├── hooks/
│   ├── utils/
│   ├── api/                 # axios 인스턴스, queryClient
│   └── styles/              # Tailwind import + 전역 스타일
│
└── routes/                  # 라우트 정의 (index.tsx), 경로 상수(paths.ts)
```

### 규칙

- **기능 안에서 완결**: 특정 도메인에만 쓰이는 코드는 해당 `features/<name>/` 안에 둡니다.
- **2개 이상 기능이 공유하면 `shared/`로 승격**합니다.
- `features` 간 직접 참조는 지양하고, 공용 로직은 `shared`를 경유합니다.
- `@/*` 별칭은 `src/*`를 가리킵니다 (예: `@/shared/api/axios`, `@/features/auth/...`).
