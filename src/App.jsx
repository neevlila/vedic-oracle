import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code:"en", label:"English",   flag:"🇬🇧", locale:"English" },
  { code:"hi", label:"हिन्दी",    flag:"🇮🇳", locale:"Hindi" },
  { code:"sa", label:"संस्कृतम्", flag:"🕉️",  locale:"Sanskrit" },
  { code:"gu", label:"ગુજરાતી",  flag:"🇮🇳", locale:"Gujarati" },
  { code:"ta", label:"தமிழ்",    flag:"🇮🇳", locale:"Tamil" },
  { code:"fr", label:"Français",  flag:"🇫🇷", locale:"French" },
  { code:"es", label:"Español",   flag:"🇪🇸", locale:"Spanish" },
  { code:"ar", label:"العربية",   flag:"🇸🇦", locale:"Arabic" },
];

const SCRIPTURES = [
  {
    id:"rig", category:"Veda", name:"Rigveda", sanskrit:"ऋग्वेद",
    symbol:"ॐ", color:"#f59e0b", glow:"#f59e0b55",
    desc:"Hymns of Creation & Gods",
    mantra:"ॐ तत्सवितुर्वरेण्यम्",
    focus:`the Rigveda — humanity's oldest scripture with 1028 hymns (suktas) dedicated to Agni (fire), Indra (thunder), Soma (divine nectar), Varuna (cosmic law), and Surya (sun). You know the Nasadiya Sukta (Creation Hymn), Purusha Sukta, Gayatri Mantra, and the concept of Rta (cosmic truth/order).`,
    suggestions:["Who is Agni, the fire god?","What is the Gayatri Mantra?","Explain Nasadiya Sukta — creation hymn","What is Rta — the cosmic order?"],
  },
  {
    id:"sama", category:"Veda", name:"Samaveda", sanskrit:"सामवेद",
    symbol:"♪", color:"#10b981", glow:"#10b98155",
    desc:"Melodies & Sacred Chants",
    mantra:"ॐ आप्यायस्व समेतु ते",
    focus:`the Samaveda — the Veda of song with 1875 verses set to musical notation. You know the Udgitha (OM chant), Sama Gana (sacred songs), Nada Brahman (sound as God), how music heals the soul, and how chanting mantras creates vibrations that connect humans to the divine.`,
    suggestions:["What is Nada Brahman — sound as God?","How does chanting heal the soul?","What is the Udgitha?","Why is OM the most sacred sound?"],
  },
  {
    id:"yajur", category:"Veda", name:"Yajurveda", sanskrit:"यजुर्वेद",
    symbol:"🔥", color:"#ef4444", glow:"#ef444455",
    desc:"Rituals & Sacrificial Rites",
    mantra:"ॐ इषे त्वोर्जे त्वा",
    focus:`the Yajurveda — the Veda of ritual action with Shukla (White) and Krishna (Black) branches. You know Yajna (fire sacrifice), the Shatapatha Brahmana, Sri Rudram, Chamakam, and the deeper meaning of rituals as internal purification, karma, and dharma.`,
    suggestions:["What is Yajna sacrifice?","Explain the Sri Rudram","How does karma purify the soul?","What is the inner meaning of fire rituals?"],
  },
  {
    id:"atharva", category:"Veda", name:"Atharvaveda", sanskrit:"अथर्ववेद",
    symbol:"✦", color:"#8b5cf6", glow:"#8b5cf655",
    desc:"Magic, Healing & Secret Arts",
    mantra:"ॐ शन्नो देवीरभिष्टय",
    focus:`the Atharvaveda — Veda of everyday life with healing hymns (Ayurveda roots), protection mantras (kavachas), the Prithvi Sukta (Hymn to Mother Earth), tantra knowledge, and secret wisdom not found in other Vedas. You know herbs, spells, and cosmic healing.`,
    suggestions:["What are the best protection mantras?","Atharvaveda roots of Ayurveda","What is the Prithvi Sukta — hymn to Earth?","Secret tantra knowledge"],
  },
  {
    id:"upanishad", category:"Upanishad", name:"Upanishads", sanskrit:"उपनिषद्",
    symbol:"🔆", color:"#06b6d4", glow:"#06b6d455",
    desc:"Secret Wisdom — Brahman & Atman",
    mantra:"ॐ पूर्णमदः पूर्णमिदम्",
    focus:`the 108 Upanishads — pinnacle of Vedic philosophy. You deeply know: Brihadaranyaka, Chandogya (Tat Tvam Asi), Katha (death and immortality), Mundaka, Mandukya (OM's 4 states), Isha, Kena, Prasna, Taittiriya, Aitareya. You understand Brahman, Atman, Maya, the 4 Mahavakyas, and paths to Moksha.`,
    suggestions:["What is Tat Tvam Asi — Thou Art That?","What is Brahman vs Atman?","Explain Maya — the cosmic illusion","How to attain Moksha — liberation?"],
  },
  {
    id:"gita", category:"Itihasa", name:"Bhagavad Gita", sanskrit:"भगवद्गीता",
    symbol:"🪷", color:"#0ea5e9", glow:"#0ea5e955",
    desc:"Krishna's Divine Song — 18 Chapters",
    mantra:"ॐ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    focus:`the Bhagavad Gita — all 18 chapters of Krishna's dialogue with Arjuna. You know Karma Yoga (Ch.3), Jnana Yoga (Ch.4), Bhakti Yoga (Ch.12), the immortal soul (Ch.2 — "never the spirit was born"), Vishwarupa (Ch.11 — cosmic form), the three Gunas (Ch.14), Nishkama Karma, field and knower of the field (Ch.13), surrender (Ch.18).`,
    suggestions:["What is Nishkama Karma?","Explain Krishna's Vishwarupa — cosmic form","What are Sattva, Rajas, Tamas?","How to overcome fear — Gita Chapter 2"],
  },
  {
    id:"ramayana", category:"Itihasa", name:"Ramayana", sanskrit:"रामायण",
    symbol:"🏹", color:"#f97316", glow:"#f9731655",
    desc:"Epic of Lord Rama — Dharma & Devotion",
    mantra:"श्री राम जय राम जय जय राम",
    focus:`the Valmiki Ramayana (24,000 shlokas) and Ramcharitmanas of Tulsidas. You know all 7 Kandas: Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha, Uttara. You understand Rama as Maryada Purushottam (ideal man), Sita's spiritual strength, Hanuman's devotion and power, Ravana's ego vs wisdom, and the spiritual symbolism throughout.`,
    suggestions:["Who is Hanuman and his powers?","Why is Rama called Maryada Purushottam?","Deeper meaning of Sita's abduction","Tell me about Ravana's ten heads — symbolism"],
  },
  {
    id:"mahabharata", category:"Itihasa", name:"Mahabharata", sanskrit:"महाभारत",
    symbol:"⚔️", color:"#dc2626", glow:"#dc262655",
    desc:"Great War of Dharma — 100,000 Verses",
    mantra:"ॐ धर्मो रक्षति रक्षितः",
    focus:`the Mahabharata — 100,000 shlokas across 18 Parvas. You know the Pandavas and Kauravas, Krishna's divine role, Bhishma's vow and death, Karna's tragedy, Draupadi's humiliation, Arjuna's glory, Shakuni's schemes, Vidura Niti (statecraft), the Yaksha Prashna (Yudhishthira's wisdom test), Shanti Parva's teachings, and dharma sankat (ethical dilemmas).`,
    suggestions:["Why is Karna the greatest tragic hero?","What is the Yaksha Prashna?","Bhishma's wisdom on Kurukshetra deathbed","Why did Krishna allow the war?"],
  },
  {
    id:"bhagavat", category:"Purana", name:"Srimad Bhagavatam", sanskrit:"श्रीमद्भागवतम्",
    symbol:"🌺", color:"#ec4899", glow:"#ec489955",
    desc:"Vishnu's Stories — 18,000 Verses",
    mantra:"ॐ नमो भगवते वासुदेवाय",
    focus:`the Srimad Bhagavatam (Bhagavata Purana) — 12 Skandhas, 18,000 verses. You know Krishna's full life (Skandha 10) — birth in Mathura, childhood in Vrindavan, Rasa Lila with Gopis, slaying of Kamsa, Dwarka kingdom. Also Prahlada's devotion, Dhruva's tapasya, King Parikshit's story, Shuka's narration, the 24 avatars of Vishnu, and pure Bhakti philosophy.`,
    suggestions:["Tell me about Krishna's Rasa Lila","Story of Prahlada and Narasimha","What are the 24 avatars of Vishnu?","Story of Dhruva — the child devotee"],
  },
  {
    id:"puranas", category:"Purana", name:"18 Mahapuranas", sanskrit:"अष्टादश पुराण",
    symbol:"📿", color:"#a78bfa", glow:"#a78bfa55",
    desc:"Stories of Creation, Gods & Cosmos",
    mantra:"ॐ नमः शिवाय",
    focus:`all 18 Mahapuranas: Brahma, Padma, Vishnu, Shiva, Bhagavata, Narada, Markandeya, Agni, Bhavishya, Brahmavaivarta, Linga, Varaha, Skanda, Vamana, Kurma, Matsya, Garuda, Brahmanda. You know Shiva-Parvati's love story, Durga Saptashati (700 verses to Devi), Samudra Manthan (ocean churning), cosmology of yugas, and creation-dissolution cycles.`,
    suggestions:["Story of Samudra Manthan — ocean churning","Shiva and Parvati's love story","What is the Durga Saptashati?","What are the four Yugas?"],
  },
  {
    id:"yoga", category:"Darshana", name:"Yoga Sutras", sanskrit:"योगसूत्र",
    symbol:"🧘", color:"#34d399", glow:"#34d39955",
    desc:"Patanjali's Science of Mind & Liberation",
    mantra:"ॐ योगश्चित्तवृत्तिनिरोधः",
    focus:`Patanjali's Yoga Sutras — 196 aphorisms in 4 Padas: Samadhi, Sadhana, Vibhuti, Kaivalya. You know Ashtanga Yoga's 8 limbs (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi), Chitta Vritti Nirodha (stilling the mind), 5 Kleshas (afflictions), Samskaras, Siddhis (supernatural powers), Viveka Khyati, and Kaivalya (liberation).`,
    suggestions:["What are the 8 limbs of Ashtanga Yoga?","How to still the mind — Chitta Vritti","What are the Siddhis — supernatural powers?","What is Kaivalya — ultimate liberation?"],
  },
];

