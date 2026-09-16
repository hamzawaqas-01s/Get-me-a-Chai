export default function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Explore creators", "How it works", "Pricing"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Contact"],
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Refunds"],
    },
  ];

  return (
    <footer className="bg-[#241712] text-[#F7EFE3]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <p
            className="text-xl mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            get me chai
          </p>
          <p className="text-sm text-[#F7EFE3]/60 max-w-xs leading-relaxed">
            A small way for people to say thanks to the creators, writers,
            and makers they follow — one cup at a time.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold mb-4 text-[#F7EFE3]/90">
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#F7EFE3]/60 hover:text-[#F7EFE3] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#F7EFE3]/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#F7EFE3]/50">
            © {new Date().getFullYear()} get me chai. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["twitter", "instagram", "github"].map((name) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="w-8 h-8 rounded-full border border-[#F7EFE3]/20 flex items-center justify-center hover:border-[#F7EFE3]/50 transition-colors"
              >
                <span className="text-xs text-[#F7EFE3]/70">
                  {name[0].toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}