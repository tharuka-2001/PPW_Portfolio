import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Mail,
  Phone,
  MapPin,

  ExternalLink,
  Download,
  ChevronRight,
  Code2,
  Cloud,
  Users,
  TrendingUp,
} from "lucide-react";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import profile from "./assets/profile.jpg";
import dip from "./assets/dip.png";
import python from "./assets/python.png";
import oracle from "./assets/oracle.png";
import aws from "./assets/aws.png";

/* ─── Design tokens ─────────────────────────────────────────── */
const C = {
  bg:       "#070c18",
  surface:  "#0d1526",
  card:     "#111827",
  border:   "rgba(255,255,255,0.06)",
  accent:   "#2563eb",
  accentMd: "#3b82f6",
  accentLt: "#60a5fa",
  cyan:     "#0ea5e9",
  purple:   "#8b5cf6",
  text1:    "#f1f5f9",
  text2:    "#94a3b8",
  text3:    "#475569",
};

/* ─── Fade-in wrapper ────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Noise texture overlay ──────────────────────────────────── */
const noiseStyle = {
  position: "fixed",
  inset: 0,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
  backgroundSize: "200px 200px",
  pointerEvents: "none",
  zIndex: 0,
  opacity: 0.4,
};

/* ─── Section wrapper ────────────────────────────────────────── */
function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "96px 0",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {children}
    </section>
  );
}

