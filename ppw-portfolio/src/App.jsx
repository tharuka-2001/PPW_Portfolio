import React, { useRef } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import profile from "./assets/profile.jpg";
import dip from "./assets/dip.png";
import python from "./assets/python.png";
import oracle from "./assets/oracle.png";
import aws from "./assets/aws.png";

function App() {
  const portfolioRef = useRef();

  const downloadPDF = async () => {
    const input = portfolioRef.current;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#f8fafc",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Tharuka_Dilshan_PPW_Portfolio.pdf");
  };

  const skillsData = [
    { name: "Web Development", value: 35 },
    { name: "Cloud & DevOps", value: 25 },
    { name: "Communication", value: 20 },
    { name: "Career Readiness", value: 20 },
  ];

  const COLORS = ["#0f172a", "#1d4ed8", "#64748b", "#93c5fd"];

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#0f172a] text-white px-8 py-4 flex justify-between items-center z-50 shadow-lg">
        <h1 className="text-2xl font-bold">Tharuka Portfolio</h1>

        <div className="hidden md:flex gap-5 items-center text-sm">
          <a href="#intro">Introduction</a>
          <a href="#journal">Journal</a>
          <a href="#career">Career</a>
          <a href="#cv">CV</a>
          <a href="#certificates">Certificates</a>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 duration-300"
          >
            Download PDF
          </button>
        </div>
      </nav>

      <main ref={portfolioRef} className="pt-20">
        {/* INTRODUCTION */}
        <section
          id="intro"
          className="min-h-screen px-10 py-20 bg-gradient-to-br from-white to-blue-50"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <img
                src={profile}
                alt="Profile"
                className="w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              {/* <p className="text-blue-700 font-semibold mb-3">
                IT4070 Preparation for Professional World
              </p> */}

              <h1 className="text-5xl md:text-6xl font-extrabold text-[#0f172a] mb-4">
                Tharuka Dilshan Oberathna
              </h1>

              <p className="text-2xl text-slate-600 mb-6">
                IT Undergraduate | Software Engineering
              </p>

              <p className="text-lg leading-8 text-slate-700">
                I am an undergraduate at Sri Lanka Institute of Information
                Technology, specializing in Software Engineering. I am passionate
                about full-stack development, cloud computing, DevOps, and
                building practical software solutions that solve real-world
                problems.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <InfoItem icon={<Mail />} text="oberathna2020@gmail.com" />
                <InfoItem icon={<Phone />} text="+94 77 0705120" />
                <InfoItem icon={<MapPin />} text="Kaduwela, Sri Lanka" />
                <InfoItem icon={<Award />} text="GitHub: tharuka-2001" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* REFLECTIVE JOURNAL */}
        <section id="journal" className="min-h-screen px-10 py-20 bg-white">
          <SectionTitle title="Reflective Journal - What I Learned in PPW" />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <JournalCard
              title="Professional Communication"
              text="PPW helped me understand the importance of clear, polite, and professional communication. I learned how to express ideas confidently and communicate respectfully in academic and workplace environments."
            />

            <JournalCard
              title="Business Writing"
              text="I learned how to write formal emails, letters, memos, and reports using proper structure. This improved my ability to write concise, accurate, and professional documents."
            />

            <JournalCard
              title="Presentation Skills"
              text="The module helped me improve presentation structure, voice control, eye contact, confidence, and the use of visual aids. I now understand how to deliver ideas clearly to an audience."
            />

            <JournalCard
              title="Interview Preparation"
              text="I learned how to prepare for internship and job interviews, answer common questions, present my strengths, and maintain professional body language during interviews."
            />

            <JournalCard
              title="Career Readiness"
              text="PPW helped me identify my career goals and understand workplace expectations such as punctuality, ethics, teamwork, communication, and continuous learning."
            />

            <JournalCard
              title="Personal Growth"
              text="Before this module, I focused mainly on technical skills. Now I understand that soft skills, confidence, professional attitude, and career planning are equally important for success."
            />
          </div>
        </section>

        {/* CAREER DEVELOPMENT PLAN */}
        <section id="career" className="min-h-screen px-10 py-20 bg-slate-100">
          <SectionTitle title="Career Development Plan" />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <Timeline
                year="Short Term: 2026"
                title="Complete Degree and Internship"
                text="Complete my degree successfully, gain internship experience, improve professional communication, and contribute to real software development projects."
              />

              <Timeline
                year="Medium Term: 2027 - 2029"
                title="Become a Full-Stack Software Engineer"
                text="Join a reputed software company and improve my skills in React, Node.js, MongoDB, cloud platforms, Docker, Kubernetes, and software engineering best practices."
              />

              <Timeline
                year="Long Term: 2030+"
                title="Grow into Senior Engineer / Tech Lead"
                text="Lead software projects, mentor junior developers, specialize in cloud-native systems, and contribute to enterprise-level applications."
              />

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Target className="text-blue-600" /> SMART Goals
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Improve React, Node.js, and cloud development skills.</li>
                  <li>Complete more certifications in cloud and DevOps.</li>
                  <li>Build a strong GitHub portfolio with real projects.</li>
                  <li>Improve communication, teamwork, and leadership skills.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6">
                Skill Development Focus
              </h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="text-center text-slate-600">
                My development plan balances technical growth, cloud skills,
                communication, and career readiness.
              </p>
            </div>
          </div>
        </section>

        {/* CV */}
        <section id="cv" className="min-h-screen px-10 py-20 bg-white">
          <SectionTitle title="Curriculum Vitae" />

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Profile</h3>

              <p className="leading-7 text-slate-200">
                Passionate IT undergraduate with knowledge in software
                engineering, full-stack development, cloud computing, DevOps,
                and database systems.
              </p>

              <h3 className="text-xl font-bold mt-8 mb-4">Contact</h3>
              <p>Email: oberathna2020@gmail.com</p>
              <p>Phone: +94 77 0705120</p>
              <p>Location: Kaduwela, Sri Lanka</p>

              <h3 className="text-xl font-bold mt-8 mb-4">Languages</h3>
              <p>Sinhala - Native</p>
              <p>English - Fluent</p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <CvBlock
                icon={<GraduationCap />}
                title="Education"
                items={[
                  "BSc (Hons) in Information Technology Specialising in Software Engineering - SLIIT",
                  "G.C.E. Advanced Level - Biological Science Stream",
                ]}
              />

              <CvBlock
                icon={<Briefcase />}
                title="Technical Skills"
                items={[
                  "Frontend: React, HTML, CSS, JavaScript, Tailwind CSS",
                  "Backend: Node.js, Express.js",
                  "Databases: MongoDB, MySQL",
                  "DevOps: Docker, Kubernetes, Linux",
                  "Tools: GitHub, VS Code, Postman, Figma, Android Studio",
                ]}
              />

              <CvBlock
                icon={<Award />}
                title="Certifications"
                items={[
                  "Higher Diploma in Information Technology",
                  "AWS Educate Introduction to Cloud 101",
                  "Oracle Cloud Infrastructure Certified Foundations Associate",
                  "Python for Beginners - University of Moratuwa",
                ]}
              />

              <CvBlock
                icon={<Target />}
                title="Soft Skills"
                items={[
                  "Professional communication",
                  "Team collaboration",
                  "Problem solving",
                  "Project planning and management",
                ]}
              />
            </div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="min-h-screen px-10 py-20 bg-slate-100">
          <SectionTitle title="Certificate Evidence" />

          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 border-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4">
                Highlighted Certificate: Higher Diploma in Information Technology
              </h3>

              <p className="text-slate-700 mb-6 leading-8">
                This certificate is highlighted because it shows my continuous
                improvement in technical knowledge and my commitment to
                professional development in the IT field.
              </p>

              <img
                src={dip}
                alt="Diploma Certificate"
                className="rounded-xl shadow-lg w-full"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <CertCard img={python} title="Python for Beginners" />
              <CertCard img={oracle} title="Oracle Cloud Foundations" />
              <CertCard img={aws} title="AWS Cloud 101" />
            </div>
          </div>
        </section>

        {/* PROJECTS + CONCLUSION */}
        <section className="min-h-screen px-10 py-20 bg-white">
          <SectionTitle title="Projects & Final Reflection" />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ProjectCard
              title="Cloud-Native Food Ordering & Delivery System"
              text="MERN stack, microservices, Docker, Kubernetes, JWT authentication, and payment gateway integration."
            />

            <ProjectCard
              title="Job Nest - Smart Career Connection Platform"
              text="React Native, Node.js, MongoDB, JWT authentication, Stripe payment, and mobile UI/UX."
            />

            <ProjectCard
              title="Personal Finance Tracker System"
              text="Secure MERN application with RESTful APIs, JWT authentication, spending insights, and Jest testing."
            />

            <ProjectCard
              title="Waste Management CRM System"
              text="CRM module with feedback, complaints, support requests, REST APIs, and Tailwind CSS UI."
            />
          </div>

          <div className="max-w-4xl mx-auto mt-16 bg-slate-100 p-10 rounded-2xl shadow-lg text-center">
            <h3 className="text-3xl font-bold mb-4">Final Reflection</h3>

            <p className="text-lg leading-8 text-slate-700">
              Preparing this portfolio allowed me to reflect on my academic
              journey, professional skills, and future career goals. The PPW
              module helped me understand that becoming a successful IT
              professional requires not only technical knowledge but also
              communication, confidence, teamwork, planning, and continuous
              self-development.
            </p>
          </div>

          <footer className="mt-16 bg-[#0f172a] text-white text-center py-8 rounded-2xl">
            <p className="text-lg font-semibold">
              © 2026 Tharuka Dilshan Oberathna
            </p>
            <p>Professional Portfolio - IT4070 Preparation for Professional World</p>
          </footer>
        </section>
      </main>
    </div>
  );
}

