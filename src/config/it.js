// =========================================================================
// KONFIGURASI PORTOFOLIO IT  (halaman /it)
// =========================================================================
// PROFIL, TEKS, dan LAYANAN bersifat statis -> edit langsung di file ini.
//
// PROJECTS, SKILLS, EXPERIENCE diambil dari Google Sheets supaya bisa diedit
// dari HP tanpa menyentuh kode.
//
// Cara pakai Sheets:
// 1. Buat 1 Google Spreadsheet dengan 3 sheet/tab: "projects", "skills", "experience"
// 2. File -> Share -> Publish to web -> pilih tiap sheet -> format CSV -> Publish
// 3. Copy link CSV masing-masing tab, tempel di `sheets` di bawah ini.
//
// Struktur kolom setiap tab:
//
// [projects] (1 baris = 1 project)
//   title | description | category | tags | image | demoLink | codeLink
//   tags dipisah koma, contoh: Flutter, Node.js, Firebase
//   image boleh path lokal (./assets/foto.png), link online, atau link Google Drive
//   demoLink / codeLink isi "#" kalau tidak ada
//
// [skills] (1 baris = 1 skill)
//   group | name | level
//   group diisi salah satu: frontend / backend / tools / database
//   level diisi persen, contoh: 85%
//
// [experience] (1 baris = 1 pengalaman kerja)
//   year | role | company | desc
//
// Kalau Sheets gagal diambil, situs memakai data `fallback` di bawah supaya tampilan tetap utuh.
// =========================================================================
import {
  FaCode, FaMobileScreenButton, FaDisplay, FaServer, FaScrewdriverWrench, FaDatabase,
  FaGlobe, FaStore, FaPlug, FaComments, FaPenRuler, FaRocket, FaLocationDot, FaGraduationCap,
  FaGuitar,
} from 'react-icons/fa6'
import {
  SiReact, SiFlutter, SiNodedotjs, SiTailwindcss, SiFirebase, SiMongodb, SiPostgresql, SiMysql,
  SiDocker, SiGit, SiFigma, SiJavascript, SiTypescript, SiExpress, SiGooglegemini, SiVercel,
  SiNetlify, SiNextdotjs,
} from 'react-icons/si'
import { SITE, SOCIALS } from './site.js'
import { parseSkills } from '../lib/sheets.js'

const SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0Fg3mDCzh3CVbJtG_xDKFrdq3i7o4bu201lfzPY4eA7VZDjLLQOjySRGEEAMmJQcbPJVUgFfqLkvS/pub'

const SKILL_GROUPS = ['frontend', 'backend', 'tools', 'database']

