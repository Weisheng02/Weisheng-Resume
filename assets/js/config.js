/**
 * ============================================
 * 作品集配置文件
 * ============================================
 *
 * 📝 使用说明：
 * 1. 修改下面的内容来更新你的作品集
 * 2. 不需要修改任何 HTML 或其他 JS 文件
 * 3. 保存后刷新浏览器即可看到更新
 *
 * ⚠️ 注意：
 * - 保持引号和逗号的格式
 * - 图片路径相对于 index.html
 * - 链接需要包含 https:// 或 mailto:
 */

const portfolioConfig = {

  // ============================================
  // 个人基本信息
  // ============================================
  personal: {
    name: {
      zh: '叶炜盛',                    // 中文名
      en: 'YEAP WEISHENG'             // 英文名
    },
    title: 'IT Student',               // 职位/头衔
    tagline: 'Building tomorrow\'s solutions, one line of code at a time',  // 一句话介绍
    location: 'Penang, Malaysia',      // 所在地
    avatar: 'assets/img/avatar.jpg',   // 头像路径（如果没有会显示首字母）

    // 关于我 - 详细介绍（支持多段落）
    about: [
      'I am currently pursuing my IT degree at TAR UMT, where I am passionate about learning and creating innovative technology solutions.',
      'My journey in technology has been driven by curiosity and a desire to solve real-world problems through code. I enjoy exploring new frameworks, contributing to projects, and continuously improving my skills.',
      'When I\'m not coding, I love collaborating with peers, participating in hackathons, and staying updated with the latest tech trends.'
    ],

    // 统计数据
    stats: [
      { number: '2+', label: 'Years Learning' },
      { number: '10+', label: 'Projects Built' },
      { number: '5+', label: 'Technologies' }
    ]
  },

  // ============================================
  // 联系方式和社交链接
  // ============================================
  contact: {
    email: 'weisheng@example.com',     // 邮箱地址
    phone: '+60 12-345 6789',          // 电话（可选，留空则不显示）

    // 社交媒体链接
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/yourusername',
        icon: 'github'  // github, linkedin, twitter, instagram, facebook
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/yourusername',
        icon: 'linkedin'
      },
      // 可以添加更多社交链接
      // {
      //   name: 'Instagram',
      //   url: 'https://instagram.com/yourusername',
      //   icon: 'instagram'
      // }
    ]
  },

  // ============================================
  // 教育背景
  // ============================================
  education: [
    {
      school: 'Tunku Abdul Rahman University of Management and Technology (TAR UMT)',
      degree: 'Bachelor of Information Technology',
      major: 'Software Engineering',  // 专业方向（可选）
      period: '2022 - 2026',
      location: 'Penang, Malaysia',
      description: 'Focusing on full-stack development, data structures, and software engineering principles.',
      gpa: '3.8/4.0',  // 可选，不想显示就留空
      highlights: [
        'Dean\'s List recipient',
        'Active member of IT Society',
        'Participated in multiple coding competitions'
      ]
    }
  ],

  // ============================================
  // 工作经验（实习、兼职等）
  // ============================================
  experience: [
    {
      company: 'Tech Startup XYZ',
      position: 'Frontend Developer Intern',
      period: 'Jun 2024 - Aug 2024',
      location: 'Penang, Malaysia',
      description: 'Worked on building responsive web applications using React and TypeScript.',
      achievements: [
        'Developed 3 major features for the main product',
        'Improved page load time by 40%',
        'Collaborated with a team of 5 developers'
      ]
    }
    // 如果还没有工作经验，可以删除或保持为空数组 []
  ],

  // ============================================
  // 技能
  // ============================================
  skills: {
    // 技术技能（带进度条）
    technical: [
      { name: 'JavaScript', level: 85 },
      { name: 'HTML & CSS', level: 90 },
      { name: 'React', level: 75 },
      { name: 'Node.js', level: 70 },
      { name: 'Python', level: 65 },
      { name: 'MySQL', level: 70 },
      { name: 'Git', level: 80 }
    ],

    // 技能分类（标签形式）
    categories: {
      'Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Tailwind CSS', 'Bootstrap'],
      'Backend': ['Node.js', 'Express', 'Python', 'Django', 'REST API'],
      'Database': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
      'Tools & Others': ['Git', 'GitHub', 'VS Code', 'Figma', 'Photoshop', 'Docker']
    },

    // 软技能
    soft: [
      'Problem Solving',
      'Team Collaboration',
      'Quick Learner',
      'Communication',
      'Time Management',
      'Adaptability'
    ]
  },

  // ============================================
  // 项目作品
  // ============================================
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce web application with shopping cart, payment integration, and admin dashboard.',
      longDescription: 'Built a complete online shopping platform featuring user authentication, product management, shopping cart functionality, and Stripe payment integration. The admin panel allows easy product and order management.',
      image: 'assets/img/projects/project1.jpg',  // 项目截图
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: ['web', 'frontend', 'backend'],  // 用于过滤
      links: {
        demo: 'https://demo-link.com',     // 在线演示（可选）
        github: 'https://github.com/yourusername/project',  // GitHub 链接
        // video: 'https://youtube.com/...'  // 视频演示（可选）
      },
      featured: true,  // 是否为精选项目
      status: 'Completed',  // Completed, In Progress, Planning
      date: '2024'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates and team features.',
      longDescription: 'Developed a productivity app that helps teams organize tasks, set deadlines, and track progress. Features include drag-and-drop boards, real-time notifications, and user role management.',
      image: 'assets/img/projects/project2.jpg',
      tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      category: ['web', 'frontend'],
      links: {
        demo: 'https://demo-link.com',
        github: 'https://github.com/yourusername/project2'
      },
      featured: true,
      status: 'Completed',
      date: '2024'
    },
    {
      id: 3,
      title: 'Weather Forecast App',
      description: 'A beautiful weather application with location-based forecasts and interactive maps.',
      longDescription: 'Created a responsive weather app that provides accurate weather information using third-party APIs. Features include current weather, 7-day forecast, and weather maps.',
      image: 'assets/img/projects/project3.jpg',
      tags: ['JavaScript', 'API', 'CSS'],
      category: ['web', 'frontend'],
      links: {
        demo: 'https://demo-link.com',
        github: 'https://github.com/yourusername/project3'
      },
      featured: false,
      status: 'Completed',
      date: '2023'
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website with dark mode and smooth animations.',
      longDescription: 'Designed and developed this portfolio website using vanilla JavaScript and modern CSS. Features include smooth scrolling, dark/light theme toggle, and PWA capabilities.',
      image: 'assets/img/projects/project4.jpg',
      tags: ['HTML', 'CSS', 'JavaScript', 'PWA'],
      category: ['web', 'frontend'],
      links: {
        demo: 'https://your-portfolio.com',
        github: 'https://github.com/yourusername/portfolio'
      },
      featured: false,
      status: 'Completed',
      date: '2024'
    }

    // 添加更多项目...
    // 复制上面的格式，修改内容即可
  ],

  // ============================================
  // 证书和成就
  // ============================================
  achievements: [
    {
      title: 'Best Student Project Award',
      issuer: 'TAR UMT',
      date: '2024',
      description: 'Awarded for outstanding capstone project',
      icon: '🏆'
    },
    {
      title: 'JavaScript Certification',
      issuer: 'freeCodeCamp',
      date: '2023',
      description: 'Completed JavaScript Algorithms and Data Structures',
      icon: '📜',
      link: 'https://certificate-link.com'
    }
    // 添加更多成就...
  ],

  // ============================================
  // 服务/我能提供的
  // ============================================
  services: [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Creating responsive and modern websites using latest technologies'
    },
    {
      icon: '📱',
      title: 'UI/UX Design',
      description: 'Designing user-friendly interfaces with great user experience'
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      description: 'Building robust APIs and server-side applications'
    },
    {
      icon: '🚀',
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and efficiency'
    }
  ],

  // ============================================
  // 网站设置
  // ============================================
  settings: {
    // 主题颜色（可以改成你喜欢的颜色）
    theme: {
      primaryColor: '#3b82f6',      // 主色调（蓝色）
      secondaryColor: '#8b5cf6',    // 辅助色（紫色）
      accentColor: '#10b981',       // 强调色（绿色）
      // 其他预设主题：
      // 紫色系: primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ec4899'
      // 绿色系: primary: '#10b981', secondary: '#34d399', accent: '#3b82f6'
      // 橙色系: primary: '#f59e0b', secondary: '#fbbf24', accent: '#ef4444'
    },

    // 网站 SEO 信息
    seo: {
      title: 'Yeap Weisheng - IT Student Portfolio',
      description: 'Personal portfolio of Yeap Weisheng, an IT student at TAR UMT specializing in web development and software engineering.',
      keywords: 'web developer, IT student, portfolio, React, JavaScript, TAR UMT',
      author: 'Yeap Weisheng',
      ogImage: 'assets/img/og-image.jpg'  // 社交媒体分享图片
    },

    // 功能开关
    features: {
      showResume: true,          // 显示简历部分
      showBlog: false,           // 显示博客部分（未来功能）
      showAchievements: true,    // 显示成就部分
      showServices: true,        // 显示服务部分
      enableAnimations: true,    // 启用动画效果
      enableParticles: true,     // 启用粒子背景效果
      enableDarkMode: true       // 启用深色模式
    },

    // 简历文件路径
    resumeFile: 'assets/resume/Weisheng-Resume.pdf'
  }
};

// 导出配置（不要修改这行）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioConfig;
}
