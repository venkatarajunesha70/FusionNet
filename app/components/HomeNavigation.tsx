import { SectionButton } from "./SectionButton";

type HomeNavigationProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "chat", label: "Chat with AI" },
  { id: "friends", label: "Friends" },
  { id: "notifications", label: "Notifications" },
];

export function HomeNavigation({ activeTab, onChange }: HomeNavigationProps) {
  return (
    <div className="space-y-3">
      {navItems.map((item) => (
        <SectionButton
          key={item.id}
          label={item.label}
          active={activeTab === item.id}
          onClick={() => onChange(item.id)}
        />
      ))}
    </div>
  );
}
