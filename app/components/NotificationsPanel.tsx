type NotificationItem = {
  title: string;
  description: string;
  time: string;
};

const notifications: NotificationItem[] = [
  { title: "Comment reply", description: "Ava replied to your post in Product Updates.", time: "3m ago" },
  { title: "New connection", description: "Liam Parker accepted your connection request.", time: "1h ago" },
  { title: "Mentions", description: "You were mentioned in the group chat.", time: "5h ago" },
];

export function NotificationsPanel() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{notifications.length}</span>
      </div>
      <div className="space-y-3 text-sm text-slate-600">
        {notifications.map((notification) => (
          <div key={notification.title} className="rounded-3xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">{notification.title}</p>
            <p className="mt-1">{notification.description}</p>
            <p className="mt-2 text-xs text-slate-500">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