function Container({ children }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.accentLt,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
      <div
        style={{
          marginTop: 8,
          width: 32,
          height: 2,
          background: C.accent,
          borderRadius: 1,
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════ */
export default function App() {
  const portfolioRef = useRef();
  const [activeNav, setActiveNav] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);

  /* Track active section on scroll */
  useEffect(() => {
    const ids = ["intro", "journal", "skills", "career", "cv", "projects", "certificates"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const downloadPDF = async () => {
    const input = portfolioRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: C.bg,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pw = 210;
    const ph = 297;
    const ih = (canvas.height * pw) / canvas.width;
    let left = ih;
    let pos = 0;
    pdf.addImage(imgData, "PNG", 0, pos, pw, ih);
    left -= ph;
    while (left > 0) {
      pos = left - ih;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, pos, pw, ih);
      left -= ph;
    }
    pdf.save("Tharuka_Dilshan_Portfolio.pdf");
  };

  const navLinks = [
    { id: "intro", label: "About" },
    { id: "journal", label: "Journal" },
    { id: "skills", label: "Skills" },
    { id: "career", label: "Career" },
    { id: "cv", label: "CV" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
  ];

  /* ── Skill data ── */
  const techSkills = [
    { name: "React / Next.js", level: 85, color: C.accentLt },
    { name: "Node.js / Express", level: 78, color: C.accentLt },
    { name: "MongoDB / MySQL", level: 72, color: C.cyan },
    { name: "Docker / Kubernetes", level: 65, color: C.cyan },
    { name: "AWS / Cloud", level: 60, color: C.purple },
    { name: "TypeScript", level: 68, color: C.purple },
  ];

  const radarData = [
    { subject: "Frontend", A: 85 },
    { subject: "Backend", A: 78 },
    { subject: "Cloud", A: 60 },
    { subject: "DevOps", A: 65 },
    { subject: "Communication", A: 80 },
    { subject: "Leadership", A: 70 },
  ];

  const softSkills = [
    { icon: <Code2 size={16} />, label: "Problem Solving" },
    { icon: <Users size={16} />, label: "Team Collaboration" },
    { icon: <TrendingUp size={16} />, label: "Continuous Learning" },
    { icon: <Cloud size={16} />, label: "Cloud Thinking" },
  ];

  /* ── Journal entries ── */
  const journal = [
    {
      num: "01",
      title: "Professional Communication",
      text: "Learned to express ideas clearly and respectfully in academic and workplace settings. Understood tone, clarity, and the value of active listening.",
    },
    {
      num: "02",
      title: "Business Writing",
      text: "Mastered formal emails, letters, memos, and reports. Developed the ability to write concise, accurate, and professional documents.",
    },
    {
      num: "03",
      title: "Presentation Skills",
      text: "Improved structure, voice control, eye contact, and confidence. Learned to communicate complex ideas clearly using visual aids.",
    },
    {
      num: "04",
      title: "Interview Preparation",
      text: "Prepared for internship and job interviews, learned to answer behavioral questions and present strengths professionally.",
    },
    {
      num: "05",
      title: "Career Readiness",
      text: "Identified career goals and workplace expectations — punctuality, ethics, teamwork, communication, and continuous learning.",
    },
    {
      num: "06",
      title: "Personal Growth",
      text: "Recognized that soft skills, confidence, and career planning are equally important as technical expertise for long-term success.",
    },
  ];

  /* ── Timeline ── */
  const timeline = [
    {
      period: "2026 · Short term",
      title: "Degree completion & internship",
      desc: "Graduate successfully, secure an internship, and contribute to real-world software development projects.",
      color: C.accentLt,
    },
    {
      period: "2027 – 2029 · Mid term",
      title: "Full-stack software engineer",
      desc: "Join a reputed software company. Deepen expertise in React, Node.js, cloud platforms, Docker, and Kubernetes.",
      color: C.cyan,
    },
    {
      period: "2030+ · Long term",
      title: "Senior engineer / tech lead",
      desc: "Lead software projects, mentor junior developers, and contribute to enterprise-level cloud-native systems.",
      color: C.purple,
    },
  ];

  /* ── Projects ── */
  const projects = [
    {
      title: "Cloud-Native Food Ordering & Delivery",
      desc: "Microservices architecture with Docker and Kubernetes. Includes JWT authentication and Stripe payment gateway integration.",
      tags: ["MERN", "Docker", "Kubernetes", "Stripe", "JWT"],
      accent: C.accentLt,
    },
    {
      title: "Job Nest — Smart Career Platform",
      desc: "Cross-platform mobile app with intelligent job matching, Stripe payments, and a polished React Native UI/UX.",
      tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
      accent: C.cyan,
    },
    {
      title: "Personal Finance Tracker",
      desc: "Secure MERN application with RESTful APIs, spending insights, data visualizations, and Jest unit testing.",
      tags: ["MERN", "REST API", "Jest", "JWT"],
      accent: C.purple,
    },
    {
      title: "Waste Management CRM",
      desc: "CRM module handling feedback, complaints, and support requests. REST APIs with a Tailwind CSS frontend.",
      tags: ["Node.js", "Express", "Tailwind", "REST API"],
      accent: C.accentLt,
    },
  ];

  /* ── Certifications ── */
  const certs = [
    { img: python, title: "Python for Beginners", issuer: "University of Moratuwa" },
    { img: oracle, title: "Oracle Cloud Foundations", issuer: "Oracle" },
    { img: aws, title: "AWS Cloud 101", issuer: "AWS Educate" },
  ];

  /* ── CV blocks ── */
  const cvSkillItems = [
    "Frontend: React, HTML, CSS, JavaScript, Tailwind CSS",
    "Backend: Node.js, Express.js",
    "Databases: MongoDB, MySQL",
    "DevOps: Docker, Kubernetes, Linux",
    "Tools: GitHub, VS Code, Postman, Figma, Android Studio",
  ];

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        background: C.bg,
        color: C.text1,
        minHeight: "100vh",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: "relative",
      }}
    >
      {/* Noise overlay */}
      <div style={noiseStyle} />

      {/* Ambient glow blobs */}
      <div
        style={{
          position: "fixed",
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          background: "rgba(7,12,24,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 15, color: C.text1, letterSpacing: "0.02em" }}>
         - Tharuka Dilshan Oberathna -
        </span>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              style={{
                fontSize: 13,
                padding: "6px 12px",
                borderRadius: 6,
                textDecoration: "none",
                color: activeNav === l.id ? C.accentLt : C.text2,
                background: activeNav === l.id ? "rgba(37,99,235,0.12)" : "transparent",
                transition: "all 0.2s",
                fontWeight: activeNav === l.id ? 500 : 400,
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={downloadPDF}
            style={{
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: C.accent,
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}
          >
            <Download size={14} />
            Download CV
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main ref={portfolioRef} style={{ paddingTop: 64, position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══ */}
        <section
          id="intro"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 40px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "center",
              }}
            >
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(37,99,235,0.12)",
                    border: `1px solid rgba(37,99,235,0.25)`,
                    borderRadius: 20,
                    padding: "6px 14px",
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontSize: 12, color: C.accentLt, fontWeight: 500 }}>
                    Available for internship · 2026
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: C.text1,
                    marginBottom: 16,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Tharuka<br />
                  <span style={{ color: C.accentLt }}>Dilshan</span><br />
                  Oberathna
                </h1>

                <p
                  style={{
                    fontSize: 16,
                    color: C.text2,
                    lineHeight: 1.7,
                    marginBottom: 32,
                    maxWidth: 440,
                  }}
                >
                  IT undergraduate at SLIIT specializing in Software Engineering.
                  Passionate about full-stack development, cloud computing, and
                  building software that solves real-world problems.
                </p>

                {/* Tech stack badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
                  {["React", "Node.js", "MongoDB", "Docker", "Kubernetes", "AWS"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 12,
                        padding: "5px 12px",
                        borderRadius: 20,
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${C.border}`,
                        color: C.text2,
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Contact chips */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: <Mail size={14} />, text: "oberathna2020@gmail.com" },
                    { icon: <Phone size={14} />, text: "+94 77 0705120" },
                    { icon: <MapPin size={14} />, text: "Kaduwela, Sri Lanka" },
                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, text: "github.com/tharuka-2001" },
                  ].map((c) => (
                    <div
                      key={c.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: C.text2,
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: C.accentLt }}>{c.icon}</span>
                      {c.text}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — profile photo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div style={{ position: "relative" }}>
                  {/* Outer ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: -12,
                      borderRadius: "50%",
                      border: `1px solid rgba(37,99,235,0.2)`,
                    }}
                  />
                  {/* Mid ring */}
                  <div
                    style={{
                      position: "absolute",
                      inset: -6,
                      borderRadius: "50%",
                      border: `1px solid rgba(37,99,235,0.1)`,
                    }}
                  />
                  <img
                    src={profile}
                    alt="Tharuka Dilshan"
                    style={{
                      width: 320,
                      height: 320,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `3px solid rgba(37,99,235,0.4)`,
                      display: "block",
                    }}
                  />
                  {/* Floating badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      right: -24,
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "12px 16px",
                    }}
                  >
                    <div style={{ fontSize: 11, color: C.text3, marginBottom: 2 }}>Degree</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>BSc (Hons) IT</div>
                    <div style={{ fontSize: 11, color: C.accentLt }}>Software Engineering</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ══ REFLECTIVE JOURNAL ══ */}
        <Section id="journal">
          <Container>
            <FadeIn>
              <SectionLabel text="Reflective journal" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                What I Learned
              </h2>
              <p style={{ fontSize: 15, color: C.text2, marginBottom: 48, maxWidth: 520 }}>
                Key takeaways from the Preparation for Professional World module that shaped
                how I approach my career.
              </p>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {journal.map((j, i) => (
                <FadeIn key={j.num} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -4, borderColor: "rgba(37,99,235,0.35)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      padding: 28,
                      height: "100%",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "rgba(37,99,235,0.2)",
                        fontVariantNumeric: "tabular-nums",
                        marginBottom: 16,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {j.num}
                    </div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: C.text1,
                        marginBottom: 10,
                      }}
                    >
                      {j.title}
                    </h3>
                    <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7 }}>{j.text}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* ══ SKILLS ══ */}
        <Section id="skills">
          <Container>
            <FadeIn>
              <SectionLabel text="Technical expertise" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 48,
                  letterSpacing: "-0.02em",
                }}
              >
                Skills & Proficiency
              </h2>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              {/* Skill bars */}
              <FadeIn delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {techSkills.map((s) => (
                    <div key={s.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ fontSize: 13, color: C.text2, fontWeight: 500 }}>
                          {s.name}
                        </span>
                        <span style={{ fontSize: 12, color: C.text3 }}>{s.level}%</span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                          style={{
                            height: "100%",
                            background: s.color,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Soft skills */}
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 11, color: C.text3, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                      Soft Skills
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {softSkills.map((s) => (
                        <div
                          key={s.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "rgba(255,255,255,0.04)",
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: "8px 14px",
                            fontSize: 12,
                            color: C.text2,
                          }}
                        >
                          <span style={{ color: C.accentLt }}>{s.icon}</span>
                          {s.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Radar chart */}
              <FadeIn delay={0.2}>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 28,
                  }}
                >
                  <div style={{ fontSize: 13, color: C.text2, marginBottom: 4, fontWeight: 500 }}>
                    Skill Overview
                  </div>
                  <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.06)" />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: C.text3, fontSize: 12 }}
                        />
                        <Radar
                          name="Skills"
                          dataKey="A"
                          stroke={C.accentLt}
                          fill={C.accent}
                          fillOpacity={0.2}
                          strokeWidth={1.5}
                        />
                        <Tooltip
                          contentStyle={{
                            background: C.card,
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            color: C.text1,
                            fontSize: 12,
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        {/* ══ CAREER PLAN ══ */}
        <Section id="career">
          <Container>
            <FadeIn>
              <SectionLabel text="Career development plan" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                Roadmap
              </h2>
              <p style={{ fontSize: 15, color: C.text2, marginBottom: 56, maxWidth: 480 }}>
                A structured plan for professional growth from graduation to tech leadership.
              </p>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              {/* Timeline */}
              <div>
                {timeline.map((t, i) => (
                  <FadeIn key={t.period} delay={i * 0.1}>
                    <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: t.color,
                            boxShadow: `0 0 12px ${t.color}55`,
                            marginTop: 4,
                          }}
                        />
                        {i < timeline.length - 1 && (
                          <div
                            style={{
                              width: 1,
                              flex: 1,
                              background: "rgba(255,255,255,0.06)",
                              marginTop: 8,
                              minHeight: 48,
                            }}
                          />
                        )}
                      </div>
                      <div style={{ paddingBottom: 8 }}>
                        <div
                          style={{ fontSize: 11, color: t.color, fontWeight: 500, marginBottom: 6 }}
                        >
                          {t.period}
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: C.text1,
                            marginBottom: 8,
                          }}
                        >
                          {t.title}
                        </div>
                        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7 }}>{t.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* SMART Goals */}
              <FadeIn delay={0.2}>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 32,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 24,
                    }}
                  >
                    <Target size={18} color={C.accentLt} />
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text1 }}>SMART Goals</h3>
                  </div>

                  {[
                    "Strengthen React, Node.js, and cloud development skills",
                    "Complete cloud and DevOps certifications (AWS, GCP)",
                    "Build a strong GitHub portfolio with production-quality projects",
                    "Improve professional communication and leadership",
                    "Secure a software engineering internship in 2026",
                  ].map((g, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        marginBottom: 16,
                        paddingBottom: 16,
                        borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
                      }}
                    >
                      <ChevronRight
                        size={14}
                        color={C.accentLt}
                        style={{ marginTop: 2, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13, color: C.text2, lineHeight: 1.6 }}>{g}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </Container>
        </Section>

        {/* ══ CV ══ */}
        <Section id="cv">
          <Container>
            <FadeIn>
              <SectionLabel text="Curriculum vitae" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 48,
                  letterSpacing: "-0.02em",
                }}
              >
                Résumé
              </h2>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28 }}>
              {/* Left column */}
              <FadeIn delay={0.05}>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: 28,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(37,99,235,0.15)",
                      border: `1px solid rgba(37,99,235,0.25)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 700,
                      color: C.accentLt,
                      marginBottom: 16,
                    }}
                  >
                    TD
                  </div>

                  <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text1, marginBottom: 4 }}>
                    Tharuka Dilshan
                  </h3>
                  <p style={{ fontSize: 12, color: C.text2, marginBottom: 24, lineHeight: 1.6 }}>
                    Passionate IT undergraduate with knowledge in software engineering,
                    full-stack development, cloud computing, and DevOps.
                  </p>

                  <CvSideSection title="Contact">
                    <CvSideItem label="Email" value="oberathna2020@gmail.com" />
                    <CvSideItem label="Phone" value="+94 77 0705120" />
                    <CvSideItem label="Location" value="Kaduwela, Sri Lanka" />
                    <CvSideItem label="GitHub" value="tharuka-2001" />
                  </CvSideSection>

                  <CvSideSection title="Languages">
                    <CvSideItem label="Sinhala" value="Native" />
                    <CvSideItem label="English" value="Fluent" />
                  </CvSideSection>
                </div>
              </FadeIn>

              {/* Right column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <FadeIn delay={0.1}>
                  <CvBlock icon={<GraduationCap size={16} />} title="Education">
                    <CvItem
                      primary="BSc (Hons) Information Technology — Software Engineering"
                      secondary="Sri Lanka Institute of Information Technology (SLIIT)"
                    />
                    <CvItem
                      primary="G.C.E. Advanced Level — Biological Science Stream"
                      secondary="2020"
                    />
                  </CvBlock>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <CvBlock icon={<Briefcase size={16} />} title="Technical Skills">
                    {cvSkillItems.map((s, i) => (
                      <CvItem key={i} primary={s} />
                    ))}
                  </CvBlock>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <CvBlock icon={<Award size={16} />} title="Certifications">
                    <CvItem primary="Higher Diploma in Information Technology" secondary="SLIIT" />
                    <CvItem primary="AWS Educate Introduction to Cloud 101" secondary="Amazon Web Services" />
                    <CvItem primary="Oracle Cloud Infrastructure Foundations Associate" secondary="Oracle" />
                    <CvItem primary="Python for Beginners" secondary="University of Moratuwa" />
                  </CvBlock>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <CvBlock icon={<Target size={16} />} title="Soft Skills">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
                      {[
                        "Professional Communication",
                        "Team Collaboration",
                        "Problem Solving",
                        "Project Management",
                        "Time Management",
                        "Continuous Learning",
                      ].map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: 12,
                            padding: "4px 12px",
                            borderRadius: 20,
                            background: "rgba(37,99,235,0.1)",
                            border: `1px solid rgba(37,99,235,0.2)`,
                            color: C.accentLt,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </CvBlock>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>

        {/* ══ PROJECTS ══ */}
        <Section id="projects">
          <Container>
            <FadeIn>
              <SectionLabel text="Portfolio" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 48,
                  letterSpacing: "-0.02em",
                }}
              >
                Projects
              </h2>
            </FadeIn>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {projects.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      padding: 28,
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      cursor: "default",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: p.accent,
                        opacity: 0.6,
                      }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text1, lineHeight: 1.4, flex: 1 }}>
                        {p.title}
                      </h3>
                      <ExternalLink size={14} color={C.text3} style={{ flexShrink: 0, marginLeft: 8 }} />
                    </div>

                    <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7 }}>{p.desc}</p>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: "3px 9px",
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.04)",
                            border: `1px solid ${C.border}`,
                            color: C.text3,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* ══ CERTIFICATES ══ */}
        <Section id="certificates">
          <Container>
            <FadeIn>
              <SectionLabel text="Credentials" />
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: C.text1,
                  marginBottom: 48,
                  letterSpacing: "-0.02em",
                }}
              >
                Certificates
              </h2>
            </FadeIn>

            {/* Featured */}
            <FadeIn delay={0.1}>
              <div
                style={{
                  background: C.card,
                  border: `1px solid rgba(37,99,235,0.3)`,
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr 1.4fr",
                  gap: 32,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "rgba(37,99,235,0.12)",
                      color: C.accentLt,
                      marginBottom: 16,
                      fontWeight: 500,
                    }}
                  >
                    Featured
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.text1, marginBottom: 12 }}>
                    Higher Diploma in Information Technology
                  </h3>
                  <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7 }}>
                    Awarded by SLIIT. This certificate demonstrates continuous commitment to
                    technical growth and professional development in the IT field.
                  </p>
                </div>
                <img
                  src={dip}
                  alt="Higher Diploma Certificate"
                  style={{ width: "100%", borderRadius: 12, border: `1px solid ${C.border}` }}
                />
              </div>
            </FadeIn>

            {/* Other certs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {certs.map((c, i) => (
                <FadeIn key={c.title} delay={0.1 + i * 0.08}>
                  <div
                    style={{
                      background: C.card,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      padding: 20,
                    }}
                  >
                    <img
                      src={c.img}
                      alt={c.title}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        marginBottom: 14,
                        border: `1px solid ${C.border}`,
                      }}
                    />
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text1, marginBottom: 4 }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: 12, color: C.text3 }}>{c.issuer}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>

        {/* ══ FINAL REFLECTION ══ */}
        <section style={{ padding: "96px 0 0", position: "relative", zIndex: 1 }}>
          <Container>
            <FadeIn>
              <div
                style={{
                  textAlign: "center",
                  maxWidth: 680,
                  margin: "0 auto",
                  paddingBottom: 80,
                }}
              >
                <SectionLabel text="Closing thoughts" />
                <h2
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: C.text1,
                    marginBottom: 20,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Final Reflection
                </h2>
                <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.8 }}>
                  Building this portfolio allowed me to reflect on my academic journey,
                  professional skills, and future career goals. I now understand that becoming
                  a successful IT professional requires not only technical knowledge but also
                  communication, confidence, teamwork, planning, and continuous self-development.
                </p>
              </div>
            </FadeIn>
          </Container>

          {/* Footer */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: "28px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, color: C.text3 }}>
              © 2026 Tharuka Dilshan Oberathna
            </span>
            <span style={{ fontSize: 13, color: C.text3 }}>
              BSc (Hons) IT · Software Engineering · SLIIT
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── CV helper components ──────────────────────────────────── */

function CvSideSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: C.text3,
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function CvSideItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: C.text3, marginBottom: 1 }}>{label}</div>
      <div style={{ fontSize: 12, color: C.text2 }}>{value}</div>
    </div>
  );
}

function CvBlock({ icon, title, children }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 18,
        }}
      >
        <span style={{ color: C.accentLt }}>{icon}</span>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text1 }}>{title}</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function CvItem({ primary, secondary }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        paddingBottom: 12,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <ChevronRight size={12} color={C.text3} style={{ marginTop: 3, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.5 }}>{primary}</div>
        {secondary && (
          <div style={{ fontSize: 11, color: C.text3, marginTop: 2 }}>{secondary}</div>
        )}
      </div>
    </div>
  );
}