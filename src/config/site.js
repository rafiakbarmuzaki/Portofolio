// Pengaturan yang dipakai di semua halaman. Edit di sini kalau kontak / sosmed berubah.
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'

export const SITE = {
  url: 'https://rafiakbarmuzaki.my.id',
  name: 'Rafi Akbar Muzaki',
  email: 'rafimuzaki1705@gmail.com',
  location: 'Jakarta, Indonesia',
  // Nomor WhatsApp, format internasional tanpa "+" dan tanpa 0 di depan (contoh: "6281234567890").
  // Kalau diisi, tombol WhatsApp muncul otomatis di hero, form kontak, dan tombol melayang.
  whatsapp: '',
}

export const SOCIALS = {
  github: { label: 'GitHub', href: 'https://github.com/rafiakbarmuzaki', icon: FaGithub },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rafiakbarmuzaki/', icon: FaLinkedinIn },
  instagram: { label: 'Instagram', href: 'https://instagram.com/rafiakbarmuzaki', icon: FaInstagram },
}
