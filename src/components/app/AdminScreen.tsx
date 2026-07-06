import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { fetchAdminStats, fetchAdminUsers, updateUserRole } from "@/lib/jeevana.functions";
import {
  Users,
  Database,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Crown,
  ChevronDown,
} from "lucide-react";

type AdminStats = { totalUsers: number; totalLogs: number; totalMessages: number };
type AdminUser = {
  id: string;
  display_name: string | null;
  role: string;
  created_at: string;
};

const ROLES = ["user", "admin", "super_admin"] as const;
type Role = (typeof ROLES)[number];

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    super_admin: "bg-purple-100 text-purple-700 border-purple-200",
    admin: "bg-red-100 text-red-600 border-red-200",
    user: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const icons: Record<string, React.ReactNode> = {
    super_admin: <Crown className="size-3" />,
    admin: <ShieldCheck className="size-3" />,
    user: null,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-semibold border ${styles[role] ?? styles["user"]}`}
    >
      {icons[role]}
      {role.replace("_", " ")}
    </span>
  );
}

function RoleSelector({
  userId,
  currentRole,
  onClose,
}: {
  userId: string;
  currentRole: string;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const updateFn = useServerFn(updateUserRole);
  const mut = useMutation({
    mutationFn: (role: Role) => updateFn({ data: { userId, role } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      onClose();
    },
  });

  return (
    <div className="absolute z-20 right-0 top-8 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-w-36">
      {ROLES.map((r) => (
        <button
          key={r}
          disabled={r === currentRole || mut.isPending}
          onClick={() => mut.mutate(r)}
          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${r === currentRole ? "bg-slate-50 text-slate-400 cursor-default" : "text-slate-700"}`}
        >
          {r === "super_admin" && <Crown className="size-3.5 text-purple-600" />}
          {r === "admin" && <ShieldCheck className="size-3.5 text-red-500" />}
          {r === "user" && <Users className="size-3.5 text-slate-500" />}
          <span className="capitalize">{r.replace("_", " ")}</span>
          {r === currentRole && (
            <span className="ml-auto text-[10px] text-slate-400">aktif</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function AdminScreen() {
  const fetchStatsFn = useServerFn(fetchAdminStats);
  const fetchUsersFn = useServerFn(fetchAdminUsers);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const {
    data: stats,
    error: statsError,
    isLoading: loadingStats,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStatsFn() as unknown as Promise<AdminStats>,
  });

  const {
    data: users,
    error: usersError,
    isLoading: loadingUsers,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsersFn() as unknown as Promise<AdminUser[]>,
  });

  if (statsError || usersError) {
    return (
      <div className="max-w-5xl mx-auto p-6 md:p-10 text-center">
        <ShieldAlert className="size-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Akses Ditolak</h1>
        <p className="text-slate-500 mt-2">
          Kamu tidak memiliki akses Admin untuk melihat halaman ini.
        </p>
        <p className="text-xs text-red-400 mt-4">{(statsError || usersError)?.message}</p>
      </div>
    );
  }

  // Count by role
  const roleCounts = (users ?? []).reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-display">Admin Panel</h1>
        <p className="text-slate-500 mt-1">Sistem overview & manajemen pengguna.</p>
      </div>

      {/* Stats cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Users</span>
          </div>
          <div className="text-3xl font-bold mt-2">
            {loadingStats ? "..." : stats?.totalUsers ?? 0}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {roleCounts["admin"] ?? 0} admin · {roleCounts["super_admin"] ?? 0} super admin
          </div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-600">
            <Database className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Life Logs</span>
          </div>
          <div className="text-3xl font-bold mt-2">
            {loadingStats ? "..." : stats?.totalLogs ?? 0}
          </div>
        </div>
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-grape">
            <MessageSquare className="size-4" />
            <span className="text-xs uppercase tracking-wider text-slate-500">Total Messages</span>
          </div>
          <div className="text-3xl font-bold mt-2">
            {loadingStats ? "..." : stats?.totalMessages ?? 0}
          </div>
        </div>
      </div>

      {/* Role distribution */}
      {!loadingUsers && users && users.length > 0 && (
        <div className="mt-6 bg-white border border-slate-200/70 rounded-2xl p-5">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">
            Distribusi Role
          </h2>
          <div className="flex gap-6">
            {ROLES.map((r) => (
              <div key={r} className="flex items-center gap-2">
                <RoleBadge role={r} />
                <span className="text-sm font-semibold text-slate-700">
                  {roleCounts[r] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 font-display">Manajemen Pengguna</h2>
        <div className="bg-white border border-slate-200/70 rounded-3xl overflow-hidden">
          {loadingUsers ? (
            <div className="p-10 text-center text-sm text-slate-400">Memuat data user...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Nama</th>
                    <th className="px-6 py-4 font-medium">User ID</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Bergabung</th>
                    <th className="px-6 py-4 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users?.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{u.display_name || "—"}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 max-w-[120px] truncate">
                        {u.id}
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(u.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setOpenDropdown(openDropdown === u.id ? null : u.id)
                            }
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
                          >
                            Ganti Role <ChevronDown className="size-3" />
                          </button>
                          {openDropdown === u.id && (
                            <RoleSelector
                              userId={u.id}
                              currentRole={u.role}
                              onClose={() => setOpenDropdown(null)}
                            />
                          )}
                        </div>
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
