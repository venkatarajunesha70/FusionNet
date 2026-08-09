"use client";

import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { HomeNavigation } from "../../components/HomeNavigation";
import { HomeContent } from "../../components/HomeContent";

const feedItems = [
  {
    title: "Team Launch Update",
    description: "The new FusionNet workspace update is rolling out today. Share your feedback in the group chat.",
    date: "2h ago",
  },
  {
    title: "Design Review",
    description: "Ava just posted new mockups for the onboarding flow. Review them and leave comments.",
    date: "5h ago",
  },
  {
    title: "Weekly Insights",
    description: "Your dashboard shows a 12% increase in network activity this week. Keep building momentum.",
    date: "1d ago",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 ring-1 ring-slate-200 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((current) => !current)}
            >
              <span className="flex h-5 w-5 flex-col justify-between">
                <span className="block h-0.5 w-full bg-slate-900 rounded-full"></span>
                <span className="block h-0.5 w-full bg-slate-900 rounded-full"></span>
                <span className="block h-0.5 w-full bg-slate-900 rounded-full"></span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-3"
              aria-label="Go to home screen"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">
                F
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">FusionNet</p>
                <p className="text-xs text-slate-500">Your social workspace</p>
              </div>
            </button>
          </div>

          <div className="hidden w-full max-w-xl lg:block">
            <SearchBar />
          </div>
          <div className="w-full max-w-xl lg:w-auto lg:hidden">
            <SearchBar />
          </div>

          <nav className="hidden items-center gap-3 text-sm text-slate-700 lg:flex">
            {[
              { id: "home", label: "Home" },
              { id: "profile", label: "Profile" },
              { id: "chat", label: "Chat with AI" },
              { id: "friends", label: "Friends" },
              { id: "notifications", label: "Notifications" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-3 py-2 transition ${
                  activeTab === item.id
                    ? "font-semibold text-slate-900 bg-slate-100"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className={`${mobileNavOpen ? "block" : "hidden"} lg:hidden px-4 pb-4 sm:px-6`}>
          <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <nav className="space-y-3 text-sm text-slate-700">
              {[
                { id: "home", label: "Home" },
                { id: "profile", label: "Profile" },
                { id: "chat", label: "Chat with AI" },
                { id: "friends", label: "Friends" },
                { id: "notifications", label: "Notifications" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`block w-full text-left rounded-xl px-3 py-2 transition ${
                    activeTab === item.id
                      ? "font-semibold text-slate-900 bg-white"
                      : "text-slate-700 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(600px,1fr)_320px]">
        <aside className="space-y-6">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
                F
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">Julia Park</p>
                <p className="text-sm text-slate-500">Product Manager</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Profile visits this week: <span className="font-semibold text-slate-900">210</span></div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">New connections: <span className="font-semibold text-slate-900">18</span></div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Navigate</h2>
            <div className="mt-4">
              <HomeNavigation activeTab={activeTab} onChange={setActiveTab} />
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <HomeContent activeTab={activeTab} />
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Overview</p>
                <p className="text-xs text-slate-500">Quick stats and shortcuts</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Live</span>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Updates: 4 new</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Connections: 18</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Messages: 2 unread</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
