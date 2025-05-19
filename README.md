# OmniAdmin - NVIDIA Omniverse Nucleus 관리 시스템

OmniAdmin은 NVIDIA Omniverse Nucleus를 위한 현대적인 웹 기반 관리 인터페이스입니다. React와 Tailwind CSS를 사용하여 개발되었으며, Nucleus 서버의 모니터링, 관리, 구성을 위한 직관적인 UI를 제공합니다.

![image](https://github.com/user-attachments/assets/e8a8fd0c-a6c0-4a8e-9e4a-718322482b56)

## 주요 기능

- **실시간 대시보드**: CPU, 메모리, 디스크 사용량 및 연결 상태를 실시간으로 모니터링
- **서비스 관리**: Nucleus 마이크로서비스 시작, 중지, 재시작 및 구성 관리
- **사용자 및 그룹 관리**: 사용자와 그룹의 권한을 효율적으로 관리
- **파일 브라우저**: Nucleus 데이터 스토리지를 쉽게 탐색하고 관리
- **로그 관리**: 시스템 로그를 필터링하고 분석
- **백업 및 복구**: 자동 백업 스케줄링 및 복구 기능
- **보안 설정**: SSL 구성, 인증 정책, 보안 설정 관리
- **다크 모드**: 편안한 사용을 위한 다크 모드 지원

## 기술 스택

- **Frontend**: React, React Router, Tailwind CSS
- **상태 관리**: React Context API
- **차트 및 시각화**: Recharts
- **아이콘**: Lucide React
- **기타 라이브러리**: Date-fns, Lodash

## 시스템 요구사항

- Node.js 14.x 이상
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- NVIDIA Omniverse Nucleus 서버

## 설치 및 실행

### 개발 환경 설정

1. 저장소 클론
   ```bash
   git clone https://github.com/your-organization/omni-admin.git
   cd omni-admin
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 개발 서버 실행
   ```bash
   npm start
   ```

4. 브라우저에서 접속: `http://localhost:3000`

### 프로덕션 빌드

1. 빌드 생성
   ```bash
   npm run build
   ```

2. `build` 디렉토리에 생성된 파일을 웹 서버에 배포

## 구성

OmniAdmin은 `src/config/config.js` 파일을 통해 구성할 수 있습니다. 주요 구성 옵션:

```javascript
{
  apiUrl: 'http://your-nucleus-server:3333/api',
  refreshInterval: 10000, // 대시보드 데이터 새로고침 간격 (ms)
  defaultTheme: 'light', // 'light' 또는 'dark'
  logRetentionDays: 30 // 로그 보관 일수
}
```

## 프로젝트 구조

```
src/
  ├── components/          # UI 컴포넌트
  │   ├── dashboard/       # 대시보드 관련 컴포넌트
  │   ├── services/        # 서비스 관리 컴포넌트
  │   ├── users/           # 사용자 관리 컴포넌트
  │   ├── data/            # 데이터 관리 컴포넌트
  │   ├── logs/            # 로그 관리 컴포넌트
  │   ├── backup/          # 백업 및 복구 컴포넌트
  │   ├── settings/        # 시스템 설정 컴포넌트
  │   └── shared/          # 공유 컴포넌트
  ├── context/             # React Context API
  ├── data/                # 샘플 데이터
  ├── pages/               # 페이지 컴포넌트
  ├── services/            # API 서비스
  ├── styles/              # 전역 스타일
  ├── utils/               # 유틸리티 함수
  ├── App.js               # 앱 진입점
  └── index.js             # React 진입점
```

## API 연동

OmniAdmin은 NVIDIA Omniverse Nucleus API와 통합됩니다. 실제 서버와 연동하려면 `src/services/api.js` 파일에서 API 호출을 구현해야 합니다.

## 기여하기

1. 이 저장소를 포크합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치를 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 제출합니다

## 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

- 프로젝트 관리자: [이메일](mailto:admin@example.com)
- 이슈 트래커: [GitHub Issues](https://github.com/your-organization/omni-admin/issues)
# nucleus-admin