const CATEGORIES = ["All","Veda","Upanishad","Itihasa","Purana","Darshana"];

// ── Local storage key ─────────────────────────────────────────────────────────
const STORAGE_KEY = "vedic_oracle_chat_state";
const makeMessageId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const buildPrompt = (sc, langLocale) =>
`You are the VEDIC ORACLE — an omniscient sage with mastery over ALL ancient Hindu scriptures. You are currently channeling: ${sc.name} (${sc.sanskrit}).

YOUR DEEP KNOWLEDGE: ${sc.focus}

STRICT RULES:
1. Always open with ONE Sanskrit shloka or mantra line, then a blank line, then your wisdom
2. Use **bold** for key Sanskrit terms and core concepts  
3. Use *italics* for Sanskrit words, transliterations, and scripture names
4. Address the seeker as "dear seeker" or "साधक"
5. Be specific — cite chapter/verse numbers when relevant
6. Keep answers 4–6 sentences: poetic, profound, never generic
7. You can answer ANY question by drawing wisdom from this scripture

LANGUAGE: Respond ENTIRELY in ${langLocale}. Sanskrit mantras/shlokas at the start are always fine in any language.`;

// ── Markdown renderer ─────────────────────────────────────────────────────────
const renderMD = (text, ac) => {
  if (!text) return null;
  return text.split("\n").map((line, li, arr) => {
    const tokens = [];
    const re = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
    let last = 0, m;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) tokens.push({ t:"text", v: line.slice(last, m.index) });
      if (m[0].startsWith("**")) tokens.push({ t:"bold", v: m[2] });
      else tokens.push({ t:"italic", v: m[3] });
      last = m.index + m[0].length;
    }
    if (last < line.length) tokens.push({ t:"text", v: line.slice(last) });
    return (
      <span key={li}>
        {tokens.map((tk, ti) =>
          tk.t === "bold"   ? <strong key={ti} style={{ color:ac, fontWeight:700 }}>{tk.v}</strong> :
          tk.t === "italic" ? <em key={ti} style={{ color:"#e8dfc8", fontStyle:"italic" }}>{tk.v}</em> :
          <span key={ti}>{tk.v}</span>
        )}
        {li < arr.length - 1 && <br/>}
      </span>
    );
  });
};

