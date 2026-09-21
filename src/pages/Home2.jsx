import { useEffect, useRef, useState } from "react";

/* =========================================================
   ✏️ 여기만 수정하면 돼요 (사진/텍스트/프로젝트 내용)
   - 이미지는 public/images/ 폴더에 넣고 "/images/파일명.png" 로 쓰면 돼요.
   - 지금 들어있는 placehold.co 주소는 임시 이미지예요.
   ========================================================= */

const WALLPAPER = "../public/images/wallpaper.png";

// 프로젝트 외 바탕화면 아이콘 이미지 (정사각형, 투명 PNG 추천)
// 예: "/images/icons/about.png"
const ABOUT_ICON = "https://placehold.co/128x128/fffbe0/0e17c9?text=About";
const VELOG_ICON = "https://placehold.co/128x128/d8f5e6/0e17c9?text=Velog";
const CONTACT_ICON = "https://placehold.co/128x128/ffe3e3/0e17c9?text=Mail";

const PROFILE = {
  intro: `Hello.
  I'm Jiyeon`,
  email: "jiyoeo2@gmail.com",
  velog: "https://velog.io/@jiyoeo",
};

// 바탕화면 아이콘 = 프로젝트. 배열에 객체를 추가/삭제하면 아이콘도 같이 늘고 줄어요.
const PROJECTS = [
  {
    id: "project-1",
    // 아이콘 이미지 (정사각형, 투명 PNG 추천). 예: "/images/icons/project-1.png"
    icon: "https://placehold.co/128x128/ecdff2/0e17c9?text=01",
    fileName: "Project_01",
    title: "프로젝트 이름 1",
    period: "YYYY.MM – YYYY.MM",
    role: "프론트엔드 · 팀 프로젝트",
    image: "https://placehold.co/800x480/ecdff2/0e17c9?text=Project+01",
    description:
      "어떤 문제를 해결하려고 만들었는지, 내가 맡은 역할은 무엇이었는지 2~3줄로 적어주세요.",
    features: ["주요 기능 1", "주요 기능 2", "주요 기능 3"],
    stack: ["React", "Tailwind CSS"],
    github: "https://github.com/",
    demo: "",
  },
  {
    id: "project-2",
    icon: "https://placehold.co/128x128/d9e0ff/0e17c9?text=02",
    fileName: "Project_02",
    title: "프로젝트 이름 2",
    period: "YYYY.MM – YYYY.MM",
    role: "프론트엔드 · 개인 프로젝트",
    image: "https://placehold.co/800x480/d9e0ff/0e17c9?text=Project+02",
    description:
      "프로젝트 설명을 여기에 적어주세요. 배운 점이나 어려웠던 점을 한 줄 넣어도 좋아요.",
    features: ["주요 기능 1", "주요 기능 2"],
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: "project-3",
    icon: "https://placehold.co/128x128/f3d9f0/0e17c9?text=03",
    fileName: "Project_03",
    title: "프로젝트 이름 3",
    period: "YYYY.MM – YYYY.MM",
    role: "프론트엔드",
    image: "https://placehold.co/800x480/f3d9f0/0e17c9?text=Project+03",
    description: "프로젝트 설명을 여기에 적어주세요.",
    features: ["주요 기능 1", "주요 기능 2"],
    stack: ["React"],
    github: "https://github.com/",
    demo: "",
  },
  {
    id: "project-4",
    icon: "https://placehold.co/128x128/dbeeff/0e17c9?text=04",
    fileName: "Project_04",
    title: "프로젝트 이름 4",
    period: "YYYY.MM – YYYY.MM",
    role: "프론트엔드",
    image: "https://placehold.co/800x480/dbeeff/0e17c9?text=Project+04",
    description: "프로젝트 설명을 여기에 적어주세요.",
    features: ["주요 기능 1", "주요 기능 2"],
    stack: ["React", "Vite"],
    github: "https://github.com/",
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

/* ---------- 상단 메뉴바 ---------- */
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span>
      {now.toLocaleString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
      })}
    </span>
  );
}

