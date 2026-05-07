import { useState, useEffect, useRef } from "react";

// ── Brand ─────────────────────────────────────────────────────────────────────
const NAVY  = "#0D1B3E";
const TEAL  = "#1A9E8F";
const AMBER = "#F4A623";
const WHITE = "#FFFFFF";
const GREY  = "#F0F4F8";
const GREEN = "#1A6B3A";
const MID   = "#64748B";

// ── Module data ───────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: "engineering",
    icon: "⚙️",
    title: "Engineering",
    subtitle: "Modern Apprenticeships",
    for: "Young people",
    desc: "7 in-depth modules covering sector knowledge, CV and application, test preparation, assessment centres, interview journeys and a scored knowledge check.",
    tags: ["Technical questions", "STAR method", "AI Coach"],
    color: TEAL,
    url: "https://tass-engineering.vercel.app",
    highlights: ["40 multiple choice questions", "Sector landscape & safety", "Career progression pathways"],
  },
  {
    id: "interview",
    icon: "🎤",
    title: "Interview Master",
    subtitle: "Universal preparation",
    for: "Young people",
    desc: "30 interview questions with weak, good and elite answers. STAR method coaching, handling nerves, questions to ask, EDI guidance and a live AI interview coach.",
    tags: ["30 real questions", "STAR coaching", "AI Coach"],
    color: AMBER,
    url: "https://tass-interview.vercel.app",
    highlights: ["Weak vs elite answers", "Blank moment scripts", "Formats & assessment days"],
  },
  {
    id: "localauthority",
    icon: "🏛️",
    title: "Local Authority",
    subtitle: "Council apprenticeships",
    for: "Young people",
    desc: "Scotland's most comprehensive guide to council apprenticeships. MyJobScotland mastery, language tests, STAR examples and a full case study bank.",
    tags: ["MyJobScotland", "Language test", "AI Coach"],
    color: "#6B21A8",
    url: "https://tass-la-customer-service.vercel.app",
    highlights: ["Supporting statement guide", "20 language test questions", "8 real candidate stories"],
  },
  {
    id: "construction",
    icon: "🏗️",
    title: "Construction & Trades",
    subtitle: "All 8 trades covered",
    for: "Young people",
    desc: "All 8 Scottish construction trades — carpentry, bricklaying, plumbing, electrical, plastering, painting, roofing and plant operations. CITB HS&E practice included.",
    tags: ["CITB practice", "Trade technical Qs", "AI Coach"],
    color: "#C0392B",
    url: "https://tass-construction.vercel.app",
    highlights: ["40 trade technical questions", "12 CITB HS&E practice questions", "12-week roadmap"],
  },
  {
    id: "cv",
    icon: "📄",
    title: "CV Builder",
    subtitle: "Write it. Own it. Win it.",
    for: "Young people",
    desc: "Section-by-section CV guidance for school leavers, graduates and career changers. 4 complete example CVs, sector-specific tips, a guided builder and AI review.",
    tags: ["4 full CV examples", "Section builder", "AI CV Review"],
    color: "#1A6B3A",
    url: "https://tass-cv-building.vercel.app",
    highlights: ["6 sectors covered", "Weak vs strong examples", "ATS keyword guidance"],
  },
  {
    id: "parent",
    icon: "🏠",
    title: "Parent & Carer Guide",
    subtitle: "Support without taking over",
    for: "Parents & carers",
    desc: "Everything a parent or carer needs to support their young person through the apprenticeship process — without doing it for them. Includes a 6-week coaching programme.",
    tags: ["Myth busting", "Conversation scripts", "AI Coach"],
    color: "#0891B2",
    url: "https://tass-parent-carer-guide.vercel.app",
    highlights: ["8 myths busted", "Scottish resources directory", "Rejection resilience guide"],
  },
  {
    id: "earlyyears",
    icon: "🌟",
    title: "Early Years & Childcare",
    subtitle: "ELC Modern Apprenticeships",
    for: "Young people",
    desc: "Scotland's dedicated preparation module for Early Learning and Childcare apprenticeships. Covers safeguarding, PVG, SSSC, MyJobScotland, GIRFEC and sector-specific interview questions.",
    tags: ["Safeguarding & PVG", "SSSC registration", "AI Coach"],
    color: "#BE185D",
    url: "https://tass-earlyyears.vercel.app",
    highlights: ["Scotland-specific ELC framework", "4 STAR examples for childcare", "8-session coaching programme"],
  },
  {
    id: "digitalit",
    icon: "💻",
    title: "Digital & IT",
    subtitle: "All 5 tech pathways",
    for: "Young people",
    desc: "Covers all five Digital Technology MA pathways — Software Development, Cyber Security, Data Analytics, IT Support and Infrastructure. Includes GitHub portfolio guidance and certification roadmap.",
    tags: ["Technical basics", "GitHub portfolio", "AI Coach"],
    color: "#1D4ED8",
    url: "https://tass-digitaltech.vercel.app",
    highlights: ["Certification roadmap", "13 technical Q&As", "Scotland's Graduate Apprenticeship"],
  },
  {
    id: "graduate",
    icon: "🎓",
    title: "Graduate Apprenticeship",
    subtitle: "Degree while you work",
    for: "Young people & career changers",
    desc: "Scotland's complete guide to Graduate Apprenticeships — all 15 frameworks, GA vs MA comparison, Am I Ready self-assessment, personal statement guidance, GA-level STAR examples and AI coach.",
    tags: ["GA vs MA", "Am I Ready?", "AI Coach"],
    color: "#B7860B",
    url: "https://tass-graduate.vercel.app",
    highlights: ["15 frameworks covered", "Interactive self-assessment", "6 GA-specific interview questions"],
  },
];


