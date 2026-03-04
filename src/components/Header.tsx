"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

const categories = [
  { name: "Public Safety", slug: "public-safety" },
  { name: "Local Government", slug: "local-government" },
  { name: "Education", slug: "education" },
  { name: "Business & Economy", slug: "business-economy" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Health", slug: "health" },
  { name: "Transportation", slug: "transportation" },
  { name: "Community", slug: "community" },
  { name: "Environment", slug: "environment" },
  { name: "Arts & Culture", slug: "arts-culture" },
  { name: "Sports", slug: "sports" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Westchester News Today
            </span>
          </Link>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-navy-light"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav className="bg-navy-light border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2 -mx-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-gray-200 rounded-md hover:bg-white/10 hover:text-white transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-navy border-b border-white/10">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
          <nav className="px-2 pb-3 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block px-3 py-2 text-sm font-medium text-gray-200 rounded-md hover:bg-navy-light hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