function MenuBar({ onOpenAbout }) {
  return (
    <header
      className="absolute inset-x-0 top-0 z-[1000] flex items-center justify-between border-b border-black bg-white/90 px-3 text-xs backdrop-blur"
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
  active,
  onFocus,
  onClose,
  children,
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
      className="win-open absolute flex flex-col overflow-hidden rounded-[6px] border border-black bg-white shadow-[5px_5px_0_rgba(0,0,0,0.28)]"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: `max(180px, calc(100dvh - ${pos.y}px - 12px))`,
        zIndex: z,
      }}
    >
      {/* 타이틀바: 활성 창일 때만 클래식 맥 스타일 줄무늬 */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex h-7 shrink-0 cursor-grab touch-none select-none items-center gap-2 border-b border-black bg-white px-2 active:cursor-grabbing"
        style={{
          backgroundImage: active
            ? "repeating-linear-gradient(to bottom, #fff 0 2px, rgba(0,0,0,0.7) 2px 3px)"
            : undefined,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="창 닫기"
          className="h-3.5 w-3.5 shrink-0 border border-black bg-white hover:bg-[#0e17c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e17c9]"
        />
        <span className="mx-auto max-w-[70%] truncate bg-white px-2 text-xs font-bold">
          {title}
        </span>
        <span className="w-3.5 shrink-0" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  );
}

/* ---------- 창 안쪽: 자기소개 메모 ---------- */
function AboutBody() {
  return (
    <div className="bg-[#fff5b1] p-4 text-[13px] leading-relaxed text-gray-900">
      <p>{PROFILE.intro}</p>

      <ul className="space-y-0.5">
        <li>
          Email:{" "}
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-[#0e17c9] underline"
          >
            {PROFILE.email}
          </a>
        </li>
        <li>
          Velog:{" "}
          <a
            href={PROFILE.velog}
            target="_blank"
            rel="noreferrer"
            className="text-[#0e17c9] underline"
          >
            {PROFILE.velog.replace("https://", "")}
          </a>
        </li>
      </ul>

      <p className="mt-4 border-t border-dashed border-black/40 pt-3 text-xs text-gray-600">
        바탕화면의 폴더를 두 번 클릭(모바일은 탭)하면 프로젝트가 열려요.
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
        className="aspect-[5/3] w-full rounded-[4px] border border-black object-cover"
      />

      <div>
        <h2 className="text-lg font-extrabold leading-tight">{p.title}</h2>
        <p className="text-xs text-gray-600">
          {p.period} / {p.role}
        </p>
      </div>

      <p>{p.description}</p>

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
              className="rounded-[4px] border border-black bg-[#0e17c9] px-3 py-1 text-xs font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.25)] hover:bg-[#0b12a3]"
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 바탕화면 아이콘 ---------- */
function DesktopIcon({ icon, selected, onSelect, onActivate }) {
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        if (coarse) onActivate(); // 터치 기기는 한 번 탭으로 열기
      }}
      onDoubleClick={onActivate}
      onKeyDown={(e) => e.key === "Enter" && onActivate()}
      className="flex w-[88px] select-none flex-col items-center gap-1 rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e17c9]"
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-[8px] ${
          selected ? "bg-[#0e17c9]/25" : ""
        }`}
      >
        <img
          src={icon.image}
          alt=""
          draggable={false}
          className="h-14 w-14 object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)]"
        />
      </span>
      <span
        className={`max-w-full break-words px-1 text-center text-[11px] font-semibold leading-tight ${
          selected ? "bg-[#0e17c9] text-white" : "bg-white/75 text-black"
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

  // 바탕화면 아이콘 목록
  const icons = [
    ...PROJECTS.map((p) => ({ id: p.id, label: p.title, image: p.icon })),
    { id: "about", label: "자기소개.txt", image: ABOUT_ICON },
    { id: "velog", label: "Velog ↗", image: VELOG_ICON, href: PROFILE.velog },
    {
      id: "contact",
      label: "Contact",
      image: CONTACT_ICON,
      href: `mailto:${PROFILE.email}`,
    },
  ];

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
        @media (prefers-reduced-motion: reduce) { .win-open { animation: none; } }
      `}</style>

      <MenuBar onOpenAbout={() => open("about")} />

      {/* 아이콘 영역: 데스크톱은 오른쪽 세로줄, 모바일은 아래 가로줄 */}
      <nav
        aria-label="바탕화면"
        className="absolute bottom-3 left-3 right-3 z-[5] flex flex-row flex-wrap justify-center gap-x-2 gap-y-3 md:bottom-4 md:left-auto md:right-4 md:top-12 md:flex-col md:flex-wrap-reverse md:content-start md:justify-start"
      >
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            selected={selected === icon.id}
            onSelect={() => setSelected(icon.id)}
            onActivate={() => activate(icon)}
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
            active={index === opened.length - 1}
            onFocus={() => focus(id)}
            onClose={() => close(id)}
          >
            {w.content}
          </DesktopWindow>
        );
      })}
    </main>
  );
}