// ── Helpers ───────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Logo ──────────────────────────────────────────────────────────────────────
function TASSLogo({ size = "md", theme = "light" }) {
  const s = {
    sm: { the: 9,  main: 18, sub: 16, tag: 9,  rW: 16, rH: 1.5, gap: 2 },
    md: { the: 11, main: 24, sub: 22, tag: 11, rW: 22, rH: 2,   gap: 3 },
    lg: { the: 16, main: 38, sub: 34, tag: 14, rW: 34, rH: 2.5, gap: 5 },
    xl: { the: 18, main: 48, sub: 42, tag: 16, rW: 42, rH: 3,   gap: 6 },
  }[size] || { the: 11, main: 24, sub: 22, tag: 11, rW: 22, rH: 2, gap: 3 };
  const navy = theme === "dark" ? "#fff" : NAVY;
  const tag  = theme === "dark" ? "rgba(255,255,255,0.55)" : "#6B7FA3";
  const tagB = theme === "dark" ? "rgba(255,255,255,0.8)"  : "#3D4F6B";
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: s.gap, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: s.rW, height: s.rH, background: TEAL, borderRadius: 99 }} />
        <span style={{ color: TEAL, fontSize: s.the, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", lineHeight: 1 }}>THE</span>
        <div style={{ width: s.rW, height: s.rH, background: TEAL, borderRadius: 99 }} />
      </div>
      <div style={{ color: navy, fontSize: s.main, fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1, marginTop: -2 }}>APPRENTICESHIP</div>
      <div style={{ color: TEAL, fontSize: s.sub, fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1, marginTop: -4 }}>SUCCESS SYSTEM™</div>
      <div style={{ width: "72%", height: s.rH, background: TEAL, borderRadius: 99 }} />
      <div style={{ color: tag, fontSize: s.tag, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 400, marginTop: 2 }}>
        Stop Guessing.{" "}<strong style={{ fontWeight: 900, color: tagB }}>Start Securing.</strong>
      </div>
    </div>
  );
}

