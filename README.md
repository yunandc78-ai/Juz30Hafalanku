# MurojaahKu - Aplikasi Hafalan Juz 30 Cerdas & Sistem Repetisi 10x

Aplikasi web modern berbasis audio-visual untuk mempermudah menghafal dan memurojaah seluruh surah dalam **Juz 30 (Surah ke-78 An-Naba' hingga Surah ke-114 An-Nas)** dengan metode *spaced repetition* dan *looping audio pintar*.

---

## 🌟 Fitur Utama Sesuai Rancangan

1. **Sistem Repetisi Kustom (1x hingga 10x):**
   - Pemutar audio cerdas yang otomatis mengulang setiap ayat (pilihan: 1x, 3x, 5x, 7x, atau 10x) sebelum berpindah ke ayat berikutnya.
   - Indikator dinamis format `[ 1 / 10 ]` dengan visual progres.
   - Pilihan jeda antar ayat:
     - **0s (Tanpa Jeda)**
     - **2s (Jeda Napas Singkat)**
     - **Echo Mode (Durasi Sepanjang Ayat):** Countdown bar interaktif memberikan waktu bagi pengguna untuk melafalkan ayat menirukan Qari.

2. **Mode Murojaah Blok Ayat:**
   - Opsi menggabungkan 3-5 ayat menjadi satu blok hafalan.
   - Blok diulang hingga 10 kali untuk menguatkan sambungan antar ayat sebelum berlanjut ke blok berikutnya.

3. **Indikator Keberhasilan Hafalan (Visual Tracker):**
   - **Abu-abu (⚪ Belum Dihafal)**
   - **Kuning (🟡 Sedang Proses Murojaah)**
   - **Hijau (🟢 Lancar / Mutqin - telah diulang 10x)**
   - Progres bar keseluruhan Juz 30 dan persentase kelancaran per surah tersimpan otomatis di perangkat (*localStorage*).

4. **Pilihan Qari Internasional:**
   - **Mahmoud Khalil Al-Husary** (Standar Tahsin & Murattal Lambat untuk pemula & tahsin).
   - **Mishary Rashid Alafasy** (Lancar, merdu, tajwid jelas).
   - **Saad Al-Ghamdi** (Khusyuk & tegas).
   - **Abdul Basit Abdul Samad** (Murattal klasik melegenda).

5. **Mode Rekam & Bandingkan:**
   - Fitur rekam suara pengguna menggunakan Web Audio API.
   - Visualisasi gelombang audio (*canvas real-time visualizer*).
   - Pemutar berdampingan untuk mendengarkan lafal sendiri vs lafal Qari guna evaluasi makhraj dan tajwid.

6. **Tes Sambung Ayat (Evaluasi):**
   - Kuis sambung ayat audio & visual interaktif.
   - Skor nilai, predikat kelancaran (*Mumtaz / Jayyid*), dan rekomendasi evaluasi.

7. **Desain Antarmuka Mewah (Islamic Luxury Aesthetic):**
   - Tema gelap *Emerald Midnight* dengan aksen *Radiant Gold* & *Glassmorphism*.
   - Tipografi Al-Qur'an resmi (*Amiri Quran*) yang dapat diatur ukurannya (22px - 48px).
   - Navigasi 3 menu utama (*Bottom Navigation Bar*): **Beranda**, **Murojaah / Evaluasi**, dan **Pengaturan**.

---

## 🚀 Cara Menjalankan

1. **Jalankan Otomatis di Windows:**
   - Klik dua kali file [jalankan_aplikasi.bat](file:///f:/AI%20anti%20gravity/Juz%2030%20hafalan/jalankan_aplikasi.bat).
   - Browser default Anda akan langsung membuka alamat: `http://localhost:8080/`.

2. **Atau Melalui Terminal:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File server.ps1
   ```
   Buka peramban ke [http://localhost:8080/](http://localhost:8080/).