// ── Centered ॐ Circle ─────────────────────────────────────────────────────────
const OmCircle = ({ size=36, color="#f59e0b", fontSize=17 }) => (
  <div style={{
    width:size, height:size, borderRadius:"50%", flexShrink:0,
    background:`radial-gradient(circle at 38% 38%, ${color}cc, #120824)`,
    boxShadow:`0 0 14px ${color}77`,
    border:`1px solid ${color}55`,
    display:"flex", alignItems:"center", justifyContent:"center",
    overflow:"hidden",
  }}>
    <span style={{
      fontFamily:"'Noto Sans Devanagari','Mangal',serif",
      fontSize, color:"#fff", lineHeight:1, display:"block",
      marginTop:"0.1em",  // Devanagari baseline correction
      userSelect:"none", pointerEvents:"none",
    }}>ॐ</span>
  </div>
);

// ── Mandala ───────────────────────────────────────────────────────────────────
const Mandala = ({ color, size=300, rev=false }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" style={{
    position:"absolute", opacity:0.09, pointerEvents:"none",
    animation:`rotateSlow ${rev?70:50}s linear infinite ${rev?"reverse":""}`,
  }}>
    <g transform="translate(150,150)">
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
        <g key={i} transform={`rotate(${a})`}>
          <ellipse rx={45+i%3*12} ry={9+i%2*5} fill="none" stroke={color} strokeWidth="0.5" opacity="0.6"/>
          <line x1="0" y1="-130" x2="0" y2="130" stroke={color} strokeWidth="0.25" opacity="0.2"/>
        </g>
      ))}
      {[22,45,70,98,125].map((r,i)=>(
        <circle key={i} r={r} fill="none" stroke={color} strokeWidth={i===2?"0.9":"0.45"}
          opacity="0.3" strokeDasharray={i%2===0?"3 5":"7 3"}/>
      ))}
    </g>
  </svg>
);

// ── Particles ─────────────────────────────────────────────────────────────────
const Particles = ({ color }) => {
  const pts = useRef(
    Array.from({length:55},(_,i)=>({
      id:i, x:Math.random()*100, y:Math.random()*100,
      s:Math.random()*1.8+0.4, d:Math.random()*6, dur:Math.random()*4+3,
    }))
  ).current;
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {pts.map(p=>(
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:`${p.y}%`,
          width:p.s, height:p.s, borderRadius:"50%",
          background:color, opacity:0.4,
          animation:`twinkle ${p.dur}s ${p.d}s infinite alternate`,
        }}/>
      ))}
    </div>
  );
};

// ── Typing dots ───────────────────────────────────────────────────────────────
const TypingDots = ({ color, label }) => (
  <div style={{display:"flex",gap:6,alignItems:"center",padding:"10px 14px 6px"}}>
    {[0,1,2].map(i=>(
      <div key={i} style={{width:6,height:6,borderRadius:"50%",background:color,
        animation:`bounce 1.2s ${i*0.2}s infinite`}}/>
    ))}
    <span style={{color,fontSize:12,fontFamily:"'Crimson Text',serif",marginLeft:4,fontStyle:"italic"}}>
      {label}
    </span>
  </div>
);

