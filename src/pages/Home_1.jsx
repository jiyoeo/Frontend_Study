import { useEffect, useRef, useState } from "react";
import Zooting from "../assets/zooting.png";
import Zooting_icon from "../assets/zooting_icon.webp";
import BeneFitU from "../assets/benefitu.png";
import BeneFitU_icon from "../assets/benefitu_icon.svg";
import Tometa from "../assets/tometa.png";
import Tometa_icon from "../assets/tometa_icon.png";

const WALLPAPER = "./public/images/wallpaper.png";

// 프로젝트 외 바탕화면 아이콘 이미지 (정사각형, 투명 PNG 추천)
// 예: "/images/icons/about.png"
const ABOUT_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" fill="#fffbe0"/><text x="64" y="56" text-anchor="middle" font-family="Pretendard, 'Apple SD Gothic Neo', sans-serif" font-size="26" font-weight="800" fill="#0e17c9">About</text><text x="64" y="88" text-anchor="middle" font-family="Pretendard, 'Apple SD Gothic Neo', sans-serif" font-size="26" font-weight="800" fill="#0e17c9">ME</text></svg>`,
  );
const VELOG_ICON = "https://placehold.co/128x128/d8f5e6/0e17c9?text=Velog";
const GITHUB_ICON = "https://placehold.co/128x128/e5e5e5/111111?text=GitHub";
// 아이콘(Velog, GitHub)에서 쓰는 링크
const PROFILE = {
  velog: "https://velog.io/@jiyoeo",
  github: "https://github.com/jiyoeo",
};

const MEMO_TEXT = `안녕하세요!
방문해주셔서 감사합니다.

웹 프론트엔드를 학습하고 있는 학생 김지연입니다.
단순히 화면을 만드는 것을 넘어서 사용자 경험을 고려하여
직관적인 인터페이스를 구현하는 개발자가 되고 싶어요.

바탕화면의 폴더를 두 번 클릭하면
지금까지 진행한 프로젝트를 볼 수 있어요.

깃허브: https://github.com/jiyoeo
벨로그: https://velog.io/@jiyoeo

편하게 연락 주세요 :
jiyoeo2@gmail.com
010-8619-6763

김지연`;

// 바탕화면 아이콘 = 프로젝트. 배열에 객체를 추가/삭제하면 아이콘도 같이 늘고 줄어요.
const PROJECTS = [
  {
    id: "project-1",
    // 아이콘 이미지 (정사각형, 투명 PNG 추천). 예: "/images/icons/project-1.png"
    icon: Zooting_icon,
    fileName: "Zooting",
    title: "Zooting",
    period: "2026.04 – 2026.05",
    role: "프론트엔드 · 팀 프로젝트",
    image: Zooting,
    description: `Zooting은 밸런스 게임을 통해 사용자들의 취향을 분석하고, 이를 기반으로 짝꿍을 매칭해주는 서비스입니다. 사용자는 간단한 이지선다 선택을 통해 자신의 프로필을 생성하고, 다른 사용자와의 매칭 결과를 확인할 수 있습니다.`,
    features: ["로그인", "밸런스 게임을 통한 프로필 생성", "짝꿍 매칭"],
    stack: ["JavaScript", "React", "Styled-Components", "Axios", "Vercel"],
    github: "https://github.com/LikeLionUniv-INU/14th-festival-frontend.git",
    demo: "https://www.zooting.site/",
  },
  {
    id: "project-2",
    icon: BeneFitU_icon,
    fileName: "BeneFitU",
    title: "BeneFitU",
    period: "2026.06 – 2026.07",
    role: "프론트엔드 · 팀 프로젝트",
    image: BeneFitU,
    description:
      "대학생 개개인의 조건에 맞는 장학금을 스마트하게 추천하고, 신청부터 결과까지 전 과정을 체계적으로 관리하는 핵심 기능들을 제공하는 장학금 매칭 플랫폼입니다.",
    features: ["내 정보 기반 맞춤 장학금 추천", "신청 현황 및 히스토리 관리"],
    stack: ["React", "Styled-Components", "JavaScript", "Vite", "Vercel"],
    github: "https://github.com/LikeLionUniv-INU/14th-BeneFitU-Frontend.git",
    demo: "https://benefitu-likelion.vercel.app/",
  },
  {
    id: "project-3",
    icon: Tometa_icon,
    fileName: "낫트데이",
    title: "낫트데이 (Not Trouble Day)",
    period: "2026.07 – 2026.08",
    role: "프론트엔드 · 팀 프로젝트",
    image: Tometa,
    description:
      "낫트데이 (Not Trouble Day)는 피부상태·스킨케어 루틴·생활 데이터를 연결하여 오늘의 피부를 기록하고 변화의 흐름을 돌아볼 수 있도록 돕는 AI Wellness 서비스입니다.",
    features: ["데일리 피부 기록", "AI 기반 인과관계 분석", "일간/주간 리포트"],
    stack: [
      "React",
      "Vite",
      "Styled-Components",
      "JavaScript",
      "Axios",
      "Vercel",
    ],
    github: "https://github.com/LikeLionUniv-INU/14th-toMeta-frontend.git/",
    demo: "",
  },
];

