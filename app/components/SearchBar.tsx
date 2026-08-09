"use client";

import { useState, type KeyboardEvent } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchResult("Please enter a search term.");
      return;
    }

    setSearchResult(`Showing results for "${trimmed}".`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-xl rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search FusionNet"
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search
        </button>
      </div>
      {searchResult ? (
        <div className="mt-3 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
          {searchResult}
        </div>
      ) : null}
    </div>
  );
}
