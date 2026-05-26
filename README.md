# GitHub 镜像站

> 一个高仿 GitHub 首页风格的静态网页镜像，包含完整的 Hero、特性展示、数据统计、用户评价和 CTA 等模块。

## 在线预览

部署后访问: `https://xsjluz.github.io/github-mirror/`

## 特性

- 🎨 GitHub 深色主题设计（#0d1117 配色方案）
- 📱 完整响应式布局（桌面端/平板/手机）
- ✨ 滚动入场动画和数字递增计数器
- 🔍 搜索框快捷键（按 `/` 聚焦）
- 💬 自动轮播用户评价
- 🧭 固定导航栏（毛玻璃效果）
- 📝 代码卡片浮动动画

## 技术栈

- 纯 HTML5 + CSS3 + Vanilla JavaScript
- 零外部依赖
- CSS Grid & Flexbox 布局
- Intersection Observer API（滚动动画）
- CSS 自定义属性（主题变量）

## 本地开发

直接在浏览器中打开 `index.html` 即可预览：

```bash
# 如果有 Python
python -m http.server 8000

# 或用任意静态文件服务器
npx serve .
```

## 部署

本仓库通过 GitHub Actions 自动部署到 GitHub Pages。推送到 `main` 分支即可自动触发部署。
