// Home.jsx
// Assumes Tailwind CSS is configured in the project.
// Assumes 'Fraunces' and 'Work Sans' are loaded via index.html, e.g.:
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
//
// Navbar and Footer are imported here only to render a complete page for
// preview purposes. In your actual app, put them in a Layout wrapping your
// routes instead — do not copy their JSX into this file.
//
// Creator avatars use DiceBear (https://dicebear.com), a procedural avatar
// generator — no real person's photo, no licensing question.
// The hero photo is a Picsum placeholder (https://picsum.photos) — a
// stand-in for demo purposes only. Replace with licensed photography
// before shipping to production.
"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useScrollReveal } from "./useScrollReveal";

const CREATORS = [
  { name: "Ritu Nair", handle: "@ritubrews", niche: "Home baking", supporters: 214, cupsToday: 6 },
  { name: "Aman Verma", handle: "@amanwrites", niche: "Fiction & poetry", supporters: 89, cupsToday: 2 },
  { name: "Sana Iqbal", handle: "@sanacodes", niche: "Frontend tutorials", supporters: 341, cupsToday: 11 },
  { name: "Devraj Rao", handle: "@devrajmusic", niche: "Lo-fi music", supporters: 156, cupsToday: 4 },
  { name: "Meher Kapoor", handle: "@meherpaints", niche: "Illustration", supporters: 402, cupsToday: 9 },
];

const STEPS = [
  { n: "1", title: "Set up your page", body: "Add your name, what you make, and a photo. Takes about two minutes." },
  { n: "2", title: "Share your link", body: "Drop it in your bio, your video description, wherever your audience already is." },
  { n: "3", title: "Get sent a chai", body: "Supporters send ₹49 for a cup. It lands in your account, no middleman delay." },
];

function avatarUrl(seed) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=F7EFE3`;
}

function SteamLoop() {
  return (
    <svg viewBox="0 0 100 60" className="w-16 h-10" aria-hidden="true">
      <g stroke="#4C6B52" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M30 50 c-8 -14 6 -18 0 -34">
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="M30 50 c-8 -14 6 -18 0 -34; M30 50 c8 -14 -6 -18 0 -34; M30 50 c-8 -14 6 -18 0 -34"
          />
        </path>
        <path d="M60 50 c-8 -14 6 -18 0 -34">
          <animate
            attributeName="d"
            dur="3s"
            begin="0.4s"
            repeatCount="indefinite"
            values="M60 50 c-8 -14 6 -18 0 -34; M60 50 c8 -14 -6 -18 0 -34; M60 50 c-8 -14 6 -18 0 -34"
          />
        </path>
      </g>
    </svg>
  );
}

export default function Home() {
  // Hero animates once on mount, not on scroll — it's already in view on load.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const [statsRef, statsVisible] = useScrollReveal();
  const [howRef, howVisible] = useScrollReveal();
  const [creatorsRef, creatorsVisible] = useScrollReveal(0.05);
  const [ctaRef, ctaVisible] = useScrollReveal();

  const reveal = (visible) =>
    `transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif" }} className="bg-[#F7EFE3] text-[#241712]">
      {/* <Navbar /> */}

      <main>
        {/* Hero — single orchestrated entrance, not per-element chaos */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-700 motion-reduce:transition-none ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <SteamLoop />
              <span className="text-sm text-[#4C6B52] font-medium">Live right now</span>
            </div>
            <h1
              className="text-5xl md:text-6xl leading-[1.05] mb-6"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Someone liked your work enough to send you a chai.
            </h1>
            <p className="text-lg text-[#241712]/70 mb-8 max-w-md">
              get-me-chai is a page where the people who follow your writing,
              your code, your music, or your art can say thanks with a small
              amount of money — no subscriptions, no pressure, just a cup at
              a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/create"
                className="bg-[#8A4B24] text-[#F7EFE3] px-6 py-3 rounded-md font-medium hover:bg-[#733d1c] transition-colors"
              >
                Create your page
              </a>
              <a
                href="#how-it-works"
                className="border border-[#241712]/20 px-6 py-3 rounded-md font-medium hover:border-[#241712]/40 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>

          <div
            className={`relative transition-all duration-700 delay-150 motion-reduce:transition-none ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-[#8A4B24] rounded-2xl rotate-2" />
            <img
              src="https://picsum.photos/seed/chai-cup/640/720"
              alt="Steaming cup of chai on a wooden table"
              className="relative rounded-2xl w-full h-80 md:h-96 object-cover mix-blend-multiply"
              style={{ filter: "sepia(0.3) saturate(1.2)" }}
            />
          </div>
        </section>

        {/* Stats — reveal once as a unit on scroll */}
        <section
          ref={statsRef}
          className={`border-y border-[#241712]/10 ${reveal(statsVisible)}`}
        >
          <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 text-center gap-4">
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>12,400+</p>
              <p className="text-sm text-[#241712]/60 mt-1">chais sent</p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>1,800+</p>
              <p className="text-sm text-[#241712]/60 mt-1">creators on board</p>
            </div>
            <div>
              <p className="text-3xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>₹49</p>
              <p className="text-sm text-[#241712]/60 mt-1">price of one cup</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          ref={howRef}
          className={`max-w-6xl mx-auto px-6 py-20 ${reveal(howVisible)}`}
        >
          <h2 className="text-3xl mb-12" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.n} className="flex gap-4">
                <span
                  className="text-2xl text-[#4C6B52] shrink-0"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                  {step.n}
                </span>
                <div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-[#241712]/70 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creators — cascading stagger, one coordinated reveal, not per-card fades triggered separately */}
        <section id="creators" className="bg-[#241712] text-[#F7EFE3] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl mb-10" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
              People getting chai right now
            </h2>
            <div ref={creatorsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F7EFE3]/10">
              {CREATORS.map((c, i) => (
                <div
                  key={c.handle}
                  className={`bg-[#241712] p-6 flex gap-4 transition-all duration-500 motion-reduce:transition-none ${
                    i === 0 ? "lg:col-span-2" : ""
                  } ${creatorsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: creatorsVisible ? `${i * 90}ms` : "0ms" }}
                >
                  <img
                    src={avatarUrl(c.handle)}
                    alt=""
                    className="w-12 h-12 rounded-full shrink-0 bg-[#F7EFE3]/10"
                  />
                  <div>
                    <p className="text-sm text-[#F7EFE3]/50 mb-1">{c.handle}</p>
                    <h3 className="text-lg mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                      {c.name}
                    </h3>
                    <p className="text-sm text-[#F7EFE3]/60 mb-3">{c.niche}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[#4C6B52]">{c.cupsToday} cups today</span>
                      <span className="text-[#F7EFE3]/50">{c.supporters} supporters</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section
          ref={ctaRef}
          className={`max-w-3xl mx-auto px-6 py-24 text-center ${reveal(ctaVisible)}`}
        >
          <h2 className="text-4xl mb-6" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            Your work is worth a cup.
          </h2>
          <p className="text-[#241712]/70 mb-8">Set up your page in two minutes. It's free to start.</p>
          <a
            href="/create"
            className="inline-block bg-[#8A4B24] text-[#F7EFE3] px-8 py-3 rounded-md font-medium hover:bg-[#733d1c] transition-colors"
          >
            Create your page
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}