// ── Module Card ───────────────────────────────────────────────────────────────
function ModuleCard({ mod, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: WHITE,
          border: `1px solid ${hovered ? mod.color : "#E2E8F0"}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: hovered ? `0 8px 32px ${mod.color}25` : "0 2px 8px rgba(0,0,0,0.06)",
          transition: "all 0.25s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        {/* Top accent */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)` }} />

        <div style={{ padding: "20px 18px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <span style={{ fontSize: 28 }}>{mod.icon}</span>
              <p style={{ color: NAVY, fontWeight: 900, fontSize: 17, margin: "6px 0 2px", lineHeight: 1.2 }}>{mod.title}</p>
              <p style={{ color: MID, fontSize: 12, margin: 0 }}>{mod.subtitle}</p>
            </div>
            <span style={{
              background: mod.color + "18",
              color: mod.color,
              border: `1px solid ${mod.color}30`,
              borderRadius: 99,
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              flexShrink: 0,
              marginTop: 4,
            }}>{mod.for}</span>
          </div>

          {/* Description */}
          <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: "0 0 14px" }}>{mod.desc}</p>

          {/* Highlights */}
          <div style={{ marginBottom: 14 }}>
            {mod.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 5, height: 5, background: mod.color, borderRadius: 99, flexShrink: 0 }} />
                <span style={{ color: "#444", fontSize: 12, lineHeight: 1.4 }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {mod.tags.map((tag, i) => (
              <span key={i} style={{
                background: GREY,
                color: MID,
                borderRadius: 99,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 600,
              }}>{tag}</span>
            ))}
          </div>

          {/* CTA */}
          <a href={mod.url} target="_blank" rel="noopener noreferrer" style={{
            display: "block",
            textAlign: "center",
            background: hovered ? mod.color : NAVY,
            color: WHITE,
            borderRadius: 10,
            padding: "12px 16px",
            fontWeight: 800,
            fontSize: 14,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            transition: "background 0.2s ease",
          }}>
            Open module →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Stat counter ──────────────────────────────────────────────────────────────
function StatCounter({ value, label, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const target = parseInt(value);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ color: WHITE, fontWeight: 900, fontSize: 40, margin: "0 0 4px", lineHeight: 1, letterSpacing: "-0.02em" }}>
        {count}{suffix}
      </p>
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0, letterSpacing: 0.3 }}>{label}</p>
    </div>
  );
}

