# NexusOps

> ⚠️ 本项目**仅包含前端代码**，不包含任何后端服务、数据库或 API 实现。所有数据均为前端 Mock 或通过环境变量配置的外部接口获取。

一个基于 React + TypeScript + Vite 构建的现代化运营管理平台前端项目，提供仪表盘、报表分析、数据管理、用户与权限等模块。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **路由**: React Router 7
- **状态管理**: Zustand
- **样式**: Tailwind CSS 3
- **图标**: Lucide React
- **代码规范**: ESLint + TypeScript ESLint

## 目录结构

```
NexusOps/
├── REACT/              # 前端工程
│   ├── public/         # 静态资源
│   ├── src/
│   │   ├── assets/     # 图片等资源
│   │   ├── components/ # 公共组件
│   │   ├── hooks/      # 自定义 Hooks
│   │   ├── lib/        # 工具库
│   │   ├── pages/      # 页面模块
│   │   ├── store/      # 状态管理
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
├── design/             # 设计稿（已加入 .gitignore，不纳入版本控制）
└── README.md
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm / pnpm / yarn

### 安装依赖

```bash
cd REACT
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认地址：http://localhost:5173

### 构建生产包

```bash
npm run build
```

构建产物输出至 `REACT/dist/`。

### 预览构建产物

```bash
npm run preview
```

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 类型检查并构建生产包 |
| `npm run preview` | 本地预览构建产物 |
| `npm run lint` | 运行 ESLint 代码检查 |
| `npm run check` | 仅做 TypeScript 类型检查 |

## 核心模块

- **Dashboard（仪表盘）**: 关键指标总览
- **Analytics（分析）**: 业务数据分析与可视化
- **Reports（报表）**: 报表列表与查看
- **Data Management（数据管理）**: 数据集与 ETL 相关能力
- **Users（用户）**: 用户与权限管理
- **Settings（设置）**: 系统与个人偏好设置
- **Login / Register**: 登录与注册

## 许可证

本项目仅供学习与内部使用。
