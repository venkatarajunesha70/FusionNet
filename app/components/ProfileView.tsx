import { FollowersList } from "./FollowersList";
import { FollowingList } from "./FollowingList";
import { ProfileCard } from "./ProfileCard";

export function ProfileView() {
  return (
    <div className="space-y-6">
      <ProfileCard />
      <div className="grid gap-6 lg:grid-cols-2">
        <FollowersList />
        <FollowingList />
      </div>
    </div>
  );
}
