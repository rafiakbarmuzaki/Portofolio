// Pemuat halaman. Dipisah supaya bisa di-preload saat kursor menyentuh kartu pilihan di halaman utama.
export const loaders = {
  landing: () => import('./pages/Landing.jsx'),
  it: () => import('./pages/ItPage.jsx'),
  music: () => import('./pages/MusicPage.jsx'),
  notFound: () => import('./pages/NotFound.jsx'),
}
