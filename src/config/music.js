// =========================================================================
// KONFIGURASI PORTOFOLIO MUSIK  (halaman /musik)
// =========================================================================
// Sistemnya sama dengan config/it.js. GEAR, SKILLS, PENGALAMAN diambil dari
// Google Sheets (bisa spreadsheet yang sama dengan porto IT, tinggal tambah 3 tab).
// File -> Share -> Publish to web -> pilih tiap tab -> format CSV -> Publish,
// lalu tempel link-nya di `sheets` di bawah.
//
// Struktur kolom setiap tab:
//
// [gear] (1 baris = 1 alat / preset)
//   title | description | category | tags | image | demoLink | codeLink
//   (kolom sama seperti tab "projects" di porto IT — category dipakai untuk filter,
//    contoh: Gitar, Ampli, Efek, Preset. demoLink / codeLink tidak dipakai di halaman ini)
//
// [musikskills] (1 baris = 1 skill)
//   group | name | level
//   group diisi salah satu: teknik / genre / tone
//   level diisi persen, contoh: 85%
//
// [pengalaman] (1 baris = 1 pengalaman manggung/musik)
//   year | role | company | desc
//   (role = judul acara/peran, company = nama venue/band)
// =========================================================================
import {
  FaGuitar, FaMusic, FaCompactDisc, FaBolt, FaSliders, FaWaveSquare, FaHandSparkles, FaRecordVinyl,
  FaHeartPulse, FaLocationDot, FaChalkboardUser, FaMicrophoneLines, FaCode,
} from 'react-icons/fa6'
import { SITE, SOCIALS } from './site.js'
import { parseSkills } from '../lib/sheets.js'

const SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0Fg3mDCzh3CVbJtG_xDKFrdq3i7o4bu201lfzPY4eA7VZDjLLQOjySRGEEAMmJQcbPJVUgFfqLkvS/pub'

const SKILL_GROUPS = ['teknik', 'genre', 'tone']