/* =========================================================
   아래부터는 화면 구조 코드
   ========================================================= */

const MENU_H = 28; // 상단 메뉴바 높이(px)
const FONT =
  '"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif';

const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max));

// 바탕화면 아이콘 = 프로젝트 + 자기소개/Velog/GitHub. 위치는 자유롭게 드래그로 바꿀 수 있어요.
// compact: true인 아이콘은 살짝 작게 + 둥근 사각형으로 표시돼요.
const ICONS = [
  ...PROJECTS.map((p) => ({ id: p.id, label: p.title, image: p.icon })),
  { id: "about", label: "자기소개.txt", image: ABOUT_ICON, compact: true },
  {
    id: "velog",
    label: "Velog ↗",
    image: VELOG_ICON,
    href: PROFILE.velog,
    compact: true,
  },
  {
    id: "github",
    label: "GitHub ↗",
    image: GITHUB_ICON,
    href: PROFILE.github,
    compact: true,
  },
];

const ICON_W = 88; // 아이콘 가로 칸 크기(px)
const ICON_H = 96; // 아이콘 세로 칸 크기(px)

// 아이콘 처음 위치: 오른쪽 위부터 세로로 쌓고, 화면이 낮으면 다음 줄(왼쪽)로 넘어가요.
function defaultIconPositions(ids) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const rows = Math.max(3, Math.floor((vh - MENU_H - 24) / ICON_H));
  const pos = {};
  ids.forEach((id, i) => {
    const col = Math.floor(i / rows);
    const row = i % rows;
    pos[id] = {
      x: clamp(vw - 16 - ICON_W - col * (ICON_W + 8), 8, vw - ICON_W - 8),
      y: clamp(MENU_H + 12 + row * ICON_H, MENU_H + 4, vh - ICON_H),
    };
  });
  return pos;
}

/* ---------- 상단 메뉴바 ---------- */
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const month = now.toLocaleString("en-US", { month: "long" });
  const day = now.getDate();
  const weekday = now
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return (
    <span>
      {month} {day} {weekday}. {hh}:{mm}
    </span>
  );
}

function MenuBar({ onOpenAbout }) {
  return (
    <header
      className="absolute inset-x-0 top-0 z-[1000] flex items-center justify-between  bg-black/20 px-3 text-xs backdrop-blur"
      style={{ height: MENU_H }}
    >
      <nav className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenAbout}
          className="font-extrabold hover:text-[#0e17c9]"
        >
          Jiyeon®
        </button>
        {["File", "Edit", "View", "Window", "Go", "Help"].map((m) => (
          <span key={m} className="hidden cursor-default sm:inline">
            {m}
          </span>
        ))}
      </nav>
      <Clock />
    </header>
  );
}

