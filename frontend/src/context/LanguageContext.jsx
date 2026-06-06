import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    nav: {
      dashboard: "Dashboard",
      logout: "Logout",
      login: "Login",
      back: "Back",
      confirmLogout: "Confirm Logout",
      signIn: "Sign in"
    },
    auth: {
      modalTitle: "Sign in to ALRes",
      googleLogin: "Continue with Google",
      localMode: "Use Local Workspace",
      localModeDesc: "Build resumes locally without an account. Your data stays on this device."
    },
    footer: {
      product: "Product",
      features: "Features",
      templates: "Templates",
      howItWorks: "How it works",
      company: "Company",
      about: "About",
      contact: "Contact",
      privacy: "Privacy Policy",
      connect: "Connect",
      madeWith: "Made with",
      forSeekers: "for job seekers everywhere",
      allRights: "All rights reserved.",
      selectLanguage: "Select Language"
    },
    contactForm: {
      title: "Contact Us",
      name: "Full Name",
      email: "Your Gmail / Email",
      message: "Your Message",
      placeholderName: "Andrew Hamilton",
      placeholderEmail: "Andrewham@gmail.com",
      placeholderMessage: "How can we help you?",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      ownerEmail: "Owner Email: alresresume@gmail.com"
    },
    dashboard: {
      title: "Welcome to ALRes",
      subtitle: "Manage your professional resumes and track your career progress.",
      newResume: "Create New Resume",
      myResumes: "My Resumes",
      lastUpdated: "Last updated",
      deleteConfirm: "Are you sure you want to delete this resume?",
      noResumes: "No resumes found. Let's build your first one!",
      searchPlaceholder: "Search resumes...",
      noResumes: "No resumes found. Let's build your first one!",
      searchPlaceholder: "Search resumes..."
    },
    resume: {
      experience: "Work Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      languages: "Languages",
      summary: "Professional Summary"
    },
    editor: {
      personalInfo: "Personal Information",
      resumeTitle: "Resume Title / Professional Role",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Contact Number",
      location: "Location",
      linkedIn: "LinkedIn URL",
      profilePhoto: "Profile Photo",
      showInResume: "Show in resume",
      uploadPhoto: "Upload Photo",
      changePhoto: "Change Photo",
      workExperience: "Work Experience",
      education: "Education",
      skills: "Skills & Compentencies",
      summary: "Professional Summary",
      addEntry: "Add Entry",
      company: "Company",
      position: "Position",
      startDate: "Start Date",
      endDate: "End Date",
      description: "Description",
      institution: "Institution",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      skillPlaceholder: "Add a skill (e.g. React, Project Management)",
      grammar: "GRAMMAR"
    },
    hero: {
      sparkle: "The easiest way to land your dream job",
      title1: "Build Your",
      titleAccent: "Professional Resume",
      title2: "in Minutes",
      subtitle: "Create a standout resume that gets you hired. No design skills needed—just a simple, fast, and effective way to showcase your journey.",
      buildBtn: "Build Resume",
      freeLabel: "100% FREE to use"
    },
    features: {
      title: "Everything You Need to Land the Job",
      subtitle: "Powerful features designed to make your resume creation process effortless and effective.",
      easyTitle: "Easy-to-Use Builder",
      easyDesc: "An intuitive, stress-free interface that guides you every step. Focus on your story while we handle the formatting.",
      profTitle: "Professional Templates",
      profDesc: "Stand out to recruiters with modern, industry-standard designs rigorously tested for success.",
      downTitle: "Instant PDF Download",
      downDesc: "Export your polished, job-ready resume with a single click—no watermarks, no waiting, guaranteed ATS-friendly.",
      fastTitle: "Fast Interface",
      fastDesc: "A smooth and lightning-fast experience built for modern web standards. Works perfectly on all your devices."
    },
    values: {
      title: "Why Job Seekers Love ALRes",
      subtitle: "Designed by students, for students and job seekers.",
      freeTitle: "100% Free",
      freeDesc: "Premium features without the price tag. Get full access at zero cost, forever.",
      noSkillsTitle: "No Skills Needed",
      noSkillsDesc: "We do the heavy lifting so your resume looks perfect every single time without design effort.",
      savesTimeTitle: "Saves Time",
      savesTimeDesc: "Go from a blank page to a complete, impressive resume in just minutes instead of hours.",
      smoothTitle: "Smooth Performance",
      smoothDesc: "Optimized to run perfectly and lightning-fast, even on low-end devices or slow connections."
    },
    builder: {
      content: "Content",
      design: "Design",
      settings: "Settings",
      save: "Save",
      saving: "Saving...",
      saved: "Saved",
      preview: "Preview",
      edit: "Edit",
      download: "Download",
      addSection: "Add Section",
      personalInfo: "Personal Info",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      other: "Other"
    }
  },
  ko: {
    nav: {
      dashboard: "대시보드",
      logout: "로그아웃",
      login: "로그인",
      back: "뒤로",
      confirmLogout: "로그아웃 확인",
      signIn: "로그인"
    },
    auth: {
      modalTitle: "ALRes 로그인",
      googleLogin: "Google로 계속하기",
      localMode: "로컬 작업 공간 사용",
      localModeDesc: "계정 없이 로컬에서 이력서를 작성하세요. 데이터는 이 기기에 저장됩니다."
    },
    footer: {
      product: "제품",
      features: "기능",
      templates: "템플릿",
      howItWorks: "사용 방법",
      company: "회사",
      about: "회사 소개",
      contact: "문의하기",
      privacy: "개인정보 보호정책",
      connect: "소셜 미디어",
      madeWith: "제작:",
      forSeekers: "모든 구직자를 위해",
      allRights: "모든 권리 보유.",
      selectLanguage: "언어 선택"
    },
    dashboard: {
      title: "ALRes에 오신 것을 환영합니다",
      subtitle: "전문 이력서를 관리하고 경력 진행 상황을 추적하세요.",
      newResume: "새 이력서 만들기",
      myResumes: "내 이력서",
      lastUpdated: "최근 업데이트",
      deleteConfirm: "이 이력서를 삭제하시겠습니까?",
      noResumes: "이력서가 없습니다. 첫 번째 이력서를 만들어보세요!",
      searchPlaceholder: "이력서 검색...",
      noResumes: "이력서가 없습니다. 첫 번째 이력서를 만들어보세요!",
      searchPlaceholder: "이력서 검색..."
    },
    resume: {
      experience: "경력 사항",
      education: "학력 사항",
      skills: "기술",
      projects: "프로젝트",
      certifications: "자격증",
      languages: "언어",
      summary: "전문 요약"
    },
    editor: {
      personalInfo: "개인 정보",
      resumeTitle: "이력서 제목 / 전문 역할",
      fullName: "성함",
      email: "이메일 주소",
      phone: "전화번호",
      location: "지역",
      linkedIn: "LinkedIn URL",
      profilePhoto: "프로필 사진",
      showInResume: "이력서에 표시",
      uploadPhoto: "사진 업로드",
      changePhoto: "사진 변경",
      workExperience: "경력 사항",
      education: "학력 사항",
      skills: "기술 및 역량",
      summary: "전문 요약",
      addEntry: "항목 추가",
      company: "회사명",
      position: "직책",
      startDate: "시작일",
      endDate: "종료일",
      description: "상세 내용",
      institution: "교육 기관",
      degree: "학위",
      fieldOfStudy: "전공",
      skillPlaceholder: "기술 추가 (예: React, 프로젝트 관리)",
      grammar: "문법 검사"
    },
    hero: {
      sparkle: "꿈의 직장을 얻는 가장 쉬운 방법",
      title1: "단 몇 분 만에",
      titleAccent: "전문적인 이력서",
      title2: "작성하기",
      subtitle: "취업에 성공하는 돋보이는 이력서를 만드세요. 디자인 기술은 필요 없습니다. 당신의 여정을 보여주는 간단하고 빠르며 효과적인 방법입니다.",
      buildBtn: "이력서 작성",
      freeLabel: "100% 무료 사용"
    },
    features: {
      title: "취업을 위한 모든 것",
      subtitle: "이력서 작성 과정을 쉽고 효과적으로 만들어주는 강력한 기능들입니다.",
      easyTitle: "사용하기 쉬운 빌더",
      easyDesc: "모든 단계를 안내하는 직관적이고 스트레스 없는 인터페이스입니다. 서식은 저희에게 맡기고 당신의 이야기에 집중하세요.",
      profTitle: "전문적인 템플릿",
      profDesc: "성공을 위해 엄격하게 테스트된 현대적인 표준 디자인으로 채용 담당자의 눈에 띄세요.",
      downTitle: "즉시 PDF 다운로드",
      downDesc: "클릭 한 번으로 세련된 이력서를 내보내세요. 워터마크나 대기 시간 없이 ATS 친화적인 파일이 보장됩니다.",
      fastTitle: "빠른 인터페이스",
      fastDesc: "최신 웹 표준으로 구축된 매끄럽고 빠른 환경입니다. 모든 기기에서 완벽하게 작동합니다."
    },
    values: {
      title: "구직자들이 ALRes를 사랑하는 이유",
      subtitle: "학생들이 학생들과 구직자들을 위해 디자인했습니다.",
      freeTitle: "100% 무료",
      freeDesc: "가격 부담 없는 프리미엄 기능. 평생 비용 없이 모든 기능을 이용하세요.",
      noSkillsTitle: "기술 필요 없음",
      noSkillsDesc: "디자인 노력 없이도 이력서가 항상 완벽해 보이도록 저희가 도와드립니다.",
      savesTimeTitle: "시간 절약",
      savesTimeDesc: "몇 시간이 아닌 단 몇 분 만에 빈 페이지에서 완전한 이력서를 만드세요.",
      smoothTitle: "매끄러운 성능",
      smoothDesc: "저사양 기기나 느린 연결에서도 빠르고 완벽하게 실행되도록 최적화되었습니다."
    },
    builder: {
      content: "내용",
      design: "디자인",
      settings: "설정",
      save: "저장하기",
      saving: "저장 중...",
      saved: "저장됨",
      preview: "미리보기",
      edit: "편집",
      download: "다운로드",
      addSection: "섹션 추가",
      personalInfo: "개인 정보",
      experience: "경력 사항",
      education: "학력 사항",
      skills: "기술",
      other: "기타"
    }
  },
  jp: {
    nav: {
      dashboard: "ダッシュボード",
      logout: "ログアウト",
      login: "ログイン",
      back: "戻る",
      confirmLogout: "ログアウトの確認",
      signIn: "サインイン"
    },
    auth: {
      modalTitle: "ALRes にサインイン",
      googleLogin: "Google で続行",
      localMode: "ローカルワークスペースを使用",
      localModeDesc: "アカウントなしでローカルに履歴書を作成します。データはこのデバイスに保存されます。"
    },
    footer: {
      product: "製品",
      features: "機能",
      templates: "テンプレート",
      howItWorks: "使い方",
      company: "会社",
      about: "ALResについて",
      contact: "お問い合わせ",
      privacy: "プライバシーポリシー",
      connect: "リンク",
      madeWith: "心を込めて",
      forSeekers: "すべての求職者のために",
      allRights: "All rights reserved.",
      selectLanguage: "言語を選択"
    },
    dashboard: {
      title: "ALResへようこそ",
      subtitle: "プロフェッショナルな履歴書を管理し、キャリアの進捗を確認しましょう。",
      newResume: "履歴書を新規作成",
      myResumes: "マイ履歴書",
      lastUpdated: "最終更新日",
      deleteConfirm: "この履歴書を削除してもよろしいですか？",
      noResumes: "履歴書が見つかりません。最初の1通を作成しましょう！",
      searchPlaceholder: "履歴書を検索...",
      noResumes: "履歴書が見つかりません。最初の1通を作成しましょう！",
      searchPlaceholder: "履歴書を検索..."
    },
    resume: {
      experience: "職歴",
      education: "学歴",
      skills: "スキル",
      projects: "プロジェクト",
      certifications: "資格",
      languages: "言語",
      summary: "自己PR"
    },
    editor: {
      personalInfo: "基本情報",
      resumeTitle: "履歴書のタイトル / 職種",
      fullName: "氏名",
      email: "メールアドレス",
      phone: "電話番号",
      location: "所在地",
      linkedIn: "LinkedIn URL",
      profilePhoto: "プロフィール写真",
      showInResume: "履歴書に表示する",
      uploadPhoto: "写真をアップロード",
      changePhoto: "写真を変更",
      workExperience: "職歴",
      education: "学歴",
      skills: "スキル・能力",
      summary: "自己PR",
      addEntry: "項目を追加",
      company: "会社名",
      position: "役職",
      startDate: "開始日",
      endDate: "終了日",
      description: "職務内容",
      institution: "学校・機関名",
      degree: "学位",
      fieldOfStudy: "学部・専攻",
      skillPlaceholder: "スキルを追加 (例: React, プロジェクト管理)",
      grammar: "校正"
    },
    hero: {
      sparkle: "理想の仕事を手に入れる最も簡単な方法",
      title1: "数分で",
      titleAccent: "プロフェッショナルな履歴書",
      title2: "を作成",
      subtitle: "採用につながる、目を引く履歴書を作成しましょう。デザインスキルは不要。あなたの経歴を簡潔に、速く、効果的に伝える方法です。",
      buildBtn: "履歴書を作成する",
      freeLabel: "100% 無料で利用可能"
    },
    features: {
      title: "就職を成功させるためのすべて",
      subtitle: "履歴書作成を簡単かつ効果的にするために設計された強力な機能。",
      easyTitle: "使いやすいビルダー",
      easyDesc: "直感的でストレスのないインターフェース。書式設定は任せて、あなたの経験に集中しましょう。",
      profTitle: "プロ仕様のテンプレート",
      profDesc: "現代的で標準的なデザインで採用担当者の注目を集めましょう。成功のためにテスト済みです。",
      downTitle: "即時PDFダウンロード",
      downDesc: "ワンクリックで洗練された履歴書を書き出し。ウォーターマークなし、待ち時間なし、ATS対応保証。",
      fastTitle: "高速インターフェース",
      fastDesc: "最新のウェブ標準で構築されたスムーズで高速な体験。すべてのデバイスで完璧に動作します。"
    },
    values: {
      title: "求職者に ALRes が選ばれる理由",
      subtitle: "学生が、学生や求職者のために設計しました。",
      freeTitle: "100% 無料",
      freeDesc: "プレミアム機能を無料で。すべての機能に永久に無料でアクセスできます。",
      noSkillsTitle: "スキル不要",
      noSkillsDesc: "デザインの知識は不要。システムが自動で完璧な仕上がりを保証します。",
      savesTimeTitle: "時間を節約",
      savesTimeDesc: "何時間もかけずに、わずか数分でプロフェッショナルな履歴書が完成します。",
      smoothTitle: "スムーズな動作",
      smoothDesc: "低スペックのデバイスや遅い回線でも快適に動作するよう最適化されています。"
    },
    builder: {
      content: "内容",
      design: "デザイン",
      settings: "設定",
      save: "保存",
      saving: "保存中...",
      saved: "保存済み",
      preview: "プレビュー",
      edit: "編集",
      download: "ダウンロード",
      addSection: "セクションを追加",
      personalInfo: "基本情報",
      experience: "職歴",
      education: "学歴",
      skills: "スキル",
      other: "その他"
    }
  },
  zh: {
    nav: {
      dashboard: "控制面板",
      logout: "退出登录",
      login: "登录",
      back: "返回",
      confirmLogout: "确认退出",
      signIn: "登录"
    },
    auth: {
      modalTitle: "登录 ALRes",
      googleLogin: "使用 Google 继续",
      localMode: "使用本地工作区",
      localModeDesc: "在本地构建简历，无需账号。您的数据将保留在此设备上。"
    },
    footer: {
      product: "产品",
      features: "功能",
      templates: "模板",
      howItWorks: "工作原理",
      company: "公司",
      about: "关于我们",
      contact: "联系我们",
      privacy: "隐私政策",
      connect: "社交媒体",
      madeWith: "精心制作",
      forSeekers: "助力全球求职者",
      allRights: "版权所有。",
      selectLanguage: "选择语言"
    },
    dashboard: {
      title: "欢迎使用 ALRes",
      subtitle: "管理你的专业简历并跟踪你的职业进展。",
      newResume: "创建新简历",
      myResumes: "我的简历",
      lastUpdated: "最后更新",
      deleteConfirm: "你确定要删除这份简历吗？",
      noResumes: "未发现简历。让我们开始制作你的第一份简历吧！",
      searchPlaceholder: "搜索简历...",
      noResumes: "未发现简历。让我们开始制作你的第一份简历吧！",
      searchPlaceholder: "搜索简历..."
    },
    resume: {
      experience: "工作经验",
      education: "教育背景",
      skills: "专业技能",
      projects: "项目经验",
      certifications: "资格证书",
      languages: "语言能力",
      summary: "职业总结"
    },
    editor: {
      personalInfo: "个人信息",
      resumeTitle: "简历标题 / 专业角色",
      fullName: "全名",
      email: "电子邮箱",
      phone: "电话号码",
      location: "所在地区",
      linkedIn: "LinkedIn 链接",
      profilePhoto: "个人照片",
      showInResume: "在简历中显示",
      uploadPhoto: "上传照片",
      changePhoto: "更换照片",
      workExperience: "工作经验",
      education: "教育背景",
      skills: "技能特色",
      summary: "职业总结",
      addEntry: "添加条目",
      company: "公司名称",
      position: "担任职位",
      startDate: "开始日期",
      endDate: "结束日期",
      description: "工作内容/职责",
      institution: "就读院校",
      degree: "获得学位",
      fieldOfStudy: "所学专业",
      skillPlaceholder: "添加技能 (如：React, 项目管理)",
      grammar: "语法检查"
    },
    hero: {
      sparkle: "开启梦寐以求职业生涯的最简便方式",
      title1: "几分钟内",
      titleAccent: "打造专业简历",
      title2: "",
      subtitle: "创建一份能让你脱颖而出的简历，成功获得录用。无需设计技能——只需简单、快速且有效的方式展示你的历程。",
      buildBtn: "开始制作",
      freeLabel: "100% 免费使用"
    },
    features: {
      title: "助你成功就业的一切所需",
      subtitle: "强大的功能旨在使你的简历创建过程毫不费力且卓有成效。",
      easyTitle: "易于使用的生成器",
      easyDesc: "直截了当、无压力的界面，全程引导。专注于你的故事，排版交给我们。",
      profTitle: "专业模板",
      profDesc: "采用现代、行业标准的、针对成功经过严格测试的设计，在招聘人员面前脱颖而出。",
      downTitle: "即时 PDF 下载",
      downDesc: "一键导出精美的简历——无水印，无需等待，保证符合 ATS 标准。",
      fastTitle: "快速界面",
      fastDesc: "基于现代 Web 标准构建的流畅快速体验。在所有设备上完美运行。"
    },
    values: {
      title: "为什么求职者喜爱 ALRes",
      subtitle: "由学生设计，服务于学生和求职者。",
      freeTitle: "100% 免费",
      freeDesc: "无价格标签的优质功能。永久免费获得完整访问权限。",
      noSkillsTitle: "无需技能",
      noSkillsDesc: "我们承担繁重的工作，让你的简历在没有设计努力的情况下每次都看起来完美。",
      savesTimeTitle: "节省时间",
      savesTimeDesc: "在几分钟内而非几小时内从空白页变为完整、令人印象深刻的简历。",
      smoothTitle: "流畅性能",
      smoothDesc: "经过优化，即使在低端设备或慢速连接上也能完美、极速运行。"
    },
    builder: {
      content: "内容",
      design: "设计",
      settings: "设置",
      save: "保存",
      saving: "保存中...",
      saved: "已保存",
      preview: "预览",
      edit: "编辑",
      download: "下载",
      addSection: "添加板块",
      personalInfo: "个人信息",
      experience: "工作经验",
      education: "教育背景",
      skills: "技能特色",
      other: "其他板块"
    }
  },
  ar: {
    nav: {
      dashboard: "لوحة التحكم",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      back: "عودة",
      confirmLogout: "تأكيد تسجيل الخروج",
      signIn: "تسجيل الدخول"
    },
    auth: {
      modalTitle: "تسجيل الدخول إلى ALRes",
      googleLogin: "المتابعة باستخدام Google",
      localMode: "استخدام مساحة العمل المحلية",
      localModeDesc: "قم بإنشاء سير ذاتية محلياً بدون حساب. تبقى بياناتك على هذا الجهاز."
    },
    footer: {
      product: "المنتج",
      features: "المميزات",
      templates: "القوالب",
      howItWorks: "كيف يعمل",
      company: "الشركة",
      about: "حول",
      contact: "اتصل بنا",
      privacy: "سياسة الخصوصية",
      connect: "تواصل معنا",
      madeWith: "صنع بـ",
      forSeekers: "للباحثين عن عمل في كل مكان",
      allRights: "جميع الحقوق محفوظة.",
      selectLanguage: "اختر اللغة"
    },
    dashboard: {
      title: "مرحباً بك في ALRes",
      subtitle: "قم بإدارة سيرك الذاتية المهنية وتتبع تقدمك الوظيفي.",
      newResume: "إنشاء سيرة ذاتية جديدة",
      myResumes: "سيري الذاتية",
      lastUpdated: "آخر تحديث",
      deleteConfirm: "هل أنت متأكد أنك تريد حذف هذه السيرة الذاتية؟",
      noResumes: "لم يتم العثور على سير ذاتية. لنقم بإنشاء سيرتك الأولى!",
      searchPlaceholder: "البحث في السير الذاتية...",
      noResumes: "لم يتم العثور على سير ذاتية. لنقم بإنشاء سيرتك الأولى!",
      searchPlaceholder: "البحث في السير الذاتية..."
    },
    resume: {
      experience: "الخبرة العمليّة",
      education: "التعليم",
      skills: "المهارات",
      projects: "المشاريع",
      certifications: "الشهادات",
      languages: "اللغات",
      summary: "الملخص المهني"
    },
    editor: {
      personalInfo: "المعلومات الشخصية",
      resumeTitle: "عنوان السيرة الذاتية / الدور المهني",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      location: "الموقع",
      linkedIn: "رابط LinkedIn",
      profilePhoto: "الصورة الشخصية",
      showInResume: "عرض في السيرة الذاتية",
      uploadPhoto: "رفع صورة",
      changePhoto: "تغيير الصورة",
      workExperience: "الخبرة العملية",
      education: "التعليم",
      skills: "المهارات والكفاءات",
      summary: "الملخص المهني",
      addEntry: "إضافة بند",
      company: "الشركة",
      position: "المنصب",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      description: "الوصف",
      institution: "المؤسسة التعليمية",
      degree: "الدرجة العلمية",
      fieldOfStudy: "مجال الدراسة",
      skillPlaceholder: "أضف مهارة (مثال: React، إدارة المشاريع)",
      grammar: "تدقيق لغوي"
    },
    hero: {
      sparkle: "أسهل طريقة للحصول على وظيفة أحلامك",
      title1: "برز",
      titleAccent: "سيرتك الذاتية المهنية",
      title2: "في دقائق",
      subtitle: "أنشئ سيرة ذاتية مميزة تساعدك في التوظيف. لا حاجة لمهارات تصميم - مجرد طريقة بسيطة وسريعة وفعالة لعرض رحلتك.",
      buildBtn: "أنشئ سيرتك الذاتية",
      freeLabel: "مجاني 100٪ للاستخدام"
    },
    features: {
      title: "كل ما تحتاجه للحصول على الوظيفة",
      subtitle: "مميزات قوية مصممة لجعل عملية إنشاء سيرتك الذاتية سهلة وفعالة.",
      easyTitle: "منشئ سهل الاستخدام",
      easyDesc: "واجهة سهلة وخالية من التوتر ترشدك في كل خطوة. ركز على قصتك بينما نتولى نحن التنسيق.",
      profTitle: "قوالب احترافية",
      profDesc: "تميز أمام مسؤولي التوظيف بتصاميم حديثة ومعيارية تم اختبارها بدقة لضمان النجاح.",
      downTitle: "تحميل PDF فوري",
      downDesc: "قم بتصدير سيرتك الذاتية المصقولة والجاهزة للعمل بنقرة واحدة - بدون علامات مائية، بدون انتظار، متوافقة مع أنظمة ATS.",
      fastTitle: "واجهة سريعة",
      fastDesc: "تجربة سلسة وسريعة للغاية مبنية وفق معايير الويب الحديثة. تعمل بشكل مثالي على جميع أجهزتك."
    },
    values: {
      title: "لماذا يحب الباحثون عن عمل ALRes",
      subtitle: "صممه طلاب للطلاب والباحثين عن عمل.",
      freeTitle: "مجاني 100٪",
      freeDesc: "مميزات متميزة بدون مقابل. احصل على وصول كامل مجاناً للأبد.",
      noSkillsTitle: "لا حاجة لمهارات",
      noSkillsDesc: "نحن نقوم بالعمل الشاق حتى تبدو سيرتك الذاتية مثالية في كل مرة بدون مجهود في التصميم.",
      savesTimeTitle: "يوفر الوقت",
      savesTimeDesc: "انتقل من صفحة بيضاء إلى سيرة ذاتية كاملة ومبهرة في دقائق بدلاً من ساعات.",
      smoothTitle: "أداء سلس",
      smoothDesc: "محسن ليعمل بشكل مثالي وبرق، حتى على الأجهزة الضعيفة أو الاتصالات البطيئة."
    },
    builder: {
      content: "المحتوى",
      design: "التصميم",
      settings: "الإعدادات",
      save: "حفظ",
      saving: "جاري الحفظ...",
      saved: "تم الحفظ",
      preview: "معاينة",
      edit: "تعديل",
      download: "تحميل",
      addSection: "إضافة قسم",
      personalInfo: "المعلومات الشخصية",
      experience: "الخبرة",
      education: "التعليم",
      skills: "المهارات",
      other: "أخرى"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('alres_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('alres_lang', language);
    
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey]) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
