import { FollowersList } from "./FollowersList";
import { FollowingList } from "./FollowingList";
import { UserProfilesCard } from "./UserProfilesCard";

export function FriendsView() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold text-slate-900">Friends</p>
          <p className="text-sm text-slate-500">Browse your network, manage your following list, and discover new connections.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FollowingList />
        <FollowersList />
      </div>

      <UserProfilesCard />
    </div>
  );
}