// ── Testimonial ───────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { quote: "I had no idea what to say in my interview. The weak and strong answers showed me exactly where I was going wrong. Got my engineering apprenticeship second time round.", name: "Jamie, 17", detail: "Engineering MA — Glasgow" },
    { quote: "As a mum I felt completely out of my depth. The Parent Guide told me what to say and what not to say. I actually helped rather than just hovering anxiously.", name: "Sandra, 44", detail: "Supporting her son, Dundee" },
    { quote: "I was changing career at 27 and thought I'd missed the boat. The CV Builder showed me how to reframe 6 years of retail experience. I got 3 interviews in my first week.", name: "David, 27", detail: "Construction MA — Dundee" },
    { quote: "The CITB questions are exactly the right format. I used them every day for two weeks and passed first time with 48 out of 50.", name: "Kezia, 19", detail: "Construction MA — Edinburgh" },
    { quote: "The Local Authority module is the only thing that actually explains how MyJobScotland works. Our careers adviser couldn't give us that level of detail.", name: "Parent", detail: "Supporting daughter, Aberdeen" },
    { quote: "I thought I knew how to write a CV. The AI coach showed me my personal profile was completely generic. Rewrote it that night and had an interview two days later.", name: "Priya, 22", detail: "Business Admin MA — Edinburgh" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % items.length), 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <div style={{
        background: WHITE,
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        minHeight: 160,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 16, left: 20, color: TEAL, fontSize: 48, lineHeight: 1, opacity: 0.15, fontFamily: "Georgia, serif" }}>"</div>
        {items.map((item, i) => (
          <div key={i} style={{
            opacity: active === i ? 1 : 0,
            position: i === 0 ? "relative" : "absolute",
            top: 0, left: 0, right: 0,
            padding: i === 0 ? 0 : "28px 24px",
            transition: "opacity 0.5s ease",
            pointerEvents: active === i ? "auto" : "none",
          }}>
            <p style={{ color: NAVY, fontSize: 15, lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>"{item.quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${TEAL}, ${NAVY})`, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                {item.name.charAt(0)}
              </div>
              <div>
                <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, margin: 0 }}>{item.name}</p>
                <p style={{ color: MID, fontSize: 11, margin: 0 }}>{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: i === active ? 24 : 8, height: 8,
            background: i === active ? AMBER : "rgba(255,255,255,0.35)",
            borderRadius: 99, border: "none", cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "Is TASS really free?", a: "Yes — completely free. Every module, every AI coach session, every example and every quiz. No sign-up required. No credit card. Open the module and start." },
    { q: "Do I need an account to use it?", a: "No account needed. Go directly to any module and start immediately. Your progress within a session is saved while you use it." },
    { q: "Which module should I start with?", a: "If you are actively applying — start with the module for your specific sector. If you are not sure what sector yet — start with Interview (it applies to every apprenticeship) or CV Builder. Parents should start with the Parent and Carer Guide." },
    { q: "Can I use more than one module?", a: "Yes — and we encourage it. Interview skills apply across every sector. CV Builder works alongside every sector module. Many candidates use 3 or 4 modules during their application journey." },
    { q: "Is this specific to Scotland?", a: "Yes. All content reflects the Scottish apprenticeship framework — SVQ levels, SCQF, Skills Development Scotland, MyJobScotland, SNIPEF, SELECT, CITB and Scottish recruitment calendars. The advice is specifically relevant to applying for Modern Apprenticeships in Scotland." },
    { q: "How does the AI Coach work?", a: "Each module has a built-in AI coach you can talk to directly. It gives personalised feedback on your CV, runs mock interviews, helps you build STAR answers, and answers sector-specific questions. It is available 24 hours a day." },
    { q: "I am a parent — is there something for me?", a: "Yes — the Parent and Carer Guide is built specifically for you. It covers how to support without taking over, how to have the right conversations, what common mistakes parents make, and a full 6-week coaching programme you can work through together." },
    { q: "My young person is changing career at 26 — is TASS still relevant?", a: "Absolutely. Every module covers career changers specifically. The CV Builder has a full career changer cohort with worked examples. The AI coaches understand the reframing challenge and will help with it directly." },
  ];
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{
          background: WHITE,
          border: `1px solid ${open === i ? TEAL : "#E2E8F0"}`,
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          transition: "border-color 0.2s ease",
        }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", background: "none", border: "none",
            padding: "14px 16px", display: "flex",
            justifyContent: "space-between", alignItems: "center",
            cursor: "pointer", fontFamily: "inherit", gap: 12,
          }}>
            <span style={{ color: NAVY, fontWeight: 700, fontSize: 14, textAlign: "left", lineHeight: 1.4 }}>{item.q}</span>
            <span style={{ color: TEAL, fontSize: 20, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
          </button>
          {open === i && (
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid #F0F4F8" }}>
              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, margin: "12px 0 0" }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function TASSLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: WHITE, color: NAVY, overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: ${TEAL}60; border-radius: 99px; }
        a { text-decoration: none; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      {/* ── Sticky Nav ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navScrolled ? "rgba(13,27,62,0.97)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        padding: "14px 20px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: navScrolled ? "0 2px 20px rgba(0,0,0,0.2)" : "none",
      }}>
        <TASSLogo size="sm" theme="dark" />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[
            { label: "Modules", id: "modules" },
            { label: "How it works", id: "how" },
            { label: "FAQ", id: "faq" },
          ].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.8)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              padding: "6px 10px", borderRadius: 8, fontFamily: "inherit",
              display: "none",
            }}>
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollTo("modules")} style={{
            background: AMBER, border: "none", color: NAVY,
            padding: "9px 18px", borderRadius: 99, fontWeight: 800,
            fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            textTransform: "uppercase", letterSpacing: 0.5,
          }}>
            Get started
          </button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(155deg, ${NAVY} 0%, #0F2554 45%, #0A3D54 100%)`,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", right: "-8%", width: 400, height: 400, background: TEAL, borderRadius: "50%", opacity: 0.07, filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "-10%", width: 500, height: 500, background: AMBER, borderRadius: "50%", opacity: 0.05, filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: `radial-gradient(circle, ${TEAL}12 0%, transparent 70%)` }} />
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Logo */}
        <div style={{ marginBottom: 40, animation: "float 6s ease-in-out infinite" }}>
          <TASSLogo size="xl" theme="dark" />
        </div>

        {/* Hero text */}
        <div style={{ maxWidth: 680, position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(26,158,143,0.15)", border: "1px solid rgba(26,158,143,0.4)",
            borderRadius: 99, padding: "6px 16px", marginBottom: 24,
          }}>
            <div style={{ width: 7, height: 7, background: TEAL, borderRadius: 99, animation: "pulse 2s infinite" }} />
            <span style={{ color: TEAL, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>Free · Scotland's apprenticeship preparation platform</span>
          </div>

          <h1 style={{
            color: WHITE, fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 900, lineHeight: 1.15, marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            Scotland's most complete
            <span style={{
              display: "block",
              background: `linear-gradient(90deg, ${TEAL}, ${AMBER})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              apprenticeship toolkit
            </span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.72)", fontSize: "clamp(15px, 2.5vw, 18px)",
            lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px",
          }}>
            Nine in-depth modules covering every stage of the Modern Apprenticeship journey — from CV to interview to offer. Built for young people aged 16–29 and the parents and carers who support them.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("modules")} style={{
              background: AMBER, border: "none", color: NAVY,
              padding: "16px 32px", borderRadius: 99, fontWeight: 900,
              fontSize: 16, cursor: "pointer", fontFamily: "inherit",
              textTransform: "uppercase", letterSpacing: 0.5,
              boxShadow: `0 4px 24px ${AMBER}50`,
            }}>
              Explore modules
            </button>
            <button onClick={() => scrollTo("how")} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)",
              color: WHITE, padding: "16px 32px", borderRadius: 99,
              fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit",
            }}>
              How it works
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", animation: "float 2s ease-in-out infinite" }}>
          <div style={{ width: 26, height: 42, border: "2px solid rgba(255,255,255,0.3)", borderRadius: 99, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 3, height: 10, background: "rgba(255,255,255,0.6)", borderRadius: 99, animation: "float 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(90deg, ${NAVY}, #0F2554)`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          <StatCounter value="9"   suffix="+"  label="Specialist modules" />
          <StatCounter value="80"  suffix="+"  label="Scottish MA frameworks" />
          <StatCounter value="200" suffix="+"  label="Questions and examples" />
          <StatCounter value="32"  suffix=""   label="Scottish councils covered" />
        </div>
      </section>

      {/* ── Audience split ──────────────────────────────────────────────────── */}
      <section id="how" style={{ background: GREY, padding: "70px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Who is TASS for?</p>
              <h2 style={{ color: NAVY, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: 14, letterSpacing: "-0.02em" }}>Built for two audiences.<br/>Working as one system.</h2>
              <p style={{ color: MID, fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>Young people use the modules to prepare. Parents and carers use the Parent Guide to support without taking over. Both groups find exactly what they need.</p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              {
                icon: "🎯", label: "Young people aged 16–29",
                color: TEAL,
                points: [
                  "School leavers applying for their first apprenticeship",
                  "Graduates moving from academic to work-based learning",
                  "Career changers retraining into a new field",
                  "Anyone who wants to compete, not just apply",
                ],
              },
              {
                icon: "🏠", label: "Parents and carers",
                color: AMBER,
                points: [
                  "Parents who want to help but do not know where to start",
                  "Carers supporting a young person through the process",
                  "Families who want to understand the MA landscape",
                  "Anyone who needs to coach without taking over",
                ],
              },
            ].map((group, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div style={{
                  background: WHITE,
                  border: `1px solid ${group.color}30`,
                  borderTop: `3px solid ${group.color}`,
                  borderRadius: 14,
                  padding: "22px 18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  height: "100%",
                }}>
                  <span style={{ fontSize: 28 }}>{group.icon}</span>
                  <p style={{ color: NAVY, fontWeight: 800, fontSize: 15, margin: "10px 0 14px", lineHeight: 1.3 }}>{group.label}</p>
                  {group.points.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, background: group.color, borderRadius: 99, flexShrink: 0, marginTop: 5 }} />
                      <p style={{ color: "#555", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────────── */}
      <section style={{ background: WHITE, padding: "70px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>How TASS works</p>
              <h2 style={{ color: NAVY, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Open a module. Start preparing.</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { num: "01", title: "Choose your module", desc: "Pick the module that matches your sector or situation. No account needed. No sign-up. Open it and go.", icon: "🎯" },
              { num: "02", title: "Work through the content", desc: "Guided section by section — knowledge, examples, questions, exercises. At your pace, on any device.", icon: "📚" },
              { num: "03", title: "Practise with AI", desc: "Each module has a built-in AI coach. Get personalised feedback on your CV, answers, STAR examples — any time.", icon: "🤖" },
              { num: "04", title: "Apply with confidence", desc: "Go into every application and interview knowing exactly what strong looks like — and what weak looks like.", icon: "🚀" },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div style={{
                  background: GREY,
                  borderRadius: 14,
                  padding: "22px 18px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 12, right: 14,
                    color: NAVY, fontSize: 40, fontWeight: 900,
                    opacity: 0.07, letterSpacing: "-0.04em",
                  }}>{step.num}</div>
                  <span style={{ fontSize: 26, display: "block", marginBottom: 10 }}>{step.icon}</span>
                  <p style={{ color: NAVY, fontWeight: 800, fontSize: 15, marginBottom: 8 }}>{step.title}</p>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules grid ────────────────────────────────────────────────────── */}
      <section id="modules" style={{ background: GREY, padding: "70px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>The modules</p>
              <h2 style={{ color: NAVY, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: 14, letterSpacing: "-0.02em" }}>Nine modules. One system.</h2>
              <p style={{ color: MID, fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>Each module is a standalone tool. Use one, or combine them — they are designed to work together across your full application journey.</p>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {MODULES.map((mod, i) => (
              <ModuleCard key={mod.id} mod={mod} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, ${NAVY}, #0F2554)`,
        padding: "70px 24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: `radial-gradient(circle, ${TEAL}10 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>What people say</p>
              <h2 style={{ color: WHITE, fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Real results.<br/>Real people.</h2>
            </div>
          </AnimatedSection>
          <Testimonials />
        </div>
      </section>

      {/* ── Scotland specific ────────────────────────────────────────────────── */}
      <section style={{ background: WHITE, padding: "70px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 40 }}>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              <h2 style={{ color: NAVY, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, margin: "12px 0 14px", letterSpacing: "-0.02em" }}>Built specifically for Scotland</h2>
              <p style={{ color: MID, fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>TASS is not a generic UK resource. Every piece of content reflects Scotland's specific apprenticeship framework, qualifications system and recruitment landscape.</p>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { icon: "📋", title: "SVQ & SCQF levels", desc: "Scotland's qualification framework, not generic UK equivalents" },
              { icon: "🏛️", title: "MyJobScotland", desc: "All 32 Scottish councils use it. TASS covers it in depth." },
              { icon: "📍", title: "Scottish employers", desc: "Robertson, Balfour Beatty, Scottish Water, NHS Scotland and more" },
              { icon: "🔧", title: "SNIPEF & SELECT", desc: "Scotland's plumbing and electrical apprenticeship bodies" },
              { icon: "🏗️", title: "CITB Scotland", desc: "Construction frameworks and the HS&E test explained" },
              { icon: "📅", title: "Recruitment calendar", desc: "January to April is peak season — TASS tells you exactly when to apply" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div style={{
                  background: GREY,
                  borderRadius: 12,
                  padding: "16px 14px",
                  height: "100%",
                }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{item.icon}</span>
                  <p style={{ color: NAVY, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.title}</p>
                  <p style={{ color: MID, fontSize: 12, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: GREY, padding: "70px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Common questions</p>
              <h2 style={{ color: NAVY, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Everything you need to know</h2>
            </div>
          </AnimatedSection>
          <FAQ />
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, ${NAVY}, #0A3D54)`,
        padding: "80px 24px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400, background: TEAL, borderRadius: "50%", opacity: 0.07, filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 400, height: 400, background: AMBER, borderRadius: "50%", opacity: 0.06, filter: "blur(60px)" }} />
        </div>
        <AnimatedSection>
          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
            <p style={{ color: TEAL, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Ready to start?</p>
            <h2 style={{ color: WHITE, fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 900, marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Stop guessing.<br/>
              <span style={{ color: AMBER }}>Start securing.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
              Nine modules. Free. No sign-up. Built for Scotland.<br/>Open the module that is right for you and start today.
            </p>
            <button onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })} style={{
              background: AMBER, border: "none", color: NAVY,
              padding: "18px 40px", borderRadius: 99, fontWeight: 900,
              fontSize: 18, cursor: "pointer", fontFamily: "inherit",
              textTransform: "uppercase", letterSpacing: 0.5,
              boxShadow: `0 6px 30px ${AMBER}50`,
            }}>
              Choose your module
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: NAVY, padding: "32px 24px", textAlign: "center" }}>
        <div style={{ marginBottom: 20 }}>
          <TASSLogo size="sm" theme="dark" />
        </div>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 8 }}>
          theapprenticeshipsuccesssystem.co.uk
        </p>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>
          © 2025 The Apprenticeship Success System™ · All content reflects Scotland's Modern Apprenticeship framework
        </p>
      </footer>
    </div>
  );
}
