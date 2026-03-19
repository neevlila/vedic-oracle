import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", locale: "English" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", locale: "Hindi" },
  { code: "sa", label: "संस्कृतम्", flag: "🕉️", locale: "Sanskrit" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳", locale: "Gujarati" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳", locale: "Tamil" },
  { code: "fr", label: "Français", flag: "🇫🇷", locale: "French" },
  { code: "es", label: "Español", flag: "🇪🇸", locale: "Spanish" },
  { code: "ar", label: "العربية", flag: "🇸🇦", locale: "Arabic" },
];

const SCRIPTURES = [
  { id: "rig", category: "Veda", name: "Rigveda", sanskrit: "ऋग्वेद", symbol: "ॐ", color: "#f59e0b", glow: "#f59e0b44", desc: "Hymns of Creation & Gods", mantra: "ॐ तत्सवितुर्वरेण्यम्", focus: `the Rigveda — humanity's oldest scripture with 1028 hymns dedicated to Agni (fire), Indra (thunder), Soma (divine nectar), Varuna (cosmic law), and Surya (sun). You know the Nasadiya Sukta, Purusha Sukta, Gayatri Mantra, and the concept of Rta.`, suggestions: ["Who is Agni, the fire god?", "What is the Gayatri Mantra?", "Explain Nasadiya Sukta — creation hymn", "What is Rta — the cosmic order?"] },
  { id: "sama", category: "Veda", name: "Samaveda", sanskrit: "सामवेद", symbol: "♪", color: "#10b981", glow: "#10b98144", desc: "Melodies & Sacred Chants", mantra: "ॐ आप्यायस्व समेतु ते", focus: `the Samaveda — the Veda of song with 1875 verses. You know the Udgitha (OM chant), Sama Gana, Nada Brahman (sound as God), and how chanting creates divine vibrations.`, suggestions: ["What is Nada Brahman?", "How does chanting heal the soul?", "What is the Udgitha?", "Why is OM the most sacred sound?"] },
  { id: "yajur", category: "Veda", name: "Yajurveda", sanskrit: "यजुर्वेद", symbol: "🔥", color: "#ef4444", glow: "#ef444444", desc: "Rituals & Sacrificial Rites", mantra: "ॐ इषे त्वोर्जे त्वा", focus: `the Yajurveda — Veda of ritual action. Yajna (fire sacrifice), the Shatapatha Brahmana, Sri Rudram, Chamakam, and the deeper meaning of rituals as internal purification.`, suggestions: ["What is Yajna sacrifice?", "Explain the Sri Rudram", "How does karma purify the soul?", "Inner meaning of fire rituals?"] },
  { id: "atharva", category: "Veda", name: "Atharvaveda", sanskrit: "अथर्ववेद", symbol: "✦", color: "#8b5cf6", glow: "#8b5cf644", desc: "Magic, Healing & Secret Arts", mantra: "ॐ शन्नो देवीरभिष्टय", focus: `the Atharvaveda — healing hymns (Ayurveda roots), protection mantras, the Prithvi Sukta (Hymn to Mother Earth), tantra knowledge, and secret wisdom.`, suggestions: ["What are the best protection mantras?", "Atharvaveda roots of Ayurveda", "What is the Prithvi Sukta?", "Secret tantra knowledge"] },
  { id: "upanishad", category: "Upanishad", name: "Upanishads", sanskrit: "उपनिषद्", symbol: "🔆", color: "#06b6d4", glow: "#06b6d444", desc: "Secret Wisdom — Brahman & Atman", mantra: "ॐ पूर्णमदः पूर्णमिदम्", focus: `the 108 Upanishads — Brihadaranyaka, Chandogya (Tat Tvam Asi), Katha, Mundaka, Mandukya (OM's 4 states), Isha. Brahman, Atman, Maya, the 4 Mahavakyas, and paths to Moksha.`, suggestions: ["What is Tat Tvam Asi?", "What is Brahman vs Atman?", "Explain Maya — the cosmic illusion", "How to attain Moksha?"] },
  { id: "gita", category: "Itihasa", name: "Bhagavad Gita", sanskrit: "भगवद्गीता", symbol: "🪷", color: "#0ea5e9", glow: "#0ea5e944", desc: "Krishna's Divine Song — 18 Chapters", mantra: "ॐ कर्मण्येवाधिकारस्ते", focus: `the Bhagavad Gita — all 18 chapters. Karma Yoga (Ch.3), Jnana Yoga (Ch.4), Bhakti Yoga (Ch.12), the immortal soul (Ch.2), Vishwarupa (Ch.11), three Gunas (Ch.14), Nishkama Karma, surrender (Ch.18).`, suggestions: ["What is Nishkama Karma?", "Explain Krishna's Vishwarupa", "What are Sattva, Rajas, Tamas?", "How to overcome fear — Gita Ch.2"] },
  { id: "ramayana", category: "Itihasa", name: "Ramayana", sanskrit: "रामायण", symbol: "🏹", color: "#f97316", glow: "#f9731644", desc: "Epic of Lord Rama — Dharma & Devotion", mantra: "श्री राम जय राम जय जय राम", focus: `the Valmiki Ramayana (24,000 shlokas). All 7 Kandas. Rama as Maryada Purushottam, Sita's strength, Hanuman's devotion and power, Ravana's ego vs wisdom.`, suggestions: ["Who is Hanuman and his powers?", "Why is Rama Maryada Purushottam?", "Deeper meaning of Sita's abduction", "Ravana's ten heads — symbolism"] },
  { id: "mahabharata", category: "Itihasa", name: "Mahabharata", sanskrit: "महाभारत", symbol: "⚔️", color: "#dc2626", glow: "#dc262644", desc: "Great War of Dharma — 100,000 Verses", mantra: "ॐ धर्मो रक्षति रक्षितः", focus: `the Mahabharata — 100,000 shlokas, 18 Parvas. Pandavas, Kauravas, Bhishma's vow, Karna's tragedy, Draupadi, Yaksha Prashna, Vidura Niti, dharma sankat.`, suggestions: ["Why is Karna the greatest tragic hero?", "What is the Yaksha Prashna?", "Bhishma's wisdom on his deathbed", "Why did Krishna allow the war?"] },
  { id: "bhagavat", category: "Purana", name: "Srimad Bhagavatam", sanskrit: "श्रीमद्भागवतम्", symbol: "🌺", color: "#ec4899", glow: "#ec489944", desc: "Vishnu's Stories — 18,000 Verses", mantra: "ॐ नमो भगवते वासुदेवाय", focus: `the Srimad Bhagavatam — 12 Skandhas, 18,000 verses. Krishna's full life (Skandha 10), Prahlada, Dhruva, King Parikshit, 24 avatars of Vishnu, pure Bhakti.`, suggestions: ["Tell me about Krishna's Rasa Lila", "Story of Prahlada and Narasimha", "What are the 24 avatars of Vishnu?", "Story of Dhruva — the child devotee"] },
  { id: "puranas", category: "Purana", name: "18 Mahapuranas", sanskrit: "अष्टादश पुराण", symbol: "📿", color: "#a78bfa", glow: "#a78bfa44", desc: "Stories of Creation, Gods & Cosmos", mantra: "ॐ नमः शिवाय", focus: `all 18 Mahapuranas. Shiva-Parvati's love story, Durga Saptashati, Samudra Manthan, cosmology of yugas, creation-dissolution cycles.`, suggestions: ["Story of Samudra Manthan", "Shiva and Parvati's love story", "What is the Durga Saptashati?", "What are the four Yugas?"] },
  { id: "yoga", category: "Darshana", name: "Yoga Sutras", sanskrit: "योगसूत्र", symbol: "🧘", color: "#34d399", glow: "#34d39944", desc: "Patanjali's Science of Mind", mantra: "ॐ योगश्चित्तवृत्तिनिरोधः", focus: `Patanjali's Yoga Sutras — 196 aphorisms. Ashtanga Yoga's 8 limbs, Chitta Vritti Nirodha, 5 Kleshas, Siddhis, and Kaivalya (liberation).`, suggestions: ["What are the 8 limbs of Ashtanga Yoga?", "How to still the mind?", "What are the Siddhis?", "What is Kaivalya?"] },
];

