import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ChevronDown,
  Printer,
  Share2,
  CalendarDays,
  User,
  Verified,
  Lock,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  CreditCard,
  Globe,
  PieChart,
  Gauge,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

const metrics = [
  {
    label: "总销售额 (本季)",
    value: "¥450.2M",
    trend: "+12.4% 同比",
    up: true,
    icon: CreditCard,
  },
  {
    label: "新增企业客户",
    value: "342 家",
    trend: "+8.5% 环比",
    up: true,
    icon: Globe,
  },
  {
    label: "核心产品转化率",
    value: "18.7%",
    trend: "持平预期",
    up: null,
    icon: PieChart,
  },
  {
    label: "系统平均响应时间",
    value: "124 ms",
    trend: "+12ms (负载增加)",
    up: false,
    icon: Gauge,
  },
];

const tableData = [
  { region: "上海总部", manager: "李建国", sales: "15,420", rate: "112%", rateClass: "text-secondary", grade: "卓越 (A+)", gradeClass: "bg-secondary/10 text-secondary border border-secondary/20" },
  { region: "浙江分公司 (杭州)", manager: "张晓华", sales: "12,100", rate: "108%", rateClass: "text-secondary", grade: "优秀 (A)", gradeClass: "bg-secondary/10 text-secondary border border-secondary/20" },
  { region: "江苏分公司 (苏州)", manager: "陈明", sales: "9,850", rate: "98%", rateClass: "text-on-surface-variant", grade: "良好 (B)", gradeClass: "border border-outline-variant text-on-surface-variant" },
  { region: "安徽事业部 (合肥)", manager: "王伟", sales: "4,230", rate: "85%", rateClass: "text-error", grade: "需提升 (C)", gradeClass: "bg-error/10 text-error border border-error/20" },
];

