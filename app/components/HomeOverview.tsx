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

export function HomeOverview() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Welcome back</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Your FusionNet feed</h1>
          </div>
          <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            New post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <article key={item.title} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                {item.date}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
