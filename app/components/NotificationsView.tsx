import { NotificationsPanel } from "./NotificationsPanel";

export function NotificationsView() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
        <p className="mt-2 text-sm text-slate-600">All your latest FusionNet alerts and updates in one place.</p>
      </div>
      <NotificationsPanel />
    </div>
  );
}
