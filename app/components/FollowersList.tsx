type FollowerMember = {
  name: string;
  title: string;
  mutual: string;
};

const followers: FollowerMember[] = [
  { name: "Ella Martin", title: "Community Manager", mutual: "12 mutual" },
  { name: "Noah Kim", title: "Analytics Lead", mutual: "5 mutual" },
  { name: "Sophia Lee", title: "Campaign Director", mutual: "8 mutual" },
];

export function FollowersList() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Followers</h3>
        <p className="text-sm text-slate-500">{followers.length} people</p>
      </div>
      <div className="space-y-3">
        {followers.map((follower) => (
          <div key={follower.name} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
            <div>
              <p className="font-medium text-slate-900">{follower.name}</p>
              <p className="text-sm text-slate-500">{follower.title}</p>
            </div>
            <span className="text-sm text-slate-500">{follower.mutual}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
