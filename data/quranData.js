// Pre-bundled Quran Ayah Data & Dynamic Loader
const BUNDLED_SURAHS = {
  // Surah 114: An-Nas (6 ayat)
  114: {
    number: 114,
    name: "الناس",
    latin: "An-Nas",
    meaning: "Manusia",
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'uzu birabbin-nas", translation: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia,'" },
      { number: 2, arabic: "مَلِكِ النَّاسِ", transliteration: "Malikin-nas", translation: "Raja manusia," },
      { number: 3, arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilahin-nas", translation: "Sembahan manusia," },
      { number: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min syarril-waswasil-khannas", translation: "Dari kejahatan (bisikan) setan yang bersembunyi," },
      { number: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Allazi yuwaswisu fi sudurin-nas", translation: "Yang membisikkan (kejahatan) ke dalam dada manusia," },
      { number: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal-jinnati wan-nas", translation: "Dari (golongan) jin dan manusia." }
    ]
  },
  // Surah 113: Al-Falaq (5 ayat)
  113: {
    number: 113,
    name: "الفلق",
    latin: "Al-Falaq",
    meaning: "Waktu Subuh",
    verses: [
      { number: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'uzu birabbil-falaq", translation: "Katakanlah, 'Aku berlindung kepada Tuhan yang menguasai subuh (fajar),'" },
      { number: 2, arabic: "مِن شَرِّ مَا خَلَقَ", transliteration: "Min syarri ma khalaq", translation: "Dari kejahatan makhluk yang Dia ciptakan," },
      { number: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min syarri gasiqin iza waqab", translation: "Dan dari kejahatan malam apabila telah gelap gulita," },
      { number: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min syarrin-naffasati fil-'uqad", translation: "Dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya)," },
      { number: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min syarri hasidin iza hasad", translation: "Dan dari kejahatan orang yang dengki apabila dia dengki.'" }
    ]
  },
  // Surah 112: Al-Ikhlas (4 ayat)
  112: {
    number: 112,
    name: "الإخلاص",
    latin: "Al-Ikhlas",
    meaning: "Ikhlas",
    verses: [
      { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwallahu ahad", translation: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa.'" },
      { number: 2, arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allahus-samad", translation: "Allah tempat meminta segala sesuatu." },
      { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yulad", translation: "(Allah) tidak beranak dan tidak pula diperanakkan," },
      { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul lahu kufuwan ahad", translation: "Dan tidak ada sesuatu yang setara dengan Dia." }
    ]
  },
  // Surah 111: Al-Lahab (5 ayat)
  111: {
    number: 111,
    name: "اللهب",
    latin: "Al-Lahab",
    meaning: "Gejolak Api",
    verses: [
      { number: 1, arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", transliteration: "Tabbat yada abi lahabiw wa tabb", translation: "Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia!" },
      { number: 2, arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", transliteration: "Ma agna 'an-hu maluhu wa ma kasab", translation: "Tidaklah berguna baginya hartanya dan apa yang dia usahakan." },
      { number: 3, arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", transliteration: "Sayasla naran zata lahab", translation: "Kelak dia akan masuk ke dalam api yang bergejolak (neraka)." },
      { number: 4, arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", transliteration: "Wamra'atuhu hammalatal-hatab", translation: "Dan (begitu pula) istrinya, pembawa kayu bakar (penyebar fitnah)." },
      { number: 5, arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", transliteration: "Fi jidiha hablum mim masad", translation: "Di lehernya ada tali dari sabut yang dipintal." }
    ]
  },
  // Surah 110: An-Nasr (3 ayat)
  110: {
    number: 110,
    name: "النصر",
    latin: "An-Nasr",
    meaning: "Pertolongan",
    verses: [
      { number: 1, arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", transliteration: "Iza ja'a nasrullahi wal-fath", translation: "Apabila telah datang pertolongan Allah dan kemenangan," },
      { number: 2, arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", transliteration: "Wa ra'aitan-nasa yadkhuluna fi dinillahi afwaja", translation: "Dan engkau melihat manusia berbondong-bondong masuk agama Allah," },
      { number: 3, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", transliteration: "Fa sabbih bihamdi rabbika wastagfirh, innahu kana tawwaba", translation: "Maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat." }
    ]
  },
  // Surah 109: Al-Kafirun (6 ayat)
  109: {
    number: 109,
    name: "الكافرون",
    latin: "Al-Kafirun",
    meaning: "Orang-orang Kafir",
    verses: [
      { number: 1, arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", transliteration: "Qul ya ayyuhal-kafirun", translation: "Katakanlah (Muhammad), 'Wahai orang-orang kafir!'" },
      { number: 2, arabic: "لَا أَعْبُدُ مَا تَعْبُدُونَ", transliteration: "La a'budu ma ta'budun", translation: "Aku tidak akan menyembah apa yang kamu sembah," },
      { number: 3, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa la antum 'abiduna ma a'bud", translation: "Dan kamu bukan penyembah apa yang aku sembah," },
      { number: 4, arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", transliteration: "Wa la ana 'abidum ma 'abattum", translation: "Dan aku tidak pernah menjadi penyembah apa yang kamu sembah," },
      { number: 5, arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa la antum 'abiduna ma a'bud", translation: "Dan kamu tidak pernah (pula) menjadi penyembah apa yang aku sembah." },
      { number: 6, arabic: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", transliteration: "Lakum dinukum wa liya din", translation: "Untukmu agamamu, dan untukku agamaku.'" }
    ]
  },
  // Surah 108: Al-Kautsar (3 ayat)
  108: {
    number: 108,
    name: "الكوثر",
    latin: "Al-Kautsar",
    meaning: "Nikmat yang Berlimpah",
    verses: [
      { number: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", transliteration: "Inna a'tainakal-kausar", translation: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak." },
      { number: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", transliteration: "Fa salli lirabbika wan-har", translation: "Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah." },
      { number: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", transliteration: "Inna syani'aka huwal-abtar", translation: "Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)." }
    ]
  },
  // Surah 103: Al-'Asr (3 ayat)
  103: {
    number: 103,
    name: "العصر",
    latin: "Al-'Asr",
    meaning: "Masa / Waktu",
    verses: [
      { number: 1, arabic: "وَالْعَصْرِ", transliteration: "Wal-'asr", translation: "Demi masa," },
      { number: 2, arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", transliteration: "Innal-insana lafi khusr", translation: "Sungguh, manusia berada dalam kerugian," },
      { number: 3, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", transliteration: "Illallazina amanu wa 'amilus-salihati wa tawashau bil-haqqi wa tawashau bis-sabr", translation: "Kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran." }
    ]
  },
  // Surah 97: Al-Qadr (5 ayat)
  97: {
    number: 97,
    name: "القدر",
    latin: "Al-Qadr",
    meaning: "Kemuliaan",
    verses: [
      { number: 1, arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", transliteration: "Inna anzalnahu fi lailatil-qadr", translation: "Sesungguhnya Kami telah menurunkannya (Al-Qur'an) pada malam kemuliaan." },
      { number: 2, arabic: "وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", transliteration: "Wa ma adraka ma lailatul-qadr", translation: "Dan tahukah kamu apakah malam kemuliaan itu?" },
      { number: 3, arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", transliteration: "Lailatul-qadri khairum min alfi syahr", translation: "Malam kemuliaan itu lebih baik daripada seribu bulan." },
      { number: 4, arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", transliteration: "Tanazzalul-mala'ikatu war-ruhu fiha bi'izni rabbihim min kulli amr", translation: "Pada malam itu turun para malaikat dan Rūḥ (Jibril) dengan izin Tuhannya untuk mengatur segala urusan." },
      { number: 5, arabic: "سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", transliteration: "Salamun hiya hatta matla'il-fajr", translation: "Sejahteralah (malam itu) sampai terbit fajar." }
    ]
  },
  // Surah 94: Asy-Syarh (8 ayat)
  94: {
    number: 94,
    name: "الشرح",
    latin: "Asy-Syarh",
    meaning: "Melapangkan",
    verses: [
      { number: 1, arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", transliteration: "A lam nasyrah laka sadrak", translation: "Bukankah Kami telah melapangkan dadamu (Muhammad)?" },
      { number: 2, arabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", transliteration: "Wa wada'na 'anka wizrak", translation: "Dan Kami pun telah menurunkan bebanmu darimu," },
      { number: 3, arabic: "الَّذِي أَنقَضَ ظَهْرَكَ", transliteration: "Allazi anqada zahrak", translation: "Yang memberatkan punggungmu," },
      { number: 4, arabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", transliteration: "Wa rafa'na laka zikrak", translation: "Dan Kami tinggikan sebutan (nama)mu bagimu." },
      { number: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", transliteration: "Fa inna ma'al-'usri yusra", translation: "Maka sesungguhnya bersama kesulitan ada kemudahan," },
      { number: 6, arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", transliteration: "Inna ma'al-'usri yusra", translation: "Sesungguhnya bersama kesulitan ada kemudahan." },
      { number: 7, arabic: "فَإِذَا فَرَغْتَ فَانصَبْ", transliteration: "Fa iza faragta fansab", translation: "Maka apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain)," },
      { number: 8, arabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", transliteration: "Wa ila rabbika fargab", translation: "Dan hanya kepada Tuhanmulah engkau berharap." }
    ]
  },
  // Surah 78: An-Naba' (40 ayat lengkap untuk hafalan awal Juz 30)
  78: {
    number: 78,
    name: "النبأ",
    latin: "An-Naba'",
    meaning: "Berita Besar",
    verses: [
      { number: 1, arabic: "عَمَّ يَتَسَاءَلُونَ", transliteration: "'Amma yatasa'alun", translation: "Tentang apakah mereka saling bertanya-tanya?" },
      { number: 2, arabic: "عَنِ النَّبَإِ الْعَظِيمِ", transliteration: "'Anin-naba'il-'azim", translation: "Tentang berita yang besar (hari berbangkit)," },
      { number: 3, arabic: "الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ", transliteration: "Allazi hum fihi mukhtalifun", translation: "Yang dalam hal itu mereka berselisih." },
      { number: 4, arabic: "كَلَّا سَيَعْلَمُونَ", transliteration: "Kalla saya'lamun", translation: "Sekali-kali tidak! Kelak mereka akan mengetahui," },
      { number: 5, arabic: "ثُمَّ كَلَّا سَيَعْلَمُونَ", transliteration: "Tsumma kalla saya'lamun", translation: "Kemudian sekali-kali tidak! Kelak mereka akan mengetahui." },
      { number: 6, arabic: "أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا", transliteration: "Alam naj'alil-arda mihada", translation: "Bukankah Kami telah menjadikan bumi sebagai hamparan," },
      { number: 7, arabic: "وَالْجِبَالَ أَوْتَادًا", transliteration: "Wal-jibala awtada", translation: "Dan gunung-gunung sebagai pasak?" },
      { number: 8, arabic: "وَخَلَقْنَاكُمْ أَزْوَاجًا", transliteration: "Wa khalaqnakum azwaja", translation: "Dan Kami menciptakan kamu berpasang-pasangan," },
      { number: 9, arabic: "وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا", transliteration: "Wa ja'alna nawmakum subata", translation: "Dan Kami menjadikan tidurmu untuk istirahat," },
      { number: 10, arabic: "وَجَعَلْنَا اللَّيْلَ لِبَاسًا", transliteration: "Wa ja'alnal-laila libasa", translation: "Dan Kami menjadikan malam sebagai pakaian," },
      { number: 11, arabic: "وَجَعَلْنَا النَّهَارَ مَعَاشًا", transliteration: "Wa ja'alnan-nahara ma'asya", translation: "Dan Kami menjadikan siang untuk mencari penghidupan," },
      { number: 12, arabic: "وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا", transliteration: "Wa banaina fawqakum sab'an syidada", translation: "Dan Kami membangun di atas kamu tujuh (langit) yang kokoh," },
      { number: 13, arabic: "وَجَعَلْنَا سِرَاجًا وَهَّاجًا", transliteration: "Wa ja'alna sirajaw wahhaja", translation: "Dan Kami menjadikan pelita yang terang benderang (matahari)," },
      { number: 14, arabic: "وَأَنزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا", transliteration: "Wa anzalna minal-mu'sirati ma'an tsajjaja", translation: "Dan Kami turunkan dari awan, air hujan yang tercurah dengan hebatnya," },
      { number: 15, arabic: "لِّنُخْرِجَ بِهِ حَبًّا وَنَبَاتًا", transliteration: "Linukhrija bihi habbaw wa nabata", translation: "Untuk Kami tumbuhkan dengan air itu biji-bijian dan tanam-tanaman," },
      { number: 16, arabic: "وَجَنَّاتٍ أَلْفَافًا", transliteration: "Wa jannatin alfafa", translation: "Dan kebun-kebun yang rindang." },
      { number: 17, arabic: "إِنَّ يَوْمَ الْفَصْلِ كَانَ مِيقَاتًا", transliteration: "Inna yawmal-fasli kana miqata", translation: "Sungguh, hari keputusan adalah suatu waktu yang telah ditetapkan," },
      { number: 18, arabic: "يَوْمَ يُنفَخُ فِي الصُّورِ فَتَأْتُونَ أَفْوَاجًا", transliteration: "Yawma yunfakhu fis-suri fata'tuna afwaja", translation: "(Yaitu) pada hari (ketika) sangkakala ditiup, lalu kamu datang berbondong-bondong," },
      { number: 19, arabic: "وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا", transliteration: "Wa futihatis-sama'u fakanat abwaba", translation: "Dan langit pun dibukalah, maka terdapatlah beberapa pintu," },
      { number: 20, arabic: "وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا", transliteration: "Wa suyyiratil-jibalu fakanat saraba", translation: "Dan gunung-gunung pun dijalankan sehingga menjadi fatamorgana." },
      { number: 21, arabic: "إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا", transliteration: "Inna jahannama kanat mirsada", translation: "Sungguh, (neraka) Jahanam itu (sebagai) tempat mengintai (bagi penjaga yang mengawasi)," },
      { number: 22, arabic: "لِّلطَّاغِينَ مَآبًا", transliteration: "Lit-tagina ma'aba", translation: "Menjadi tempat kembali bagi orang-orang yang melampaui batas." },
      { number: 23, arabic: "لَّابِثِينَ فِيهَا أَحْقَابًا", transliteration: "Labitsina fiha ahqaba", translation: "Mereka tinggal di sana berabad-abad lamanya." },
      { number: 24, arabic: "لَّا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا", transliteration: "La yazuquna fiha bardaw wa la syaraba", translation: "Mereka tidak merasakan kesejukan di dalamnya dan tidak (pula mendapat) minuman," },
      { number: 25, arabic: "إِلَّا حَمِيمًا وَغَسَّاقًا", transliteration: "Illa hamimaw wa gassaqa", translation: "Selain air yang mendidih dan nanah," },
      { number: 26, arabic: "جَزَاءً وِفَاقًا", transliteration: "Jaza'aw wifaqa", translation: "Sebagai pembalasan yang setimpal." },
      { number: 27, arabic: "إِنَّهُمْ كَانُوا لَا يَرْجُونَ حِسَابًا", transliteration: "Innahum kanu la yarjuna hisaba", translation: "Sesungguhnya mereka dahulu tidak pernah mengharapkan perhitungan," },
      { number: 28, arabic: "وَكَذَّبُوا بِآيَاتِنَا كِذَّابًا", transliteration: "Wa kazzabu bi'ayatina kizzaba", translation: "Dan mereka benar-benar mendustakan ayat-ayat Kami." },
      { number: 29, arabic: "وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ كِتَابًا", transliteration: "Wa kulla syai'in ahsainahu kitaba", translation: "Dan segala sesuatu telah Kami catat dalam suatu Kitab (buku catatan amalan manusia)." },
      { number: 30, arabic: "فَذُوقُوا فَلَن نَّزِيدَكُمْ إِلَّا عَذَابًا", transliteration: "Fazuqu falan nazidakum illa 'azaba", translation: "Maka karena itu rasakanlah! Maka Kami tidak akan menambah kepadamu selain azab." },
      { number: 31, arabic: "إِنَّ لِلْمُتَّقِينَ مَفَازًا", transliteration: "Inna lil-muttaqina mafaza", translation: "Sungguh, bagi orang-orang yang bertakwa mendapat kemenangan," },
      { number: 32, arabic: "حَدَائِقَ وَأَعْنَابًا", transliteration: "Hada'iqa wa a'naba", translation: "(Yaitu) kebun-kebun dan buah anggur," },
      { number: 33, arabic: "وَكَوَاعِبَ أَتْرَابًا", transliteration: "Wa kawa'iba atraba", translation: "Dan gadis-gadis jelita yang sebaya," },
      { number: 34, arabic: "وَكَأْسًا دِهَاقًا", transliteration: "Wa ka'san dihaqa", translation: "Dan gelas-gelas yang penuh (berisi minuman)." },
      { number: 35, arabic: "لَّا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّابًا", transliteration: "La yasma'una fiha lagwaw wa la kizzaba", translation: "Di sana mereka tidak mendengar percakapan yang sia-sia maupun (perkataan) dusta." },
      { number: 36, arabic: "جَزَاءً مِّن رَّبِّكَ عَطَاءً حِسَابًا", transliteration: "Jaza'am mir rabbika 'ata'an hisaba", translation: "Sebagai balasan dan pemberian yang cukup banyak dari Tuhanmu," },
      { number: 37, arabic: "رَّبِّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنِ ۖ لَا يَمْلِكُونَ مِنْهُ خِطَابًا", transliteration: "Rabbis-samawati wal-ardi wa ma bainahumar-rahmani la yamlikuna minhu khitiba", translation: "Tuhan (yang memelihara) langit dan bumi dan apa yang ada di antara keduanya; Yang Maha Pengasih; mereka tidak mampu berbicara dengan-Nya," },
      { number: 38, arabic: "يَوْمَ يَقُومُ الرُّوحُ وَالْمَلَائِكَةُ صَفًّا ۖ لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ الرَّحْمَٰنُ وَقَالَ صَوَابًا", transliteration: "Yawma yaqumur-ruhu wal-mala'ikatu saffa, la yatakallamuna illa man azina lahur-rahmanu wa qala sawaba", translation: "Pada hari, ketika Rūḥ dan para malaikat berdiri bersaf-saf, mereka tidak berbicara, kecuali siapa yang telah diberi izin kepadanya oleh Tuhan Yang Maha Pengasih dan dia hanya mengatakan yang benar." },
      { number: 39, arabic: "ذَٰلِكَ الْيَوْمُ الْحَقُّ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ مَآبًا", transliteration: "Zalikal-yawmul-haqq, faman sya'attakhaza ila rabbihi ma'aba", translation: "Itulah hari yang pasti terjadi. Maka barang siapa menghendaki, niscaya dia menempuh jalan kembali kepada Tuhannya." },
      { number: 40, arabic: "إِنَّا أَنذَرْنَاكُمْ عَذَابًا قَرِيبًا يَوْمَ يَنظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ الْكَافِرُ يَا لَيْتَنِي كُنتُ تُرَابًا", transliteration: "Inna anzarnakum 'azaban qariba, yawma yanzurul-mar'u ma qaddamat yadahu wa yaqulul-kafiru ya laitani kuntu turaba", translation: "Sesungguhnya Kami telah memperingatkan kepadamu (hai orang kafir) azab yang dekat, pada hari manusia melihat apa yang telah diperbuat oleh kedua tangannya; dan orang kafir berkata, 'Alangkah baiknya seandainya dahulu aku jadi tanah.'" }
    ]
  }
};

/**
 * Format string 3 digit angka (misal 78 -> "078", 1 -> "001")
 */
function pad3(num) {
  return String(num).padStart(3, '0');
}

/**
 * Mendapatkan URL audio EveryAyah untuk ayat tertentu
 */
function getAyahAudioUrl(qariBaseUrl, surahNumber, ayahNumber) {
  return `${qariBaseUrl}${pad3(surahNumber)}${pad3(ayahNumber)}.mp3`;
}

/**
 * Mengambil detail surah dengan caching lokal
 */
async function loadSurahDetail(surahNumber) {
  // 1. Cek di Bundled Data
  if (BUNDLED_SURAHS[surahNumber]) {
    return BUNDLED_SURAHS[surahNumber];
  }

  // 2. Cek di Cache LocalStorage
  const cacheKey = `murojaah_surah_${surahNumber}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn("Gagal parse cache surah", e);
    }
  }

  // 3. Fetch dari API Publik Quran
  try {
    const res = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.ayat) {
        const surahData = {
          number: json.data.nomor,
          name: json.data.nama,
          latin: json.data.namaLatin,
          meaning: json.data.arti,
          verses: json.data.ayat.map(a => ({
            number: a.nomorAyat,
            arabic: a.teksArab,
            transliteration: a.teksLatin,
            translation: a.teksIndonesia
          }))
        };
        localStorage.setItem(cacheKey, JSON.stringify(surahData));
        return surahData;
      }
    }
  } catch (err) {
    console.warn("EQuran API gagal, mencoba fallback Al-Quran Cloud...", err);
  }

  // Fallback ke Al-Quran Cloud
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`);
    if (res.ok) {
      const json = await res.json();
      const uthmani = json.data[0];
      const indo = json.data[1];
      const meta = SURAH_JUZ_30.find(s => s.number === surahNumber) || { latin: `Surah ${surahNumber}`, meaning: "" };

      const verses = uthmani.ayahs.map((ayah, idx) => ({
        number: idx + 1,
        arabic: ayah.text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "").trim() || ayah.text,
        transliteration: `Ayat ${idx + 1}`,
        translation: indo.ayahs[idx] ? indo.ayahs[idx].text : ""
      }));

      const surahData = {
        number: surahNumber,
        name: uthmani.name,
        latin: meta.latin,
        meaning: meta.meaning,
        verses: verses
      };
      localStorage.setItem(cacheKey, JSON.stringify(surahData));
      return surahData;
    }
  } catch (err2) {
    console.error("Gagal memuat surah dari network", err2);
  }

  // Fallback minimalis darurat jika offline sepenuhnya
  const meta = SURAH_JUZ_30.find(s => s.number === surahNumber);
  const fallbackVerses = [];
  for (let i = 1; i <= (meta ? meta.verses : 10); i++) {
    fallbackVerses.push({
      number: i,
      arabic: `بِسْمِ اللَّهِ - آية ${i}`,
      transliteration: `Ayat ke-${i} (Silakan aktifkan internet untuk memuat teks lengkap)`,
      translation: `Ayat ${i} dari Surah ${meta ? meta.latin : surahNumber}`
    });
  }
  return {
    number: surahNumber,
    name: meta ? meta.name : "",
    latin: meta ? meta.latin : `Surah ${surahNumber}`,
    meaning: meta ? meta.meaning : "",
    verses: fallbackVerses
  };
}
