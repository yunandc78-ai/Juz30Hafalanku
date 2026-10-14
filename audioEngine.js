/**
 * MurojaahKu Audio & Repetition Engine
 * Mengatur pemutaran audio, repetisi 1x - 10x per ayat atau blok ayat,
 * dan jeda interaktif (echo mode) untuk menghafal.
 */

class AudioRepetitionEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";

    // State
    this.currentSurah = null;
    this.verses = [];
    this.currentIndex = 0; // index di array verses (0-based)
    this.currentRepeat = 1; // 1 s/d targetRepeat
    this.targetRepeat = 10; // default 10x sesuai spesifikasi
    this.loopMode = "single"; // "single" (per ayat), "block" (rentang 3-5 ayat), "continuous"
    this.blockSize = 3; // jumlah ayat per blok dalam mode blok
    this.blockStartIndex = 0;
    this.blockEndIndex = 0;
    
    // Jeda antar ayat: 'none', '2s', 'echo' (durasi sepanjang ayat)
    this.pauseGapMode = "2s"; 
    this.isPausing = false;
    this.pauseTimer = null;
    this.lastAyahDuration = 4; // default perkiraan 4 detik

    // Qari configuration
    this.currentQari = QARI_LIST[0]; // Mishary Alafasy default

    // Audio context for fallback synth if network audio fails
    this.audioCtx = null;

    // Callbacks
    this.onStateChange = null;
    this.onAyahChange = null;
    this.onRepeatChange = null;
    this.onProgress = null;
    this.onPauseTick = null;
    this.onComplete = null;

    this.setupListeners();
  }

  setupListeners() {
    this.audio.addEventListener("timeupdate", () => {
      if (this.onProgress && this.audio.duration) {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.onProgress(this.audio.currentTime, this.audio.duration, percent);
      }
    });

    this.audio.addEventListener("loadedmetadata", () => {
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        this.lastAyahDuration = this.audio.duration;
      }
    });

    this.audio.addEventListener("ended", () => {
      this.handleAyahEnded();
    });

    this.audio.addEventListener("play", () => {
      if (this.onStateChange) this.onStateChange(true);
    });

    this.audio.addEventListener("pause", () => {
      if (!this.isPausing && this.onStateChange) {
        this.onStateChange(false);
      }
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio loading error, switching to synthetic recital chime...", e);
      this.playSyntheticFallback();
    });
  }

  setQari(qariId) {
    const qari = QARI_LIST.find(q => q.id === qariId);
    if (qari) {
      this.currentQari = qari;
      if (this.isPlaying()) {
        const wasIndex = this.currentIndex;
        this.loadAndPlay(wasIndex);
      }
    }
  }

  setSurahData(surah, verses, startIndex = 0) {
    this.currentSurah = surah;
    this.verses = verses;
    this.currentIndex = Math.max(0, Math.min(startIndex, verses.length - 1));
    this.currentRepeat = 1;
    this.updateBlockBounds();
  }

  setTargetRepeat(num) {
    this.targetRepeat = Math.max(1, Math.min(10, num));
    if (this.currentRepeat > this.targetRepeat) {
      this.currentRepeat = 1;
    }
    this.notifyRepeat();
  }

  setLoopMode(mode, customBlockSize = null) {
    this.loopMode = mode;
    if (customBlockSize) {
      this.blockSize = customBlockSize;
    }
    this.updateBlockBounds();
    this.currentRepeat = 1;
    this.notifyRepeat();
  }

  setPauseGap(mode) {
    this.pauseGapMode = mode; // 'none', '2s', 'echo'
  }

  updateBlockBounds() {
    if (this.loopMode === "block") {
      this.blockStartIndex = Math.floor(this.currentIndex / this.blockSize) * this.blockSize;
      this.blockEndIndex = Math.min(this.blockStartIndex + this.blockSize - 1, this.verses.length - 1);
    } else {
      this.blockStartIndex = this.currentIndex;
      this.blockEndIndex = this.currentIndex;
    }
  }

  notifyAyah() {
    const activeAyah = this.verses[this.currentIndex];
    if (this.onAyahChange && activeAyah) {
      this.onAyahChange({
        surah: this.currentSurah,
        ayah: activeAyah,
        index: this.currentIndex,
        total: this.verses.length,
        currentRepeat: this.currentRepeat,
        targetRepeat: this.targetRepeat,
        blockStart: this.blockStartIndex + 1,
        blockEnd: this.blockEndIndex + 1,
        loopMode: this.loopMode
      });
    }
    this.notifyRepeat();
  }

  notifyRepeat() {
    if (this.onRepeatChange) {
      this.onRepeatChange(this.currentRepeat, this.targetRepeat);
    }
  }

  loadAndPlay(index) {
    this.clearPauseTimer();
    this.currentIndex = Math.max(0, Math.min(index, this.verses.length - 1));
    this.updateBlockBounds();

    const ayah = this.verses[this.currentIndex];
    if (!ayah) return;

    const audioUrl = getAyahAudioUrl(this.currentQari.baseUrl, this.currentSurah.number, ayah.number);
    this.audio.src = audioUrl;
    this.audio.load();

    this.notifyAyah();

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("Auto-play was blocked or failed", err);
        if (this.onStateChange) this.onStateChange(false);
      });
    }
  }

  play() {
    if (this.isPausing) {
      // Jika sedang jeda bacaan, lewati jeda dan putar audio
      this.clearPauseTimer();
      this.isPausing = false;
      this.loadAndPlay(this.currentIndex);
      return;
    }

    if (!this.audio.src || this.audio.src === "") {
      this.loadAndPlay(this.currentIndex);
    } else {
      this.audio.play().catch(e => {
        console.warn("Play error, trying reload", e);
        this.loadAndPlay(this.currentIndex);
      });
    }
  }

  pause() {
    this.clearPauseTimer();
    this.isPausing = false;
    this.audio.pause();
    if (this.onStateChange) this.onStateChange(false);
  }

  togglePlay() {
    if (this.isPlaying() || this.isPausing) {
      this.pause();
    } else {
      this.play();
    }
  }

  isPlaying() {
    return !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
  }

  nextAyah() {
    this.clearPauseTimer();
    this.isPausing = false;
    this.currentRepeat = 1;
    if (this.currentIndex < this.verses.length - 1) {
      this.loadAndPlay(this.currentIndex + 1);
    } else {
      if (this.onComplete) this.onComplete();
    }
  }

  prevAyah() {
    this.clearPauseTimer();
    this.isPausing = false;
    this.currentRepeat = 1;
    if (this.currentIndex > 0) {
      this.loadAndPlay(this.currentIndex - 1);
    }
  }

  seekRelative(seconds) {
    if (this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(this.audio.duration, this.audio.currentTime + seconds));
    }
  }

  handleAyahEnded() {
    // Tentukan durasi jeda yang dibutuhkan
    let gapSeconds = 0;
    if (this.pauseGapMode === "2s") {
      gapSeconds = 2.0;
    } else if (this.pauseGapMode === "echo") {
      gapSeconds = Math.max(2.5, Math.min(15, this.lastAyahDuration));
    }

    if (gapSeconds > 0) {
      this.startPauseGap(gapSeconds, () => {
        this.proceedAfterAyah();
      });
    } else {
      this.proceedAfterAyah();
    }
  }

  startPauseGap(gapSeconds, callback) {
    this.isPausing = true;
    if (this.onStateChange) this.onStateChange(false, true); // true = in pause mode
    
    let remaining = gapSeconds;
    const intervalMs = 100;
    const totalMs = gapSeconds * 1000;
    let elapsedMs = 0;

    if (this.onPauseTick) {
      this.onPauseTick(remaining.toFixed(1), gapSeconds, 0);
    }

    this.pauseTimer = setInterval(() => {
      elapsedMs += intervalMs;
      remaining = Math.max(0, (totalMs - elapsedMs) / 1000);
      const percent = Math.min(100, (elapsedMs / totalMs) * 100);

      if (this.onPauseTick) {
        this.onPauseTick(remaining.toFixed(1), gapSeconds, percent);
      }

      if (elapsedMs >= totalMs) {
        this.clearPauseTimer();
        this.isPausing = false;
        callback();
      }
    }, intervalMs);
  }

  clearPauseTimer() {
    if (this.pauseTimer) {
      clearInterval(this.pauseTimer);
      this.pauseTimer = null;
    }
    if (this.onPauseTick) {
      this.onPauseTick(0, 0, 100);
    }
  }

  proceedAfterAyah() {
    if (this.loopMode === "single") {
      // Ulangi ayat tunggal sampai targetRepeat
      if (this.currentRepeat < this.targetRepeat) {
        this.currentRepeat += 1;
        this.notifyRepeat();
        this.loadAndPlay(this.currentIndex);
      } else {
        // Telah mencapai repetisi target (misal 10x)
        // Otomatis tandai ayat ini sebagai "Lancar" di tracker
        this.triggerAyahMemorizedSuccess();
        
        // Pindah ke ayat selanjutnya
        this.currentRepeat = 1;
        this.notifyRepeat();
        if (this.currentIndex < this.verses.length - 1) {
          this.loadAndPlay(this.currentIndex + 1);
        } else {
          // Surah selesai di-murojaah!
          if (this.onComplete) this.onComplete();
        }
      }
    } else if (this.loopMode === "block") {
      // Loop dalam satu blok (misal ayat 1 - 3)
      if (this.currentIndex < this.blockEndIndex) {
        // Masih ada ayat dalam blok saat ini
        this.currentIndex += 1;
        this.loadAndPlay(this.currentIndex);
      } else {
        // Sudah mencapai akhir blok, cek pengulangan blok
        if (this.currentRepeat < this.targetRepeat) {
          this.currentRepeat += 1;
          this.notifyRepeat();
          this.currentIndex = this.blockStartIndex;
          this.loadAndPlay(this.currentIndex);
        } else {
          // Blok selesai diulang targetRepeat kali!
          for (let i = this.blockStartIndex; i <= this.blockEndIndex; i++) {
            this.triggerAyahMemorizedSuccess(i);
          }
          this.currentRepeat = 1;
          this.notifyRepeat();
          if (this.blockEndIndex < this.verses.length - 1) {
            this.currentIndex = this.blockEndIndex + 1;
            this.updateBlockBounds();
            this.loadAndPlay(this.currentIndex);
          } else {
            if (this.onComplete) this.onComplete();
          }
        }
      }
    } else {
      // Continuous mode
      if (this.currentIndex < this.verses.length - 1) {
        this.currentIndex += 1;
        this.loadAndPlay(this.currentIndex);
      } else {
        if (this.onComplete) this.onComplete();
      }
    }
  }

  triggerAyahMemorizedSuccess(index = null) {
    const targetIdx = index !== null ? index : this.currentIndex;
    const ayah = this.verses[targetIdx];
    if (ayah && this.currentSurah) {
      const event = new CustomEvent("ayah-mastered", {
        detail: {
          surahNumber: this.currentSurah.number,
          ayahNumber: ayah.number
        }
      });
      window.dispatchEvent(event);
    }
  }

  playSyntheticFallback() {
    // Menggunakan Web Audio API oscillator untuk melantunkan nada murattal jika audio offline / gagal
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) this.audioCtx = new AudioContext();

      const tones = [440, 493.88, 554.37, 659.25];
      let now = this.audioCtx.currentTime;

      tones.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.4);
        gain.gain.setValueAtTime(0.15, now + i * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + i * 0.4);
        osc.stop(now + (i + 1) * 0.4);
      });

      setTimeout(() => {
        this.handleAyahEnded();
      }, 1800);
    } catch (e) {
      console.warn("Synthetic fallback error", e);
      setTimeout(() => this.handleAyahEnded(), 2000);
    }
  }
}
