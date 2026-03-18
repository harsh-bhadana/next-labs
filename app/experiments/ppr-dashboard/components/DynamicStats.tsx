import { TrendingUp, Users, DollarSign } from "lucide-react";

export async function DynamicStats() {
  // Simulate network delay to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const stats = [
    { label: "Total Revenue", value: "$45,231.89", icon: <DollarSign size={20} />, trend: "+20.1% from last month" },
    { label: "Active Users", value: "2,350", icon: <Users size={20} />, trend: "+180.1% from last month" },
    { label: "Sales", value: "+12,234", icon: <TrendingUp size={20} />, trend: "+19% from last month" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:scale-[1.02] transition-transform relative overflow-hidden shadow-sm">
          <div className="absolute top-4 right-4 text-zinc-400">{stat.icon}</div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</p>
          <h3 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-zinc-50">{stat.value}</h3>
          <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 w-fit px-2 py-1 rounded-full mt-2 font-medium">
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
