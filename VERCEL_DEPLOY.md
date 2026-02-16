# Vercel 배포 가이드

## 1. 데이터베이스 설정 (필수)

Vercel에서는 SQLite 대신 **PostgreSQL**을 사용합니다. 무료 데이터베이스를 연결하세요.

### 방법 A: Vercel 대시보드에서 Neon 연결 (권장)
1. Vercel 프로젝트 → **Storage** 탭
2. **Create Database** → **Postgres** (Neon) 선택
3. 생성 완료 시 `DATABASE_URL` 환경 변수가 자동 설정됨

### 방법 B: Neon 직접 가입
1. [neon.tech](https://neon.tech)에서 무료 가입
2. 프로젝트 생성 후 Connection String 복사
3. Vercel 프로젝트 → **Settings** → **Environment Variables**
4. `DATABASE_URL` = `postgresql://...?sslmode=require` (복사한 연결 문자열)

## 2. 환경 변수 (Vercel 프로젝트 설정)

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | (Neon/Storage에서 자동 설정) |
| `NEXTAUTH_SECRET` | NextAuth 암호화 키 | 랜덤 32자 이상 |
| `NEXTAUTH_URL` | 배포 URL | `https://your-app.vercel.app` |

`NEXTAUTH_SECRET` 생성: 터미널에서 `openssl rand -base64 32` 실행

## 3. 로컬 개발

로컬에서는 SQLite 대신 Postgres가 필요합니다. Neon 무료 tier를 사용하거나 Docker로 Postgres를 실행하세요.