const CATEGORIES = ["All", "Veda", "Upanishad", "Itihasa", "Purana", "Darshana"];
const STORAGE_KEY = "vedic_oracle_v4";
const HIST_KEY = "vedic_oracle_hist_v2";
const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const buildPrompt = (sc, langLocale) =>
  `You are the VEDIC ORACLE — an omniscient sage with mastery over ALL ancient Hindu scriptures. Channeling: ${sc.name} (${sc.sanskrit}).
KNOWLEDGE: ${sc.focus}
RULES: 1) Open with ONE Sanskrit shloka/mantra then blank line then wisdom. 2) **bold** key Sanskrit terms. 3) *italics* for Sanskrit words. 4) Call user "dear seeker". 5) Cite chapter/verse when relevant. 6) 4-6 sentences: poetic and profound.
LANGUAGE: Respond ENTIRELY in ${langLocale}. Sanskrit mantras at start always fine.`;

// ── Markdown renderer ──────────────────────────────────────────────────────────
const renderMD = (text, ac) => {
  if (!text) return null;
  return text.split("\n").map((line, li, arr) => {
    const tokens = [];
    const re = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
    let last = 0, m;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) tokens.push({ t: "text", v: line.slice(last, m.index) });
      if (m[0].startsWith("**")) tokens.push({ t: "bold", v: m[2] });
      else tokens.push({ t: "italic", v: m[3] });
      last = m.index + m[0].length;
    }
    if (last < line.length) tokens.push({ t: "text", v: line.slice(last) });
    return (
      <span key={li}>
        {tokens.map((tk, ti) =>
          tk.t === "bold" ? <strong key={ti} style={{ color: ac, fontWeight: 700 }}>{tk.v}</strong> :
            tk.t === "italic" ? <em key={ti} style={{ fontStyle: "italic", opacity: 0.8 }}>{tk.v}</em> :
              <span key={ti}>{tk.v}</span>
        )}
        {li < arr.length - 1 && <br />}
      </span>
    );
  });
};

// ── Om Avatar ──────────────────────────────────────────────────────────────────
const OmAvatar = ({ size = 32, color = "#f59e0b" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", flexShrink: 0,
    background: `radial-gradient(circle at 38% 38%, ${color}bb, #120824)`,
    boxShadow: `0 0 10px ${color}44`,
    border: `1px solid ${color}44`,
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
  }}>
    <span style={{
      fontFamily: "'Noto Sans Devanagari','Mangal',serif",
      fontSize: size * 0.46, color: "#fff", lineHeight: 1,
      marginTop: "0.08em", userSelect: "none",
    }}>ॐ</span>
  </div>
);

