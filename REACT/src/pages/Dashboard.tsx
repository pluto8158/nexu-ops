import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Users,
  ShoppingCart,
  MousePointerClick,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const kpiCards = [
  {
    label: "总营收 (CNY)",
    value: "¥4,281,900",
    trend: "+12.5%",
    trendUp: true,
    icon: CreditCard,
    progress: 75,
  },
  {
    label: "活跃用户",
    value: "84.2k",
    trend: "+8.2%",
    trendUp: true,
    icon: Users,
    progress: 62,
  },
  {
    label: "订单总量",
    value: "12,403",
    trend: "-2.1%",
    trendUp: false,
    icon: ShoppingCart,
    progress: 88,
  },
  {
    label: "转化率",
    value: "4.82%",
    trend: "+0.4%",
    trendUp: true,
    icon: MousePointerClick,
    progress: 48,
  },
  {
    label: "系统效率",
    value: "98.4%",
    trend: "稳定",
    trendUp: true,
    icon: Zap,
    progress: 98,
  },
];

const activities = [
  {
    time: "今天 14:23:05",
    title: "上海数据节点 连接超时",
    status: "紧急",
    statusType: "error" as const,
    dot: "bg-error",
  },
  {
    time: "今天 13:45:12",
    title: "新用户注册: Global_User_882",
    status: "信息",
    statusType: "info" as const,
    dot: "bg-secondary",
  },
  {
    time: "今天 11:10:44",
    title: "自动备份 任务成功完成",
    status: "普通",
    statusType: "normal" as const,
    dot: "bg-primary-container",
  },
  {
    time: "今天 09:30:22",
    title: "华东区销售报告已生成",
    status: "信息",
    statusType: "info" as const,
    dot: "bg-secondary",
  },
  {
    time: "今天 08:15:00",
    title: "系统安全扫描完成",
    status: "普通",
    statusType: "normal" as const,
    dot: "bg-primary-container",
  },
];

function ProgressRing({ percent }: { percent: number }) {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg className="w-12 h-12" viewBox="0 0 36 36">
      <path
        className="text-surface-container-highest stroke-current"
        d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`}
        fill="none"
        strokeWidth="3"
      />
      <path
        className="text-secondary stroke-current progress-ring-circle"
        d={`M18 2.0845 a ${radius} ${radius} 0 0 1 0 31.831 a ${radius} ${radius} 0 0 1 0 -31.831`}
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-stack-lg pb-stack-lg">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="glass-card p-stack-md rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-label-bold text-on-surface-variant uppercase tracking-wider">
                  {card.label}
                </span>
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-display-md font-display-md text-primary">{card.value}</h3>
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      card.trendUp ? "text-secondary" : "text-error"
                    }`}
                  >
                    {card.trendUp ? (
                      card.trend === "稳定" ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-label-sm font-label-bold">{card.trend}</span>
                  </div>
                </div>
                <ProgressRing percent={card.progress} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Revenue Trends */}
        <div className="lg:col-span-8 glass-card rounded-xl p-stack-md flex flex-col">
          <div className="flex justify-between items-center mb-stack-md">
            <div>
              <h4 className="text-headline-sm font-headline-sm">营收趋势分析</h4>
              <p className="text-body-sm text-on-surface-variant">过去 30 天的每日营收波动</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert("已选择 30 天")}
                className="px-3 py-1 text-label-sm font-label-bold rounded-md bg-secondary-container text-on-secondary-container"
              >
                30天
              </button>
              <button
                onClick={() => alert("已选择 90 天")}
                className="px-3 py-1 text-label-sm font-label-bold rounded-md hover:bg-surface-container transition-colors"
              >
                90天
              </button>
            </div>
          </div>
          <div className="flex-grow min-h-[350px] relative">
            <div className="absolute inset-0 flex items-end justify-between px-2 pt-10">
              <div className="w-full h-full relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50 L100,100 L0,100 Z"
                    fill="url(#areaGradient)"
                  />
                  <path
                    d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-label-sm text-outline px-2">
              <span>01 May</span>
              <span>07 May</span>
              <span>14 May</span>
              <span>21 May</span>
              <span>28 May</span>
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Category Performance */}
          <div className="glass-card rounded-xl p-stack-md flex-1">
            <h4 className="text-label-bold font-label-bold mb-4">核心品类表现</h4>
            <div className="space-y-4">
              {[
                { label: "电子产品", value: 82 },
                { label: "居家生活", value: 64 },
                { label: "服饰配件", value: 45 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-body-sm">
                    <span>{item.label}</span>
                    <span className="font-label-bold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Distribution */}
          <div className="glass-card rounded-xl p-stack-md flex-1">
            <h4 className="text-label-bold font-label-bold mb-4">渠道分布</h4>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" fill="transparent" r="16" stroke="#e2e8f0" strokeWidth="4" />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="16"
                    stroke="#2DD4BF"
                    strokeDasharray="45 100"
                    strokeDashoffset="0"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="16"
                    stroke="#006b5f"
                    strokeDasharray="30 100"
                    strokeDashoffset="-45"
                    strokeWidth="4"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="16"
                    stroke="#0d1c32"
                    strokeDasharray="25 100"
                    strokeDashoffset="-75"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2 text-label-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>移动端 (45%)</span>
                </div>
                <div className="flex items-center gap-2 text-label-sm">
                  <div className="w-2 h-2 rounded-full bg-on-secondary-container" />
                  <span>桌面端 (30%)</span>
                </div>
                <div className="flex items-center gap-2 text-label-sm">
                  <div className="w-2 h-2 rounded-full bg-primary-container" />
                  <span>线下 (25%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="glass-card rounded-xl overflow-hidden">
        <div className="p-stack-md border-b border-outline-variant flex justify-between items-center">
          <h4 className="text-headline-sm font-headline-sm">实时系统动态</h4>
          <button
            onClick={() => navigate("/logs")}
            className="text-secondary text-label-bold font-label-bold flex items-center hover:underline"
          >
            查看全部 <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-label-bold text-on-surface-variant">
                <th className="px-6 py-4">时间戳</th>
                <th className="px-6 py-4">事件描述</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {activities.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 text-body-sm text-outline">{item.time}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className="text-body-md font-medium text-primary">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-label-sm font-label-bold ${
                        item.statusType === "error"
                          ? "bg-error-container text-on-error-container"
                          : item.statusType === "info"
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => alert(`操作: ${item.title}`)}
                      className="p-2 hover:bg-surface-container rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-on-surface-variant" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 pt-stack-md">
        <div className="flex flex-col sm:flex-row justify-between items-center text-label-sm text-outline gap-2">
          <p>© 2024 Nexus Intelligence. All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => alert("使用条款")} className="hover:text-secondary transition-colors">
              使用条款
            </button>
            <button onClick={() => alert("隐私政策")} className="hover:text-secondary transition-colors">
              隐私政策
            </button>
            <button onClick={() => alert("帮助中心")} className="hover:text-secondary transition-colors">
              帮助中心
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
