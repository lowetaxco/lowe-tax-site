import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ title, price, desc, features = [], highlight, label }) => (
  <div className={`relative p-6 md:p-8 rounded-2xl border bg-white ${highlight ? "shadow-xl border-gray-900" : "border-gray-200"}`}>

    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
        {label || "Most Popular"}
      </div>
    )}

    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{desc}</p>
    <div className="mt-6 text-3xl font-semibold text-gray-900">{price}</div>

    <ul className="mt-6 space-y-2 text-sm text-gray-700">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2">
          <span>•</span>
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <div className="mt-6 space-y-2">
      <a href="#" className="block w-full text-center bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md">Book Now</a>
      <a href="https://calendly.com/sam-lowetax" target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-gray-300 py-2 rounded-md hover:bg-gray-50">Schedule a Call</a>
    </div>
  </div>
);

export default function HomePage() {
  const [tab, setTab] = useState("tax");
  const [recommended, setRecommended] = useState(null);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [sub, setSub] = useState({});

  const toggle = (opt) => {
    setSelected([opt]);
    setSub({});
    setStep(1);
  };

  const next = () => {
    if (selected.length === 0) return;
    setStep(2);
  };

  const recommend = () => {
    if (selected.includes("Tax Preparation")) {
      const tax = sub.tax || [];
      let rec = "Essential";
      if (tax.includes("Self-employed")) rec = "Business";
      else if (tax.includes("1099 Income") || tax.includes("Investment Income") || tax.includes("Stock Compensation")) rec = "Standard";
      setRecommended(rec);
      setTab("tax");
    }

    if (selected.includes("Investment Advice")) {
      const isClient = sub.advisoryClient;
      const needs = sub.advisoryNeeds || [];
      let rec = "Snapshot";
      if (needs.includes("Guidance around major life changes")) rec = "Ongoing";
      else if (isClient === "Yes") rec = "Planning";
      setRecommended(rec);
      setTab("advisory");
    }

    if (selected.includes("Bookkeeping")) {
      const needs = sub.bookkeeping || [];
      let rec = "Foundation";
      if (needs.includes("Monthly reporting and reconciliation")) rec = "Core";
      if (needs.includes("Ongoing tax strategy and impact of business decisions")) rec = "Performance";
      setRecommended(rec);
      setTab("bookkeeping");
    }

    setStep(1);
    setSelected([]);
    setSub({});

    setTimeout(() => {
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-gray-900">

      <nav className="flex justify-between items-center px-4 md:px-8 py-6 border-b">
        <div className="text-xl font-semibold">Lowe <span className="font-light">Tax & Advisory</span></div>
        <div className="flex gap-6 text-sm">
          <a href="#pricing">Services</a>
          <a href="#about">About</a>
          <a href="#need-help" className="px-4 py-1 rounded-full bg-gray-900 text-white">Find Your Fit</a>
        </div>
      </nav>

      <section className="text-center py-20 max-w-3xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold">
          Clarity in your taxes.<br/>Confidence in your finances.
        </motion.h1>
      </section>

      <div className="flex justify-center mb-10">
        {["tax","advisory","bookkeeping"].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 ${tab===t?"bg-black text-white":""}`}>
            {t}
          </button>
        ))}
      </div>

      <section id="pricing" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        <Card title="Essential" price="$500" desc="W-2 focused" features={["W-2","Basic"]} />
        <Card title="Standard" price="$750" desc="More complex" features={["1099","RSU"]} />
        <Card title="Business" price="$1200" desc="Self-employed" features={["Schedule C"]} />
      </section>

      <section id="about" className="py-20 px-4">
        <p>I’ve spent 25 years building businesses and helping people understand finances.</p>
      </section>

      <section id="need-help" className="py-20 px-4">
        {step===1 && (
          <div>
            {["Tax Preparation","Investment Advice","Bookkeeping"].map(opt=> (
              <button key={opt} onClick={()=>toggle(opt)} className="block w-full border p-3 mb-2">{opt}</button>
            ))}
            <button onClick={next}>Next</button>
          </div>
        )}

        {step===2 && (
          <button onClick={recommend}>Get Recommendation</button>
        )}
      </section>

    </div>
  );
}