// ── Mandala ────────────────────────────────────────────────────────────────────
const Mandala = ({ color, size = 300, rev = false }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" style={{
    position: "absolute", opacity: 0.06, pointerEvents: "none",
    animation: `rotateSlow ${rev ? 70 : 50}s linear infinite ${rev ? "reverse" : ""}`,
  }}>
    <g transform="translate(150,150)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
        <g key={i} transform={`rotate(${a})`}>
          <ellipse rx={45 + i % 3 * 12} ry={9 + i % 2 * 5} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}
      {[22, 45, 70, 98, 125].map((r, i) => (
        <circle key={i} r={r} fill="none" stroke={color} strokeWidth={i === 2 ? "0.9" : "0.45"}
          opacity="0.22" strokeDasharray={i % 2 === 0 ? "3 5" : "7 3"} />
      ))}
    </g>
  </svg>
);

// ── Particles ──────────────────────────────────────────────────────────────────
const Particles = ({ color }) => {
  // Initialize particle positions once with a lazy state initializer
  const [pts] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 1.4 + 0.3,
      d: Math.random() * 6,
      dur: Math.random() * 4 + 3,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {pts.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, borderRadius: "50%",
          background: color, opacity: 0.22,
          animation: `twinkle ${p.dur}s ${p.d}s infinite alternate`,
        }} />
      ))}
    </div>
  );
};

// ── ChatGPT-style Message Row ──────────────────────────────────────────────────
const MessageRow = ({ msg, ac, isDark }) => {
  const isUser = msg.role === "user";
  const isInstant = !!msg.instant;
  const [shown, setShown] = useState(isInstant || isUser ? msg.content : "");
  const [done, setDone] = useState(isInstant || isUser);

  useEffect(() => {
    if (isUser || isInstant) {
      setShown(msg.content); setDone(true); return;
    }
    let i = 0; setShown(""); setDone(false);
    const t = setInterval(() => {
      i++; setShown(msg.content.slice(0, i));
      if (i >= msg.content.length) { clearInterval(t); setDone(true); }
    }, 15);
    return () => clearInterval(t);
  }, [msg.content, isInstant, isUser]);

  const isRTL = /[\u0600-\u06FF]/.test(shown);
  const tc = isDark ? "#e8e3d8" : "#2d1a00";
  const userBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

  if (isUser) {
    return (
      <div style={{
        display: "flex", justifyContent: "flex-end",
        padding: "6px 0", animation: "fadeUp 0.25s ease",
      }}>
        <div style={{
          maxWidth: "70%", padding: "10px 16px",
          borderRadius: "18px 4px 18px 18px",
          background: userBg,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
          color: tc, fontSize: 15, lineHeight: 1.7,
          fontFamily: "'Crimson Text',Georgia,serif",
          direction: isRTL ? "rtl" : "ltr", wordBreak: "break-word",
        }}>
          {shown}
        </div>
      </div>
    );
  }

  // Assistant message — ChatGPT style: avatar on left, plain text on right
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14,
      padding: "14px 0", animation: "fadeUp 0.25s ease",
      borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
    }}>
      {/* Avatar */}
      <div style={{ flexShrink: 0, marginTop: 2 }}>
        <OmAvatar size={32} color={ac} />
      </div>

      {/* Text — no bubble, just clean text like ChatGPT */}
      <div style={{
        flex: 1, minWidth: 0,
        color: tc, fontSize: 16, lineHeight: 1.85,
        fontFamily: "'Crimson Text',Georgia,serif",
        letterSpacing: "0.01em",
        direction: isRTL ? "rtl" : "ltr", wordBreak: "break-word",
      }}>
        {done ? renderMD(shown, ac) : (
          <>
            {shown}
            <span style={{
              display: "inline-block", width: 2, height: "1em",
              background: ac, marginLeft: 2,
              verticalAlign: "text-bottom", animation: "blink 0.7s infinite",
            }} />
          </>
        )}
      </div>
    </div>
  );
};

// ── Typing indicator ───────────────────────────────────────────────────────────
const TypingRow = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0" }}>
    <OmAvatar size={32} color={color} />
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: color,
          animation: `bounce 1.2s ${i * 0.2}s infinite`
        }} />
      ))}
      <span style={{
        color, fontSize: 13, fontFamily: "'Crimson Text',serif",
        marginLeft: 4, fontStyle: "italic", opacity: 0.75
      }}>{label}</span>
    </div>
  </div>
);

// ── Animated Theme Toggle ──────────────────────────────────────────────────────
const ThemeToggle = ({ isDark, toggle }) => (
  <button onClick={toggle} style={{
    width: 60, height: 30, borderRadius: 15, border: "none", cursor: "pointer",
    background: isDark ? "linear-gradient(135deg,#1a1040,#0d0820)"
      : "linear-gradient(135deg,#ffe066,#fbbf24)",
    position: "relative", overflow: "hidden", flexShrink: 0,
    boxShadow: isDark ? "0 0 0 1px #4f46e544,0 2px 8px #0008"
      : "0 0 0 1px #f59e0b55,0 2px 8px #f59e0b22",
    transition: "background 0.4s, box-shadow 0.4s",
  }}>
    {isDark && (
      <>
        {[{ top: "5px", left: "8px", s: 1.5 }, { top: "17px", left: "13px", s: 1 }, { top: "7px", left: "23px", s: 2 }].map((st, i) => (
          <div key={i} style={{
            position: "absolute", top: st.top, left: st.left,
            width: st.s, height: st.s, borderRadius: "50%", background: "#c7d2fe",
            animation: `starPulse ${1.4 + i * 0.5}s ${i * 0.25}s infinite alternate`,
          }} />
        ))}
        <div style={{
          position: "absolute", top: "50%", left: 6, marginTop: -7,
          width: 14, height: 14, borderRadius: "50%",
          border: "1px solid #818cf844",
          animation: "rotateSlow 3s linear infinite", pointerEvents: "none",
        }} />
      </>
    )}
    {!isDark && (
      <div style={{ position: "absolute", top: "50%", right: 9, transform: "translateY(-50%)" }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, left: 0,
            width: 10, height: 1.5, background: "#92400e",
            borderRadius: 2, opacity: 0.45, transformOrigin: "0 50%",
            transform: `rotate(${i * 45}deg) translateX(5px)`,
            animation: `rayPulse 2s ${i * 0.12}s infinite alternate`,
          }} />
        ))}
      </div>
    )}
    <div style={{
      position: "absolute", top: 2.5,
      left: isDark ? 2.5 : 32,
      width: 25, height: 25, borderRadius: "50%",
      background: isDark ? "linear-gradient(135deg,#e0e7ff,#a5b4fc)"
        : "linear-gradient(135deg,#fef3c7,#f59e0b)",
      boxShadow: isDark ? "0 0 10px #818cf899" : "0 0 12px #f59e0baa",
      transition: "left 0.33s cubic-bezier(0.34,1.56,0.64,1)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, zIndex: 1,
    }}>
      {isDark ? "🌙" : "☀️"}
    </div>
  </button>
);

