/**
 * MurojaahKu Kuis Sambung Ayat & Evaluasi Hafalan
 */

class QuizEngine {
  constructor() {
    this.currentQuestions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.totalQuestions = 5;
    this.answered = false;
    this.quizAudio = new Audio();
  }

  generateQuiz(surahDetail, total = 5) {
    this.score = 0;
    this.currentIndex = 0;
    this.totalQuestions = Math.min(total, surahDetail.verses.length - 1);
    this.currentQuestions = [];

    // Pilih ayat-ayat acak yang memiliki ayat kelanjutan
    const availableIndices = [];
    for (let i = 0; i < surahDetail.verses.length - 1; i++) {
      availableIndices.push(i);
    }
    // Shuffle
    availableIndices.sort(() => Math.random() - 0.5);

    const chosen = availableIndices.slice(0, this.totalQuestions);

    chosen.forEach(idx => {
      const questionAyah = surahDetail.verses[idx];
      const correctNextAyah = surahDetail.verses[idx + 1];

      // Ambil 3 pengecoh (distractor) dari ayat lain
      const distractors = surahDetail.verses
        .filter(v => v.number !== correctNextAyah.number && v.number !== questionAyah.number)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Jika surah terlalu pendek untuk 3 distractor, buat opsi variasi
      while (distractors.length < 3) {
        distractors.push({
          number: 999,
          arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
          transliteration: "Inna a'tainakal-kausar"
        });
      }

      const options = [correctNextAyah, ...distractors].sort(() => Math.random() - 0.5);

      this.currentQuestions.push({
        surahNumber: surahDetail.number,
        surahLatin: surahDetail.latin,
        questionAyah: questionAyah,
        correctAyah: correctNextAyah,
        options: options
      });
    });

    return this.getCurrentQuestion();
  }

  getCurrentQuestion() {
    if (this.currentIndex >= this.currentQuestions.length) return null;
    return this.currentQuestions[this.currentIndex];
  }

  playQuestionAudio(qariBaseUrl) {
    const q = this.getCurrentQuestion();
    if (!q) return;
    const url = getAyahAudioUrl(qariBaseUrl, q.surahNumber, q.questionAyah.number);
    this.quizAudio.src = url;
    this.quizAudio.play().catch(e => console.warn("Quiz audio error", e));
  }

  checkAnswer(selectedAyahNumber) {
    const q = this.getCurrentQuestion();
    if (!q) return { isCorrect: false, correctAyahNumber: null };

    const isCorrect = selectedAyahNumber === q.correctAyah.number;
    if (isCorrect) {
      this.score += 1;
    }
    return {
      isCorrect,
      correctAyahNumber: q.correctAyah.number
    };
  }

  nextQuestion() {
    this.quizAudio.pause();
    this.currentIndex += 1;
    return this.getCurrentQuestion();
  }

  getResults() {
    const percent = Math.round((this.score / this.totalQuestions) * 100);
    let grade = "Cukup";
    let badge = "badge-warning";
    let note = "Perlu menambah murojaah 10x pada beberapa ayat.";

    if (percent >= 80) {
      grade = "Mumtaz! (Luar Biasa)";
      badge = "badge-success";
      note = "Hafalan Anda sangat kuat dan mutqin. Pertahankan!";
    } else if (percent >= 60) {
      grade = "Jayyid Jiddan (Bagus)";
      badge = "badge-info";
      note = "Sudah bagus, ulangi 3x lagi agar makin lancar di luar kepala.";
    }

    return {
      score: this.score,
      total: this.totalQuestions,
      percent: percent,
      grade: grade,
      badge: badge,
      note: note
    };
  }
}
