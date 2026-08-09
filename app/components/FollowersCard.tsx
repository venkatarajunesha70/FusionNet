type Follower = {
  name: string;
  title: string;
  mutual: string;
};

const followers: Follower[] = [
  { name: "Ava Johnson", title: "Product Designer", mutual: "8 mutual connections" },
  { name: "Liam Parker", title: "Growth Lead", mutual: "5 mutual connections" },
  { name: "Mia Chen", title: "Marketing Manager", mutual: "3 mutual connections" },
];

export function FollowersCard() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Followers</h3>
          <p className="mt-1 text-sm text-slate-500">People who recently followed you.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">15 new</span>
      </div>
      <div className="space-y-4">
        {followers.map((follower) => (
          <div key={follower.name} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                {follower.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium text-slate-900">{follower.name}</p>
                <p className="text-sm text-slate-500">{follower.title}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">{follower.mutual}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
