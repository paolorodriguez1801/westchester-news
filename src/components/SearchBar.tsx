"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const searchUrl = `https://www.google.com/search?q=site:${siteUrl}+${encodeURIComponent(query.trim())}`;
    window.open(searchUrl, "_blank", "noopener");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="w-full md:w-56 rounded-md border-0 bg-white/10 px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <button
        type="submit"
        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark transition-colors"
      >
        Search
      </button>
    </form>
  );
}