export default {
  key: 'it',
  theme: 'it',
  path: '/it',
  seo: {
    title: 'Portofolio IT — Rafi Akbar Muzaki',
    description:
      'Portofolio software & mobile development Rafi Akbar Muzaki: website, aplikasi Flutter, dan sistem untuk bisnis kecil.',
  },

  profile: {
    name: SITE.name,
    roles: ['Fullstack Developer', 'Software Engineer', 'Web Developer', 'Application Developer', 'Data Science Enthusiast'],
    rolePrefix: 'Seorang',
    // Salinan WebP ringan (107 KB) dari pp.png untuk hero dan bagian tentang. File aslinya tetap ada.
    photo: './assets/pp.webp',
    photoPosition: '50% 22%',
    about:
      'Saya adalah seorang Mahasiswa Teknik Informatika yang fokus pada pembuatan aplikasi, web modern berkinerja tinggi, dan data science. Berpengalaman merancang website e-commerce, aplikasi mobile, dan aplikasi data science.',
  },

  hero: {
    badge: 'AKTIF & SIAP BERKOLABORASI',
    primary: { label: 'Lihat Portofolio', href: '#projects' },
    secondary: { label: 'Mulai Diskusi', href: '#contact' },
    orbit: [
      [SiReact, SiFlutter, SiNodedotjs],
      [SiFirebase, SiMongodb, SiTailwindcss],
    ],
    chipTop: 'Terbuka untuk proyek baru',
    chipBottom: { count: true, label: 'proyek selesai' },
    collabLabel: 'Pernah berkolaborasi dengan',
    collabs: ['Gen Z Preneur', 'Vokasi Universitas Indonesia', 'Rumah Quran Salsabila', 'GuideBloc'],
  },

  marquee: [
    { icon: SiFlutter, label: 'Flutter' },
    { icon: SiReact, label: 'React' },
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiNodedotjs, label: 'Node.js' },
    { icon: SiExpress, label: 'Express' },
    { icon: SiJavascript, label: 'JavaScript' },
    { icon: SiTypescript, label: 'TypeScript' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiFirebase, label: 'Firebase' },
    { icon: SiMongodb, label: 'MongoDB' },
    { icon: SiPostgresql, label: 'PostgreSQL' },
    { icon: SiMysql, label: 'MySQL' },
    { icon: SiDocker, label: 'Docker' },
    { icon: SiGit, label: 'Git' },
    { icon: SiFigma, label: 'Figma' },
    { icon: SiGooglegemini, label: 'Gemini API' },
    { icon: SiVercel, label: 'Vercel' },
    { icon: SiNetlify, label: 'Netlify' },
  ],

  // `fromItems: true` -> angkanya otomatis jumlah proyek di Sheets
  stats: [
    { value: 1, suffix: '+', label: 'Tahun Pengalaman (Projek Kampus)' },
    { fromItems: true, suffix: '+', label: 'Proyek Selesai' },
    { value: 100, suffix: '%', label: 'Berhasil', highlight: true },
    { text: '24/7', label: 'Komunikasi Cepat' },
  ],

  about: {
    kicker: 'Tentang Saya',
    title: 'Menghubungkan Ide Kreatif dengan Kode yang Tangguh',
    mission: { label: 'Misi Utama', text: 'Membuat kode yang efisien, responsif, dan bernilai bisnis tinggi.' },
    features: [
      {
        icon: FaCode,
        tone: 'accent',
        title: 'Arsitektur Kode yang Bersih',
        text: 'Saya selalu menulis logika yang modular dan rapi agar mudah dipelihara dan dikembangkan.',
      },
      {
        icon: FaMobileScreenButton,
        tone: 'brand2',
        title: 'Desain Responsif Total',
        text: 'Setiap project dioptimalkan agar berjalan tanpa kendala di layar smartphone maupun layar desktop.',
      },
    ],
    facts: [
      { icon: FaLocationDot, label: 'Lokasi', value: SITE.location },
      { icon: FaGraduationCap, label: 'Latar belakang', value: 'Mahasiswa Teknik Informatika' },
    ],
  },

  showcase: {
    id: 'projects',
    kicker: 'Portofolio Kerja',
    title: 'Koleksi Proyek Terbaru',
    filters: ['Website', 'App'],
    demoLabel: 'Buka Demo',
    codeLabel: 'Source Code',
    privateLabel: 'Demo tidak dipublikasikan',
    inviteLabel: 'Buat proyek serupa',
  },

  skills: {
    id: 'skills',
    kicker: 'Daftar Keahlian',
    title: 'Teknologi yang Saya Kuasai',
    subtitle: 'Kombinasi stack teknologi yang mendasari kesuksesan implementasi proyek-proyek di atas.',
    groups: [
      { key: 'frontend', label: 'Frontend', icon: FaDisplay, tone: 'accent' },
      { key: 'backend', label: 'Backend', icon: FaServer, tone: 'brand2' },
      { key: 'tools', label: 'Tools', icon: FaScrewdriverWrench, tone: 'brand3' },
      { key: 'database', label: 'Database', icon: FaDatabase, tone: 'violet' },
    ],
  },

  // Teks layanan & alur kerja ini draf — silakan ubah sesuai yang benar-benar Anda tawarkan.
  services: {
    id: 'services',
    kicker: 'Layanan',
    title: 'Yang Bisa Saya Bantu Wujudkan',
    subtitle: 'Dari ide sampai rilis. Pilih kebutuhan Anda, lalu ceritakan detailnya.',
    cta: 'Diskusikan',
    items: [
      {
        icon: FaGlobe,
        tone: 'accent',
        need: 'Website',
        title: 'Website & Landing Page',
        text: 'Company profile, katalog, hingga toko online yang cepat dan nyaman dibuka di HP maupun laptop.',
        examples: 'Rumah Quran Salsabila, Swarabuana, Cemilkuy',
      },
      {
        icon: FaMobileScreenButton,
        tone: 'brand2',
        need: 'Aplikasi Mobile',
        title: 'Aplikasi Mobile',
        text: 'Aplikasi lintas platform dengan Flutter: tampilan modern, performa mulus, terhubung ke backend dan database.',
        examples: 'Nusa, SmartPOS',
      },
      {
        icon: FaStore,
        tone: 'brand3',
        need: 'Sistem UMKM',
        title: 'Sistem untuk UMKM',
        text: 'Kasir (POS), inventori, hingga dashboard penjualan agar usaha lebih rapi dan terpantau.',
        examples: 'SmartPOS, Kontrakan Damai',
      },
      {
        icon: FaPlug,
        tone: 'violet',
        need: 'Integrasi API',
        title: 'Integrasi Pembayaran & AI',
        text: 'Sambungkan payment gateway dan fitur AI ke produk Anda agar prosesnya otomatis.',
        examples: 'Cemilkuy (Midtrans), Nusa (Gemini API)',
      },
    ],
  },

  process: {
    id: 'process',
    kicker: 'Cara Kerja',
    title: 'Alur Kerja yang Jelas',
    steps: [
      { icon: FaComments, title: 'Diskusi Kebutuhan', text: 'Kita bahas tujuan, target pengguna, dan fitur yang paling penting lebih dulu.' },
      { icon: FaPenRuler, title: 'Desain & Rencana', text: 'Gambaran tampilan dan alur disepakati sebelum kode ditulis, supaya tidak ada kejutan.' },
      { icon: FaCode, title: 'Pengembangan', text: 'Dikerjakan bertahap, sehingga Anda bisa memberi masukan di tengah jalan.' },
      { icon: FaRocket, title: 'Rilis & Pendampingan', text: 'Setelah diluncurkan, saya bantu perbaikan dan penyesuaian yang dibutuhkan.' },
    ],
  },

  experience: { id: 'experience', kicker: 'Riwayat Karier', title: 'Pengalaman Profesional' },

  contact: {
    id: 'contact',
    kicker: 'Mari Berkolaborasi',
    title: 'Punya ide proyek? Ceritakan, saya bantu wujudkan.',
    text: 'Jelaskan kebutuhan Anda secara singkat. Saya akan membalas secepatnya untuk diskusi lebih lanjut.',
    needs: ['Website', 'Aplikasi Mobile', 'Sistem UMKM', 'Integrasi API', 'Lainnya'],
    placeholder: 'Contoh: Saya punya toko online kecil dan ingin dibuatkan website dengan pembayaran otomatis…',
    subjectPrefix: 'Diskusi Proyek',
    status: 'Terbuka untuk proyek baru',
  },

  floatingCta: 'Ada proyek? Ngobrol yuk',
  socials: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram],
  nav: [
    { id: 'about', label: 'Tentang' },
    { id: 'projects', label: 'Proyek' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'services', label: 'Layanan' },
    { id: 'experience', label: 'Pengalaman' },
  ],
  switchTo: { label: 'Porto Musik', to: '/musik', icon: FaGuitar },

  sheets: {
    items: `${SHEET}?gid=835850960&single=true&output=csv`,
    skills: `${SHEET}?gid=1023249906&single=true&output=csv`,
    experience: `${SHEET}?gid=1003186179&single=true&output=csv`,
  },
  parseSkills: parseSkills(SKILL_GROUPS),

  // Salinan isi Sheets saat ini — dipakai kalau Sheets tidak bisa diakses.
  fallback: {
    items: [
      {
        id: 1,
        title: 'Cemilkuy',
        description:
          'Platform e-commerce kuliner modern khusus pemesanan jajanan & cemilan nusantara dengan sistem checkout cerdas dan integrasi pembayaran instan Midtrans.',
        category: 'Website & App',
        tags: ['HTML', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Midtrans Payment API'],
        image: './assets/Screenshot (45).png',
        demoLink: 'https://cemilkuy.netlify.app/',
        codeLink: 'https://github.com/rafiakbarmuzaki/Cemilkuy-Web',
      },
      {
        id: 2,
        title: 'Nusa',
        description:
          'Aplikasi nutrisi & kesehatan berbasis AI untuk analisis kebutuhan gizi personal dan rekomendasi menu seimbang.',
        category: 'App',
        tags: ['Flutter', 'Node.js', 'SQL', 'Tailwind CSS', 'Gemini API'],
        image: './assets/nusa.jpeg',
        demoLink: '',
        codeLink: 'https://github.com/rafiakbarmuzaki/NUSA-APP',
      },
      {
        id: 3,
        title: 'SmartPOS',
        description:
          'Sistem Manajemen Kasir (Point of Sale) berbasis Cloud untuk UMKM dengan fitur manajemen inventaris, analytics penjualan real-time, dan struk digital.',
        category: 'Mobile App',
        tags: ['Flutter', 'Node.js', 'Firebase', 'Gemini API', 'Tailwind CSS'],
        image: './assets/smartpos.jpeg',
        demoLink: '',
        codeLink: 'https://github.com/rafiakbarmuzaki/Smartpos',
      },
      {
        id: 4,
        title: 'Swarabuana Band Website',
        description:
          'Website profil band interaktif bernuansa estetik dengan katalog musik, galeri kegiatan band, serta pemesanan jadwal manggung real-time.',
        category: 'Website',
        tags: ['HTML', 'Tailwind CSS'],
        image: './assets/swarabuana.png',
        demoLink: 'https://rafiakbarmuzaki.github.io/Swarabuana-Web/',
        codeLink: 'https://github.com/rafiakbarmuzaki/Swarabuana-Web',
      },
      {
        id: 5,
        title: 'Rumah Quran Salsabila Web',
        description:
          'Website informasi dan promosi untuk rumah quran salsabila dengan katalog kegiatan, galeri, serta pendaftaran santri baru.',
        category: 'Website',
        tags: ['HTML', 'Tailwind', 'CSS', 'JavaScript', 'Google Spreadsheet'],
        image: './assets/logo.png',
        demoLink: 'https://rumah-quran-salsabila.vercel.app/',
        codeLink: 'https://github.com/rafiakbarmuzaki/Rumah-Qur-an-Salsabila',
      },
      {
        id: 6,
        title: 'Kontrakan Damai',
        description: 'Website untuk mengelolan sistem kontrakan secara realtime',
        category: 'Website',
        tags: ['JavaScript', 'MongoDB'],
        image: 'https://lh3.googleusercontent.com/d/14FcKPUdgUz2a60rkV8ZxYufN3ulNj4PW',
        demoLink: '',
        codeLink: '',
      },
    ],
    skills: {
      frontend: [
        { name: 'React.js / Next.js', level: 92 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'JavaScript / TypeScript', level: 88 },
        { name: 'HTML5 & CSS3 Layouts', level: 95 },
        { name: 'Flutter', level: 90 },
      ],
      backend: [
        { name: 'Node.js', level: 50 },
        { name: 'RESTful API & GraphQL', level: 50 },
      ],
      tools: [
        { name: 'VS Code', level: 95 },
        { name: 'Figma (UI/UX Design)', level: 85 },
        { name: 'Docker & Vercel/Netlify', level: 78 },
        { name: 'AI Agent', level: 95 },
        { name: 'Git/GitHub', level: 95 },
      ],
      database: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 70 },
        { name: 'MongoDB', level: 80 },
      ],
    },
    experience: [
      {
        year: '2025',
        role: 'Web Developer',
        company: 'Gen Z Preneur',
        desc: 'Mengembangan Website dan Aplikasi E-Commerse dan mengintegrasikan berbagai API pembayaran.',
      },
      {
        year: '2026',
        role: 'Frontend Engineer (App)',
        company: 'Ignite Future Fest 2026',
        desc: 'Berperan dalam membangun aplikasi Nusa untuk dilombakan di Ignite Future Fest',
      },
      {
        year: '2026',
        role: 'Fullstack Developer',
        company: 'Rumah Quran Salsabila',
        desc: 'Membuat website landing page untuk kebutuhan informasi pendaftaran santri, Jadwal live, dan lain lain',
      },
      {
        year: '2026',
        role: 'Project Lead Developer',
        company: 'GuideBloc.',
        desc: 'Menjadi kepala project pengembangan GuideBloc.com',
      },
      {
        year: '2026',
        role: 'App Developer',
        company: 'Vokasi Universitas Indonesia',
        desc: 'Membuat aplikasi stock opname untuk kebutuhan Fakultas Vokasi UI',
      },
    ],
  },
}