// ── Language Picker ────────────────────────────────────────────────────────────
const LangPicker = ({ lang, setLang, ac, isDark }) => {
  const [open, setOpen] = useState(false);
  const cur = LANGUAGES.find(l => l.code === lang);
  const ref = useRef(null);
  const bg = isDark ? "#0d0b1e" : "#fffbf0";
  const tc = isDark ? "#d4cfc5" : "#3a1a00";
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn); return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "8px 11px", gap: 6, cursor: "pointer",
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${ac}30`, borderRadius: 8, color: tc,
        fontFamily: "'Crimson Text',serif", fontSize: 13, transition: "all 0.2s",
      }}>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span>{cur.flag}</span><span>{cur.label}</span>
        </span>
        <span style={{ fontSize: 8, opacity: 0.4 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 5px)", left: 0, right: 0, zIndex: 500,
          background: bg, border: `1px solid ${ac}28`, borderRadius: 10, overflow: "hidden",
          boxShadow: `0 -8px 30px rgba(0,0,0,0.4)`,
        }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px",
              background: l.code === lang ? `${ac}16` : "transparent",
              border: "none", cursor: "pointer", color: l.code === lang ? ac : tc,
              fontFamily: "'Crimson Text',serif", fontSize: 13, textAlign: "left",
              borderLeft: `2px solid ${l.code === lang ? ac : "transparent"}`,
            }}
              onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = "transparent"; }}
            >
              <span>{l.flag}</span><span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const LOADING_LABELS = {
  en: "Consulting the ancient texts…", hi: "प्राचीन ग्रंथों में खोज रहा हूँ…",
  sa: "शास्त्रेषु अन्वेष्यते…", gu: "પ્રાચીન ગ્રંથોની શોધ ચાલી રહી છે…",
  ta: "பழமையான நூல்களை ஆராய்கிறேன்…", fr: "Consultation des textes anciens…",
  es: "Consultando los textos sagrados…", ar: "يستشير النصوص القديمة…",
};

// ── Storage helpers ────────────────────────────────────────────────────────────
const saveSessions = s => {
  try {
    localStorage.setItem(HIST_KEY, JSON.stringify(s));
  } catch (e) {
    console.error("Failed to save sessions", e);
  }
};
const loadSessions = () => {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
  } catch (e) {
    console.error("Failed to load sessions", e);
    return [];
  }
};

export default function VedicOracle() {
  const [sc, setSc] = useState(SCRIPTURES[0]);
  const [lang, setLang] = useState("en");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState("All");
  const [errMsg, setErrMsg] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [sideOpen, setSideOpen] = useState(true);
  const [sideTab, setSideTab] = useState("scriptures");
  const [sessions, setSessions] = useState(() => loadSessions());
  const [activeSession, setActiveSession] = useState(null);

  const bottomRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const skipWelcome = useRef(false);
  const ac = sc.color;

  // ── Theme tokens ──────────────────────────────────────────────────────────────
  const T = {
    pageBg: isDark ? "#0a0814" : "#fdf6e3",
    sideBg: isDark ? "#080612" : "#fef9ec",
    chatBg: isDark ? "transparent" : "transparent",
    headerBg: isDark ? "rgba(8,6,18,0.9)" : "rgba(254,249,236,0.92)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    acBorder: isDark ? `${ac}20` : `${ac}28`,
    divider: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#e8e3d8" : "#2d1a00",
    subtext: isDark ? "#6a6560" : "#7a5a2a",
    muted: isDark ? "#3a3830" : "#b09060",
    inputBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    itemHover: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    activeItem: isDark ? `${ac}16` : `${ac}14`,
    thumb: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
  };

  const makeWelcome = (s) => ({
    role: "assistant", id: makeId(), instant: true,
    content: `${s.mantra} 🙏\n\nI am the **Vedic Oracle**, keeper of *${s.name}* (${s.sanskrit}). The wisdom of *${s.desc.toLowerCase()}* flows through me. Ask me anything, dear seeker — the light of the ancients shall illuminate your path.`,
  });

  const saveToHistory = (currentMsgs, currentSc) => {
    const userMsgs = currentMsgs.filter(m => m.role === "user");
    if (!userMsgs.length) return;
    const title = userMsgs[0].content.slice(0, 55) + (userMsgs[0].content.length > 55 ? "…" : "");
    const session = {
      id: makeId(), title, scId: currentSc.id,
      scName: currentSc.name, scSymbol: currentSc.symbol, scColor: currentSc.color,
      ts: Date.now(), msgs: currentMsgs
    };
    const updated = [session, ...loadSessions()].slice(0, 50);
    saveSessions(updated); setSessions(updated);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { setMsgs([makeWelcome(SCRIPTURES[0])]); return; }
      const saved = JSON.parse(raw);
      const savedSc = SCRIPTURES.find(s => s.id === saved.scId) || SCRIPTURES[0];
      skipWelcome.current = true;
      setSc(savedSc);
      if (saved.lang && LANGUAGES.some(l => l.code === saved.lang)) setLang(saved.lang);
      if (saved.isDark !== undefined) setIsDark(saved.isDark);
      setMsgs(Array.isArray(saved.msgs) && saved.msgs.length
        ? saved.msgs.map(m => ({ ...m, instant: true }))
        : [makeWelcome(savedSc)]);
    } catch (e) {
      console.error("Failed to load app state", e);
      setMsgs([makeWelcome(SCRIPTURES[0])]);
    }
  }, []);

  useEffect(() => {
    if (skipWelcome.current) { skipWelcome.current = false; return; }
    setMsgs([makeWelcome(sc)]); setErrMsg(""); setActiveSession(null);
  }, [sc, lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scId: sc.id, lang, msgs, isDark }));
    } catch (e) {
      console.error("Failed to persist app state", e);
    }
  }, [sc.id, lang, msgs, isDark]);

  useEffect(() => {
    if (!listRef.current) return;
    const timeoutId = setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [msgs, loading]);

  const filtered = cat === "All" ? SCRIPTURES : SCRIPTURES.filter(s => s.category === cat);

  const newChat = () => {
    if (msgs.filter(m => m.role === "user").length > 0) saveToHistory(msgs, sc);
    setMsgs([makeWelcome(sc)]); setErrMsg(""); setActiveSession(null); setInput("");
  };

  const restoreSession = (session) => {
    const restoredSc = SCRIPTURES.find(s => s.id === session.scId) || sc;
    skipWelcome.current = true;
    setSc(restoredSc);
    setMsgs(session.msgs.map(m => ({ ...m, instant: true })));
    setActiveSession(session.id); setErrMsg("");
    setSideTab("scriptures");
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    saveSessions(updated); setSessions(updated);
    if (activeSession === id) setActiveSession(null);
  };

  const timeLabel = ts => {
    const d = Date.now() - ts;
    if (d < 60000) return "Just now";
    if (d < 3600000) return `${Math.floor(d / 60000)}m ago`;
    if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  const send = async () => {
    const text = input.trim(); if (!text || loading) return;
    const userMsg = { role: "user", content: text, id: makeId(), ts: Date.now() };
    const updated = [...msgs, userMsg];
    setMsgs(updated); setInput(""); setErrMsg(""); setLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: buildPrompt(sc, LANGUAGES.find(l => l.code === lang).locale) },
            ...updated.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 1000,
        }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e?.error?.message || `HTTP ${res.status}`); }
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const reply = data.choices?.[0]?.message?.content;
      if (!reply) throw new Error("Empty response");
      setMsgs([...updated, { role: "assistant", content: reply, id: makeId(), ts: Date.now() }]);
    } catch (e) {
      setErrMsg(`⚠ ${e.message || "Connection lost"}`);
      setMsgs([...updated, { role: "assistant", content: `*ॐ शान्तिः* — A ripple disturbs the cosmic waters. Please ask again, dear seeker.`, id: makeId(), instant: true }]);
    } finally {
      setLoading(false); setTimeout(() => inputRef.current?.focus(), 80);
    }
  };

  const hasConversation = msgs.filter(m => m.role === "user").length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Noto+Sans+Devanagari:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{height:100%;width:100%;overflow:hidden;}
        #root{height:100%;width:100%;}
        body{background:${T.pageBg};}
        @keyframes twinkle{from{opacity:0.06;transform:scale(0.6);}to{opacity:0.6;transform:scale(1.3);}}
        @keyframes bounce{0%,100%{transform:translateY(0);opacity:0.3;}50%{transform:translateY(-6px);opacity:1;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes rotateSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes starPulse{from{opacity:0.2;transform:scale(0.7);}to{opacity:1;transform:scale(1.6);}}
        @keyframes rayPulse{from{opacity:0.2;width:7px;}to{opacity:0.55;width:13px;}}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{border-radius:4px;background:${T.thumb};}
        textarea::placeholder{color:${T.muted};}
      `}</style>

      <div style={{
        position: "fixed", inset: 0,
        display: "flex", flexDirection: "row",
        height: "100dvh",
        background: isDark
          ? `radial-gradient(ellipse at 20% 10%, ${ac}0b 0%, #0a0814 60%)`
          : `radial-gradient(ellipse at 20% 10%, ${ac}07 0%, #fdf6e3 65%)`,
        fontFamily: "'Crimson Text',Georgia,serif",
        transition: "background 0.5s",
        overflow: "hidden",
      }}>

        {/* ═══════════════ SIDEBAR ═══════════════ */}
        <div style={{
          width: sideOpen ? 260 : 0, minWidth: sideOpen ? 260 : 0,
          height: "100dvh", flexShrink: 0, zIndex: 20,
          background: T.sideBg,
          borderRight: `1px solid ${T.border}`,
          display: "flex", flexDirection: "column", overflow: "hidden",
          transition: "width 0.26s ease, min-width 0.26s ease",
          boxShadow: sideOpen ? `1px 0 20px rgba(0,0,0,${isDark ? 0.5 : 0.06})` : "none",
        }}>
          {sideOpen && (<>
            {/* Logo row */}
            <div style={{
              padding: "14px 14px 12px",
              borderBottom: `1px solid ${T.divider}`,
              display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
            }}>
              <div style={{ position: "relative" }}>
                <OmAvatar size={36} color={ac} />
                <div style={{
                  position: "absolute", inset: -3, borderRadius: "50%",
                  border: `1.5px solid ${ac}24`, borderTopColor: ac,
                  animation: "rotateSlow 9s linear infinite", pointerEvents: "none",
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: 12, fontWeight: 700,
                  color: T.text, letterSpacing: "0.14em"
                }}>VEDIC ORACLE</div>
                <div style={{
                  fontSize: 8, color: ac, letterSpacing: "0.1em",
                  fontFamily: "'Cinzel',serif", opacity: 0.65, marginTop: 1
                }}>ANCIENT WISDOM · AI</div>
              </div>
              <button onClick={newChat} title="New chat" style={{
                width: 28, height: 28, borderRadius: 7, border: `1px solid ${T.acBorder}`,
                background: "transparent", color: ac, fontSize: 19, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s", flexShrink: 0,
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${ac}16`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >+</button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
              {[["scriptures", "📜 Scriptures"], ["history", "🕐 History"]].map(([tab, label]) => (
                <button key={tab} onClick={() => setSideTab(tab)} style={{
                  flex: 1, padding: "8px 4px", border: "none",
                  background: sideTab === tab ? `${ac}12` : "transparent",
                  borderBottom: `2px solid ${sideTab === tab ? ac : "transparent"}`,
                  color: sideTab === tab ? ac : T.subtext, cursor: "pointer",
                  fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: "0.07em",
                  transition: "all 0.14s",
                }}>{label}</button>
              ))}
            </div>

            {/* ── SCRIPTURES TAB ── */}
            {sideTab === "scriptures" && (<>
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 4,
                padding: "8px 10px 7px",
                borderBottom: `1px solid ${T.divider}`, flexShrink: 0,
              }}>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCat(c)} style={{
                    padding: "2px 7px", borderRadius: 20, cursor: "pointer",
                    background: cat === c ? `${ac}18` : "transparent",
                    border: `1px solid ${cat === c ? ac : T.acBorder}`,
                    color: cat === c ? ac : T.muted,
                    fontFamily: "'Cinzel',serif", fontSize: 7.5, letterSpacing: "0.06em",
                    transition: "all 0.13s",
                  }}>{c}</button>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "6px 8px 4px" }}>
                {filtered.map(s => {
                  const active = sc.id === s.id;
                  return (
                    <button key={s.id} onClick={() => setSc(s)} style={{
                      display: "flex", alignItems: "center", gap: 9, width: "100%",
                      padding: "8px 9px", borderRadius: 9, cursor: "pointer", textAlign: "left",
                      background: active ? T.activeItem : "transparent",
                      border: `1px solid ${active ? s.color + "38" : "transparent"}`,
                      boxShadow: active ? `0 0 10px ${s.glow}` : "none",
                      marginBottom: 2, transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.itemHover; e.currentTarget.style.transform = "translateX(2px)"; } }}
                      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; } }}
                    >
                      <div style={{
                        width: 30, height: 30, borderRadius: 7, flexShrink: 0,
                        background: active ? `${s.color}18` : `${s.color}0a`,
                        border: `1px solid ${active ? s.color : s.color + "22"}`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                      }}>{s.symbol}</div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{
                          fontFamily: "'Cinzel',serif", fontSize: 9.5,
                          color: active ? s.color : T.text, fontWeight: active ? 600 : 400,
                          letterSpacing: "0.04em",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{s.name}</div>
                        <div style={{
                          fontSize: 9.5, color: T.subtext, marginTop: 1,
                          fontFamily: "'Noto Sans Devanagari',serif",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>{s.sanskrit}</div>
                      </div>
                      <span style={{
                        fontSize: 7, fontFamily: "'Cinzel',serif",
                        color: active ? s.color : T.muted, flexShrink: 0,
                        background: active ? `${s.color}12` : "transparent",
                        border: `1px solid ${active ? s.color + "30" : "transparent"}`,
                        padding: "1px 5px", borderRadius: 20,
                      }}>{s.category}</span>
                    </button>
                  );
                })}
              </div>
            </>)}

            {/* ── HISTORY TAB ── */}
            {sideTab === "history" && (
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px 4px" }}>
                {sessions.length === 0 ? (
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", height: 180, gap: 8, opacity: 0.45
                  }}>
                    <div style={{ fontSize: 26 }}>🕐</div>
                    <div style={{
                      fontFamily: "'Cinzel',serif", fontSize: 8.5,
                      color: T.subtext, letterSpacing: "0.1em", textAlign: "center"
                    }}>NO HISTORY YET</div>
                    <div style={{
                      fontSize: 11, color: T.muted, textAlign: "center",
                      fontFamily: "'Crimson Text',serif", lineHeight: 1.5
                    }}>
                      Click 💾 Save in the header to save a chat
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "2px 4px 8px", alignItems: "center"
                    }}>
                      <span style={{
                        fontFamily: "'Cinzel',serif", fontSize: 8,
                        color: T.muted, letterSpacing: "0.1em"
                      }}>{sessions.length} CHATS</span>
                      <button onClick={() => {
                        if (window.confirm("Clear all history?")) { saveSessions([]); setSessions([]); setActiveSession(null); }
                      }} style={{
                        background: "transparent", border: "none", cursor: "pointer",
                        color: "#f87171", fontSize: 10, fontFamily: "'Cinzel',serif", letterSpacing: "0.04em",
                      }}>CLEAR ALL</button>
                    </div>
                    {sessions.map(s => {
                      const isActive = activeSession === s.id;
                      return (
                        <div key={s.id} onClick={() => restoreSession(s)} style={{
                          display: "flex", alignItems: "flex-start", gap: 8,
                          padding: "8px 9px", borderRadius: 9, cursor: "pointer",
                          marginBottom: 3,
                          background: isActive ? `${s.scColor}14` : T.itemHover,
                          border: `1px solid ${isActive ? s.scColor + "38" : "transparent"}`,
                          transition: "all 0.15s",
                        }}
                          onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = T.acBorder; }}
                          onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = "transparent"; }}
                        >
                          <div style={{
                            width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                            background: `${s.scColor}14`, border: `1px solid ${s.scColor}28`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, marginTop: 1,
                          }}>{s.scSymbol}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: 12, color: T.text,
                              fontFamily: "'Crimson Text',serif",
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                            }}>
                              {s.title}
                            </div>
                            <div style={{
                              fontSize: 9, color: T.subtext, marginTop: 2,
                              display: "flex", gap: 4, alignItems: "center"
                            }}>
                              <span style={{
                                fontFamily: "'Cinzel',serif", fontSize: 7,
                                color: s.scColor, letterSpacing: "0.04em"
                              }}>{s.scName}</span>
                              <span>·</span>
                              <span>{timeLabel(s.ts)}</span>
                            </div>
                          </div>
                          <button onClick={(e) => deleteSession(s.id, e)} style={{
                            background: "transparent", border: "none", cursor: "pointer",
                            color: "#f87171", fontSize: 14, lineHeight: 1, flexShrink: 0,
                            opacity: 0.4, transition: "opacity 0.15s", padding: "1px",
                          }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "0.4"}
                          >×</button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}

            {/* Bottom: lang + theme */}
            <div style={{
              padding: "10px 10px 14px",
              borderTop: `1px solid ${T.divider}`,
              display: "flex", flexDirection: "column", gap: 9, flexShrink: 0,
            }}>
              <LangPicker lang={lang} setLang={setLang} ac={ac} isDark={isDark} />
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "0 2px"
              }}>
                <span style={{
                  fontFamily: "'Cinzel',serif", fontSize: 8.5,
                  color: T.subtext, letterSpacing: "0.1em", userSelect: "none"
                }}>
                  {isDark ? "🌙 DARK MODE" : "☀️ LIGHT MODE"}
                </span>
                <ThemeToggle isDark={isDark} toggle={() => setIsDark(d => !d)} />
              </div>
            </div>
          </>)}
        </div>

        {/* ═══════════════ MAIN CHAT AREA ═══════════════ */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          height: "100dvh", overflow: "hidden",
          position: "relative", minWidth: 0,
        }}>
          <Particles color={ac} />
          <div style={{ position: "absolute", top: "-5%", right: "-4%", pointerEvents: "none", zIndex: 0 }}>
            <Mandala color={ac} size={340} />
          </div>
          <div style={{ position: "absolute", bottom: "-5%", left: "-3%", pointerEvents: "none", zIndex: 0 }}>
            <Mandala color={ac} size={260} rev />
          </div>

          {/* Header bar */}
          <div style={{
            padding: "9px 18px",
            borderBottom: `1px solid ${T.border}`,
            background: T.headerBg,
            backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", gap: 10,
            flexShrink: 0, zIndex: 2, position: "relative",
          }}>
            <button onClick={() => setSideOpen(o => !o)} title={sideOpen ? "Close sidebar" : "Open sidebar"} style={{
              width: 32, height: 32, borderRadius: 7,
              border: `1px solid ${sideOpen ? ac : T.border}`,
              background: sideOpen ? `${ac}16` : "transparent",
              cursor: "pointer", flexShrink: 0,
              color: sideOpen ? ac : T.subtext, fontSize: 15,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${ac}18`; e.currentTarget.style.color = ac; e.currentTarget.style.borderColor = ac; }}
              onMouseLeave={e => { e.currentTarget.style.background = sideOpen ? `${ac}16` : "transparent"; e.currentTarget.style.color = sideOpen ? ac : T.subtext; e.currentTarget.style.borderColor = sideOpen ? ac : T.border; }}
            >{sideOpen ? "◀" : "▶"}</button>

            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 17 }}>{sc.symbol}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 600,
                  color: T.text, letterSpacing: "0.1em", whiteSpace: "nowrap"
                }}>{sc.name}</div>
                <div style={{
                  fontSize: 9, color: ac, letterSpacing: "0.06em",
                  fontFamily: "'Cinzel',serif", opacity: 0.7
                }}>{sc.sanskrit} · {sc.category}</div>
              </div>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => { saveToHistory(msgs, sc); setSideTab("history"); if (!sideOpen) setSideOpen(true); }}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                  background: "transparent", border: `1px solid ${T.border}`,
                  color: T.subtext, fontFamily: "'Cinzel',serif", fontSize: 8.5,
                  letterSpacing: "0.07em", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ac; e.currentTarget.style.color = ac; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.subtext; }}
              >💾 SAVE</button>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#22c55e", boxShadow: "0 0 7px #22c55e"
                }} />
                <span style={{
                  color: "#4ade80", fontSize: 8.5,
                  fontFamily: "'Cinzel',serif", letterSpacing: "0.08em"
                }}>LIVE</span>
              </div>
            </div>
          </div>

          {/* Messages scroll area */}
          <div ref={listRef} style={{
            flex: "1 1 auto", overflowY: "auto", position: "relative", zIndex: 1,
            minHeight: 0,
          }}>
            <div style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "24px 24px 0",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}>

              {/* Welcome screen — shown when no user messages yet */}
              {!hasConversation && (
                <div style={{
                  textAlign: "center",
                  padding: "24px 20px 16px",
                  animation: "fadeUp 0.4s ease",
                  marginTop: "auto",
                }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 64, height: 64, borderRadius: "50%", marginBottom: 20,
                    background: `radial-gradient(circle at 38% 38%, ${ac}bb, #120824)`,
                    boxShadow: `0 0 28px ${ac}55`,
                    border: `1px solid ${ac}44`,
                    position: "relative",
                  }}>
                    <span style={{
                      fontFamily: "'Noto Sans Devanagari',serif",
                      fontSize: 28, color: "#fff", lineHeight: 1, marginTop: "0.08em"
                    }}>ॐ</span>
                    <div style={{
                      position: "absolute", inset: -5, borderRadius: "50%",
                      border: `1.5px solid ${ac}30`, borderTopColor: ac,
                      animation: "rotateSlow 8s linear infinite", pointerEvents: "none",
                    }} />
                  </div>
                  <div style={{
                    fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 700,
                    color: T.text, letterSpacing: "0.1em", marginBottom: 6
                  }}>
                    Vedic Oracle
                  </div>
                  <div style={{
                    fontFamily: "'Crimson Text',serif", fontSize: 15,
                    color: T.subtext, marginBottom: 8, fontStyle: "italic"
                  }}>
                    {sc.name} · {sc.desc}
                  </div>
                  <div style={{
                    fontFamily: "'Noto Sans Devanagari',serif", fontSize: 13,
                    color: ac, opacity: 0.75, marginBottom: 28, letterSpacing: "0.05em"
                  }}>
                    {sc.mantra}
                  </div>
                  <div style={{
                    display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 8, maxWidth: 560, margin: "0 auto",
                  }}>
                    {sc.suggestions.map(s => (
                      <button key={s} onClick={() => {
                        // auto-send directly on suggestion click
                        const text = s.trim();
                        if (!text || loading) return;
                        const userMsg = { role: "user", content: text, id: makeId(), ts: Date.now() };
                        const updated = [...msgs, userMsg];
                        setMsgs(updated); setInput(""); setErrMsg(""); setLoading(true);
                        fetch("https://api.groq.com/openai/v1/chat/completions", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` },
                          body: JSON.stringify({
                            model: "llama-3.3-70b-versatile",
                            messages: [
                              { role: "system", content: buildPrompt(sc, LANGUAGES.find(l => l.code === lang).locale) },
                              ...updated.map(m => ({ role: m.role, content: m.content })),
                            ],
                            max_tokens: 1000,
                          }),
                        }).then(r => r.json()).then(data => {
                          const reply = data.choices?.[0]?.message?.content;
                          if (reply) setMsgs([...updated, { role: "assistant", content: reply, id: makeId(), ts: Date.now() }]);
                          else throw new Error("Empty");
                        }).catch(e => {
                          setErrMsg(`⚠ ${e.message}`);
                          setMsgs([...updated, { role: "assistant", content: `*ॐ शान्तिः* — A ripple disturbs the cosmic waters. Please ask again, dear seeker.`, id: makeId(), instant: true }]);
                        }).finally(() => { setLoading(false); setTimeout(() => inputRef.current?.focus(), 80); });
                      }} style={{
                        padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                        background: T.inputBg,
                        border: `1px solid ${T.border}`,
                        color: T.text, fontSize: 13,
                        fontFamily: "'Crimson Text',serif",
                        transition: "all 0.16s", lineHeight: 1.4,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = ac; e.currentTarget.style.background = `${ac}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.inputBg; }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* ALL messages — skip the initial welcome assistant message, show everything else */}
              {msgs.filter(m => !(m.instant && m.role === "assistant" && !hasConversation)).map((msg, i) => (
                <MessageRow key={`${sc.id}-${i}`} msg={msg} ac={ac} isDark={isDark} />
              ))}

              {loading && <TypingRow color={ac} label={LOADING_LABELS[lang] || LOADING_LABELS.en} />}

              {errMsg && (
                <div style={{
                  margin: "8px 0", padding: "10px 14px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.22)",
                  borderRadius: 8, color: "#f87171", fontSize: 12,
                }}>{errMsg}</div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input bar */}
          <div style={{
            padding: "10px 20px 0",
            background: T.headerBg,
            backdropFilter: "blur(20px)",
            borderTop: `1px solid ${T.border}`,
            flexShrink: 0, zIndex: 2, position: "relative",
            marginTop: "auto",
          }}>
            <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
              <textarea ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={`Ask about ${sc.name}… (Enter to send)`}
                rows={1}
                style={{
                  flex: 1,
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  borderRadius: 12, padding: "12px 16px",
                  color: T.text, fontSize: 15,
                  fontFamily: "'Crimson Text',Georgia,serif",
                  resize: "none", outline: "none", lineHeight: 1.6,
                  maxHeight: 120, overflowY: "auto",
                  caretColor: ac, transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = `${ac}55`; e.target.style.boxShadow = `0 0 0 3px ${ac}12`; }}
                onBlur={e => { e.target.style.borderColor = T.inputBorder; e.target.style.boxShadow = "none"; }}
              />
              <button onClick={send} disabled={!input.trim() || loading} style={{
                width: 44, height: 44, borderRadius: "50%", border: "none",
                background: input.trim() && !loading
                  ? `linear-gradient(135deg, ${ac}, ${ac}88)`
                  : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
                boxShadow: input.trim() && !loading ? `0 0 16px ${ac}55` : "none",
              }}>
                {loading
                  ? <div style={{
                    width: 15, height: 15, border: `2px solid ${ac}`,
                    borderTopColor: "transparent", borderRadius: "50%",
                    animation: "rotateSlow 0.8s linear infinite"
                  }} />
                  : <span style={{ color: input.trim() ? "#fff" : isDark ? "#444" : "#bbb", fontSize: 17 }}>↑</span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}