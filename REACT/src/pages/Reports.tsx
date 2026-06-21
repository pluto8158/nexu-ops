import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Folder,
  Bookmark,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
  Eye,
  Edit,
  CalendarClock,
  Trash2,
  CheckCircle2,
  Clock,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";

const folders = [
  { icon: FolderOpen, label: "行政报告", count: 0 },
  { icon: Folder, label: "运营报告", count: 12, active: true },
  { icon: FolderOpen, label: "财务报告", count: 0 },
  { icon: FolderOpen, label: "营销报告", count: 0 },
  { icon: Bookmark, label: "自定义报告", count: 0 },
];

const reportsData = [
  {
    id: "rpt-001",
    name: "2023年Q3核心运营指标汇总",
    desc: "包含日活、转化率趋势分析",
    type: "运营报告",
    date: "2023-10-15 08:30",
    status: "completed",
  },
  {
    id: "rpt-002",
    name: "11月华东大区销售效能周报",
    desc: "自动抓取 CRM 数据生成",
    type: "运营报告",
    date: "2023-11-05 10:00",
    status: "generating",
  },
  {
    id: "rpt-003",
    name: "年末大促全链路流量监控计划",
    desc: "预定执行：2023-12-01",
    type: "运营报告",
    date: "2023-11-10 14:20",
    status: "planned",
  },
  {
    id: "rpt-004",
    name: "2023年度客户满意度调研报告",
    desc: "基于NPS评分与反馈文本分析",
    type: "行政报告",
    date: "2023-09-28 16:00",
    status: "completed",
  },
  {
    id: "rpt-005",
    name: "Q4预算执行与成本管控分析",
    desc: "财务部门月度例行报告",
    type: "财务报告",
    date: "2023-11-01 09:00",
    status: "completed",
  },
];

export default function Reports() {
  const navigate = useNavigate();
  const [activeFolder, setActiveFolder] = useState("运营报告");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredReports = reportsData.filter(
    (r) =>
      (activeFolder === "全部" || r.type === activeFolder || (activeFolder === "自定义报告" && r.type === "自定义报告")) &&
      (r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const statusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-bold text-label-bold bg-secondary-container/30 text-on-secondary-container border border-secondary/20">
            <CheckCircle2 className="w-3 h-3" />
            已完成
          </span>
        );
      case "generating":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-bold text-label-bold bg-primary-fixed-dim/30 text-on-primary-fixed border border-primary-fixed-dim/30">
            <Loader2 className="w-3 h-3 animate-spin" />
            生成中
          </span>
        );
      case "planned":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-bold text-label-bold bg-surface-variant/50 text-on-surface-variant border border-outline-variant">
            <Clock className="w-3 h-3" />
            计划中
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-bold text-label-bold bg-error-container/50 text-error border border-error/20">
            <AlertCircle className="w-3 h-3" />
            失败
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-gutter h-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        <button
          onClick={() => alert("新建报告向导")}
          className="w-full bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-colors duration-300 ease-in-out shadow-sm rounded-full py-2.5 px-4 flex justify-center items-center gap-2 transform active:scale-95 font-label-bold text-label-bold"
        >
          <Plus className="w-4 h-4" />
          新建报告
        </button>
        <nav className="flex flex-col gap-1">
          <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 px-3">
            目录视图
          </h3>
          {folders.map((folder) => {
            const Icon = folder.icon;
            const active = activeFolder === folder.label;
            return (
              <button
                key={folder.label}
                onClick={() => setActiveFolder(folder.label)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-secondary-container text-on-secondary-container shadow-sm border border-secondary/10"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={active ? "font-label-bold text-label-bold" : "font-body-md text-body-md"}>
                  {folder.label}
                </span>
                {folder.count > 0 && (
                  <span className="ml-auto bg-surface-container-lowest text-on-surface text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    {folder.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface">{activeFolder}列表</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              管理和查看所有已生成及计划中的数据报告。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("打开筛选")}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-on-surface hover:border-secondary hover:text-secondary transition-colors shadow-sm font-label-bold text-label-bold"
            >
              <Filter className="w-4 h-4" />
              筛选
            </button>
            <button
              onClick={() => alert("打开排序")}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-md text-on-surface hover:border-secondary hover:text-secondary transition-colors shadow-sm font-label-bold text-label-bold"
            >
              <ArrowUpDown className="w-4 h-4" />
              排序
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索报告名称或描述..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
          />
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-ambient overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="py-3 px-4 w-5 pl-6">
                    <input
                      type="checkbox"
                      className="rounded border-outline-variant text-secondary focus:ring-secondary/20 bg-surface"
                      onChange={(e) =>
                        setSelectedRows(e.target.checked ? filteredReports.map((r) => r.id) : [])
                      }
                      checked={selectedRows.length === filteredReports.length && filteredReports.length > 0}
                    />
                  </th>
                  <th className="font-label-bold text-label-bold text-on-surface-variant py-3 px-4">报告名称</th>
                  <th className="font-label-bold text-label-bold text-on-surface-variant py-3 px-4">类型</th>
                  <th className="font-label-bold text-label-bold text-on-surface-variant py-3 px-4">创建日期</th>
                  <th className="font-label-bold text-label-bold text-on-surface-variant py-3 px-4">状态</th>
                  <th className="font-label-bold text-label-bold text-on-surface-variant py-3 px-4 text-right pr-6">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="group hover:bg-surface-container-low/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 pl-6">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(report.id)}
                        onChange={() => toggleRow(report.id)}
                        className="rounded border-outline-variant text-secondary focus:ring-secondary/20 bg-surface opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-inverse-primary/20 flex items-center justify-center text-secondary">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-label-bold text-label-bold text-on-surface">{report.name}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{report.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">{report.type}</td>
                    <td className="py-4 px-4 font-body-md text-body-md text-on-surface-variant">{report.date}</td>
                    <td className="py-4 px-4">{statusBadge(report.status)}</td>
                    <td className="py-4 px-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => navigate(`/reports/${report.id}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-surface-container-highest transition-colors"
                          title="查看"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`编辑报告: ${report.name}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-surface-container-highest transition-colors"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`计划报告: ${report.name}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-surface-container-highest transition-colors"
                          title="计划"
                        >
                          <CalendarClock className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`确定要删除报告 "${report.name}" 吗？`)) {
                              alert("报告已删除");
                            }
                          }}
                          className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-error-container/30 transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-on-surface-variant font-body-md">
                      暂无匹配的报告记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="bg-surface-container-lowest border-t border-outline-variant px-6 py-3 flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              显示 1 至 {filteredReports.length} 条，共 {filteredReports.length} 条记录
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center bg-secondary-container text-on-secondary-container font-label-bold text-label-bold">
                1
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm">
                2
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm">
                3
              </button>
              <button className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
