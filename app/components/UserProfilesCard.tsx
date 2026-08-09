type Profile = {
  name: string;
  role: string;
  status: string;
};

const profiles: Profile[] = [
  { name: "Noah Kim", role: "Community Builder", status: "Online" },
  { name: "Sophia Lee", role: "Campaign Lead", status: "Away" },
  { name: "Ethan Wang", role: "Analytics", status: "Busy" },
];

export function UserProfilesCard() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">Suggested Profiles</h3>
        <p className="mt-1 text-sm text-slate-500">Connect with people in your network.</p>
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.name} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium text-slate-900">{profile.name}</p>
                <p className="text-sm text-slate-500">{profile.role}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                profile.status === "Online"
                  ? "bg-emerald-100 text-emerald-700"
                  : profile.status === "Busy"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {profile.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
