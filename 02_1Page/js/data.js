// 사이트에 표시되는 모든 콘텐츠. 항목을 추가·수정하면 화면에 그대로 반영된다.
// TODO: 아래 예시 값을 실제 정보로 바꿔 주세요.
const SITE_DATA = {
  profile: {
    name: "홍길동",
    title: "풀스택 개발자 · 소프트웨어 아키텍트",
    tagline: "20년 동안 문제를 정의하고, 오래 가는 시스템을 만들어 왔습니다.",
    intro: [
      "대규모 서비스의 설계부터 운영까지 전 과정을 경험한 20년차 개발자입니다. 요구사항 뒤에 있는 진짜 문제를 찾고, 팀이 오래 유지보수할 수 있는 단순한 구조를 선호합니다.",
      "백엔드 아키텍처, 레거시 시스템 현대화, 개발 조직의 코드 품질 문화를 만드는 일에 강점이 있습니다.",
    ],
    email: "hello@example.com",
    photo: "", // 예: "images/profile.jpg" (비워두면 이니셜 표시)
    status: "새로운 프로젝트 제안을 받고 있습니다", // 비워두면 첫 화면 배지 숨김
  },

  // 핵심 역량 숙련도 (0~100)
  levels: [
    { name: "백엔드 아키텍처", value: 95 },
    { name: "대규모 시스템 운영", value: 90 },
    { name: "클라우드 · DevOps", value: 85 },
    { name: "프론트엔드", value: 75 },
    { name: "팀 리딩 · 멘토링", value: 90 },
  ],

  stats: [
    { value: "20+", label: "년 경력" },
    { value: "60+", label: "프로젝트" },
    { value: "15", label: "리드한 팀" },
  ],

  skills: [
    { group: "언어", items: ["Java", "TypeScript", "Python", "Go", "SQL"] },
    { group: "백엔드", items: ["Spring Boot", "Node.js", "REST / GraphQL", "메시지 큐"] },
    { group: "프론트엔드", items: ["React", "Vue", "HTML / CSS", "접근성"] },
    { group: "인프라 · DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "모니터링"] },
    { group: "설계 · 협업", items: ["도메인 주도 설계", "MSA 전환", "코드 리뷰", "기술 멘토링"] },
  ],

  experience: [
    {
      period: "2018 — 현재",
      company: "○○테크",
      role: "수석 개발자 / 아키텍트",
      points: [
        "모놀리식 커머스 플랫폼을 마이크로서비스로 단계적 전환",
        "배포 주기를 월 1회에서 일 단위로 단축",
      ],
    },
    {
      period: "2012 — 2018",
      company: "○○소프트",
      role: "백엔드 팀장",
      points: [
        "일 거래 100만 건 규모 결제 시스템 설계 및 운영",
        "8명 규모 백엔드 팀 리드, 코드 리뷰 문화 정착",
      ],
    },
    {
      period: "2006 — 2012",
      company: "○○정보통신",
      role: "소프트웨어 엔지니어",
      points: [
        "공공기관 업무 시스템 구축 다수 수행",
        "사내 공통 프레임워크 개발",
      ],
    },
  ],

  projects: [
    {
      title: "커머스 플랫폼 MSA 전환",
      period: "2021 — 2023",
      category: "백엔드",
      role: "아키텍트",
      summary: "10년 된 모놀리식 시스템을 서비스 중단 없이 도메인별 서비스로 분리했습니다.",
      result: "장애 영향 범위 축소, 배포 시간 80% 단축",
      tech: ["Spring Boot", "Kafka", "Kubernetes"],
      link: "",
    },
    {
      title: "실시간 결제 정산 시스템",
      period: "2015 — 2017",
      category: "백엔드",
      role: "팀장 · 설계",
      summary: "여러 결제 수단의 거래를 실시간으로 집계하고 정산하는 시스템을 구축했습니다.",
      result: "정산 소요 시간 하루 → 10분",
      tech: ["Java", "Oracle", "Redis"],
      link: "",
    },
    {
      title: "사내 디자인 시스템",
      period: "2020",
      category: "프론트엔드",
      role: "기술 리드",
      summary: "여러 제품에서 함께 쓰는 UI 컴포넌트 라이브러리와 문서 사이트를 만들었습니다.",
      result: "신규 화면 개발 기간 40% 단축",
      tech: ["React", "TypeScript", "Storybook"],
      link: "",
    },
    {
      title: "배포 자동화 파이프라인",
      period: "2019",
      category: "인프라",
      role: "설계 · 구현",
      summary: "수작업 배포를 테스트·빌드·배포가 이어지는 자동 파이프라인으로 바꿨습니다.",
      result: "배포 실수로 인한 장애 0건",
      tech: ["GitHub Actions", "Docker", "AWS"],
      link: "",
    },
  ],

  links: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "블로그", url: "https://example.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
};
