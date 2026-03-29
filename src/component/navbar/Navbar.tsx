"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Trades", href: "/trades" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Journal", href: "/journal" },
  { label: "Mechanics", href: "/mechanics" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full shrink-0 px-8 pt-6">
      <div className="flex items-center justify-between w-full">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          {/* BRAND */}
          <Link href="/" className="welcome-heading text-[32px]">
            Draconic Arena
          </Link>

          {/* META */}
          <div className="flex items-center gap-4 mt-1">
            <span
              className="text-[12px] text-[#F2F3D999]"
              style={{
                fontWeight: 200,
              }}
            >
              5 MAR 2026
            </span>

            <span className="w-px h-3.5 bg-[#F2F3D93D]" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#61DE0D] shadow-[0_0_10px_#61DE0D]" />
              <span
                className="text-[12px] text-[#61DE0D] "
                style={{
                  fontWeight: 200,
                }}
              >
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE NAV */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-[#6E0B281F] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive =
              item.href === "/trades"
                ? pathname === "/" ||
                  pathname === "/trades" ||
                  pathname?.startsWith("/trades/")
                : pathname === item.href ||
                  pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 flex items-center justify-center rounded-full text-[100%] transition-all duration-200
                  
                  ${
                    isActive
                      ? "bg-[#DA596F1F] text-[#DA596F]"
                      : "text-[#6E0B28] hover:text-[#DA596F]"
                  }
                `}
                style={{
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}