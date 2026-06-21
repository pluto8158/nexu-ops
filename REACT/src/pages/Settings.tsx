import { useState } from "react";
import {
  Upload,
  Trash2,
  Camera,
  Save,
  Shield,
  Bell,
  Palette,
  Users,
  Puzzle,
  Database,
  Info,
} from "lucide-react";

const tabs = [
  { key: "general", label: "通用", icon: Shield },
  { key: "appearance", label: "外观", icon: Palette },
  { key: "users", label: "用户与角色", icon: Users },
  { key: "notifications", label: "通知", icon: Bell },
  { key: "security", label: "安全", icon: Shield },
  { key: "integrations", label: "集成", icon: Puzzle },
  { key: "backup", label: "备份", icon: Database },
  { key: "about", label: "关于", icon: Info },
];

const notificationItems = [
  { label: "系统告警通知", desc: "当系统出现异常或错误时发送通知", defaultChecked: true },
  { label: "报告生成完成", desc: "当计划报告生成完成时发送通知", defaultChecked: true },
  { label: "用户登录提醒", desc: "当有新设备登录时发送通知", defaultChecked: false },
  { label: "每周摘要", desc: "每周一发送运营数据摘要", defaultChecked: true },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [companyName, setCompanyName] = useState("Nexus Corporation");
  const [timezone, setTimezone] = useState("Asia/Shanghai");
  const [currency, setCurrency] = useState("CNY");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationItems.map((item) => [item.label, item.defaultChecked]))
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-gutter h-full">
      {/* Sub Navigation */}
      <aside className="w-full md:w-48 shrink-0">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  active
                    ? "bg-secondary/10 text-secondary font-label-bold text-label-bold border-l-2 border-secondary"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-md text-body-md"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Form Canvas */}
      <div className="flex-1 min-w-0">
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/50 p-6 md:p-8">
          <div className="mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              {tabs.find((t) => t.key === activeTab)?.label}设置
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              管理您的核心业务配置和全局显示首选项。
            </p>
          </div>

          {activeTab === "general" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-stack-lg max-w-2xl"
            >
              {/* Company Name */}
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">公司名称</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>

              {/* Timezone & Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="space-y-2">
                  <label className="block font-label-bold text-label-bold text-on-surface">时区</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Asia/Shanghai">(GMT+08:00) 中国标准时间 - 北京</option>
                    <option value="Asia/Hong_Kong">(GMT+08:00) 香港时间</option>
                    <option value="Asia/Tokyo">(GMT+09:00) 日本标准时间</option>
                    <option value="UTC">UTC 通用协调时间</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-label-bold text-label-bold text-on-surface">默认货币</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="CNY">人民币 (CNY)</option>
                    <option value="USD">美元 (USD)</option>
                    <option value="EUR">欧元 (EUR)</option>
                    <option value="HKD">港币 (HKD)</option>
                  </select>
                </div>
              </div>

              {/* Company Logo */}
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">公司 Logo</label>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  此图标将显示在所有系统报告和登录页面上。建议尺寸：256x256px。
                </p>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-lg border border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                    <span className="font-display-md text-display-md text-primary font-bold">N</span>
                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="w-6 h-6 text-on-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => alert("上传图片")}
                        className="px-4 py-2 border border-outline-variant rounded-full font-label-bold text-label-bold text-on-surface hover:bg-surface-container transition-colors duration-300 flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        上传新图片
                      </button>
                      <button
                        type="button"
                        onClick={() => alert("移除图片")}
                        className="px-4 py-2 border border-error/50 rounded-full font-label-bold text-label-bold text-error hover:bg-error-container hover:border-error transition-colors duration-300 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        移除
                      </button>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      支持 JPG, PNG 或 SVG。最大文件大小 2MB。
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-outline-variant/50" />

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setCompanyName("Nexus Corporation");
                    setTimezone("Asia/Shanghai");
                    setCurrency("CNY");
                  }}
                  className="px-6 py-2 border border-outline-variant rounded-full font-label-bold text-label-bold text-on-surface hover:bg-surface-container transition-colors duration-300"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-secondary text-on-secondary rounded-full font-label-bold text-label-bold hover:shadow-md hover:-translate-y-[1px] transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saved ? "已保存" : "保存更改"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-stack-lg max-w-2xl">
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">主题模式</label>
                <div className="flex gap-4">
                  {["浅色", "深色", "跟随系统"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => alert(`切换到 ${mode} 模式`)}
                      className="flex-1 py-3 px-4 border border-outline-variant rounded-lg hover:border-secondary hover:text-secondary transition-colors font-body-md text-body-md text-on-surface"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">强调色</label>
                <div className="flex gap-3">
                  {["#006b5f", "#2563eb", "#9333ea", "#dc2626", "#ea580c"].map((color) => (
                    <button
                      key={color}
                      onClick={() => alert(`设置强调色: ${color}`)}
                      className="w-10 h-10 rounded-full border-2 border-outline-variant hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-stack-lg max-w-2xl">
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">默认新用户角色</label>
                <select className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none cursor-pointer">
                  <option>观察员</option>
                  <option>数据分析师</option>
                  <option>运营经理</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">自动注销时间 (分钟)</label>
                <input
                  type="number"
                  defaultValue={30}
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-stack-lg max-w-2xl">
              {notificationItems.map((item) => (
                <div key={item.label} className="flex items-start justify-between py-3 border-b border-outline-variant/30">
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface">{item.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifications((prev) => ({
                        ...prev,
                        [item.label]: !prev[item.label],
                      }));
                    }}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notifications[item.label] ? "bg-secondary" : "bg-outline-variant"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications[item.label] ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-stack-lg max-w-2xl">
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">双因素认证 (2FA)</label>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface">启用 TOTP 验证</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">使用 Google Authenticator 或类似应用</p>
                  </div>
                  <button
                    onClick={() => alert("2FA 设置向导")}
                    className="px-4 py-2 bg-secondary text-on-secondary rounded-full font-label-bold text-label-bold hover:shadow-sm transition-all"
                  >
                    启用
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">登录历史</label>
                <div className="space-y-2">
                  {[
                    { ip: "192.168.1.105", time: "2023-10-27 14:32:01", device: "Chrome / Windows" },
                    { ip: "10.0.0.52", time: "2023-10-26 09:15:22", device: "Safari / macOS" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="font-body-sm text-body-sm text-on-surface">{log.device}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{log.ip}</p>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-stack-lg max-w-2xl">
              {[
                { name: "Salesforce CRM", desc: "同步客户与销售数据", connected: true },
                { name: "SAP HANA", desc: "企业资源规划数据连接", connected: true },
                { name: "Slack", desc: "接收系统通知与告警", connected: false },
                { name: "AWS S3", desc: "数据湖存储集成", connected: true },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant"
                >
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface">{integration.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{integration.desc}</p>
                  </div>
                  <button
                    onClick={() => alert(`${integration.connected ? "断开" : "连接"} ${integration.name}`)}
                    className={`px-4 py-1.5 rounded-full font-label-bold text-label-bold transition-all ${
                      integration.connected
                        ? "border border-outline-variant text-on-surface hover:bg-error-container hover:text-error hover:border-error"
                        : "bg-secondary text-on-secondary hover:bg-secondary-fixed-dim"
                    }`}
                  >
                    {integration.connected ? "断开" : "连接"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "backup" && (
            <div className="space-y-stack-lg max-w-2xl">
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">自动备份</label>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface">每日自动备份</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">每天凌晨 02:00 UTC 执行全量备份</p>
                  </div>
                  <button className="px-4 py-2 bg-secondary text-on-secondary rounded-full font-label-bold text-label-bold hover:shadow-sm transition-all">
                    已启用
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-on-surface">备份历史</label>
                <div className="space-y-2">
                  {[
                    { date: "2023-10-27 02:00", size: "1.2 GB", status: "成功" },
                    { date: "2023-10-26 02:00", size: "1.1 GB", status: "成功" },
                    { date: "2023-10-25 02:00", size: "1.1 GB", status: "成功" },
                  ].map((backup, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/50">
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-secondary" />
                        <div>
                          <p className="font-body-sm text-body-sm text-on-surface">{backup.date}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{backup.size}</p>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary">{backup.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-stack-lg max-w-2xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4">
                <span className="font-display-lg text-display-lg text-on-primary font-bold">N</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Nexus Operations System</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">版本 2.4.1 (Build 20231015)</p>
              <div className="pt-4 space-y-2">
                <p className="font-body-sm text-body-sm text-on-surface-variant"> Nexus Corporation. 保留所有权利。</p>
                <div className="flex justify-center gap-4 pt-2">
                  <button onClick={() => alert("服务条款")} className="text-secondary hover:underline font-label-sm">
                    服务条款
                  </button>
                  <button onClick={() => alert("隐私政策")} className="text-secondary hover:underline font-label-sm">
                    隐私政策
                  </button>
                  <button onClick={() => alert("开源许可")} className="text-secondary hover:underline font-label-sm">
                    开源许可
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
