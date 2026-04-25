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
      <nav className="fixed top-0 w-full bg-[#0f172a] text-white px-10 py-4 flex justify-between items-center z-50 shadow-lg">
        <h1 className="text-2xl font-bold">Tharuka Portfolio</h1>

        <button
          onClick={downloadPDF}
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </nav>

      <main ref={portfolioRef} className="pt-20">
        <section className="min-h-screen px-10 py-20 bg-gradient-to-br from-white to-blue-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img
                src={profile}
                className="w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-white mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-blue-700 font-semibold mb-3">
                IT4070 Preparation for Professional World
              </p>

              <h1 className="text-6xl font-bold text-[#0f172a] mb-4">
                Tharuka Dilshan Oberathna
              </h1>

              <p className="text-2xl text-slate-600 mb-6">
                IT Undergraduate | Software Engineering
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Info icon={<Mail />} text="oberathna2020@gmail.com" />
                <Info icon={<Phone />} text="+94 77 0705120" />
                <Info icon={<MapPin />} text="Kaduwela, Sri Lanka" />
                <Info icon={<Award />} text="Certified Learner" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="min-h-screen px-10 py-20 bg-white">
          <Title text="Career Development Plan" />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <Box
                year="2026"
                title="Graduate"
                text="Complete degree successfully."
              />
              <Box
                year="2027"
                title="Software Engineer"
                text="Join reputed company."
              />
              <Box
                year="2030"
                title="Senior Engineer"
                text="Lead software projects."
              />
            </div>

            <div className="bg-slate-100 p-8 rounded-2xl shadow">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsData}
                      dataKey="value"
                      outerRadius={110}
                      label
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen px-10 py-20 bg-slate-100">
          <Title text="Certificates" />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Cert img={dip} title="Higher Diploma in IT" />
            <Cert img={python} title="Python for Beginners" />
            <Cert img={oracle} title="Oracle Cloud Foundations" />
            <Cert img={aws} title="AWS Cloud 101" />
          </div>
        </section>

        <footer className="bg-[#0f172a] text-white text-center py-10">
          © 2026 Tharuka Dilshan Oberathna
        </footer>
      </main>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-center">
      <span className="text-blue-600">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Title({ text }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-5xl font-bold text-[#0f172a]">{text}</h2>
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
    </div>
  );
}

function Box({ year, title, text }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-blue-600">
      <p className="text-blue-700 font-bold">{year}</p>
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Cert({ img, title }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <img src={img} className="rounded-xl mb-4 w-full" />
      <h3 className="text-xl font-bold text-center">{title}</h3>
    </div>
  );
}

export default App;