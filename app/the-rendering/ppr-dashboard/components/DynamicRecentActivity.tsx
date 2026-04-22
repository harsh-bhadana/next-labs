import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export async function DynamicRecentActivity() {
  // Simulate network delay to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 12000));

  const activities = [
    { id: 1, action: "Deployed new version to production", time: "2 hours ago", icon: <CheckCircle2 size={18} className="text-green-500" />, type: "success" },
    { id: 2, action: "Database backup completed", time: "5 hours ago", icon: <CheckCircle2 size={18} className="text-green-500" />, type: "success" },
    { id: 3, action: "High CPU usage detected on API server", time: "Yesterday", icon: <AlertCircle size={18} className="text-amber-500" />, type: "warning" },
    { id: 4, action: "System maintenance scheduled", time: "2 days ago", icon: <Clock size={18} className="text-zinc-400" />, type: "neutral" },
    { id: 5, action: "New user registrations spiked", time: "3 days ago", icon: <CheckCircle2 size={18} className="text-green-500" />, type: "success" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
      </div>
      <div className="flex flex-col">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 p-4 ${index !== activities.length - 1 ? "border-b border-zinc-50 dark:border-zinc-800/50" : ""}`}
          >
            <div className="mt-1 flex-shrink-0">{activity.icon}</div>
            <div className="flex flex-col">
              <p className="font-medium text-sm text-zinc-800 dark:text-zinc-200">{activity.action}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
