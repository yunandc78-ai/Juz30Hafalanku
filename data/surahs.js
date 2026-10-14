// Metadata 37 Surah di Juz 30 (Surah 78 - 114)
const SURAH_JUZ_30 = [
  { number: 78, name: "النبأ", latin: "An-Naba'", meaning: "Berita Besar", verses: 40, type: "Makkiyyah" },
  { number: 79, name: "النازعات", latin: "An-Nazi'at", meaning: "Malaikat Pencabut", verses: 46, type: "Makkiyyah" },
  { number: 80, name: "عبس", latin: "'Abasa", meaning: "Bermuka Masam", verses: 42, type: "Makkiyyah" },
  { number: 81, name: "التكوير", latin: "At-Takwir", meaning: "Menggulung", verses: 29, type: "Makkiyyah" },
  { number: 82, name: "الانفطار", latin: "Al-Infitar", meaning: "Terbelah", verses: 19, type: "Makkiyyah" },
  { number: 83, name: "المطففين", latin: "Al-Muthaffifin", meaning: "Orang Curang", verses: 36, type: "Makkiyyah" },
  { number: 84, name: "الانشقاق", latin: "Al-Insyiqaq", meaning: "Terbelah", verses: 25, type: "Makkiyyah" },
  { number: 85, name: "البروج", latin: "Al-Buruj", meaning: "Gugusan Bintang", verses: 22, type: "Makkiyyah" },
  { number: 86, name: "الطارق", latin: "At-Tariq", meaning: "Yang Datang di Malam Hari", verses: 17, type: "Makkiyyah" },
  { number: 87, name: "الأعلى", latin: "Al-A'la", meaning: "Yang Paling Tinggi", verses: 19, type: "Makkiyyah" },
  { number: 88, name: "الغاشية", latin: "Al-Ghasyiyah", meaning: "Hari Pembalasan", verses: 26, type: "Makkiyyah" },
  { number: 89, name: "الفجر", latin: "Al-Fajr", meaning: "Waktu Fajar", verses: 30, type: "Makkiyyah" },
  { number: 90, name: "البلد", latin: "Al-Balad", meaning: "Negeri", verses: 20, type: "Makkiyyah" },
  { number: 91, name: "الشمس", latin: "Asy-Syams", meaning: "Matahari", verses: 15, type: "Makkiyyah" },
  { number: 92, name: "الليل", latin: "Al-Lail", meaning: "Malam", verses: 21, type: "Makkiyyah" },
  { number: 93, name: "الضحى", latin: "Adh-Dhuha", meaning: "Waktu Duha", verses: 11, type: "Makkiyyah" },
  { number: 94, name: "الشرح", latin: "Asy-Syarh", meaning: "Melapangkan", verses: 8, type: "Makkiyyah" },
  { number: 95, name: "التين", latin: "At-Tin", meaning: "Buah Tin", verses: 8, type: "Makkiyyah" },
  { number: 96, name: "العلق", latin: "Al-'Alaq", meaning: "Segumpal Darah", verses: 19, type: "Makkiyyah" },
  { number: 97, name: "القدر", latin: "Al-Qadr", meaning: "Kemuliaan", verses: 5, type: "Makkiyyah" },
  { number: 98, name: "البينة", latin: "Al-Bayyinah", meaning: "Bukti Nyata", verses: 8, type: "Madaniyyah" },
  { number: 99, name: "الزلزلة", latin: "Az-Zalzalah", meaning: "Keguncangan", verses: 8, type: "Madaniyyah" },
  { number: 100, name: "العاديات", latin: "Al-'Adiyat", meaning: "Kuda Perang", verses: 11, type: "Makkiyyah" },
  { number: 101, name: "القارعة", latin: "Al-Qari'ah", meaning: "Hari Kiamat", verses: 11, type: "Makkiyyah" },
  { number: 102, name: "التكاثر", latin: "At-Takatsur", meaning: "Bermegah-megahan", verses: 8, type: "Makkiyyah" },
  { number: 103, name: "العصر", latin: "Al-'Asr", meaning: "Masa / Waktu", verses: 3, type: "Makkiyyah" },
  { number: 104, name: "الهمزة", latin: "Al-Humazah", meaning: "Pengumpat", verses: 9, type: "Makkiyyah" },
  { number: 105, name: "الفيل", latin: "Al-Fil", meaning: "Gajah", verses: 5, type: "Makkiyyah" },
  { number: 106, name: "قريش", latin: "Quraisy", meaning: "Suku Quraisy", verses: 4, type: "Makkiyyah" },
  { number: 107, name: "الماعون", latin: "Al-Ma'un", meaning: "Barang Berguna", verses: 7, type: "Makkiyyah" },
  { number: 108, name: "الكوثر", latin: "Al-Kautsar", meaning: "Nikmat yang Banyak", verses: 3, type: "Makkiyyah" },
  { number: 109, name: "الكافرون", latin: "Al-Kafirun", meaning: "Orang-orang Kafir", verses: 6, type: "Makkiyyah" },
  { number: 110, name: "النصر", latin: "An-Nasr", meaning: "Pertolongan", verses: 3, type: "Madaniyyah" },
  { number: 111, name: "اللهب", latin: "Al-Lahab", meaning: "Gejolak Api", verses: 5, type: "Makkiyyah" },
  { number: 112, name: "الإخلاص", latin: "Al-Ikhlas", meaning: "Ikhlas / Keesaan Allah", verses: 4, type: "Makkiyyah" },
  { number: 113, name: "الفلق", latin: "Al-Falaq", meaning: "Waktu Subuh", verses: 5, type: "Makkiyyah" },
  { number: 114, name: "الناس", latin: "An-Nas", meaning: "Manusia", verses: 6, type: "Makkiyyah" }
];

const QARI_LIST = [
  {
    id: "Alafasy_128kbps",
    name: "Mishary Rashid Alafasy",
    subtext: "Lancar, merdu, & tajwid jelas",
    tempo: "Sedang",
    baseUrl: "https://everyayah.com/data/Alafasy_128kbps/"
  },
  {
    id: "Husary_128kbps",
    name: "Mahmoud Khalil Al-Husary",
    subtext: "Standar Tahsin & Murattal Lambat (Sangat Dianjurkan)",
    tempo: "Lambat",
    baseUrl: "https://everyayah.com/data/Husary_128kbps/"
  },
  {
    id: "Ghamadi_40kbps",
    name: "Saad Al-Ghamdi",
    subtext: "Khusyuk & tenang",
    tempo: "Sedang",
    baseUrl: "https://everyayah.com/data/Ghamadi_40kbps/"
  },
  {
    id: "Abdul_Basit_Murattal_192kbps",
    name: "Abdul Basit Abdul Samad",
    subtext: "Murattal klasik melegenda",
    tempo: "Sedang",
    baseUrl: "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/"
  }
];
