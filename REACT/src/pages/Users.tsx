import { useState } from "react";
import {
  UserPlus,
  Search,
  ListFilter,
  Edit,
  KeyRound,
  Ban,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Shield,
  Monitor,
  UserCog,
  Eye,
} from "lucide-react";

const usersData = [
  {
    id: "u1",
    name: "张磊",
    initials: "ZL",
    email: "zhang.lei@nexus.io",
    role: "管理员",
    roleIcon: Shield,
    status: "online",
    lastLogin: "刚刚",
    active: true,
  },
  {
    id: "u2",
    name: "王敏",
    initials: "WM",
    email: "wang.min@nexus.io",
    role: "数据分析师",
    roleIcon: Monitor,
    status: "offline",
    lastLogin: "2023-10-24 14:30",
    active: true,
  },
  {
    id: "u3",
    name: "刘强",
    initials: "LQ",
    email: "liu.qiang@nexus.io",
    role: "运营经理",
    roleIcon: UserCog,
    status: "online",
    lastLogin: "2小时前",
    active: true,
  },
  {
    id: "u4",
    name: "陈浩",
    initials: "CH",
    email: "chen.hao@nexus.io",
    role: "观察员",
    roleIcon: Eye,
    status: "disabled",
    lastLogin: "2023-08-15 09:12",
    active: false,
  },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = usersData.filter(
    (u) =>
      u.name.includes(searchQuery) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.includes(searchQuery)
  );

  return (
    <div className="space-y-stack-lg pb-stack-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display-md text-display-md text-on-surface mb-1">用户与角色</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            管理系统访问权限、分配角色并监控用户活动状态。
          </p>
        </div>
        <button
          onClick={() => alert("邀请用户对话框")}
          className="bg-secondary text-on-secondary hover:bg-secondary-fixed-dim rounded-full px-6 py-2.5 font-label-bold text-label-bold shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-[1px] flex items-center gap-2 max-w-fit"
        >
          <UserPlus className="w-5 h-5" />
          邀请用户
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm relative overflow-hidden">
        {/* Search */}
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface/50 backdrop-blur-sm">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索姓名或邮箱..."
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-sm text-body-sm outline-none text-on-surface placeholder:text-on-surface-variant"
            />
          </div>
          <button
            onClick={() => alert("筛选用户")}
            className="p-2 text-on-surface-variant hover:text-secondary hover:bg-surface-container rounded-full transition-colors"
          >
            <ListFilter className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-surface font-label-bold text-label-bold text-on-surface-variant border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-semibold">姓名</th>
                <th className="px-6 py-4 font-semibold">邮箱</th>
                <th className="px-6 py-4 font-semibold">角色</th>
                <th className="px-6 py-4 font-semibold">状态</th>
                <th className="px-6 py-4 font-semibold">最后登录时间</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant">
              {filtered.map((user) => {
                const RoleIcon = user.roleIcon;
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-surface-container-low transition-colors duration-300 group ${
                      !user.active ? "opacity-75" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-label-bold text-label-bold ${
                            user.active
                              ? user.status === "online"
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-primary-container text-on-primary-container"
                              : "bg-surface-container-highest text-on-surface-variant"
                          }`}
                        >
                          {user.initials}
                        </div>
                        <span className={`font-medium text-on-surface ${!user.active ? "line-through decoration-outline-variant" : ""}`}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-outline-variant text-on-surface-variant font-label-sm text-label-sm">
                        <RoleIcon className="w-3.5 h-3.5 mr-1" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "online" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-bold text-label-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2" />
                          在线
                        </div>
                      )}
                      {user.status === "offline" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-outline-variant text-on-surface-variant font-label-bold text-label-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-outline-variant mr-2" />
                          离线
                        </div>
                      )}
                      {user.status === "disabled" && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-error-container/30 text-on-error-container font-label-bold text-label-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-error mr-2" />
                          已停用
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-body-sm">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => alert(`编辑用户: ${user.name}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-md transition-colors"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`重置密码: ${user.name}`)}
                          disabled={!user.active}
                          className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-md transition-colors disabled:opacity-50"
                          title="重置密码"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        {user.active ? (
                          <button
                            onClick={() => {
                              if (confirm(`确定要停用用户 "${user.name}" 吗？`)) {
                                alert("用户已停用");
                              }
                            }}
                            className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-md transition-colors"
                            title="停用"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`启用用户: ${user.name}`)}
                            className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-container/20 rounded-md transition-colors"
                            title="启用"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant">显示 1 至 {filtered.length} 项，共 {filtered.length} 项</span>
          <div className="flex gap-1">
            <button
              disabled
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-label-bold text-label-bold">1</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface font-label-bold text-label-bold">2</button>
            <button className="px-3 py-1 rounded hover:bg-surface-container text-on-surface font-label-bold text-label-bold">3</button>
            <span className="px-2 py-1 text-on-surface-variant">...</span>
            <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