export default {
  key: 'music',
  theme: 'music',
  path: '/musik',
  seo: {
    title: 'Portofolio Musik — Rafi Akbar Muzaki',
    description:
      'Portofolio musik Rafi Akbar Muzaki: gitaris rock & pop rock, gear dan preset tone, pengalaman panggung, serta les gitar privat.',
  },

  profile: {
    name: SITE.name,
    roles: ['Gitaris', 'Lead Guitarist', 'Session Player', 'Rhythm & Lead', 'Tone Designer'],
    rolePrefix: 'Seorang',
    // Ganti ke ./assets/pp-musik.png kalau foto khusus musik sudah ditambahkan
    photo: './assets/WhatsApp Image 2026-09-26 at 16.42.19.jpeg',
    photoPosition: '50% 18%',
    about:
      'Selain menulis kode, saya menulis riff. Saya seorang gitaris dengan fokus di lead melodis yang emosional dan tone agresif high-gain. Dipengaruhi kuat oleh rock Indonesia.',
  },

  hero: {
    badge: 'TERBUKA UNTUK BOOKING & KOLABORASI',
    primary: { label: 'Lihat Gear & Preset', href: '#gear' },
    secondary: { label: 'Booking / Kolaborasi', href: '#contact' },
    orbit: [
      [FaGuitar, FaMusic, FaCompactDisc],
      [FaWaveSquare, FaBolt, FaSliders],
    ],
    chipTop: 'Terbuka untuk booking',
    chipBottom: { text: 'Rock · Pop Rock · Lead' },
    collabLabel: 'Pernah tampil bersama',
    collabs: ['Swarabuana', 'Melodious'],
  },

  marquee: [
    { icon: FaGuitar, label: 'Rock' },
    { icon: FaMusic, label: 'Pop Rock' },
    { icon: FaCompactDisc, label: 'Pop' },
    { icon: FaHeartPulse, label: 'Melodic Lead' },
    { icon: FaBolt, label: 'Rhythm Rock' },
    { icon: FaHandSparkles, label: 'Improvisasi Solo' },
    { icon: FaSliders, label: 'Amp Modeling' },
    { icon: FaWaveSquare, label: 'High-Gain Tone' },
    { icon: FaRecordVinyl, label: 'Preset Building' },
    { icon: FaGuitar, label: 'Ibanez RG450' },
    { icon: FaSliders, label: 'Audota AME-200 PRO' },
  ],

  about: {
    kicker: 'Tentang Saya',
    title: 'Dua Kutub Tone: Emosional dan Galak',
    mission: { label: 'Misi Utama', text: 'Bikin lead yang menyayat, bukan sekadar deretan nada cepat.' },
    features: [
      {
        icon: FaHeartPulse,
        tone: 'accent',
        title: 'Lead Melodis & Emosional',
        text: 'Fokus pada frase yang terasa seperti curhatan.',
      },
      {
        icon: FaBolt,
        tone: 'brand2',
        title: 'Tone Agresif High-Gain',
        text: 'Berbasis model amp High Gain — dipakai untuk riff dan solo yang butuh karakter lebih garang.',
      },
    ],
    facts: [
      { icon: FaLocationDot, label: 'Lokasi', value: SITE.location },
      { icon: FaGuitar, label: 'Band saat ini', value: 'Gitaris Swarabuana' },
      { icon: FaChalkboardUser, label: 'Mengajar', value: 'Les gitar privat · Online / Offline' },
    ],
  },

  showcase: {
    id: 'gear',
    kicker: 'Rig Saya',
    title: 'Gear & Preset',
    filters: ['Gitar', 'Ampli', 'Efek', 'Preset'],
  },

  skills: {
    id: 'skills',
    kicker: 'Daftar Skill',
    title: 'Kemampuan Bermain',
    subtitle: 'Kombinasi teknik, genre, dan tone yang mendasari permainan gitar saya.',
    groups: [
      { key: 'teknik', label: 'Teknik', icon: FaHandSparkles, tone: 'accent' },
      { key: 'genre', label: 'Genre', icon: FaRecordVinyl, tone: 'brand2' },
      { key: 'tone', label: 'Tone', icon: FaSliders, tone: 'brand3' },
    ],
  },

  // Teks layanan ini draf — silakan ubah sesuai yang benar-benar Anda tawarkan.
  services: {
    id: 'services',
    kicker: 'Layanan',
    title: 'Bisa Saya Bantu',
    subtitle: 'Dari panggung, rekaman, sampai belajar gitar. Pilih yang Anda butuhkan.',
    cta: 'Tanyakan',
    items: [
      {
        icon: FaGuitar,
        tone: 'accent',
        need: 'Booking Live',
        title: 'Booking Gitaris (Live & Session)',
        text: 'Lead dan rhythm untuk panggung, acara, atau sesi bersama band Anda.',
        examples: 'Swarabuana, Melodious',
      },
      {
        icon: FaMicrophoneLines,
        tone: 'brand2',
        need: 'Rekaman',
        title: 'Rekaman Gitar',
        text: 'Part gitar untuk lagu Anda — dari rhythm sampai solo — dengan tone yang disesuaikan karakter lagu.',
        examples: 'Audota AME-200 PRO · Ibanez RG450',
      },
      {
        icon: FaChalkboardUser,
        tone: 'brand3',
        need: 'Les Gitar',
        title: 'Les Gitar Privat',
        text: 'Belajar gitar dengan materi yang disesuaikan level dan lagu favorit Anda. Online maupun offline.',
        examples: 'Private · Online / Offline',
      },
      {
        icon: FaSliders,
        tone: 'violet',
        need: 'Preset & Tone',
        title: 'Custom Tone & Preset',
        text: 'Preset amp modeling yang disesuaikan dengan genre dan karakter suara yang Anda cari.',
        examples: 'High-Gain · Lead melodis',
      },
    ],
  },

  experience: { id: 'experience', kicker: 'Riwayat Panggung', title: 'Pengalaman' },

  contact: {
    id: 'contact',
    kicker: 'Booking & Kolaborasi',
    title: 'Butuh gitaris, rekaman, atau mau belajar gitar?',
    text: 'Ceritakan acara atau lagunya. Kita atur jadwal dan konsepnya bersama.',
    needs: ['Booking Live', 'Rekaman', 'Les Gitar', 'Preset & Tone', 'Lainnya'],
    placeholder: 'Contoh: Kami butuh gitaris untuk acara akhir bulan di Jakarta, genre pop rock…',
    subjectPrefix: 'Booking/Kolaborasi Musik',
    status: 'Terbuka untuk booking',
  },

  floatingCta: 'Mau booking? Chat yuk',
  socials: [SOCIALS.instagram],
  nav: [
    { id: 'about', label: 'Tentang' },
    { id: 'gear', label: 'Gear' },
    { id: 'skills', label: 'Skill' },
    { id: 'services', label: 'Layanan' },
    { id: 'experience', label: 'Pengalaman' },
  ],
  switchTo: { label: 'Porto IT', to: '/it', icon: FaCode },

  sheets: {
    items: `${SHEET}?gid=1775816536&single=true&output=csv`,
    skills: `${SHEET}?gid=472655940&single=true&output=csv`,
    experience: `${SHEET}?gid=1374035492&single=true&output=csv`,
  },
  parseSkills: parseSkills(SKILL_GROUPS),

  // Salinan isi Sheets saat ini — dipakai kalau Sheets tidak bisa diakses.
  fallback: {
    items: [
      {
        id: 1,
        title: 'Ibanez RG450',
        description: 'Gitar elektrik utama yang saya pakai untuk semua sesi latihan, rekaman, dan manggung.',
        category: 'Gitar',
        tags: ['Ibanez', 'Elektrik'],
        image: './assets/ibanez.png',
        demoLink: '',
        codeLink: '',
      },
      {
        id: 2,
        title: 'Audota AME-200 PRO',
        description:
          'Multiefek amp modeling yang jadi otak dari semua tone saya — dari lead melodis sampai rhythm high-gain.',
        category: 'Efek & Ampli',
        tags: ['Multiefek', 'Amp Modeling'],
        image: './assets/audota.png',
        demoLink: '',
        codeLink: '',
      },
    ],
    skills: {
      teknik: [
        { name: 'Melodic Lead', level: 85 },
        { name: 'Rhythm Rock', level: 85 },
        { name: 'Improvisasi Solo', level: 85 },
      ],
      genre: [
        { name: 'Rock', level: 95 },
        { name: 'Pop', level: 85 },
        { name: 'Pop Rock', level: 88 },
      ],
      tone: [
        { name: 'Amp Modeling', level: 90 },
        { name: 'Preset Building', level: 88 },
        { name: 'High-Gain Tone Shaping', level: 85 },
      ],
    },
    experience: [
      {
        year: '2026 - Sekarang',
        role: 'Gitaris',
        company: 'Swarabuana',
        desc: 'Tampil bersama Swarabuana — turut membangun identitas digital band lewat situs profil resmi.',
      },
      {
        year: '2025 - Sekarang',
        role: 'Jamming & Latihan Rutin',
        company: 'Komunitas Musik',
        desc: 'Sesi jamming dan latihan rutin bersama komunitas musik rock, memperdalam permainan lead dan rhythm.',
      },
      {
        year: '2024 - Sekarang',
        role: 'Mulai Membangun Tone Pribadi',
        company: 'Personal',
        desc: 'Mulai aktif eksplorasi preset tone pribadi dan permainan lead',
      },
      {
        year: '2022 - 2026',
        role: 'Gitaris',
        company: 'Melodious',
        desc: 'Menjadi bagian dari Melodious band yang dibuat oleh siswa SMA Negeri 70 Jakarta',
      },
      {
        year: '2024 - Sekarang',
        role: 'Instruktur/Guru gitar',
        company: 'Private, Online/Offline',
        desc: 'Menjadi mentor maupun pengajar gitar',
      },
    ],
  },
}
