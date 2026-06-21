import { useState } from "react";
import {
  Plus,
  Route,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Search,
  ListFilter,
  Play,
  Edit,
  FileText,
  StopCircle,
  RotateCcw,
  Database,
  Table2,
  Webhook,
  Folder,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const stats = [
  { label: "总流水线", value: "24", icon: Route, color: "text-secondary" },
  { label: "正在运行", value: "3", icon: RefreshCw, color: "text-primary-fixed-dim" },
  { label: "成功 (24h)", value: "18", icon: CheckCircle, color: "text-secondary-fixed-dim" },
  { label: "失败警告", value: "1", icon: AlertTriangle, color: "text-error", border: "border-l-error" },
];

const pipelines = [
  {
    id: "PL-0992",
    name: "CRM_User_Sync",
    source: "Salesforce API",
    sourceIcon: Database,
    dest: "Nexus Data Warehouse",
    destIcon: Cloud,
    summary: "提取日增量用户记录，标准化字段格式，合并去重。",
    status: "success",
    statusText: "成功 (2m ago)",
  },
  {
    id: "PL-0993",
    name: "ERP_Inventory_Nightly",
    source: "SAP HANA",
    sourceIcon: Table2,
    dest: "Nexus Data Warehouse",
    destIcon: Cloud,
    summary: "全量同步库存快照，计算周转率指标，更新物料视图。",
    status: "running",
    statusText: "正在运行 (45%)",
  },
  {
    id: "PL-0994",
    name: "Marketing_Events_Stream",
    source: "Kafka Topic (Web)",
    sourceIcon: Webhook,
    dest: "AWS S3 Data Lake",
    destIcon: Cloud,
    summary: "解析JSON事件流，提取用户行为属性，分区写入Parquet文件。",
    status: "failed",
    statusText: "失败 (连接超时)",
  },
  {
    id: "PL-0995",
    name: "HR_Payroll_Monthly",
    source: "Secure FTP (CSV)",
    sourceIcon: Folder,
    dest: "Nexus Data Warehouse",
    destIcon: Cloud,
    summary: "加载月度薪酬结算文件，执行数据脱敏，更新财务汇总表。",
    status: "success",
    statusText: "成功 (12h ago)",
  },
];

export default function DataManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = pipelines.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-stack-lg pb-stack-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">ETL 转换流水线</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            管理并监控跨系统的数据抽取、转换与加载任务。
          </p>
        </div>
        <button
          onClick={() => alert("新建转换任务向导")}
          className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-label-bold text-label-bold flex items-center gap-2 hover:bg-secondary-fixed-dim transition-colors duration-300 shadow-sm ease-in-out transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          新建转换任务
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm hover:-translate-y-[2px] transition-transform duration-300 ${
                s.border || ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                  {s.label}
                </span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="font-display-lg text-display-lg text-on-surface">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-bright">
          <div className="relative w-full sm:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索流水线名称或来源..."
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-outline-variant text-body-md font-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => alert("筛选状态")}
              className="px-4 py-2 border border-outline-variant rounded-lg font-label-bold text-label-bold text-on-surface hover:bg-surface-container-highest transition-colors duration-300 flex items-center gap-2"
            >
              <ListFilter className="w-4 h-4" />
              筛选状态
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium">流水线名称</th>
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium">来源</th>
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium">目的地</th>
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium">逻辑摘要</th>
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium">上次运行状态</th>
                <th className="p-4 font-label-bold text-label-bold text-on-surface-variant font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm text-on-surface">
              {filtered.map((row) => {
                const SourceIcon = row.sourceIcon;
                const DestIcon = row.destIcon;
                return (
                  <tr key={row.id} className="hover:bg-surface-bright transition-colors duration-300 group cursor-default">
                    <td className="p-4">
                      <div className="font-label-bold text-label-bold text-on-surface">{row.name}</div>
                      <div className="text-on-surface-variant text-label-sm font-label-sm mt-1">ID: {row.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                          <SourceIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        {row.source}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                          <DestIcon className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        {row.dest}
                      </div>
                    </td>
                    <td className="p-4 max-w-[200px] truncate text-on-surface-variant">{row.summary}</td>
                    <td className="p-4">
                      {row.status === "success" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-label-sm text-label-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {row.statusText}
                        </span>
                      )}
                      {row.status === "running" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed-dim/20 text-on-surface border border-primary-fixed-dim/30 font-label-sm text-label-sm">
                          <Loader2 className="w-3 h-3 animate-spin text-primary" />
                          {row.statusText}
                        </span>
                      )}
                      {row.status === "failed" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error/10 text-error border border-error/20 font-label-sm text-label-sm">
                          <AlertTriangle className="w-3 h-3" />
                          {row.statusText}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {row.status === "failed" ? (
                          <button
                            onClick={() => alert(`重试运行: ${row.name}`)}
                            className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-secondary/10 transition-colors"
                            title="重试运行"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        ) : row.status === "running" ? (
                          <button
                            onClick={() => alert(`停止任务: ${row.name}`)}
                            className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-error/10 transition-colors"
                            title="停止"
                          >
                            <StopCircle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`运行任务: ${row.name}`)}
                            className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-secondary/10 transition-colors"
                            title="运行"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => alert(`编辑任务: ${row.name}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-secondary/10 transition-colors"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`查看日志: ${row.name}`)}
                          className="p-1.5 text-on-surface-variant hover:text-secondary rounded hover:bg-secondary/10 transition-colors"
                          title="查看日志"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant">显示 1 - {filtered.length} 条，共 {filtered.length} 条流水线</span>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container-highest disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 rounded bg-secondary text-on-secondary font-label-bold text-label-bold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-highest font-label-bold text-label-bold flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded text-on-surface hover:bg-surface-container-highest font-label-bold text-label-bold flex items-center justify-center transition-colors">3</button>
            <span className="px-2 text-on-surface-variant">...</span>
            <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-highest transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
