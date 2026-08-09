import { ChatView } from "./ChatView";
import { FriendsView } from "./FriendsView";
import { HomeOverview } from "./HomeOverview";
import { NotificationsView } from "./NotificationsView";
import { ProfileView } from "./ProfileView";

type HomeContentProps = {
  activeTab: string;
};

export function HomeContent({ activeTab }: HomeContentProps) {
  return (
    <div>
      {activeTab === "home" && <HomeOverview />}
      {activeTab === "profile" && <ProfileView />}
      {activeTab === "chat" && <ChatView />}
      {activeTab === "friends" && <FriendsView />}
      {activeTab === "notifications" && <NotificationsView />}
    </div>
  );
}