// ── Message Bubble ────────────────────────────────────────────────────────────
const Bubble = ({ msg, ac }) => {
  const isUser = msg.role === "user";
  const [shown, setShown] = useState(isUser ? msg.content : "");
  const [done, setDone] = useState(isUser);

  useEffect(() => {
    if (isUser) return;
    let i = 0; setShown(""); setDone(false);
    const t = setInterval(() => {
      i++; setShown(msg.content.slice(0, i));
      if (i >= msg.content.length) { clearInterval(t); setDone(true); }
    }, 13);
    return () => clearInterval(t);
  }, [msg.content]);

  const isRTL = /[\u0600-\u06FF]/.test(shown);

  return (
    <div style={{
      display:"flex", alignItems:"flex-start", gap:9,
      justifyContent: isUser?"flex-end":"flex-start",
      marginBottom:18, animation:"fadeUp 0.32s ease forwards",
    }}>
      {!isUser && (
        <div style={{position:"relative",flexShrink:0,marginTop:2}}>
          <OmCircle size={35} color={ac} fontSize={16}/>
          <div style={{
            position:"absolute", inset:-3, borderRadius:"50%",
            border:`1px solid ${ac}33`, borderTopColor:ac,
            animation:"spinHalo 8s linear infinite", pointerEvents:"none",
          }}/>
        </div>
      )}
      <div style={{
        maxWidth:"77%", padding:"11px 15px",
        borderRadius: isUser?"17px 3px 17px 17px":"3px 17px 17px 17px",
        background: isUser
          ? `linear-gradient(135deg, ${ac}dd, ${ac}99)`
          : "rgba(255,255,255,0.045)",
        border: isUser?"none":`1px solid ${ac}25`,
        color:"#f5f0e8", fontSize:15, lineHeight:1.85,
        fontFamily:"'Crimson Text',Georgia,serif",
        boxShadow: isUser?`0 3px 16px ${ac}44`:`0 2px 10px rgba(0,0,0,0.4)`,
        backdropFilter:"blur(10px)", letterSpacing:"0.013em",
        direction: isRTL?"rtl":"ltr", wordBreak:"break-word",
      }}>
        {done ? renderMD(shown, ac) : (
          <>{shown}<span style={{
            display:"inline-block", width:2, height:"1em",
            background:ac, marginLeft:2,
            verticalAlign:"text-bottom", animation:"blink 0.7s infinite",
          }}/></>
        )}
      </div>
      {isUser && (
        <div style={{
          width:35, height:35, borderRadius:"50%", flexShrink:0, marginTop:2,
          background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:13, color:"#999",
        }}>◎</div>
      )}
    </div>
  );
};

// ── Scripture Pill ────────────────────────────────────────────────────────────
const Pill = ({ s, active, onClick }) => (
  <button onClick={onClick} style={{
    display:"flex", flexDirection:"column", alignItems:"center", gap:3,
    padding:"8px 9px", borderRadius:11, cursor:"pointer",
    flex:"0 0 auto", width:80,
    background: active?`${s.color}1c`:"rgba(255,255,255,0.025)",
    border:`1.5px solid ${active?s.color:s.color+"22"}`,
    boxShadow: active?`0 0 12px ${s.glow}`:"none",
    transition:"all 0.2s",
  }}
    onMouseEnter={e=>{ if(!active){ e.currentTarget.style.borderColor=s.color+"55"; e.currentTarget.style.background=s.color+"0c"; }}}
    onMouseLeave={e=>{ if(!active){ e.currentTarget.style.borderColor=s.color+"22"; e.currentTarget.style.background="rgba(255,255,255,0.025)"; }}}
  >
    <span style={{fontSize:16,lineHeight:1}}>{s.symbol}</span>
    <span style={{
      fontFamily:"'Cinzel',serif", fontSize:8.5,
      color:active?s.color:"#666", letterSpacing:"0.04em",
      textAlign:"center", lineHeight:1.25, wordBreak:"break-word",
    }}>{s.name.split(" ").slice(0,2).join(" ")}</span>
  </button>
);

