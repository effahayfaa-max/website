import { useState } from "react";

/* ─────────────────────────────────────────────
   EDIT THESE LINKS after creating Google Forms
   ───────────────────────────────────────────── */
const LINKS = {
  kehadiran: [
    "https://forms.gle/REPLACE_KEHADIRAN_HARI1",
    "https://forms.gle/REPLACE_KEHADIRAN_HARI2",
    "https://forms.gle/REPLACE_KEHADIRAN_HARI3",
  ],
  pendaftaran: "https://forms.gle/REPLACE_PENDAFTARAN",
  maklumbalas: "https://forms.gle/REPLACE_MAKLUMBALAS",
  galeri:      "https://photos.google.com/REPLACE_ALBUM_LINK",
};

/* ─────────────────────────────────────────────
   CSS
   ───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  :root{
    --t9:#072422;--t8:#0d3b38;--t7:#155c57;--t6:#1e7a73;
    --t1:#d4eeec;--t0:#edf8f7;
    --g6:#b8922a;--g4:#c9a84c;--g2:#e8c97a;
    --cream:#faf8f4;--white:#fff;
    --tx6:#3d5c59;--tx4:#6b8c89;
  }
  .pg{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--t8);min-height:100vh;}

  /* ── TOPBAR ── */
  .topbar{
    position:sticky;top:0;z-index:100;
    background:rgba(7,36,34,.97);
    backdrop-filter:blur(8px);
    display:flex;align-items:center;gap:12px;
    padding:12px 18px;
    border-bottom:1px solid rgba(201,168,76,.2);
  }
  .back-btn{
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
    color:#fff;font-size:13px;font-weight:500;
    padding:6px 14px;border-radius:20px;cursor:pointer;
    transition:all .2s;
  }
  .back-btn:hover{background:rgba(255,255,255,.18);}
  .topbar-title{font-size:13px;font-weight:600;color:rgba(255,255,255,.85);}

  /* ── HERO ── */
  .hero{
    background:linear-gradient(170deg,var(--t9) 0%,var(--t8) 55%,var(--t7) 100%);
    padding:44px 24px 0;position:relative;overflow:hidden;
  }
  .glow1{position:absolute;top:-100px;right:-100px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.13) 0%,transparent 70%);pointer-events:none;}
  .glow2{position:absolute;bottom:40px;left:-80px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.05) 0%,transparent 70%);pointer-events:none;}
  .hero-body{max-width:500px;margin:0 auto;position:relative;z-index:1;text-align:center;}

  .jata-wrap{display:flex;justify-content:center;margin-bottom:14px;}
  .jata-ring{width:96px;height:96px;border-radius:50%;background:rgba(255,255,255,.08);border:1.5px solid rgba(201,168,76,.45);display:flex;align-items:center;justify-content:center;padding:8px;}
  .jata-ring img{width:72px;height:auto;}
  .kkm-lbl{font-size:10px;font-weight:600;color:var(--g2);letter-spacing:3.5px;text-transform:uppercase;margin-bottom:4px;}
  .kkm-sub{font-size:9.5px;color:rgba(255,255,255,.42);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:22px;}
  .gold-line{width:36px;height:1.5px;background:linear-gradient(90deg,transparent,var(--g4),transparent);margin:0 auto 20px;}
  .eyebrow{font-size:10px;font-weight:500;color:rgba(255,255,255,.5);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px;}
  .h-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:#fff;line-height:1.15;margin-bottom:6px;}
  .h-year{font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:700;color:var(--g4);line-height:1;margin-bottom:28px;letter-spacing:-2px;}
  .tagline{font-size:12px;font-style:italic;color:rgba(255,255,255,.42);margin-bottom:36px;}

  /* Info strip */
  .istrip{display:grid;grid-template-columns:1fr 1fr 1fr;background:rgba(0,0,0,.28);border-top:1px solid rgba(201,168,76,.2);}
  .icell{padding:16px 10px;text-align:center;border-right:1px solid rgba(255,255,255,.08);}
  .icell:last-child{border-right:none;}
  .ii{font-size:15px;display:block;margin-bottom:5px;}
  .il{font-size:9px;font-weight:600;color:var(--g2);letter-spacing:1.5px;text-transform:uppercase;display:block;margin-bottom:3px;}
  .iv{font-size:11px;font-weight:500;color:rgba(255,255,255,.88);line-height:1.5;}

  /* ── EVENT STATUS (replaces countdown) ── */
  .evstatus{
    padding:18px 24px;text-align:center;
    display:flex;align-items:center;justify-content:center;gap:10px;
  }
  .evstatus.before{background:var(--t8);}
  .evstatus.live  {background:#0a5c2e;}
  .evstatus.done  {background:#2a2a2a;}
  .ev-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
  .live .ev-dot{background:#4ade80;box-shadow:0 0 0 3px rgba(74,222,128,.25);animation:pulse 1.5s infinite;}
  .before .ev-dot{background:var(--g4);}
  .done .ev-dot{background:#888;}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(74,222,128,.25);}50%{box-shadow:0 0 0 6px rgba(74,222,128,.1);}}
  .ev-text{font-size:12px;font-weight:600;color:#fff;letter-spacing:.5px;}
  .ev-day{font-size:10px;color:rgba(255,255,255,.55);margin-left:4px;}

  /* ── SECTIONS ── */
  .sec{background:var(--white);padding:36px 24px;border-bottom:1px solid var(--t1);}
  .sec.alt{background:var(--t0);}
  .sec.dark{background:var(--t8);}
  .pill{display:inline-flex;align-items:center;gap:5px;background:var(--t0);color:var(--t7);font-size:9.5px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:5px 13px;border-radius:20px;margin-bottom:16px;}
  .sec.dark .pill{background:rgba(255,255,255,.1);color:var(--g2);}
  .stitle{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--t8);line-height:1.2;margin-bottom:13px;}
  .sec.dark .stitle{color:#fff;}
  .sbody{font-size:13.5px;color:var(--tx6);line-height:1.78;}
  .sec.dark .sbody{color:rgba(255,255,255,.6);}

  /* Stats */
  .sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:420px;margin:0 auto;}
  .sbox{background:var(--white);border-radius:14px;padding:18px 8px;text-align:center;border:1px solid rgba(30,122,115,.1);box-shadow:0 2px 10px rgba(7,36,34,.05);}
  .snum{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;color:var(--t7);line-height:1;display:block;}
  .slbl{font-size:10px;font-weight:500;color:var(--tx4);margin-top:6px;display:block;line-height:1.4;}

  /* Portal menu */
  .mgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px;max-width:420px;margin:0 auto;}
  .mcard{background:var(--white);border-radius:16px;padding:18px 15px;border:1px solid var(--t1);cursor:pointer;transition:all .2s;display:flex;flex-direction:column;gap:10px;box-shadow:0 2px 8px rgba(7,36,34,.04);}
  .mcard:hover{border-color:var(--t6);box-shadow:0 6px 22px rgba(7,36,34,.1);transform:translateY(-2px);}
  .mcard.full{grid-column:span 2;flex-direction:row;align-items:center;background:linear-gradient(135deg,var(--t8),var(--t7));border-color:transparent;}
  .mico{width:42px;height:42px;border-radius:12px;background:var(--t0);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
  .mcard.full .mico{background:rgba(255,255,255,.14);}
  .mname{font-size:13px;font-weight:600;color:var(--t8);}
  .mcard.full .mname{color:#fff;font-size:14px;}
  .msub{font-size:11px;color:var(--tx4);line-height:1.4;}
  .mcard.full .msub{color:rgba(255,255,255,.6);}
  .marr{margin-left:auto;color:var(--g4);font-size:20px;}

  /* Urusetia */
  .urole{font-size:9.5px;font-weight:600;color:var(--t6);letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:12px;}
  .urole::after{content:'';flex:1;height:1px;background:var(--t1);}
  .ublock{margin-bottom:28px;}
  .ublock:last-child{margin-bottom:0;}
  .pcard{background:linear-gradient(135deg,var(--t8),var(--t7));border-radius:16px;padding:20px 18px;display:flex;align-items:center;gap:16px;}
  .avlg{width:52px;height:52px;border-radius:50%;flex-shrink:0;background:rgba(255,255,255,.15);border:2px solid rgba(201,168,76,.5);display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:var(--g2);font-family:'Cormorant Garamond',serif;}
  .pname{font-size:14px;font-weight:600;color:#fff;margin-bottom:3px;}
  .ptitle{font-size:11px;color:rgba(255,255,255,.55);}
  .tgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .tcard{background:var(--t0);border-radius:13px;padding:14px 13px;border:1px solid var(--t1);display:flex;align-items:center;gap:11px;}
  .avsm{width:38px;height:38px;border-radius:50%;flex-shrink:0;background:var(--t1);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--t7);font-family:'Cormorant Garamond',serif;}
  .tname{font-size:11.5px;font-weight:600;color:var(--t8);line-height:1.35;}
  .ttitle{font-size:10px;color:var(--tx4);margin-top:2px;}
  .lgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .lcard{background:var(--cream);border-radius:13px;padding:14px 13px;border:1px solid var(--t1);display:flex;align-items:center;gap:11px;}
  .avxs{width:36px;height:36px;border-radius:50%;flex-shrink:0;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--g6);font-family:'Cormorant Garamond',serif;}
  .lname{font-size:11px;font-weight:600;color:var(--t8);line-height:1.35;}

  /* Footer */
  .footer{background:var(--t9);padding:28px 24px;text-align:center;border-top:2px solid rgba(201,168,76,.25);}
  .f-anj{font-size:9.5px;font-weight:600;color:var(--g4);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;}
  .f-unit{font-size:11.5px;font-weight:500;color:rgba(255,255,255,.7);line-height:1.7;margin-bottom:14px;}
  .f-div{width:32px;height:1px;background:rgba(201,168,76,.3);margin:0 auto 12px;}
  .f-copy{font-size:10px;color:rgba(255,255,255,.28);}

  /* ── SUB-PAGES ── */
  .subpage{min-height:100vh;background:var(--cream);}
  .sub-hero{background:linear-gradient(135deg,var(--t8),var(--t7));padding:36px 24px 32px;text-align:center;}
  .sub-icon{font-size:40px;margin-bottom:14px;}
  .sub-title{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:#fff;margin-bottom:6px;}
  .sub-sub{font-size:12px;color:rgba(255,255,255,.55);}
  .sub-body{padding:28px 24px;max-width:480px;margin:0 auto;}

  /* Day cards - kehadiran */
  .day-cards{display:flex;flex-direction:column;gap:12px;}
  .day-card{background:var(--white);border-radius:16px;padding:20px 18px;border:1px solid var(--t1);display:flex;align-items:center;gap:16px;box-shadow:0 2px 8px rgba(7,36,34,.04);}
  .day-num{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:var(--t7);line-height:1;width:44px;flex-shrink:0;text-align:center;}
  .day-info{flex:1;}
  .day-label{font-size:13px;font-weight:600;color:var(--t8);margin-bottom:2px;}
  .day-date{font-size:11px;color:var(--tx4);}
  .day-btn{background:var(--t7);color:#fff;border:none;padding:10px 16px;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .2s;}
  .day-btn:hover{background:var(--t6);}

  /* Notice box */
  .notice{background:var(--t0);border:1px solid var(--t1);border-radius:12px;padding:14px 16px;margin-bottom:20px;font-size:12px;color:var(--tx6);line-height:1.6;}
  .notice strong{color:var(--t7);}

  /* Big link button */
  .big-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,var(--t8),var(--t7));color:#fff;border:none;width:100%;padding:18px;border-radius:16px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(7,36,34,.15);}
  .big-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(7,36,34,.2);}
  .big-btn.gold{background:linear-gradient(135deg,var(--g6),var(--g4));color:var(--t9);}

  /* Tentative placeholder */
  .tent-placeholder{background:var(--white);border-radius:16px;padding:32px 20px;text-align:center;border:2px dashed var(--t1);margin-bottom:20px;}
  .tent-icon{font-size:48px;margin-bottom:14px;}
  .tent-msg{font-size:13px;color:var(--tx4);line-height:1.7;}

  /* Day schedule row */
  .sched-day{background:var(--white);border-radius:14px;padding:18px;border:1px solid var(--t1);margin-bottom:10px;}
  .sched-day-title{font-size:11px;font-weight:600;color:var(--t6);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}
  .sched-row{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--t0);}
  .sched-row:last-child{border-bottom:none;padding-bottom:0;}
  .sched-time{font-size:11px;color:var(--tx4);width:80px;flex-shrink:0;padding-top:2px;}
  .sched-act{font-size:12px;font-weight:500;color:var(--t8);line-height:1.4;}

  /* Galeri */
  .galeri-card{background:var(--white);border-radius:16px;padding:28px 20px;text-align:center;border:1px solid var(--t1);margin-bottom:16px;}
  .galeri-icon{font-size:52px;margin-bottom:14px;}
  .galeri-msg{font-size:13px;color:var(--tx6);line-height:1.7;margin-bottom:20px;}

  /* Maklum balas */
  .mb-card{background:var(--white);border-radius:16px;padding:24px 20px;border:1px solid var(--t1);margin-bottom:14px;}
  .mb-title{font-size:15px;font-weight:600;color:var(--t8);margin-bottom:8px;}
  .mb-body{font-size:12.5px;color:var(--tx6);line-height:1.7;margin-bottom:18px;}

  /* Animations */
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .hero-body>*{animation:fadeUp .55s ease both;}
  .hero-body>*:nth-child(1){animation-delay:.05s}
  .hero-body>*:nth-child(2){animation-delay:.10s}
  .hero-body>*:nth-child(3){animation-delay:.14s}
  .hero-body>*:nth-child(4){animation-delay:.18s}
  .hero-body>*:nth-child(5){animation-delay:.22s}
  .hero-body>*:nth-child(6){animation-delay:.26s}
  .hero-body>*:nth-child(7){animation-delay:.30s}
`;

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
function initials(name) {
  return name.split(" ")
    .filter(w => w.length > 2 && !["binti","bin","bt","matron","dr.","dr","cik"].includes(w.toLowerCase()))
    .slice(0,2).map(w=>w[0].toUpperCase()).join("");
}

function openLink(url) {
  if (url.includes("REPLACE")) {
    alert("Sila kemaskini pautan Google Form terlebih dahulu dalam kod App.jsx");
    return;
  }
  window.open(url, "_blank");
}

/* ─────────────────────────────────────────────
   EVENT STATUS  (replaces countdown)
   ───────────────────────────────────────────── */
function EventStatus() {
  const now   = new Date();
  const d1    = new Date("2026-06-24");
  const d2    = new Date("2026-06-25");
  const d3    = new Date("2026-06-26");
  const after = new Date("2026-06-27");

  const same = (a,b) => a.toDateString()===b.toDateString();

  let cls, dot, text, sub;

  if (now < d1) {
    const left = Math.ceil((d1-now)/86400000);
    cls="before"; text=`${left} Hari Lagi Menuju Program`; sub="24 – 26 Jun 2026";
  } else if (same(now,d1)) {
    cls="live"; text="Hari Pertama Program"; sub="Sedang Berlangsung • 24 Jun 2026";
  } else if (same(now,d2)) {
    cls="live"; text="Hari Kedua Program"; sub="Sedang Berlangsung • 25 Jun 2026";
  } else if (same(now,d3)) {
    cls="live"; text="Hari Ketiga Program"; sub="Sedang Berlangsung • 26 Jun 2026";
  } else {
    cls="done"; text="Program Telah Tamat"; sub="Terima Kasih atas Penyertaan Anda";
  }

  return (
    <div className={`evstatus ${cls}`}>
      <div className="ev-dot"/>
      <span className="ev-text">{text}</span>
      <span className="ev-day">· {sub}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOPBAR
   ───────────────────────────────────────────── */
function TopBar({ title, onBack }) {
  return (
    <div className="topbar">
      <button className="back-btn" onClick={onBack}>← Kembali</button>
      <span className="topbar-title">{title}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────── */
const MENU_ITEMS = [
  { icon:"✅", name:"Kehadiran",        sub:"Sah dan semak kehadiran anda",    full:true,  page:"kehadiran"  },
  { icon:"📅", name:"Tentatif",         sub:"Jadual lengkap program",                      page:"tentatif"   },
  { icon:"📋", name:"Taklimat Bengkel", sub:"Maklumat umum untuk peserta",                 page:"taklimat"   },
  { icon:"📸", name:"Galeri Foto",      sub:"Kenangan program",                            page:"galeri"     },
  { icon:"💬", name:"Maklum Balas",     sub:"Kongsi pandangan anda",                       page:"maklumbalas"},
];

const TEAM = [
  "Dr. Arham bin Mohd Noor",
  "Dr. Hayfaa binti Ibrahim",
  "Dr. Norhafiza binti Zainal Abidin",
  "Dr. Amar Zhafran bin Ismail",
];
const LOGISTIK = [
  "Matron Hasliza binti Asmungin",
  "Cik Aina Safia binti Mohadi",
];

function HomePage({ onNav }) {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="glow1"/><div className="glow2"/>
        <div className="hero-body">
          <div className="jata-wrap">
            <div className="jata-ring">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_Malaysia.svg/120px-Coat_of_arms_of_Malaysia.svg.png" alt="Jata Negara"/>
            </div>
          </div>
          <p className="kkm-lbl">Kementerian Kesihatan Malaysia</p>
          <p className="kkm-sub">Bahagian Perkembangan Perubatan · KKM</p>
          <div className="gold-line"/>
          <p className="eyebrow">Bengkel Penyediaan</p>
          <h1 className="h-title">Garis Panduan Pelaksanaan<br/>Audit Program PPS</h1>
          <div className="h-year">2026</div>
          <p className="tagline">Memastikan Kualiti, Meningkatkan Standard Perkhidmatan</p>
        </div>
        <div className="istrip">
          <div className="icell"><span className="ii">📅</span><span className="il">Tarikh</span><span className="iv">24 – 26 Jun 2026{"\n"}Rabu – Jumaat</span></div>
          <div className="icell"><span className="ii">📍</span><span className="il">Lokasi</span><span className="iv">Sunway Lost World Hotel, Perak</span></div>
          <div className="icell"><span className="ii">🏥</span><span className="il">Penganjur</span><span className="iv">Bah. Perkembangan Perubatan, KKM</span></div>
        </div>
      </div>

      {/* EVENT STATUS */}
      <EventStatus/>

      {/* ABOUT */}
      <div className="sec">
        <span className="pill">✦ Tentang Bengkel</span>
        <h2 className="stitle">Objektif Bengkel</h2>
        <p className="sbody">Bengkel ini bertujuan untuk membangunkan satu garis panduan yang berkesan bagi melaksanakan audit ke atas Program Pegawai Perubatan Siswazah di semua Hospital Latihan Siswazah di seluruh Malaysia. Melalui sesi interaksi dan pembentangan, para peserta dapat menyediakan draf yang komprehensif untuk memastikan kualiti pengurusan latihan berkualiti.</p>
      </div>

      {/* STATS */}
      <div className="sec alt">
        <div className="sgrid">
          {[["3","Hari Program"],["45","Peserta"],["7","Sesi Perbincangan & Pembentangan"]].map(([n,l])=>(
            <div key={l} className="sbox"><span className="snum">{n}</span><span className="slbl">{l}</span></div>
          ))}
        </div>
      </div>

      {/* PORTAL */}
      <div className="sec" style={{paddingBottom:40}}>
        <span className="pill">🔗 Portal Program</span>
        <h2 className="stitle" style={{marginBottom:20}}>Akses Cepat</h2>
        <div className="mgrid">
          {MENU_ITEMS.map(m=>(
            <div key={m.name} className={`mcard ${m.full?"full":""}`} onClick={()=>onNav(m.page)}>
              <div className="mico">{m.icon}</div>
              <div><div className="mname">{m.name}</div><div className="msub">{m.sub}</div></div>
              {m.full && <span className="marr">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* URUSETIA */}
      <div className="sec">
        <span className="pill">🤝 Urusetia</span>
        <h2 className="stitle" style={{marginBottom:24}}>Pasukan Pengurusan</h2>
        <div className="ublock">
          <div className="urole">Penyelaras Program</div>
          <div className="pcard">
            <div className="avlg">{initials("Dr. Siti Rahayu binti Mat Husin")}</div>
            <div><div className="pname">Dr. Siti Rahayu binti Mat Husin</div><div className="ptitle">Penyelaras — Bengkel Penyediaan Garis Panduan 2026</div></div>
          </div>
        </div>
        <div className="ublock">
          <div className="urole">Urusetia Program</div>
          <div className="tgrid">
            {TEAM.map(n=>(
              <div key={n} className="tcard"><div className="avsm">{initials(n)}</div><div><div className="tname">{n}</div><div className="ttitle">Urusetia Program</div></div></div>
            ))}
          </div>
        </div>
        <div className="ublock">
          <div className="urole">Persiapan &amp; Logistik</div>
          <div className="lgrid">
            {LOGISTIK.map(n=>(
              <div key={n} className="lcard"><div className="avxs">{initials(n)}</div><div><div className="lname">{n}</div><div className="ttitle">Urusetia Persiapan &amp; Logistik</div></div></div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p className="f-anj">Anjuran</p>
        <p className="f-unit">Unit Pegawai Perubatan Siswazah<br/>Cawangan Perkembangan Profesion Perubatan<br/>Bahagian Perkembangan Perubatan</p>
        <div className="f-div"/>
        <p className="f-copy">Kementerian Kesihatan Malaysia · 2026</p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   KEHADIRAN PAGE
   ───────────────────────────────────────────── */
function KehadiranPage({ onBack }) {
  const days = [
    { n:"1", label:"Hari Pertama", date:"24 Jun 2026 (Rabu)",   link: LINKS.kehadiran[0] },
    { n:"2", label:"Hari Kedua",   date:"25 Jun 2026 (Khamis)", link: LINKS.kehadiran[1] },
    { n:"3", label:"Hari Ketiga",  date:"26 Jun 2026 (Jumaat)", link: LINKS.kehadiran[2] },
  ];
  return (
    <div className="subpage">
      <TopBar title="Daftar Kehadiran" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">✅</div><div className="sub-title">Daftar Kehadiran</div><div className="sub-sub">Sila isi kehadiran untuk setiap hari program</div></div>
      <div className="sub-body">
        <div className="notice">
          <strong>Penting:</strong> Satu entri sahaja dibenarkan bagi setiap hari. Emel <strong>@moh.gov.my</strong> diperlukan untuk mengesahkan identiti peserta.
        </div>
        <div className="day-cards">
          {days.map(d=>(
            <div key={d.n} className="day-card">
              <div className="day-num">{d.n}</div>
              <div className="day-info"><div className="day-label">{d.label}</div><div className="day-date">{d.date}</div></div>
              <button className="day-btn" onClick={()=>openLink(d.link)}>Isi Kehadiran →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PENDAFTARAN PAGE  (Day 1 only)
   ───────────────────────────────────────────── */
function PendaftaranPage({ onBack }) {
  return (
    <div className="subpage">
      <TopBar title="Pendaftaran Program" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">📝</div><div className="sub-title">Pendaftaran Program</div><div className="sub-sub">Pendaftaran hari pertama sahaja</div></div>
      <div className="sub-body">
        <div className="notice">
          <strong>Penting:</strong> Pendaftaran ini untuk <strong>hari pertama (24 Jun 2026)</strong> sahaja. Satu entri dibenarkan. Emel <strong>@moh.gov.my</strong> diperlukan.
        </div>
        <div className="mb-card">
          <div className="mb-title">Maklumat Yang Diperlukan</div>
          <div className="mb-body">
            Sila sediakan maklumat berikut sebelum mengisi borang:<br/><br/>
            📧 &nbsp;Emel rasmi @moh.gov.my<br/>
            👤 &nbsp;Nama penuh<br/>
            💼 &nbsp;Jawatan<br/>
            🏷️ &nbsp;Gred<br/>
            🏥 &nbsp;Tempat bertugas
          </div>
          <button className="big-btn" onClick={()=>openLink(LINKS.pendaftaran)}>
            📝 &nbsp;Isi Borang Pendaftaran →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TENTATIF PAGE
   ───────────────────────────────────────────── */
function TentatifPage({ onBack }) {
  return (
    <div className="subpage">
      <TopBar title="Tentatif Program" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">📅</div><div className="sub-title">Jadual Program</div><div className="sub-sub">24 – 26 Jun 2026</div></div>
      <div className="sub-body">
        <div className="tent-placeholder">
          <div className="tent-icon">🗓️</div>
          <div className="tent-msg">Jadual program sedang disediakan.<br/>Akan dikemaskini tidak lama lagi.<br/><br/>Sebarang pertanyaan sila hubungi urusetia program.</div>
        </div>
        {/* Add your schedule here later — example below */}
        {/*
        <div className="sched-day">
          <div className="sched-day-title">Hari Pertama · 24 Jun 2026 (Rabu)</div>
          <div className="sched-row"><div className="sched-time">8:00 am</div><div className="sched-act">Pendaftaran Peserta</div></div>
          <div className="sched-row"><div className="sched-time">9:00 am</div><div className="sched-act">Ucapan Pembukaan</div></div>
        </div>
        */}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAKLIMAT PAGE
   ───────────────────────────────────────────── */
function TaklimatPage({ onBack }) {
  return (
    <div className="subpage">
      <TopBar title="Taklimat Bengkel" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">📋</div><div className="sub-title">Taklimat Bengkel</div><div className="sub-sub">Maklumat umum untuk peserta</div></div>
      <div className="sub-body">
        <div className="tent-placeholder">
          <div className="tent-icon">📄</div>
          <div className="tent-msg">Bahan taklimat akan dimuat naik sebelum program bermula.<br/><br/>Peserta akan dimaklumkan melalui saluran rasmi.</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GALERI PAGE
   ───────────────────────────────────────────── */
function GaleriPage({ onBack }) {
  return (
    <div className="subpage">
      <TopBar title="Galeri Foto" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">📸</div><div className="sub-title">Galeri Foto</div><div className="sub-sub">Kenangan program bengkel 2026</div></div>
      <div className="sub-body">
        <div className="galeri-card">
          <div className="galeri-icon">🖼️</div>
          <div className="galeri-msg">Gambar-gambar program akan dimuat naik ke Google Photos semasa dan selepas bengkel berlangsung. Klik butang di bawah untuk melihat album.</div>
          <button className="big-btn gold" onClick={()=>openLink(LINKS.galeri)}>
            📷 &nbsp;Buka Google Photos Album →
          </button>
        </div>
        <div className="notice">Album ini dikongsi secara peribadi. Sila hubungi urusetia jika anda tidak dapat mengakses album.</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAKLUM BALAS PAGE
   ───────────────────────────────────────────── */
function MaklumBalasPage({ onBack }) {
  return (
    <div className="subpage">
      <TopBar title="Maklum Balas" onBack={onBack}/>
      <div className="sub-hero"><div className="sub-icon">💬</div><div className="sub-title">Maklum Balas Program</div><div className="sub-sub">Pandangan anda sangat kami hargai</div></div>
      <div className="sub-body">
        <div className="mb-card">
          <div className="mb-title">Kongsi Pandangan Anda</div>
          <div className="mb-body">Borang maklum balas ini bertujuan untuk menilai keberkesanan program dan menambah baik pelaksanaan pada masa hadapan. Semua maklum balas adalah sulit dan akan digunakan untuk tujuan penambahbaikan sahaja.</div>
          <button className="big-btn" onClick={()=>openLink(LINKS.maklumbalas)}>
            💬 &nbsp;Isi Borang Maklum Balas →
          </button>
        </div>
        <div className="notice">Borang ini hanya boleh diisi <strong>selepas program tamat</strong>. Terima kasih atas penyertaan anda.</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP ROUTER
   ───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home:       <HomePage onNav={setPage}/>,
    kehadiran:  <KehadiranPage  onBack={()=>setPage("home")}/>,
    pendaftaran:<PendaftaranPage onBack={()=>setPage("home")}/>,
    tentatif:   <TentatifPage   onBack={()=>setPage("home")}/>,
    taklimat:   <TaklimatPage   onBack={()=>setPage("home")}/>,
    galeri:     <GaleriPage     onBack={()=>setPage("home")}/>,
    maklumbalas:<MaklumBalasPage onBack={()=>setPage("home")}/>,
  };

  return (
    <div className="pg">
      <style>{CSS}</style>
      {pages[page] ?? pages["home"]}
    </div>
  );
}