/* ---------- 드래그 가능한 창 ---------- */
function DesktopWindow({
  title,
  initial,
  width,
  z,
  onFocus,
  onClose,
  children,
  memo = false,
}) {
  const [pos, setPos] = useState(initial);
  const drag = useRef(null);

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!drag.current) return;
    const { sx, sy, ox, oy } = drag.current;
    setPos({
      x: clamp(ox + e.clientX - sx, 0, window.innerWidth - 80),
      y: clamp(oy + e.clientY - sy, MENU_H, window.innerHeight - 40),
    });
  };
  const handlePointerUp = () => {
    drag.current = null;
  };

  return (
    <section
      onPointerDown={onFocus}
      onClick={(e) => e.stopPropagation()}
      className={`win-open absolute flex flex-col overflow-hidden rounded-[6px] border border-black shadow-[5px_5px_0_rgba(0,0,0,0.28)] ${
        memo ? "bg-[#fff4a3]" : "bg-white"
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: `max(180px, calc(100dvh - ${pos.y}px - 12px))`,
        zIndex: z,
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`flex h-7 shrink-0 cursor-grab touch-none select-none items-center gap-2 border-b border-black px-2 active:cursor-grabbing ${
          memo ? "bg-[#fff4a3]" : "bg-black/20"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="창 닫기"
          className="flex h-4 w-4 shrink-0 select-none items-center justify-center text-sm font-bold leading-none text-black hover:text-[#0e17c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e17c9]"
        >
          ×
        </button>
        {!memo && (
          <span className="mx-auto max-w-[70%] truncate px-2 text-xs font-bold">
            {title}
          </span>
        )}
        <span className="w-3.5 shrink-0" />
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  );
}

/* ---------- 창 안쪽: 자기소개 메모 (글만 쭉 + 깜빡이는 커서) ---------- */
const LINK_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

// 글 속의 메일/URL을 클릭 가능한 링크로 바꿔줘요
function Linkify({ text }) {
  return text.split(LINK_RE).map((part, i) => {
    if (i % 2 === 0) return part; // 짝수 = 일반 글, 홀수 = 링크
    const isMail = !part.startsWith("http");
    return (
      <a
        key={i}
        href={isMail ? `mailto:${part}` : part}
        {...(isMail ? {} : { target: "_blank", rel: "noreferrer" })}
        className="text-[#0e17c9] underline"
      >
        {part}
      </a>
    );
  });
}

function AboutBody() {
  return (
    <div className="min-w-0 bg-[#fffad8] px-3 py-4 text-[13px] leading-6 text-gray-900">
      <p className="min-w-0 whitespace-pre-wrap break-words">
        <Linkify text={MEMO_TEXT.trim()} />
        <span
          aria-hidden="true"
          className="caret ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-black"
        />
      </p>
    </div>
  );
}

/* ---------- 창 안쪽: 프로젝트 상세 ---------- */
function ProjectBody({ project: p }) {
  return (
    <div className="space-y-3 p-4 text-[13px] leading-relaxed text-gray-900">
      <img
        src={p.image}
        alt={`${p.title} 스크린샷`}
        className="block h-auto w-full rounded-[4px] border border-black"
      />

      <div>
        <h2 className="text-lg font-extrabold leading-tight">{p.title}</h2>
        <p className="text-xs text-gray-600">
          {p.period} / {p.role}
        </p>
      </div>

      <p className="whitespace-pre-line">{p.description}</p>

      {p.features.length > 0 && (
        <ul className="list-disc space-y-0.5 pl-5">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      <ul className="flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <li
            key={s}
            className="rounded-[3px] border border-black bg-[#ecdff2] px-1.5 py-0.5 text-xs"
          >
            {s}
          </li>
        ))}
      </ul>

      {(p.github || p.demo) && (
        <div className="flex gap-2 pt-1">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-[4px] border border-black bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0_rgba(0,0,0,0.25)] hover:bg-[#ecdff2]"
            >
              GitHub ↗
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-[4px] border border-black bg-[#ffc7d8] px-3 py-1 text-xs font-bold text-black shadow-[2px_2px_0_rgba(0,0,0,0.25)] hover:bg-[#0b12a3]"
            >
              Site ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 바탕화면 아이콘 (자유롭게 드래그 이동) ---------- */
function DesktopIcon({ icon, pos, selected, onSelect, onActivate, onMove }) {
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;

  const drag = useRef(null);
  const moved = useRef(false);

  const handlePointerDown = (e) => {
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!drag.current) return;
    const { sx, sy, ox, oy } = drag.current;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    if (!moved.current && Math.hypot(dx, dy) < 4) return; // 살짝 흔들린 건 클릭으로 취급
    moved.current = true;
    onMove({
      x: clamp(ox + dx, 4, window.innerWidth - ICON_W - 4),
      y: clamp(oy + dy, MENU_H, window.innerHeight - ICON_H + 20),
    });
  };
  const handlePointerUp = () => {
    drag.current = null;
  };

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={(e) => {
        e.stopPropagation();
        if (moved.current) {
          moved.current = false; // 드래그 직후 클릭(열기)은 무시
          return;
        }
        onSelect();
        if (coarse) onActivate(); // 터치 기기는 한 번 탭으로 열기
      }}
      onDoubleClick={() => {
        if (!moved.current) onActivate();
      }}
      onKeyDown={(e) => e.key === "Enter" && onActivate()}
      className="absolute flex w-[88px] cursor-grab touch-none select-none flex-col items-center gap-1 rounded p-1 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e17c9]"
      style={{ left: pos.x, top: pos.y }}
    >
      <span
        className={`flex items-center justify-center rounded-[8px] ${
          icon.compact ? "h-14 w-14" : "h-16 w-16"
        } ${selected ? "bg-[#797dcd]/25" : ""}`}
      >
        <img
          src={icon.image}
          alt=""
          draggable={false}
          className={`object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)] ${
            icon.compact ? "h-12 w-12 rounded-[14px]" : "h-14 w-14"
          }`}
        />
      </span>
      <span
        className={`max-w-full break-words px-1 text-center text-[11px] font-semibold leading-tight ${
          selected ? "bg-[#555bca] text-white" : "bg-white/30 text-black"
        }`}
      >
        {icon.label}
      </span>
    </button>
  );
}

/* ---------- 페이지 ---------- */
export default function Home() {
  const [opened, setOpened] = useState(["about"]); // 마지막 = 맨 위 창
  const [selected, setSelected] = useState(null);
  const [iconPos, setIconPos] = useState(() =>
    defaultIconPositions(ICONS.map((icon) => icon.id)),
  );
  const moveIcon = (id, next) =>
    setIconPos((prev) => ({ ...prev, [id]: next }));

  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const startX = (x, w) =>
    Math.max(12, Math.min(x, vw - Math.min(w, vw - 24) - 12));

  const open = (id) =>
    setOpened((prev) => [...prev.filter((i) => i !== id), id]);
  const close = (id) => setOpened((prev) => prev.filter((i) => i !== id));
  const focus = (id) =>
    setOpened((prev) =>
      prev[prev.length - 1] === id
        ? prev
        : [...prev.filter((i) => i !== id), id],
    );

  // 창 정의
  const windows = {
    about: {
      title: "자기소개.txt",
      width: 380,
      initial: { x: startX(24, 380), y: MENU_H + 20 },
      content: <AboutBody />,
    },
    ...Object.fromEntries(
      PROJECTS.map((p, i) => [
        p.id,
        {
          title: `${p.fileName}`,
          width: 440,
          initial: { x: startX(300 + i * 36, 440), y: MENU_H + 36 + i * 36 },
          content: <ProjectBody project={p} />,
        },
      ]),
    ),
  };

  const activate = (icon) => {
    if (icon.href) {
      if (icon.href.startsWith("mailto:")) window.location.href = icon.href;
      else window.open(icon.href, "_blank", "noopener,noreferrer");
    } else {
      open(icon.id);
    }
  };

  const wallpaperStyle = WALLPAPER
    ? {
        backgroundImage: `url(${WALLPAPER})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.55) 1.2px, transparent 1.2px), linear-gradient(135deg, #ecdff2 0%, #d8c6f3 50%, #bfcbff 100%)",
        backgroundSize: "22px 22px, 100% 100%",
      };

  return (
    <main
      onClick={() => setSelected(null)}
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", fontFamily: FONT, ...wallpaperStyle }}
    >
      <style>{`
        @keyframes win-open { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: none; } }
        .win-open { animation: win-open 0.12s ease-out; }
        @keyframes caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .caret { animation: caret-blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) { .win-open, .caret { animation: none; } }
      `}</style>

      <MenuBar onOpenAbout={() => open("about")} />

      {/* 아이콘 영역: 자유롭게 드래그해서 원하는 자리로 옮길 수 있어요 */}
      <nav aria-label="바탕화면" className="absolute inset-0 z-[5]">
        {ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            pos={iconPos[icon.id]}
            selected={selected === icon.id}
            onSelect={() => setSelected(icon.id)}
            onActivate={() => activate(icon)}
            onMove={(next) => moveIcon(icon.id, next)}
          />
        ))}
      </nav>

      {/* 열린 창들 */}
      {opened.map((id, index) => {
        const w = windows[id];
        if (!w) return null;
        return (
          <DesktopWindow
            key={id}
            title={w.title}
            initial={w.initial}
            width={w.width}
            z={10 + index}
            onFocus={() => focus(id)}
            onClose={() => close(id)}
            memo={id === "about"}
          >
            {w.content}
          </DesktopWindow>
        );
      })}
    </main>
  );
}
