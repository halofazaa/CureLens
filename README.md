# CureLens 💊🔍

**CureLens** adalah aplikasi berbasis web yang dirancang untuk membantu pengguna menganalisis kemasan obat dan mencocokkannya dengan profil medis pribadi. Aplikasi ini bertujuan meningkatkan kehati-hatian serta pemahaman masyarakat dalam mengonsumsi obat bebas secara mandiri.

---

## ✨ Fitur Utama

- **Pemindaian Kemasan Obat:** Analisis informasi kandungan, dosis, indikasi, dan peringatan pada kemasan obat menggunakan teknologi AI generatif.
- **Penyesuaian Profil Medis:** Pengecekan kesesuaian obat berdasarkan riwayat alergi, kondisi medis, maupun obat lain yang sedang dikonsumsi pengguna.
- **Antarmuka Informatif & Responsif:** Desain bersih dan mudah dipahami untuk meminimalkan risiko kesalahan interpretasi informasi obat.

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Integrasi AI:** Google Generative AI SDK (`@google/genai`)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Instalasi & Cara Menjalankan Lokal

1. **Clone repositori ini**

   ```bash
   git clone [https://github.com/username/curelens.git](https://github.com/username/curelens.git)
   cd curelens
   ```

2. **Instal dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Buat file `.env.local` di direktori utama proyek, lalu tambahkan kunci API Gemini:

   ```env
   GEMINI_API_KEY=masukkan_api_key_anda_di_sini
   ```

4. **Jalankan server pengembangan**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada peramban untuk mengakses aplikasi.

---

## 📂 Struktur Proyek

```text
curelens/
├── src/
│   ├── app/              # Halaman utama & API routes (Next.js App Router)
│   ├── components/       # Komponen antarmuka pengguna (UI)
│   └── lib/              # Konfigurasi SDK AI & fungsi utilitas
├── public/               # Aset statis (ikon, gambar)
├── .env.local            # Variabel lingkungan (tidak di-commit ke Git)
├── package.json          # Daftar dependensi dan skrip proyek
└── README.md             # Dokumentasi proyek
```

---

## 👥 Tim Pengembang (Kelompok 2 - IF 5B)

Proyek ini dikembangkan untuk memenuhi tugas mata kuliah **Manajemen Proyek Perangkat Lunak** (Teknik Informatika - UIN Sunan Gunung Djati Bandung):

| No  | Nama Lengkap                |     NIM      | Peran                          |
| :-: | :-------------------------- | :----------: | :----------------------------- |
|  1  | Faza Adriana Putra          | `1247050067` | Project Manager & Programmer   |
|  2  | Fadhillah Rizqia Arifin     | `1237050056` | System Analyst & Dokumentator  |
|  3  | Ferdinan Mahrus             | `1247050064` | Programmer & Maintenance Staff |
|  4  | Muhammad Al Ghifari Gunawan | `1247050118` | Programmer & Administrator     |
|  5  | Muhammad Amry Musyaffa      | `1247050005` | Designer & Trainer             |
|  6  | Ibnu Rafiq Hariri           | `1247050068` | Designer & Implementator       |
|  7  | Hilmi Zaki Ibrahim          | `1247050072` | Tester                         |

---

## ⚠️ Disclaimer Medis

Informasi yang dihasilkan oleh **CureLens** bersifat edukatif dan informatif semata, serta **bukan merupakan pengganti saran, diagnosis, maupun resep medis profesional**. Selalu konsultasikan kondisi kesehatan dan penggunaan obat Anda dengan dokter atau apoteker.
