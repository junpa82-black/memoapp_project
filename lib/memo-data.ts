export interface Memo {
  id: string
  title: string
  content: string
  fullContent: string
  date: string
  favorite: boolean
  archived: boolean
  trashed: boolean
  tag?: string
  tagColor?: string
  tagId?: string
}

export const initialMemos: Memo[] = [
  {
    id: "1",
    title: "2월 프로젝트 기획안",
    content:
      "이번 분기 목표에 맞춘 프로젝트 기획안을 정리합니다. 주요 마일스톤과 담당자를 배정하고...",
    fullContent: `이번 분기 목표에 맞춘 프로젝트 기획안을 정리합니다.

주요 마일스톤과 담당자를 배정하고, 일정 관리를 위한 체크포인트를 설정해야 합니다.

1단계: 요구사항 분석 (2월 1주)
- 고객 인터뷰 진행
- 기존 데이터 분석
- 경쟁사 벤치마킹

2단계: 설계 및 프로토타입 (2월 2-3주)
- 와이어프레임 제작
- UI/UX 디자인 리뷰
- 기술 스택 확정

3단계: 개발 착수 (2월 4주~)
- 프론트엔드 개발
- 백엔드 API 구축
- 테스트 환경 셋업

참고: 매주 금요일 진행 상황 공유 미팅을 진행합니다.`,
    date: "2026년 2월 16일",
    favorite: true,
    archived: false,
    trashed: false,
    tag: "업무",
    tagColor: "bg-primary/15 text-primary",
    tagId: "work",
  },
  {
    id: "2",
    title: "읽고 싶은 책 리스트",
    content:
      "올해 꼭 읽고 싶은 책들을 정리해두었습니다. 장르별로 분류하여 월별 독서 계획을...",
    fullContent: `올해 꼭 읽고 싶은 책들을 정리해두었습니다. 장르별로 분류하여 월별 독서 계획을 세워봅니다.

에세이/자기계발
- 나미야 잡화점의 기적 - 히가시노 게이고
- 아몬드 - 손원평
- 달러구트 꿈 백화점 - 이미예

소설
- 불편한 편의점 - 김호연
- 파친코 - 이민진
- 작은 아씨들 - 루이자 메이 올콧

기술/비즈니스
- 클린 코드 - 로버트 C. 마틴
- 제로 투 원 - 피터 틸
- 사피엔스 - 유발 하라리

매달 최소 2권은 읽는 것을 목표로!`,
    date: "2026년 2월 15일",
    favorite: true,
    archived: false,
    trashed: false,
    tag: "개인",
    tagColor: "bg-accent/20 text-accent-foreground",
    tagId: "personal",
  },
  {
    id: "3",
    title: "앱 개선 아이디어 브레인스토밍",
    content:
      "사용자 피드백을 기반으로 한 앱 개선 아이디어를 모아봅니다. UX 개선 포인트와 새로운 기능을...",
    fullContent: `사용자 피드백을 기반으로 한 앱 개선 아이디어를 모아봅니다. UX 개선 포인트와 새로운 기능을 정리합니다.

UX 개선
- 다크모드 토글 위치 변경 (설정에서 상단바로)
- 온보딩 플로우 간소화 (5단계 -> 3단계)
- 검색 기능 자동완성 추가

새로운 기능
- 마크다운 지원
- 실시간 협업 편집
- AI 기반 메모 요약
- 음성 메모 -> 텍스트 변환
- 태그 기반 자동 분류

성능 최적화
- 이미지 레이지 로딩
- 캐시 전략 개선
- 번들 사이즈 최적화

우선순위: 마크다운 지원 > AI 요약 > 실시간 협업`,
    date: "2026년 2월 14일",
    favorite: false,
    archived: false,
    trashed: false,
    tag: "아이디어",
    tagColor: "bg-[hsl(160,60%,45%)]/15 text-[hsl(160,60%,35%)]",
    tagId: "ideas",
  },
  {
    id: "4",
    title: "React Server Components 정리",
    content:
      "RSC의 핵심 개념과 사용 패턴을 정리합니다. 서버 컴포넌트와 클라이언트 컴포넌트의 차이점을...",
    fullContent: `RSC의 핵심 개념과 사용 패턴을 정리합니다.

서버 컴포넌트 vs 클라이언트 컴포넌트

서버 컴포넌트 (기본)
- 서버에서만 렌더링
- DB 직접 접근 가능
- 번들 사이즈에 포함되지 않음
- useState, useEffect 사용 불가

클라이언트 컴포넌트 ("use client")
- 브라우저에서 인터랙티브
- 이벤트 핸들러 사용 가능
- React hooks 사용 가능
- 번들에 포함됨

패턴 가이드
1. 데이터 페칭은 서버 컴포넌트에서
2. 인터랙션이 필요한 부분만 클라이언트로
3. 'use client' 경계를 최대한 아래로 내리기
4. 서버 컴포넌트에서 클라이언트 컴포넌트로 props 전달

참고 링크: nextjs.org/docs`,
    date: "2026년 2월 13일",
    favorite: false,
    archived: false,
    trashed: false,
    tag: "공부",
    tagColor: "bg-[hsl(280,60%,55%)]/15 text-[hsl(280,60%,45%)]",
    tagId: "study",
  },
  {
    id: "5",
    title: "주간 회의록 - 2월 2주차",
    content:
      "이번 주 회의에서 논의된 주요 안건과 결정 사항을 기록합니다. 각 팀별 진행 현황을...",
    fullContent: `이번 주 회의에서 논의된 주요 안건과 결정 사항을 기록합니다.

참석자: 김지원, 박서연, 이준호, 최민지

안건 1: Q1 매출 현황
- 목표 대비 85% 달성
- 신규 고객 유입률 증가 (+15%)
- 고객 이탈률 개선 필요

안건 2: 신규 프로젝트 일정
- 3월 초 베타 출시 목표
- QA 팀 추가 인원 배치 필요
- 디자인 리뷰 2월 말까지 완료

안건 3: 팀 빌딩 이벤트
- 3월 중순 예정
- 후보: 볼링, 방탈출, 쿠킹클래스
- 다음 주까지 설문 진행

다음 회의: 2월 20일 (금) 오후 2시`,
    date: "2026년 2월 12일",
    favorite: false,
    archived: false,
    trashed: false,
    tag: "업무",
    tagColor: "bg-primary/15 text-primary",
    tagId: "work",
  },
  {
    id: "6",
    title: "여행 계획 - 제주도",
    content:
      "4월 제주도 여행 계획을 세워봅니다. 숙소, 맛집, 관광지 정보를 정리해두었습니다...",
    fullContent: `4월 제주도 여행 계획을 세워봅니다.

일정: 4월 11일 (금) ~ 4월 13일 (일), 2박 3일

Day 1
- 오전: 김포 -> 제주 (09:00 출발)
- 점심: 흑돼지 거리
- 오후: 한라산 영실코스
- 저녁: 해산물 식당
- 숙소: 서귀포 펜션

Day 2
- 오전: 성산일출봉
- 점심: 제주 갈치조림
- 오후: 섭지코지, 카페 투어
- 저녁: 고기국수
- 숙소: 제주시 호텔

Day 3
- 오전: 동문시장 구경
- 점심: 시장 먹거리
- 오후: 제주 -> 김포 (15:00 출발)

준비물: 등산화, 썬크림, 카메라, 우비`,
    date: "2026년 2월 10일",
    favorite: true,
    archived: false,
    trashed: false,
    tag: "개인",
    tagColor: "bg-accent/20 text-accent-foreground",
    tagId: "personal",
  },
  {
    id: "7",
    title: "TypeScript 제네릭 패턴",
    content:
      "TypeScript에서 자주 사용되는 제네릭 패턴을 정리합니다. 실무에서 활용 가능한 예제를...",
    fullContent: `TypeScript에서 자주 사용되는 제네릭 패턴을 정리합니다.

기본 제네릭
function identity<T>(arg: T): T {
  return arg;
}

제약 조건 (Constraints)
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

조건부 타입
type IsString<T> = T extends string ? true : false;

맵드 타입
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

유틸리티 타입 조합
type PartialPick<T, K extends keyof T> = 
  Omit<T, K> & Partial<Pick<T, K>>;

실무 팁: 제네릭을 남용하지 말 것. 타입 추론이 가능한 경우 명시적 제네릭은 불필요합니다.`,
    date: "2026년 2월 8일",
    favorite: false,
    archived: false,
    trashed: false,
    tag: "공부",
    tagColor: "bg-[hsl(280,60%,55%)]/15 text-[hsl(280,60%,45%)]",
    tagId: "study",
  },
]