// ── Language Picker ───────────────────────────────────────────────────────────
const LangPicker = ({ lang, setLang, ac }) => {
  const [open, setOpen] = useState(false);
  const cur = LANGUAGES.find(l=>l.code===lang);
  const ref = useRef(null);
  useEffect(()=>{
    const fn = e=>{ if(ref.current&&!ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",fn);
    return()=>document.removeEventListener("mousedown",fn);
  },[]);
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        display:"flex", alignItems:"center", gap:5, cursor:"pointer",
        background:"rgba(255,255,255,0.05)", border:`1px solid ${ac}40`,
        borderRadius:7, padding:"4px 9px", color:"#ddd",
        fontFamily:"'Crimson Text',serif", fontSize:13, transition:"border-color 0.2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.borderColor=ac+"88"}
        onMouseLeave={e=>e.currentTarget.style.borderColor=ac+"40"}
      >
        <span>{cur.flag}</span><span>{cur.label}</span>
        <span style={{fontSize:8,opacity:0.5}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div style={{
          position:"absolute", top:"calc(100% + 5px)", right:0, zIndex:300,
          background:"#0b0a1a", border:`1px solid ${ac}30`,
          borderRadius:11, overflow:"hidden", minWidth:150,
          boxShadow:`0 8px 30px rgba(0,0,0,0.75), 0 0 14px ${ac}15`,
        }}>
          {LANGUAGES.map(l=>(
            <button key={l.code} onClick={()=>{setLang(l.code);setOpen(false);}} style={{
              display:"flex", alignItems:"center", gap:9, width:"100%",
              padding:"8px 13px",
              background:l.code===lang?`${ac}1a`:"transparent",
              border:"none", cursor:"pointer",
              color:l.code===lang?ac:"#bbb",
              fontFamily:"'Crimson Text',serif", fontSize:14, textAlign:"left",
              borderLeft:`2px solid ${l.code===lang?ac:"transparent"}`,
              transition:"background 0.1s",
            }}
              onMouseEnter={e=>{if(l.code!==lang)e.currentTarget.style.background="rgba(255,255,255,0.05)";}}
              onMouseLeave={e=>{if(l.code!==lang)e.currentTarget.style.background="transparent";}}
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
  en:"Consulting the ancient texts…",
  hi:"प्राचीन ग्रंथों में खोज रहा हूँ…",
  sa:"शास्त्रेषु अन्वेष्यते…",
  gu:"પ્રાચીન ગ્રંથોની શોધ ચાલી રહી છે…",
  ta:"பழமையான நூல்களை ஆராய்கிறேன்…",
  fr:"Consultation des textes anciens…",
  es:"Consultando los textos sagrados…",
  ar:"يستشير النصوص القديمة…",
};

export default function VedicOracle() {
  const [sc, setSc] = useState(SCRIPTURES[0]);
  const [lang, setLang] = useState("en");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [panel, setPanel] = useState(false);
  const [cat, setCat] = useState("All");
  const [errMsg, setErrMsg] = useState("");
  const bottomRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const skipWelcomeRef = useRef(false);
  const [showHistory, setShowHistory] = useState(false);
  const ac = sc.color;

  const makeWelcome = (scripture) => ({
    role:"assistant",
    content:`${scripture.mantra} 🙏\n\nI am the **Vedic Oracle**, keeper of *${scripture.name}* (${scripture.sanskrit}). The wisdom of *${scripture.desc.toLowerCase()}* flows through me. Ask me anything, dear seeker — the light of the ancients shall illuminate your path.`,
  });

  // Initial load – restore from localStorage if present, otherwise start fresh
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setMsgs([makeWelcome(sc)]);
        setErrMsg("");
        return;
      }
      const saved = JSON.parse(raw);
      const savedScripture = SCRIPTURES.find(s => s.id === saved.scId) || sc;
      skipWelcomeRef.current = true;
      setSc(savedScripture);
      if (saved.lang && LANGUAGES.some(l => l.code === saved.lang)) {
        setLang(saved.lang);
      }
      if (Array.isArray(saved.msgs) && saved.msgs.length) {
        setMsgs(saved.msgs);
      } else {
        setMsgs([makeWelcome(savedScripture)]);
      }
      setErrMsg("");
    } catch {
      setMsgs([makeWelcome(sc)]);
      setErrMsg("");
    }
  }, []);

  // When scripture / language changes (user action), start a new conversation
  useEffect(() => {
    if (skipWelcomeRef.current) {
      // We just restored from storage – skip creating a new welcome
      skipWelcomeRef.current = false;
      return;
    }
    setMsgs([makeWelcome(sc)]);
    setErrMsg("");
  }, [sc, lang]);

  // Persist chat state to localStorage whenever it changes
  useEffect(() => {
    try {
      const payload = {
        scId: sc.id,
        lang,
        msgs,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage errors (e.g., private mode / quota issues)
    }
  }, [sc.id, lang, msgs]);

  // Auto-scroll like ChatGPT:
  // - Scrolls only when user is already near the bottom of the chat
  // - If user has scrolled up to read history, new messages won't yank them down
  useEffect(() => {
    if (!bottomRef.current || !listRef.current) return;
    if (msgs.length <= 1 && !loading) return;

    const el = listRef.current;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isNearBottom = distanceFromBottom < 120;
    if (!isNearBottom) return;

    bottomRef.current.scrollIntoView({ behavior:"smooth" });
  }, [msgs]);

  const filtered = cat==="All" ? SCRIPTURES : SCRIPTURES.filter(s=>s.category===cat);

  const send = async () => {
    const text = input.trim();
    if (!text||loading) return;
    const now = Date.now();
    const userMsg = {
      role:"user",
      content:text,
      id: makeMessageId(),
      ts: now,
      historyLabel: text,
    };
    const updated = [...msgs, userMsg];
    setMsgs(updated); setInput(""); setErrMsg(""); setLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body:JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: buildPrompt(sc, LANGUAGES.find(l=>l.code===lang).locale) },
            ...updated.map(m=>({role:m.role, content:m.content}))
          ],
          max_tokens: 1000,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const reply = data.choices?.[0]?.message?.content;
      if (!reply) throw new Error("Empty response from the Oracle");
      setMsgs([...updated, {role:"assistant", content:reply, ts: Date.now()}]);
    } catch(e) {
      const msg = e.message||"Connection lost";
      setErrMsg(`⚠ ${msg}`);
      setMsgs([...updated, {role:"assistant", content:`*ॐ शान्तिः* — A ripple disturbs the cosmic waters. Please ask again, dear seeker.`}]);
    } finally {
      setLoading(false);
      setTimeout(()=>inputRef.current?.focus(), 80);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Noto+Sans+Devanagari:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#030210;}
        @keyframes twinkle{from{opacity:0.1;transform:scale(0.6);}to{opacity:0.75;transform:scale(1.3);}}
        @keyframes bounce{0%,100%{transform:translateY(0);opacity:0.3;}50%{transform:translateY(-6px);opacity:1;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(11px);}to{opacity:1;transform:translateY(0);}}
        @keyframes rotateSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes spinHalo{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{border-radius:4px;background:rgba(255,255,255,0.15);}
        textarea::placeholder{color:#444;}
      `}</style>

      <div style={{
        minHeight:"100dvh",
        background:`radial-gradient(ellipse at 18% 12%, ${ac}12 0%, #030210 42%, #010108 100%)`,
        display:"flex",
        alignItems:"stretch",
        justifyContent:"flex-start",
        padding:0,
        position:"relative",
        transition:"background 0.9s",
        fontFamily:"'Crimson Text',Georgia,serif",
      }}>
        <Particles color={ac}/>
        <div style={{position:"absolute",top:"2%",left:"-7%",pointerEvents:"none"}}>
          <Mandala color={ac} size={400}/>
        </div>
        <div style={{position:"absolute",bottom:"3%",right:"-7%",pointerEvents:"none"}}>
          <Mandala color={ac} size={340} rev/>
        </div>

        {/* ── CHAT WINDOW (full-height layout like GPT) ── */}
        <div style={{
          width:"100%",
          display:"flex",
          flexDirection:"column",
          height:"100dvh",
          background:"rgba(3,2,16,0.92)",
          border:`1px solid ${ac}28`,
          borderRadius:22,
          backdropFilter:"blur(28px)",
          boxShadow:`0 0 80px ${ac}12, 0 22px 70px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.035)`,
          overflow:"hidden", position:"relative", zIndex:1,
          transition:"border-color 0.7s, box-shadow 0.7s",
        }}>

          {/* ── CHAT HISTORY PANEL ── */}
          {showHistory && (
            <div style={{
              position:"absolute",
              top:0,
              bottom:0,
              left:0,
              width:260,
              background:"rgba(5,5,20,0.96)",
              borderRight:`1px solid ${ac}33`,
              boxShadow:"0 0 30px rgba(0,0,0,0.85)",
              zIndex:5,
              padding:"48px 12px 14px",
            }}>
              <div style={{
                position:"absolute",
                top:10,
                left:10,
                right:10,
                display:"flex",
                alignItems:"center",
                gap:8,
              }}>
                <button
                  onClick={()=>{
                    setMsgs([makeWelcome(sc)]);
                    setErrMsg("");
                  }}
                  style={{
                    flex:1,
                    padding:"6px 8px",
                    borderRadius:7,
                    border:`1px solid ${ac}55`,
                    background:"rgba(255,255,255,0.03)",
                    color:"#ddd",
                    fontSize:11,
                    cursor:"pointer",
                    fontFamily:"'Cinzel',serif",
                    letterSpacing:"0.06em",
                    textAlign:"center",
                  }}
                >
                  ＋ NEW CHAT
                </button>
                <button
                  onClick={()=>setShowHistory(false)}
                  style={{
                    width:24,
                    height:24,
                    borderRadius:"50%",
                    border:`1px solid ${ac}55`,
                    background:"transparent",
                    color:"#bbb",
                    fontSize:12,
                    cursor:"pointer",
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{
                fontFamily:"'Cinzel',serif",
                fontSize:12,
                letterSpacing:"0.14em",
                color:"#e5dfcf",
                marginBottom:10,
              }}>
                HISTORY
              </div>
              <div style={{fontSize:11,color:"#888",marginBottom:10}}>
                Click a chat to reuse or rename it.
              </div>
              <div style={{
                overflowY:"auto",
                maxHeight:"calc(100% - 70px)",
              }}>
                {(() => {
                  const userMsgs = msgs
                    .map((m, idx) => ({ ...m, idx }))
                    .filter(({ role, hideFromHistory }) => role === "user" && !hideFromHistory);

                  if (!userMsgs.length) {
                    return (
                      <div style={{fontSize:11,color:"#555"}}>
                        No past chats yet.
                      </div>
                    );
                  }

                  const now = Date.now();
                  const isToday = (t) => {
                    const d = new Date(t);
                    const n = new Date();
                    return d.getFullYear() === n.getFullYear() &&
                      d.getMonth() === n.getMonth() &&
                      d.getDate() === n.getDate();
                  };
                  const daysDiff = (t) => Math.floor((now - t) / (1000 * 60 * 60 * 24));

                  const groups = {
                    today: [],
                    week: [],
                    month: [],
                    older: [],
                  };

                  userMsgs
                    .slice()
                    .sort((a,b) => (b.ts || 0) - (a.ts || 0))
                    .forEach(item => {
                      const ts = item.ts || now;
                      if (isToday(ts)) groups.today.push(item);
                      else if (daysDiff(ts) <= 7) groups.week.push(item);
                      else if (daysDiff(ts) <= 30) groups.month.push(item);
                      else groups.older.push(item);
                    });

                  const renameItem = (idx) => {
                    const current = msgs[idx];
                    if (!current) return;
                    const next = window.prompt("Rename chat", current.historyLabel || current.content || "New chat");
                    if (!next) return;
                    setMsgs(prev =>
                      prev.map((m,i) =>
                        i === idx ? { ...m, historyLabel: next } : m
                      )
                    );
                  };

                  const deleteItem = (idx) => {
                    setMsgs(prev =>
                      prev.map((m,i) =>
                        i === idx ? { ...m, hideFromHistory: true } : m
                      )
                    );
                  };

                  const deleteAll = () => {
                    if (!window.confirm("Delete all chat history? This will only clear the sidebar list, not the conversation content.")) return;
                    setMsgs(prev =>
                      prev.map(m =>
                        m.role === "user" ? { ...m, hideFromHistory: true } : m
                      )
                    );
                  };

                  const renderGroup = (label, items) => {
                    if (!items.length) return null;
                    return (
                      <div key={label} style={{marginBottom:10}}>
                        <div style={{
                          fontSize:10,
                          textTransform:"uppercase",
                          letterSpacing:"0.12em",
                          color:"#666",
                          margin:"6px 0 4px",
                          fontFamily:"'Cinzel',serif",
                        }}>
                          {label}
                        </div>
                        {items.map(item => (
                          <div
                            key={`${item.id || item.idx}`}
                            style={{
                              display:"flex",
                              alignItems:"center",
                              gap:6,
                              marginBottom:4,
                            }}
                          >
                            <button
                              onClick={() => {
                                setInput(item.content);
                                inputRef.current?.focus();
                              }}
                              style={{
                                flex:1,
                                textAlign:"left",
                                padding:"6px 8px",
                                borderRadius:8,
                                border:`1px solid ${ac}22`,
                                background:"rgba(255,255,255,0.02)",
                                color:"#d4d0c5",
                                fontSize:11,
                                cursor:"pointer",
                                fontFamily:"'Crimson Text',serif",
                                overflow:"hidden",
                                textOverflow:"ellipsis",
                                whiteSpace:"nowrap",
                              }}
                            >
                              {item.historyLabel || item.content}
                            </button>
                            <button
                              onClick={() => renameItem(item.idx)}
                              style={{
                                width:22,
                                height:22,
                                borderRadius:"50%",
                                border:`1px solid ${ac}33`,
                                background:"transparent",
                                color:"#aaa",
                                fontSize:10,
                                cursor:"pointer",
                              }}
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => deleteItem(item.idx)}
                              style={{
                                width:22,
                                height:22,
                                borderRadius:"50%",
                                border:`1px solid #ef444433`,
                                background:"transparent",
                                color:"#f87171",
                                fontSize:11,
                                cursor:"pointer",
                              }}
                            >
                              🗑
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  };

                  return (
                    <>
                      {renderGroup("Today", groups.today)}
                      {renderGroup("Last 7 days", groups.week)}
                      {renderGroup("Last 30 days", groups.month)}
                      {renderGroup("Older", groups.older)}
                      <button
                        onClick={deleteAll}
                        style={{
                          marginTop:8,
                          width:"100%",
                          padding:"6px 8px",
                          borderRadius:8,
                          border:"1px solid rgba(248,113,113,0.5)",
                          background:"rgba(127,29,29,0.4)",
                          color:"#fecaca",
                          fontSize:11,
                          cursor:"pointer",
                          fontFamily:"'Cinzel',serif",
                        }}
                      >
                        Delete all chats
                      </button>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ── HEADER ── */}
          <div style={{
            padding:"11px 15px",
            borderBottom:`1px solid ${ac}1a`,
            background:"rgba(255,255,255,0.01)",
            display:"flex", alignItems:"center", gap:10, flexShrink:0,
          }}>
            <button
              onClick={()=>setShowHistory(h=>!h)}
              style={{
                marginRight:6,
                padding:"6px 9px",
                borderRadius:7,
                border:`1px solid ${showHistory?ac:ac+"33"}`,
                background:showHistory?`${ac}1a`:"rgba(255,255,255,0.03)",
                color:showHistory?ac:"#aaa",
                fontSize:11,
                cursor:"pointer",
                fontFamily:"'Cinzel',serif",
                letterSpacing:"0.06em",
              }}
            >
              ☰ HISTORY
            </button>
            <div style={{position:"relative",flexShrink:0}}>
              <OmCircle size={40} color={ac} fontSize={19}/>
              <div style={{
                position:"absolute", inset:-4, borderRadius:"50%",
                border:`1.5px solid ${ac}30`, borderTopColor:ac,
                animation:"spinHalo 9s linear infinite", pointerEvents:"none",
              }}/>
            </div>
            <div style={{minWidth:0}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:15,fontWeight:700,
                color:"#f5f0e8",letterSpacing:"0.13em",whiteSpace:"nowrap"}}>
                VEDIC ORACLE
              </div>
              <div style={{fontSize:10,color:ac,letterSpacing:"0.09em",
                fontFamily:"'Cinzel',serif",opacity:0.8,whiteSpace:"nowrap",
                overflow:"hidden",textOverflow:"ellipsis"}}>
                {sc.sanskrit} · {sc.name.toUpperCase()}
              </div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
              <LangPicker lang={lang} setLang={setLang} ac={ac}/>
              <button onClick={()=>setPanel(p=>!p)} style={{
                background:panel?`${ac}1a`:"rgba(255,255,255,0.05)",
                border:`1px solid ${panel?ac:ac+"33"}`,
                borderRadius:7, padding:"4px 9px", cursor:"pointer",
                color:panel?ac:"#888",
                fontFamily:"'Cinzel',serif", fontSize:9.5,
                letterSpacing:"0.06em", transition:"all 0.18s", whiteSpace:"nowrap",
              }}>
                {panel?"✕ Close":"📜 Scriptures"}
              </button>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:6,height:6,borderRadius:"50%",
                  background:"#22c55e",boxShadow:"0 0 7px #22c55e"}}/>
                <span style={{color:"#4ade80",fontSize:9,
                  fontFamily:"'Cinzel',serif",letterSpacing:"0.07em"}}>LIVE</span>
              </div>
            </div>
          </div>

          {/* ── SCRIPTURE PANEL ── */}
          {panel&&(
            <div style={{
              borderBottom:`1px solid ${ac}1a`,
              background:"rgba(0,0,0,0.38)",
              animation:"fadeUp 0.22s ease",
              flexShrink:0,
            }}>
              {/* Category tabs */}
              <div style={{
                display:"flex", borderBottom:"1px solid rgba(255,255,255,0.05)",
                overflowX:"auto",
              }}>
                {CATEGORIES.map(c=>(
                  <button key={c} onClick={()=>setCat(c)} style={{
                    padding:"7px 11px", background:"none",
                    border:"none", borderBottom:`2px solid ${cat===c?ac:"transparent"}`,
                    color:cat===c?ac:"#555",
                    fontFamily:"'Cinzel',serif", fontSize:9.5,
                    letterSpacing:"0.07em", cursor:"pointer",
                    transition:"all 0.15s", whiteSpace:"nowrap",
                  }}>{c.toUpperCase()}</button>
                ))}
              </div>
              {/* Pills */}
              <div style={{
                display:"flex", gap:6, padding:"10px 13px 12px",
                overflowX:"auto",
              }}>
                {filtered.map(s=>(
                  <Pill key={s.id} s={s} active={sc.id===s.id}
                    onClick={()=>{setSc(s);setPanel(false);}}/>
                ))}
              </div>
            </div>
          )}

          {/* ── INFO STRIP ── */}
          <div style={{
            padding:"6px 16px",
            background:`linear-gradient(90deg, ${ac}0c, transparent)`,
            borderBottom:`1px solid ${ac}10`,
            display:"flex", alignItems:"center", gap:8, flexShrink:0,
          }}>
            <span style={{fontSize:13}}>{sc.symbol}</span>
            <span style={{color:`${ac}aa`,fontSize:12,fontStyle:"italic"}}>
              <strong style={{color:ac,fontStyle:"normal",fontFamily:"'Cinzel',serif",fontSize:10.5}}>
                {sc.name}
              </strong>{" "}· {sc.desc}
            </span>
            <span style={{
              marginLeft:"auto", fontSize:9.5,
              fontFamily:"'Cinzel',serif", color:"#555",
              background:`${ac}0e`, padding:"1px 8px",
              borderRadius:20, border:`1px solid ${ac}18`,
              letterSpacing:"0.05em",
            }}>{sc.category}</span>
          </div>

          {/* ── MESSAGES ── */}
          <div
            ref={listRef}
            style={{flex:1,overflowY:"auto",padding:"16px 16px 4px"}}
          >
            {msgs.map((msg,i)=>(
              <Bubble key={`${sc.id}-${i}`} msg={msg} ac={ac}/>
            ))}
            {loading&&<TypingDots color={ac} label={LOADING_LABELS[lang]||LOADING_LABELS.en}/>}
            {errMsg&&(
              <div style={{
                margin:"6px 0 10px", padding:"9px 13px",
                background:"rgba(239,68,68,0.09)",
                border:"1px solid rgba(239,68,68,0.28)",
                borderRadius:9, color:"#f87171", fontSize:12,
              }}>{errMsg}</div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* ── SUGGESTIONS ── */}
          {msgs.length<=1&&(
            <div style={{
              padding:"0 14px 9px",
              display:"flex", gap:6, flexWrap:"wrap", flexShrink:0,
            }}>
              {sc.suggestions.map(s=>(
                <button key={s} onClick={()=>{setInput(s);inputRef.current?.focus();}} style={{
                  background:`${ac}0c`, border:`1px solid ${ac}25`,
                  borderRadius:20, padding:"5px 13px",
                  color:`${ac}aa`, fontSize:11.5, cursor:"pointer",
                  fontFamily:"'Crimson Text',serif", fontStyle:"italic",
                  transition:"all 0.16s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${ac}20`;e.currentTarget.style.borderColor=ac;e.currentTarget.style.color=ac;}}
                  onMouseLeave={e=>{e.currentTarget.style.background=`${ac}0c`;e.currentTarget.style.borderColor=`${ac}25`;e.currentTarget.style.color=`${ac}aa`;}}
                >{s}</button>
              ))}
            </div>
          )}

          {/* ── INPUT ── */}
          <div style={{
            padding:"11px 14px 15px",
            borderTop:`1px solid ${ac}12`,
            display:"flex", gap:8, alignItems:"flex-end", flexShrink:0,
          }}>
            <textarea ref={inputRef} value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder={`Ask about ${sc.name}… (Enter to send)`}
              rows={1}
              style={{
                flex:1, background:"rgba(255,255,255,0.04)",
                border:`1px solid ${ac}25`, borderRadius:13,
                padding:"11px 15px", color:"#f5f0e8",
                fontSize:15, fontFamily:"'Crimson Text',Georgia,serif",
                resize:"none", outline:"none", lineHeight:1.6,
                maxHeight:108, overflowY:"auto",
                caretColor:ac, transition:"border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={e=>{e.target.style.borderColor=`${ac}66`;e.target.style.boxShadow=`0 0 16px ${ac}1a`;}}
              onBlur={e=>{e.target.style.borderColor=`${ac}25`;e.target.style.boxShadow="none";}}
            />
            <button onClick={send} disabled={!input.trim()||loading} style={{
              width:44, height:44, borderRadius:"50%", border:"none",
              background: input.trim()&&!loading
                ?`linear-gradient(135deg, ${ac}, ${ac}88)`
                :"rgba(255,255,255,0.06)",
              cursor: input.trim()&&!loading?"pointer":"not-allowed",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, transition:"all 0.2s",
              boxShadow: input.trim()&&!loading?`0 0 16px ${ac}55`:"none",
            }}>
              {loading
                ?<div style={{width:16,height:16,border:`2px solid ${ac}`,
                    borderTopColor:"transparent",borderRadius:"50%",animation:"spinHalo 0.8s linear infinite"}}/>
                :<span style={{color:input.trim()?"#fff":"#444",fontSize:17}}>↑</span>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
