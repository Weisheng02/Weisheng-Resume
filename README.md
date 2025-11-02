# 现代化个人作品集网站

一个完全可配置、响应式的个人作品集网站，支持深色/浅色主题切换，所有内容通过简单的配置文件管理。

## ✨ 特性

- 🎨 **现代化设计** - 渐变色、动画效果、玻璃态设计
- 🌓 **深色/浅色主题** - 自动保存用户偏好
- 📱 **完全响应式** - 完美适配桌面、平板、手机
- ⚡ **配置驱动** - 所有内容通过 `config.js` 轻松修改
- 🎭 **动画效果** - 平滑的滚动动画和视差效果
- 🚀 **性能优化** - 懒加载、PWA 支持
- ♿ **无障碍友好** - 符合 WCAG 标准
- 🔍 **SEO 优化** - 结构化数据、meta 标签完整

## 📁 项目结构

```
Weisheng-Resume/
├── index.html                 # 主页面（不需要修改）
├── assets/
│   ├── css/
│   │   └── styles.css        # 样式文件（不需要修改）
│   ├── js/
│   │   ├── config.js         # ⭐ 配置文件（你要修改的文件）
│   │   └── main.js           # 主逻辑（不需要修改）
│   ├── img/
│   │   ├── avatar.jpg        # 你的头像
│   │   └── projects/         # 项目截图文件夹
│   └── resume/
│       └── Weisheng-Resume.pdf  # 你的简历PDF
├── service-worker.js         # PWA 服务工作者
└── README.md                 # 本文件
```

## 🚀 快速开始

### 1. 修改配置文件

打开 `assets/js/config.js` 文件，这是唯一需要修改的文件！

#### 个人信息

```javascript
personal: {
  name: {
    zh: '叶炜盛',                    // 修改为你的中文名
    en: 'YEAP WEISHENG'             // 修改为你的英文名
  },
  title: 'IT Student',               // 修改为你的职位/身份
  tagline: '一句话介绍自己',          // 修改为你的标语
  location: 'Penang, Malaysia',      // 修改为你的位置
  avatar: 'assets/img/avatar.jpg',   // 头像路径

  about: [
    '第一段关于你的介绍...',
    '第二段...',
    '第三段...'
  ],

  stats: [
    { number: '2+', label: 'Years Learning' },    // 修改统计数据
    { number: '10+', label: 'Projects Built' },
    { number: '5+', label: 'Technologies' }
  ]
}
```

#### 联系方式

```javascript
contact: {
  email: 'your@email.com',           // 修改为你的邮箱
  phone: '+60 12-345 6789',         // 修改为你的电话（可选）
  social: [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',    // 修改为你的 GitHub
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',  // 修改为你的 LinkedIn
      icon: 'linkedin'
    }
  ]
}
```

#### 教育背景

```javascript
education: [
  {
    school: 'TAR UMT',
    degree: 'Bachelor of IT',
    major: 'Software Engineering',
    period: '2022 - 2026',
    location: 'Penang',
    description: '简短描述...',
    gpa: '3.8/4.0',                  // 可选
    highlights: [
      '成就1',
      '成就2'
    ]
  }
]
```

#### 工作经验

```javascript
experience: [
  {
    company: 'Company Name',
    position: 'Position Title',
    period: 'Jun 2024 - Aug 2024',
    location: 'Location',
    description: '工作描述...',
    achievements: [
      '成就1',
      '成就2',
      '成就3'
    ]
  }
  // 如果还没有工作经验，可以保持为空数组 []
]
```

#### 项目

```javascript
projects: [
  {
    id: 1,
    title: '项目名称',
    description: '项目简短描述（1-2句话）',
    longDescription: '详细描述...',
    image: 'assets/img/projects/project1.jpg',    // 项目截图
    tags: ['React', 'Node.js', 'MongoDB'],        // 使用的技术
    category: ['web', 'frontend', 'backend'],     // 分类（用于筛选）
    links: {
      demo: 'https://demo.com',                   // 在线演示链接
      github: 'https://github.com/you/project'    // GitHub 链接
    },
    featured: true,                               // 是否为精选项目
    status: 'Completed',                          // Completed, In Progress, Planning
    date: '2024'
  }
  // 添加更多项目...
]
```

#### 技能

```javascript
skills: {
  // 技术技能（带进度条）
  technical: [
    { name: 'JavaScript', level: 85 },    // level 是 0-100 的数字
    { name: 'HTML & CSS', level: 90 },
    { name: 'React', level: 75 }
  ],

  // 技能分类（标签形式）
  categories: {
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React'],
    'Backend': ['Node.js', 'Express', 'MongoDB'],
    'Tools': ['Git', 'VS Code', 'Figma']
  },

  // 软技能
  soft: [
    'Problem Solving',
    'Team Collaboration',
    'Quick Learner'
  ]
}
```

