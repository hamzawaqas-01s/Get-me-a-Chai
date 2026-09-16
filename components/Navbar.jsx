"use client"
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Get started", href: "/signup" },
    { label: "Log In", href: "/login" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#F7EFE3]/90 backdrop-blur border-b border-[#241712]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="text-xl text-[#241712]"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          Get me a Chai
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#241712]/70 hover:text-[#241712] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/signup"
            className="text-sm text-[#241712]/70 hover:text-[#241712] transition-colors"
          >
           Sign up
          </a>
          <a
            href="/create"
            className="bg-[#8A4B24] text-[#F7EFE3] text-sm px-4 py-2 rounded-md font-medium hover:bg-[#733d1c] transition-colors"
          >
            Create your page
          </a>
        </div>

        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 bg-[#241712] transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-[#241712] transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-[#241712] transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#F7EFE3] border-t border-[#241712]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#241712]/70"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="/login" className="text-sm text-[#241712]/70">
            Log In
          </a>
          <a
            href="/create"
            className="bg-[#8A4B24] text-[#F7EFE3] text-sm px-4 py-2 rounded-md font-medium text-center"
          >
            Create your page
          </a>
        </div>
      )}
    </header>
  );
}