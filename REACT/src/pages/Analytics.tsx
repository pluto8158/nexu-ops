import { useState } from "react";
import {
  Download,
  Plus,
  Calendar,
  Filter,
  Maximize2,
  MoreVertical,
} from "lucide-react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("2023-10-01 至 2023-10-31");
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "segmentation", label: "分层 (Segmentation)" },
    { key: "forecasting", label: "预测 (Forecasting)" },
    { key: "custom", label: "自定义分析 (Custom Analysis)" },
  ];

  const heatmapData = Array(42)
    .fill(0)
    .map(() => {
      const opacities = [10, 20, 30, 50, 70, 90];
      return opacities[Math.floor(Math.random() * opacities.length)];
    });

  return (
    <div className="space-y-stack-lg pb-stack-lg">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex text-label-sm text-on-surface-variant mb-1">
            <span>分析</span>
            <span className="mx-2">/</span>
            <span className="text-secondary">数据概览</span>
          </nav>
          <h1 className="font-display-md text-display-md text-on-surface">数据分析概览</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert("导出数据报告")}
            className="flex items-center gap-2 px-4 py-2 border border-outline rounded-lg font-label-bold text-label-bold hover:bg-surface-container transition-colors"
          >
            <Download className="w-4 h-4" />
            导出数据报告
          </button>
          <button
            onClick={() => alert("新建自定义仪表盘")}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold hover:opacity-90 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            新建自定义仪表盘
          </button>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="flex border-b border-outline-variant gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-1 border-b-2 font-label-bold text-label-bold whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "border-secondary text-secondary"
                : "border-transparent text-on-surface-variant hover:text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-label-bold text-on-surface-variant whitespace-nowrap">日期范围:</span>
          <div className="relative">
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              readOnly
              className="pl-4 pr-10 py-1.5 bg-surface-container border border-outline-variant rounded-lg text-body-sm w-56 focus:outline-none"
            />
            <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <div className="h-6 w-px bg-outline-variant hidden md:block" />
        <div className="flex items-center gap-2">
          <span className="text-label-bold text-on-surface-variant whitespace-nowrap">业务单元:</span>
          <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm focus:outline-none focus:border-secondary appearance-none pr-8">
            <option>所有部门</option>
            <option>核心零售</option>
            <option>云服务</option>
            <option>金融科技</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-bold text-on-surface-variant whitespace-nowrap">产品类别:</span>
          <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm focus:outline-none focus:border-secondary">
            <option>全类别</option>
            <option>硬件</option>
            <option>软件订阅</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-bold text-on-surface-variant whitespace-nowrap">地域:</span>
          <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm focus:outline-none focus:border-secondary">
            <option>全球</option>
            <option>大中华区</option>
            <option>北美</option>
            <option>欧洲</option>
          </select>
        </div>
        <button
          onClick={() => alert("打开高级筛选")}
          className="ml-auto p-2 bg-surface-container-highest rounded-lg hover:bg-secondary hover:text-on-secondary transition-all"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* DAU Line Chart */}
        <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                活跃用户 (DAU)
              </h3>
              <p className="font-display-md text-display-md text-on-surface">
                1,284,592 <span className="text-label-bold font-medium text-green-600">+12.5%</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[160px] relative flex items-end gap-1">
            <div className="w-full h-32 bg-gradient-to-t from-secondary/10 to-transparent rounded-t-lg relative overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                  d="M0,80 Q25,20 50,50 T100,10"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-label-sm text-on-surface-variant">
            <span>10-01</span>
            <span>10-15</span>
            <span>10-31</span>
          </div>
        </div>

        {/* Revenue Stack Bar */}
        <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                营收趋势 (按渠道)
              </h3>
              <p className="font-display-md text-display-md text-on-surface">
                ¥45.2M <span className="text-label-bold text-secondary">目标达成 92%</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 px-2">
            {[12, 16, 10, 20, 24, 18].map((h, i) => (
              <div key={i} className="w-6 flex flex-col gap-0.5">
                <div className="bg-secondary-fixed rounded-sm" style={{ height: `${h * 4}px` }} />
                <div className="bg-secondary rounded-sm" style={{ height: `${h * 2.5}px` }} />
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-secondary-fixed" />
              <span className="text-label-sm">直销</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-label-sm">代理商</span>
            </div>
          </div>
        </div>

        {/* Demographics Pie */}
        <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                用户群体画像
              </h3>
              <p className="font-body-md text-body-md text-on-surface mt-1">核心增长点: 25-34岁</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center py-4">
            <div
              className="relative w-32 h-32 rounded-full border-[12px] border-secondary"
              style={{ borderRightColor: "#62fae3", borderBottomColor: "#0d1c32" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display-md text-display-md text-on-surface">42%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              ["18-24岁", "18%"],
              ["25-34岁", "42%"],
              ["35-44岁", "25%"],
              ["45+岁", "15%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-label-sm border-b border-outline-variant pb-1">
                <span>{label}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scatter Plot */}
        <div className="glass-card rounded-xl p-6 lg:col-span-2 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                订单价值 vs 履约效率
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">散点分布图 (1000+ 采样点)</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[240px] relative border-l border-b border-outline-variant">
            {[
              { top: 40, left: 80, size: 12, color: "bg-secondary" },
              { top: 160, left: 240, size: 16, color: "bg-secondary-fixed" },
              { top: 80, left: 200, size: 8, color: "bg-secondary" },
              { top: 240, left: 400, size: 20, color: "bg-primary-container" },
              { top: 60, left: 300, size: 12, color: "bg-secondary-fixed" },
              { top: 200, left: 450, size: 16, color: "bg-secondary" },
            ].map((dot, i) => (
              <div
                key={i}
                className={`absolute rounded-full opacity-60 ${dot.color}`}
                style={{
                  top: `${dot.top}px`,
                  left: `${dot.left}px`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
              />
            ))}
            <div className="absolute -left-10 top-1/2 -rotate-90 text-label-sm text-on-surface-variant">
              订单价值 (¥)
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-label-sm text-on-surface-variant">
              履约时间 (Hrs)
            </div>
          </div>
        </div>

        {/* Traffic Heatmap */}
        <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
              流量热力图 (24H)
            </h3>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-1">
            {heatmapData.map((op, i) => (
              <div key={i} className="rounded-sm bg-secondary" style={{ opacity: op / 100 }} />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-label-sm text-on-surface-variant">周一</span>
            <div className="flex items-center gap-1">
              <span className="text-label-sm text-on-surface-variant">低</span>
              <div className="w-20 h-2 bg-gradient-to-r from-secondary/10 to-secondary rounded-full" />
              <span className="text-label-sm text-on-surface-variant">高</span>
            </div>
            <span className="text-label-sm text-on-surface-variant">周日</span>
          </div>
        </div>

        {/* System Gauge */}
        <div className="glass-card rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow lg:col-span-3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                系统健康度 & 资源利用率
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">实时核心负载状态</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert("全屏查看")} className="text-on-surface-variant hover:text-secondary">
                <Maximize2 className="w-5 h-5" />
              </button>
              <button onClick={() => alert("更多选项")} className="text-on-surface-variant hover:text-secondary">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-around gap-8 py-4">
            {[
              { label: "CPU Load", value: 76, color: "text-secondary" },
              { label: "Memory", value: 45, color: "text-secondary-fixed-dim" },
              { label: "Latency", value: 22, color: "text-on-secondary-container" },
            ].map((gauge) => (
              <div key={gauge.label} className="text-center">
                <div className="relative w-24 h-24 mb-3 mx-auto">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      className="text-surface-container-highest"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className={gauge.color}
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (gauge.value / 100) * 251.2}
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-headline-sm">
                    {gauge.value}%
                  </div>
                </div>
                <p className="font-label-bold text-label-bold">{gauge.label}</p>
              </div>
            ))}
            <div className="flex-1 max-w-sm space-y-4">
              <div>
                <div className="flex justify-between text-label-sm mb-1">
                  <span>API 可用性</span>
                  <span>99.98%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="w-[99.98%] h-full bg-secondary" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-label-sm mb-1">
                  <span>数据库延迟</span>
                  <span>12ms</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-secondary-fixed-dim" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
