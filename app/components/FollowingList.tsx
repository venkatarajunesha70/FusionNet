type FollowingMember = {
  name: string;
  title: string;
  status: string;
};

const followingMembers: FollowingMember[] = [
  { name: "Mia Chen", title: "Growth Lead", status: "Following" },
  { name: "Liam Parker", title: "Design Director", status: "Following" },
  { name: "Noah Kim", title: "Product Lead", status: "Follow back" },
];

export function FollowingList() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Following</h3>
        <p className="text-sm text-slate-500">3 members</p>
      </div>
      <div className="space-y-3">
        {followingMembers.map((member) => (
          <div key={member.name} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
            <div>
              <p className="font-medium text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-500">{member.title}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