export default function ReportViewer() {
  const navigate = useNavigate();
  // const { id } = useParams(); // Report ID available for future dynamic data fetching

  return (
    <div className="space-y-stack-lg pb-stack-lg">
      {/* Breadcrumb */}
      <nav className="flex text-label-sm text-on-surface-variant mb-1">
        <button onClick={() => navigate("/reports")} className="hover:text-secondary transition-colors">
          报告
        </button>
        <span className="mx-2">/</span>
        <span className="text-secondary">查看报告</span>
      </nav>

      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/reports")}
            className="p-2 -ml-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-5 w-px bg-outline-variant" />
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Nexus 分析系统
            </span>
            <h1 className="font-label-bold text-label-bold text-on-surface">
              2023年度Q3华东区销售与运营综合报告
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Export Dropdown simulation */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low hover:border-outline transition-all duration-300 font-label-bold text-label-bold">
              <Download className="w-4 h-4" />
              导出
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="hidden group-hover:block absolute right-0 mt-1 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-ambient z-50 overflow-hidden py-1">
              <button onClick={() => alert("导出 PDF")} className="block w-full text-left px-4 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low hover:text-secondary transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> PDF 文档
              </button>
              <button onClick={() => alert("导出 Excel")} className="block w-full text-left px-4 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low hover:text-secondary transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Excel 数据
              </button>
              <button onClick={() => alert("导出 PNG")} className="block w-full text-left px-4 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low hover:text-secondary transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> PNG 图片
              </button>
            </div>
          </div>
          <button
            onClick={() => alert("打印报告")}
            className="p-1.5 rounded-lg border border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
            title="打印"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert("分享报告链接已复制到剪贴板")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-container hover:shadow-ambient transition-all font-label-bold text-label-bold"
          >
            <Share2 className="w-4 h-4" />
            分享报告
          </button>
        </div>
      </div>

      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant/50 pb-6">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-3 tracking-tight">
            2023年度Q3华东区销售与运营综合报告
          </h2>
          <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" /> 生成日期: 2023-10-15
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> 编制人: 王某某 (数据分析部)
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-bold text-label-bold flex items-center gap-1 border border-secondary/20">
            <Verified className="w-3 h-3" />
            已审核
          </span>
          <span className="px-3 py-1 rounded-full bg-error/10 text-error font-label-bold text-label-bold flex items-center gap-1 border border-error/20">
            <Lock className="w-3 h-3" />
            内部机密
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="p-6 md:p-8 rounded-xl bg-surface-container-low border border-outline-variant/60 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-1 bg-secondary opacity-80" />
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary" />
          高管摘要
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-4xl">
          本季度华东区整体表现强劲，总销售额达到人民币 <strong className="text-on-surface">4.5 亿元</strong>，同比增长{" "}
          <strong className="text-secondary">12.4%</strong>，超出预期目标 5%。核心增长驱动力来源于新推出的企业级SaaS服务模块在苏州和杭州等二线城市的渠道下沉与成功拓展。
          <br />
          <br />
          在运营层面，系统可用性保持在 99.99% 的高水位。然而，受物流仓储成本波动影响，整体运营成本略有上浮（+3.2%）。建议在即将到来的Q4季度，重点优化区域仓储网络布局以对冲成本压力，并继续加大对核心Top50企业客户的增值服务推广力度，以提升单客生命周期价值（LTV）。
        </p>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="p-5 rounded-xl bg-surface border border-outline-variant shadow-ambient hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-label-bold text-label-bold text-on-surface-variant">{m.label}</span>
                <div className="p-1.5 rounded-lg bg-surface-container-low text-on-surface-variant group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="font-display-md text-display-md text-on-surface mb-2">{m.value}</div>
              <div
                className={`flex items-center gap-1 font-label-bold text-label-bold ${
                  m.up === true ? "text-secondary" : m.up === false ? "text-error" : "text-on-surface-variant"
                }`}
              >
                {m.up === true ? (
                  <TrendingUp className="w-4 h-4" />
                ) : m.up === false ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
                {m.trend}
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-surface border border-outline-variant shadow-ambient flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">月度营收趋势与预测</h4>
            <button
              onClick={() => alert("更多选项")}
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-grow relative bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex items-end justify-between px-8 pt-10 pb-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-4 px-8 pointer-events-none opacity-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full border-t border-outline-variant border-dashed" />
              ))}
              <div className="w-full border-t border-outline-variant border-solid" />
            </div>
            {/* Bars */}
            {[
              { h: "40%", label: "七月: 1.2亿" },
              { h: "65%", label: "八月: 1.8亿" },
              { h: "85%", label: "九月: 2.4亿", active: true },
              { h: "95%", label: "十月 (预测)", dashed: true },
            ].map((bar, i) => (
              <div
                key={i}
                className={`w-12 md:w-16 rounded-t hover:bg-secondary/60 transition-colors cursor-pointer relative group ${
                  bar.active
                    ? "bg-secondary hover:bg-on-secondary-container shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                    : bar.dashed
                    ? "bg-outline-variant/30 border-2 border-dashed border-outline-variant hover:bg-outline-variant/50"
                    : "bg-surface-variant"
                }`}
                style={{ height: bar.h }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-2 py-1 rounded whitespace-nowrap">
                  {bar.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-8 mt-2 font-label-sm text-label-sm text-on-surface-variant">
            <span>7月</span>
            <span>8月</span>
            <span>9月</span>
            <span>10月(预测)</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="p-6 rounded-xl bg-surface border border-outline-variant shadow-ambient flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-sm text-headline-sm text-on-surface">产品线营收占比</h4>
            <button
              onClick={() => alert("更多选项")}
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: "conic-gradient(from 0deg, #006b5f 0% 65%, #c5c6cd 65% 85%, #e0e3e5 85% 100%)",
              }}
            >
              <div className="absolute inset-0 m-6 bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-display-md text-display-md text-on-surface">65%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">SaaS核心版</span>
              </div>
            </div>
            <div className="mt-8 w-full space-y-3">
              {[
                { label: "SaaS核心版", color: "bg-secondary", value: "65%" },
                { label: "定制化开发", color: "bg-outline-variant", value: "20%" },
                { label: "硬件部署", color: "bg-surface-variant", value: "15%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between font-body-sm text-body-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-on-surface">{item.label}</span>
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section className="bg-surface rounded-xl border border-outline-variant shadow-ambient overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">各省份业绩明细 (Top 5)</h4>
          <button
            onClick={() => alert("查看完整表格")}
            className="flex items-center gap-1 font-label-bold text-label-bold text-secondary hover:text-on-secondary-container transition-colors"
          >
            查看完整表格 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-lowest border-b-2 border-outline-variant/60">
                <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                  区域中心
                </th>
                <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                  负责人
                </th>
                <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-right">
                  季度销售额 (万)
                </th>
                <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-right">
                  目标完成率
                </th>
                <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-center">
                  综合评级
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {tableData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium text-on-surface">{row.region}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.manager}</td>
                  <td className="px-6 py-4 text-right font-medium">{row.sales}</td>
                  <td className={`px-6 py-4 text-right font-medium ${row.rateClass}`}>{row.rate}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full font-label-bold text-label-bold ${row.gradeClass}`}
                    >
                      {row.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