/* COMPONENTS */

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
      <span className="text-blue-600">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a]">
        {title}
      </h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}

function JournalCard({ title, text }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200"
    >
      <h3 className="text-2xl font-bold mb-4 text-[#0f172a]">{title}</h3>
      <p className="text-slate-700 leading-7">{text}</p>
    </motion.div>
  );
}

function Timeline({ year, title, text }) {
  return (
    <div className="border-l-4 border-blue-600 pl-6 bg-white p-6 rounded-r-2xl shadow-lg">
      <h3 className="text-blue-700 font-bold">{year}</h3>
      <h4 className="text-xl font-bold mt-1">{title}</h4>
      <p className="text-slate-700 mt-2 leading-7">{text}</p>
    </div>
  );
}

function CvBlock({ icon, title, items }) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl shadow border border-slate-200">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#0f172a]">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h3>

      <ul className="list-disc pl-6 space-y-2 text-slate-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function CertCard({ img, title }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <img src={img} alt={title} className="rounded-xl mb-4 w-full" />
      <h3 className="font-bold text-xl text-center">{title}</h3>
    </div>
  );
}

function ProjectCard({ title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-slate-100 p-8 rounded-2xl shadow-lg border border-slate-200"
    >
      <h3 className="text-2xl font-bold mb-3 text-[#0f172a]">{title}</h3>
      <p className="text-slate-700 leading-7">{text}</p>
    </motion.div>
  );
}

export default App;