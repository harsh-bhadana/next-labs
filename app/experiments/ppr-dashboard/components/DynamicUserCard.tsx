export async function DynamicUserCard() {
  // Simulate network delay to demonstrate streaming
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const user = {
    name: "Alex Johnson",
    role: "Senior Developer",
    email: "alex.johnson@example.com",
    status: "Online",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  return (
    <div className="h-48 mb-8 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-200 dark:border-blue-900/30 rounded-xl shadow-sm p-6 overflow-hidden">
      <div className="flex flex-row items-center gap-6 h-full">
        <div className="relative">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-2 border-blue-500 p-1" />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{user.name}</h2>
            <span className="text-[10px] uppercase tracking-wider font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
              {user.status}
            </span>
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-medium">{user.role}</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