### 2. 添加图片

#### 头像
- 将你的头像命名为 `avatar.jpg`
- 放到 `assets/img/` 文件夹
- 支持 JPG, PNG 格式

#### 项目截图
- 将项目截图放到 `assets/img/projects/` 文件夹
- 建议尺寸：800x500 px
- 在 config.js 中引用：`assets/img/projects/yourimage.jpg`

#### 简历 PDF
- 将你的简历 PDF 放到 `assets/resume/` 文件夹
- 命名为 `Weisheng-Resume.pdf` 或在 config.js 中修改路径

### 3. 本地预览

#### 方法 1：使用 Python（推荐）

```bash
# 在项目文件夹中运行
python3 -m http.server 8000

# 然后在浏览器打开
# http://localhost:8000
```

#### 方法 2：使用 VS Code Live Server

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

#### 方法 3：直接打开

某些浏览器允许直接打开 `index.html` 文件，但可能有功能限制。

## 🎨 自定义主题颜色

在 `config.js` 中找到 `settings.theme` 部分：

```javascript
theme: {
  primaryColor: '#3b82f6',      // 主色调
  secondaryColor: '#8b5cf6',    // 辅助色
  accentColor: '#10b981'        // 强调色
}
```

### 预设主题

**紫色系**
```javascript
primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ec4899'
```

**绿色系**
```javascript
primary: '#10b981', secondary: '#34d399', accent: '#3b82f6'
```

**橙色系**
```javascript
primary: '#f59e0b', secondary: '#fbbf24', accent: '#ef4444'
```

## 📝 常见修改

### 修改导航菜单

打开 `index.html`，找到导航部分：

```html
<ul class="nav-list">
  <li><a href="#home" class="nav-link active">Home</a></li>
  <li><a href="#about" class="nav-link">About</a></li>
  <!-- 添加或删除导航项 -->
</ul>
```

### 隐藏某个部分

在 `config.js` 的 `settings.features` 中：

```javascript
features: {
  showResume: true,          // 显示/隐藏简历部分
  showAchievements: true,    // 显示/隐藏成就部分
  showServices: true,        // 显示/隐藏服务部分
  enableAnimations: true,    // 启用/禁用动画
  enableParticles: true,     // 启用/禁用粒子背景
  enableDarkMode: true       // 启用/禁用深色模式
}
```

## 🌐 部署到网上

### GitHub Pages（免费）

1. 创建 GitHub 仓库
2. 上传所有文件
3. 进入 Settings > Pages
4. Source 选择 "main" 分支
5. 保存，几分钟后访问 `https://yourusername.github.io/repo-name`

### Netlify（免费）

1. 注册 [Netlify](https://netlify.com)
2. 拖拽整个文件夹上传
3. 自动部署完成

### Vercel（免费）

1. 注册 [Vercel](https://vercel.com)
2. Import Git 仓库或上传文件
3. 自动部署完成

## ⚡ 性能优化建议

1. **压缩图片** - 使用 [TinyPNG](https://tinypng.com) 压缩图片
2. **优化 PDF** - 简历 PDF 建议小于 2MB
3. **使用 WebP** - 将图片转换为 WebP 格式以获得更好的性能

## 🐛 常见问题

### Q: 修改了 config.js 但看不到变化？
A: 清除浏览器缓存（Ctrl+Shift+R 或 Cmd+Shift+R）

### Q: 图片不显示？
A: 检查图片路径是否正确，确保图片文件存在

### Q: 粒子背景不显示？
A: 确保 particles.js CDN 链接正常，或在 config.js 中禁用它

### Q: 移动端显示不正常？
A: 使用 Chrome DevTools 的移动模拟器测试，检查是否有 CSS 冲突

### Q: 联系表单不工作？
A: 当前使用 mailto 链接，会打开邮件客户端。如需真实表单，可以集成 FormSpree 或 EmailJS

## 📚 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代CSS、Grid、Flexbox、CSS变量
- **JavaScript (ES6+)** - 原生 JS，无框架依赖
- **Particles.js** - 粒子背景效果
- **PWA** - 渐进式 Web 应用

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 需要帮助？

如果遇到问题：
1. 仔细阅读本 README
2. 检查浏览器控制台的错误信息
3. 确保所有文件路径正确
4. 检查 config.js 的语法（逗号、引号等）

## 🎯 下一步

1. ✅ 修改 `config.js` 中的所有个人信息
2. ✅ 添加你的头像和项目截图
3. ✅ 上传你的简历 PDF
4. ✅ 本地预览测试
5. ✅ 部署到网上
6. ✅ 分享你的作品集链接！

祝你创建一个令人印象深刻的作品集！🚀
