import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchAdminStats, fetchAdminUsers } from "@/lib/jeevana.functions";
import { Users, Database, MessageSquare, ShieldAlert } from "lucide-react";

type AdminStats = { totalUsers: number; totalLogs: number; totalMessages: number };
type AdminUser = { id: string; display_name: string | null; role: string; created_at: string };

export function AdminScreen() {
  const fetchStatsFn = useServerFn(fetchAdminStats);
  const fetchUsersFn = useServerFn(fetchAdminUsers);

  const { data: stats, error: statsError, isLoading: loadingStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStatsFn() as unknown as Promise<AdminStats>,
  });

  const { data: users, error: usersError, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsersFn() as unknown as Promise<AdminUser[]>,
  });

  if (statsError || usersError) {
    return (
      <div className="max-w-5xl mx-auto p-6 md:p-10 text-center">
        <ShieldAlert className="size-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Akses Ditolak</h1>
        <p className="text-slate-500 mt-2">Kamu tidak memiliki akses Admin untuk melihat halaman ini.</p>
        <p className="text-xs text-red-400 mt-4">{(statsError || usersError)?.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Admin Panel</h1>
        <p className="text-slate-500 mt-1">Sistem overview & manajemen pengguna.</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Users</span>
          </div>
          <div className="text-3xl font-bold mt-2">{loadingStats ? "..." : stats?.totalUsers ?? 0}</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <Database className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Life Logs</span>
          </div>
          <div className="text-3xl font-bold mt-2">{loadingStats ? "..." : stats?.totalLogs ?? 0}</div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-grape">
            <MessageSquare className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Messages</span>
          </div>
          <div className="text-3xl font-bold mt-2">{loadingStats ? "..." : stats?.totalMessages ?? 0}</div>
        </div>
      </div>

      {/* Users list */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 font-display">Recent Users</h2>
        <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          {loadingUsers ? (
            <div className="p-10 text-center text-sm text-slate-400">Memuat data user...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">User ID</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users?.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{u.id}</td>
                      <td className="px-6 py-4 font-medium">{u.display_name || "Unknown"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold ${u.role === "admin" || u.role === "super_admin" ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-600"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(u.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
