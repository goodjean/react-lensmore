
## Introduce

- 오렌즈, 렌즈미, 렌즈타운 3사 브랜드의 렌즈 정보를 볼 수 있는 통합 렌즈사이트.
- React.js, styled-components가 사용되었다.
- 각기 다른 브랜드의 렌즈 정보를 취합하여 한눈에 직관적으로 비교할 수 있도록 한 서비스이다.


## Install

```bash
npm install
```

## Run Development Mode

```bash
[client]
npm run start
[server]
npm run dev
```

## Requirement
 - server 폴더 안에 dbconfig 폴더 생성 후 database.ts 파일 생성.
 - 해당 database.ts 파일안에서 .env파일에 있는 환경변수를 export default{} 형태로 사용.

## Setting Environment Variables

프로젝트를 실행하기 위해서는 MySQL 연결 정보를 설정해야 합니다.
아래와 같이 `.env` 파일을 생성하고, MySQL 연결 정보를 추가하세요.

1. 프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다.

2. `.env` 파일에 다음과 같이 MySQL 연결 정보를 추가합니다:

  ```dotenv
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=your_mysql_database
```

  
