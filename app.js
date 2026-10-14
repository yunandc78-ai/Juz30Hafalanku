/**
 * MurojaahKu - Hafalan Juz 30 Cerdas
 * Main Application Logic & Reactive UI
 */

// Global App State
const AppState = {
  currentTab: 'dashboard', // 'dashboard', 'memorize', 'quiz', 'profile'
  currentSurahDetail: null,
  activeAyahIndex: 0,
  settings: {
    targetRepeat: 10,
    loopMode: 'single', // 'single', 'block'
    blockSize: 3,
    pauseGap: '2s', // 'none', '2s', 'echo'
    qariId: 'Alafasy_128kbps',
    fontSizeArabic: 32,
    showTransliteration: true,
    showTranslation: true,
    theme: 'dark'
  },
  // Key format: 'surah_ayah': 0 (abu-abu), 1 (kuning), 2 (hijau)
  memorizationData: {}
};

// Instantiate Sub-engines
const audioEngine = new AudioRepetitionEngine();
const recorderEngine = new ReciteRecorder();
const quizEngine = new QuizEngine();

// Load Stored Settings & Progress
function loadStoredData() {
  const savedSettings = localStorage.getItem('murojaah_settings');
  if (savedSettings) {
    try {
      AppState.settings = { ...AppState.settings, ...JSON.parse(savedSettings) };
    } catch (e) {
      console.warn("Error parsing saved settings", e);
    }
  }

  const savedProgress = localStorage.getItem('murojaah_progress');
  if (savedProgress) {
    try {
      AppState.memorizationData = JSON.parse(savedProgress);
    } catch (e) {
      console.warn("Error parsing saved progress", e);
    }
  }

  // Apply visual settings
  applyTheme(AppState.settings.theme);
  document.documentElement.style.setProperty('--font-size-arabic', `${AppState.settings.fontSizeArabic}px`);

  // Apply audioEngine configurations
  audioEngine.setTargetRepeat(AppState.settings.targetRepeat);
  audioEngine.setLoopMode(AppState.settings.loopMode, AppState.settings.blockSize);
  audioEngine.setPauseGap(AppState.settings.pauseGap);
  audioEngine.setQari(AppState.settings.qariId);
}

function saveSettings() {
  localStorage.setItem('murojaah_settings', JSON.stringify(AppState.settings));
}

function saveProgress() {
  localStorage.setItem('murojaah_progress', JSON.stringify(AppState.memorizationData));
  updateDashboardStats();
}

function setAyahStatus(surahNum, ayahNum, status) {
  // status: 0 (abu-abu), 1 (kuning), 2 (hijau)
  const key = `${surahNum}_${ayahNum}`;
  AppState.memorizationData[key] = status;
  saveProgress();
  renderAyahStatusUI(surahNum, ayahNum, status);
  updateDashboardStats();
}

function getAyahStatus(surahNum, ayahNum) {
  const key = `${surahNum}_${ayahNum}`;
  return AppState.memorizationData[key] !== undefined ? AppState.memorizationData[key] : 0;
}

function getSurahMemorizationStats(surahNum, totalVerses) {
  let mastered = 0;
  let learning = 0;
  for (let i = 1; i <= totalVerses; i++) {
    const st = getAyahStatus(surahNum, i);
    if (st === 2) mastered++;
    else if (st === 1) learning++;
  }
  const percent = totalVerses > 0 ? Math.round((mastered / totalVerses) * 100) : 0;
  
  let overallStatus = 'unmemorized';
  if (mastered === totalVerses && totalVerses > 0) overallStatus = 'mastered';
  else if (mastered > 0 || learning > 0) overallStatus = 'learning';

  return { mastered, learning, total: totalVerses, percent, overallStatus };
}

function calculateJuz30Stats() {
  let totalVersesInJuz = 0;
  let totalMastered = 0;
  let surahsCompleted = 0;

  SURAH_JUZ_30.forEach(s => {
    totalVersesInJuz += s.verses;
    const stats = getSurahMemorizationStats(s.number, s.verses);
    totalMastered += stats.mastered;
    if (stats.mastered === s.verses && s.verses > 0) {
      surahsCompleted++;
    }
  });

  const percent = totalVersesInJuz > 0 ? Math.round((totalMastered / totalVersesInJuz) * 100) : 0;
  return {
    totalVerses: totalVersesInJuz,
    masteredVerses: totalMastered,
    surahsCompleted,
    totalSurahs: SURAH_JUZ_30.length,
    percent
  };
}

// ==========================================================================
// NAVIGATION & VIEW SWITCHING
// ==========================================================================

function switchTab(tabName) {
  AppState.currentTab = tabName;

  document.querySelectorAll('.view-screen').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const activeBtn = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Control floating audio controller visibility
  const floatingBar = document.getElementById('floatingAudioController');
  if (tabName === 'memorize' && AppState.currentSurahDetail) {
    if (floatingBar) floatingBar.classList.remove('hidden');
  } else {
    if (floatingBar) floatingBar.classList.add('hidden');
  }

  if (tabName === 'dashboard') {
    document.getElementById('dashboardScreen').classList.remove('hidden');
    renderSurahList();
    updateDashboardStats();
  } else if (tabName === 'memorize') {
    document.getElementById('memorizeScreen').classList.remove('hidden');
  } else if (tabName === 'quiz') {
    document.getElementById('quizScreen').classList.remove('hidden');
    renderQuizSurahSelect();
  } else if (tabName === 'profile') {
    document.getElementById('profileScreen').classList.remove('hidden');
    syncProfileFormValues();
  }
}

// ==========================================================================
// DASHBOARD RENDERING
// ==========================================================================

function updateDashboardStats() {
  const stats = calculateJuz30Stats();
  const overallPercentEl = document.getElementById('overallPercent');
  const overallProgressBar = document.getElementById('overallProgressBar');
  const statMasteredAyah = document.getElementById('statMasteredAyah');
  const statCompletedSurah = document.getElementById('statCompletedSurah');

  if (overallPercentEl) overallPercentEl.textContent = `${stats.percent}%`;
  if (overallProgressBar) overallProgressBar.style.width = `${stats.percent}%`;
  if (statMasteredAyah) statMasteredAyah.textContent = `${stats.masteredVerses} / ${stats.totalVerses}`;
  if (statCompletedSurah) statCompletedSurah.textContent = `${stats.surahsCompleted} / ${stats.totalSurahs}`;
}

let activeFilterCategory = 'all';
let searchQuery = '';

function renderSurahList() {
  const container = document.getElementById('surahGridContainer');
  if (!container) return;

  const filtered = SURAH_JUZ_30.filter(surah => {
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || 
      surah.latin.toLowerCase().includes(q) || 
      surah.meaning.toLowerCase().includes(q) || 
      String(surah.number).includes(q);

    if (!matchSearch) return false;

    // Filter status category
    const stats = getSurahMemorizationStats(surah.number, surah.verses);
    if (activeFilterCategory === 'unmemorized') return stats.overallStatus === 'unmemorized';
    if (activeFilterCategory === 'learning') return stats.overallStatus === 'learning';
    if (activeFilterCategory === 'mastered') return stats.overallStatus === 'mastered';
    return true;
  });

  container.innerHTML = filtered.map(s => {
    const stats = getSurahMemorizationStats(s.number, s.verses);
    let badgeClass = 'unmemorized';
    let badgeText = 'Belum Hafal';

    if (stats.overallStatus === 'learning') {
      badgeClass = 'learning';
      badgeText = 'Sedang Murojaah';
    } else if (stats.overallStatus === 'mastered') {
      badgeClass = 'mastered';
      badgeText = 'Lancar (Mutqin)';
    }

    return `
      <div class="surah-card" onclick="openMemorizeScreen(${s.number})">
        <div class="surah-card-header">
          <div class="surah-left">
            <div class="surah-num-badge"><span>${s.number}</span></div>
            <div class="surah-info">
              <h3>${s.latin}</h3>
              <p>${s.meaning} • ${s.verses} Ayat</p>
            </div>
          </div>
          <div class="surah-arabic-title">${s.name}</div>
        </div>
        <div class="surah-card-footer">
          <div class="status-badge ${badgeClass}">
            <span class="status-dot"></span>
            ${badgeText}
          </div>
          <div class="surah-progress-wrap">
            <div class="mini-bar">
              <div class="mini-fill" style="width: ${stats.percent}%"></div>
            </div>
            <span>${stats.percent}%</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// MEMORIZE SCREEN LOGIC
// ==========================================================================

async function openMemorizeScreen(surahNumber, targetAyahIndex = 0) {
  switchTab('memorize');
  
  const loadingBanner = document.getElementById('memorizeLoading');
  const versesContainer = document.getElementById('versesContainer');
  if (loadingBanner) loadingBanner.classList.remove('hidden');
  if (versesContainer) versesContainer.innerHTML = '';

  const surahDetail = await loadSurahDetail(surahNumber);
  AppState.currentSurahDetail = surahDetail;

  if (loadingBanner) loadingBanner.classList.add('hidden');

  // Update Header
  document.getElementById('activeSurahTitle').textContent = `${surahDetail.latin} (${surahDetail.name})`;
  document.getElementById('activeRangeIndicator').textContent = `${surahDetail.verses.length} Ayat • Mode ${AppState.settings.loopMode === 'block' ? 'Blok' : 'Ayat Tunggal'}`;

  // Tampilkan Bismillah untuk surah selain At-Taubah (semua Juz 30 punya bismillah)
  const bismillahCard = document.getElementById('bismillahCard');
  if (bismillahCard) {
    bismillahCard.classList.remove('hidden');
  }

  // Render list of verses
  renderVersesList(surahDetail);

  // Setup audio engine
  audioEngine.setSurahData(surahDetail, surahDetail.verses, targetAyahIndex);

  // Auto scroll ke ayat
  scrollToAyah(targetAyahIndex);
}

function renderVersesList(surahDetail) {
  const container = document.getElementById('versesContainer');
  if (!container) return;

  container.innerHTML = surahDetail.verses.map((ayah, index) => {
    const status = getAyahStatus(surahDetail.number, ayah.number);
    const activeClass = index === audioEngine.currentIndex ? 'active-ayah' : '';
    
    return `
      <div class="ayah-card ${activeClass}" id="ayahCard_${ayah.number}" data-index="${index}">
        <div class="ayah-header">
          <div class="ayah-roundel">${ayah.number}</div>
          <div class="ayah-status-actions">
            <button class="status-btn ${status === 0 ? 'selected-gray' : ''}" 
                    title="Tandai Belum Hafal"
                    onclick="event.stopPropagation(); setAyahStatus(${surahDetail.number}, ${ayah.number}, 0)">
              ⚪ Belum
            </button>
            <button class="status-btn ${status === 1 ? 'selected-yellow' : ''}" 
                    title="Tandai Sedang Proses Murojaah"
                    onclick="event.stopPropagation(); setAyahStatus(${surahDetail.number}, ${ayah.number}, 1)">
              🟡 Murojaah
            </button>
            <button class="status-btn ${status === 2 ? 'selected-green' : ''}" 
                    title="Tandai Lancar (10x Mutqin)"
                    onclick="event.stopPropagation(); setAyahStatus(${surahDetail.number}, ${ayah.number}, 2)">
              🟢 Lancar
            </button>
          </div>
        </div>

        <div class="arabic-verse-text">${ayah.arabic}</div>

        <div class="latin-transliteration ${AppState.settings.showTransliteration ? '' : 'hidden'}">
          ${ayah.transliteration}
        </div>

        <div class="indonesian-translation ${AppState.settings.showTranslation ? '' : 'hidden'}">
          ${ayah.translation}
        </div>

        <div class="ayah-actions-bar">
          <button class="text-btn" onclick="playSingleAyahDirect(${index})">
            ▶️ Putar Ayat Ini
          </button>
          <button class="text-btn" onclick="openRecordDrawer(${ayah.number})">
            🎙️ Rekam & Bandingkan
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderAyahStatusUI(surahNum, ayahNum, status) {
  const card = document.getElementById(`ayahCard_${ayahNum}`);
  if (!card) return;

  const buttons = card.querySelectorAll('.status-btn');
  if (buttons.length >= 3) {
    buttons[0].className = `status-btn ${status === 0 ? 'selected-gray' : ''}`;
    buttons[1].className = `status-btn ${status === 1 ? 'selected-yellow' : ''}`;
    buttons[2].className = `status-btn ${status === 2 ? 'selected-green' : ''}`;
  }
}

function playSingleAyahDirect(index) {
  audioEngine.loadAndPlay(index);
}

function scrollToAyah(index) {
  const ayah = AppState.currentSurahDetail?.verses[index];
  if (!ayah) return;
  const el = document.getElementById(`ayahCard_${ayah.number}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ==========================================================================
// AUDIO ENGINE HOOKS & CONTROLLER UI
// ==========================================================================

audioEngine.onAyahChange = (data) => {
  // Update Active Ayah Highlight
  document.querySelectorAll('.ayah-card').forEach(el => el.classList.remove('active-ayah', 'in-block'));
  const currentAyahEl = document.getElementById(`ayahCard_${data.ayah.number}`);
  if (currentAyahEl) {
    currentAyahEl.classList.add('active-ayah');
    scrollToAyah(data.index);
  }

  // If in block mode, highlight fellow ayahs in block
  if (data.loopMode === 'block') {
    for (let i = data.blockStart; i <= data.blockEnd; i++) {
      const bEl = document.getElementById(`ayahCard_${i}`);
      if (bEl && i !== data.ayah.number) {
        bEl.classList.add('in-block');
      }
    }
  }

  // Update Range Subtitle
  const rangeInfo = data.loopMode === 'block' 
    ? `Blok Ayat ${data.blockStart} - ${data.blockEnd} (Ayat Aktif: ${data.ayah.number})`
    : `Ayat ${data.ayah.number} dari ${data.total}`;
  document.getElementById('activeRangeIndicator').textContent = rangeInfo;
};

audioEngine.onRepeatChange = (currentRepeat, targetRepeat) => {
  const pill = document.getElementById('repeatCounterPill');
  if (pill) {
    pill.textContent = `[ ${currentRepeat} / ${targetRepeat} ]`;
  }
};

audioEngine.onStateChange = (isPlaying, isPausing = false) => {
  const playBtn = document.getElementById('playMainBtn');
  if (playBtn) {
    playBtn.innerHTML = isPlaying ? '⏸️' : '▶️';
  }

  const pauseBanner = document.getElementById('pauseCountdownBanner');
  if (isPausing) {
    if (pauseBanner) pauseBanner.classList.remove('hidden');
  } else {
    if (pauseBanner) pauseBanner.classList.add('hidden');
  }
};

audioEngine.onPauseTick = (remainingSec, totalSec, percent) => {
  const pauseBanner = document.getElementById('pauseCountdownBanner');
  const pauseSecText = document.getElementById('pauseCountdownSec');
  const pauseFill = document.getElementById('pauseBarFill');

  if (pauseBanner) pauseBanner.classList.remove('hidden');
  if (pauseSecText) pauseSecText.textContent = `Giliran Anda Melafalkan: ${remainingSec}s`;
  if (pauseFill) pauseFill.style.width = `${percent}%`;
};

audioEngine.onProgress = (currentTime, duration, percent) => {
  const scrubber = document.getElementById('audioScrubber');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');

  if (scrubber) scrubber.value = percent;
  if (timeCurrent) timeCurrent.textContent = formatTime(currentTime);
  if (timeTotal) timeTotal.textContent = formatTime(duration);
};

audioEngine.onComplete = () => {
  alert("🎉 Alhamdulillah! Anda telah menyelesaikan seluruh murojaah surah ini. Mari lakukan evaluasi di menu Tes Sambung Ayat!");
};

// Event when an ayah is repeated 10x
window.addEventListener('ayah-mastered', (e) => {
  const { surahNumber, ayahNumber } = e.detail;
  // Upgrade to Mastered (Hijau)
  setAyahStatus(surahNumber, ayahNumber, 2);
});

function formatTime(sec) {
  if (isNaN(sec) || sec === Infinity) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Controller Button Actions
function togglePlay() {
  audioEngine.togglePlay();
}

function prevAyah() {
  audioEngine.prevAyah();
}

function nextAyah() {
  audioEngine.nextAyah();
}

function seekAudio(e) {
  const percent = e.target.value;
  if (audioEngine.audio.duration) {
    audioEngine.audio.currentTime = (percent / 100) * audioEngine.audio.duration;
  }
}

function setTargetRepetitionFromUI(count) {
  AppState.settings.targetRepeat = count;
  audioEngine.setTargetRepeat(count);
  saveSettings();

  document.querySelectorAll('.rep-chip').forEach(c => {
    c.classList.toggle('active', parseInt(c.dataset.val) === count);
  });
}

function setLoopModeFromUI(mode) {
  AppState.settings.loopMode = mode;
  audioEngine.setLoopMode(mode, AppState.settings.blockSize);
  saveSettings();

  document.querySelectorAll('.loop-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.mode === mode);
  });

  if (AppState.currentSurahDetail) {
    audioEngine.notifyAyah();
  }
}

function setPauseGapFromUI(gap) {
  AppState.settings.pauseGap = gap;
  audioEngine.setPauseGap(gap);
  saveSettings();

  document.querySelectorAll('.pause-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.gap === gap);
  });
}

// ==========================================================================
// MODE REKAM & BANDINGKAN (AUDIO COMPARISON MODAL)
// ==========================================================================

let activeRecordingAyah = null;

function openRecordDrawer(ayahNumber) {
  activeRecordingAyah = ayahNumber;
  const modal = document.getElementById('recordModal');
  const ayah = AppState.currentSurahDetail.verses.find(v => v.number === ayahNumber);
  
  if (ayah) {
    document.getElementById('recordModalAyahTitle').textContent = `${AppState.currentSurahDetail.latin} • Ayat ${ayahNumber}`;
    document.getElementById('recordModalArabic').textContent = ayah.arabic;
  }

  document.getElementById('recordStatusText').textContent = "Tekan tombol mikrofon untuk mulai merekam suara Anda";
  document.getElementById('userReciteCard').classList.add('hidden');

  modal.classList.add('open');
}

function closeRecordDrawer() {
  recorderEngine.stopRecording();
  document.getElementById('recordModal').classList.remove('open');
}

function toggleRecordBtn() {
  const btn = document.getElementById('recordTriggerBtn');
  const canvas = document.getElementById('recordCanvas');
  const statusText = document.getElementById('recordStatusText');

  if (recorderEngine.isRecording) {
    recorderEngine.stopRecording();
    btn.classList.remove('recording');
    btn.textContent = '🎙️';
    statusText.textContent = "Rekaman selesai! Dengarkan dan bandingkan dengan lantunan Qari di bawah.";
  } else {
    recorderEngine.startRecording(canvas);
    btn.classList.add('recording');
    btn.textContent = '⏹️';
    statusText.textContent = "Sedang merekam... Bacalah ayat dengan tajwid dan makhraj yang baik.";
  }
}

recorderEngine.onRecordComplete = (audioUrl) => {
  document.getElementById('userReciteCard').classList.remove('hidden');
};

function playQariForComparison() {
  const surahNum = AppState.currentSurahDetail.number;
  const url = getAyahAudioUrl(audioEngine.currentQari.baseUrl, surahNum, activeRecordingAyah);
  const tempAudio = new Audio(url);
  tempAudio.play();
}

function playUserForComparison() {
  recorderEngine.playUserRecitation();
}

function evaluateSelfRecite(statusVal) {
  if (AppState.currentSurahDetail && activeRecordingAyah) {
    setAyahStatus(AppState.currentSurahDetail.number, activeRecordingAyah, statusVal);
    alert(statusVal === 2 
      ? "Alhamdulillah! Ayat ini berhasil ditandai Lancar (Hijau)." 
      : "Status diperbarui menjadi Sedang Murojaah (Kuning). Terus berlatih repetisi!");
    closeRecordDrawer();
  }
}

// ==========================================================================
// QUIZ (TES SAMBUNG AYAT) SCREEN
// ==========================================================================

function renderQuizSurahSelect() {
  const select = document.getElementById('quizSurahSelect');
  if (!select) return;

  select.innerHTML = SURAH_JUZ_30.map(s => `
    <option value="${s.number}">${s.number}. ${s.latin} (${s.verses} Ayat)</option>
  `).join('');
}

async function startQuizFromUI() {
  const select = document.getElementById('quizSurahSelect');
  const surahNum = parseInt(select.value);
  
  const surahDetail = await loadSurahDetail(surahNum);
  if (!surahDetail || surahDetail.verses.length < 2) {
    alert("Surah ini terlalu pendek untuk kuis sambung ayat.");
    return;
  }

  quizEngine.generateQuiz(surahDetail, 5);

  document.getElementById('quizSetupCard').classList.add('hidden');
  document.getElementById('quizPlayCard').classList.remove('hidden');
  document.getElementById('quizResultCard').classList.add('hidden');

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizEngine.getCurrentQuestion();
  if (!q) {
    showQuizResults();
    return;
  }

  document.getElementById('quizIndexTitle').textContent = `Soal ${quizEngine.currentIndex + 1} dari ${quizEngine.totalQuestions}`;
  document.getElementById('quizQuestionArabic').textContent = q.questionAyah.arabic;
  document.getElementById('quizQuestionLatin').textContent = q.questionAyah.transliteration;
  document.getElementById('quizQuestionSurahInfo').textContent = `${q.surahLatin} • Ayat ${q.questionAyah.number}`;

  const container = document.getElementById('quizOptionsContainer');
  container.innerHTML = q.options.map(opt => `
    <button class="quiz-opt-btn" onclick="submitQuizAnswer(${opt.number})">
      <span class="arabic-opt">${opt.arabic}</span>
      <span style="font-size: 0.8rem; color: var(--text-secondary)">Ayat ${opt.number} • ${opt.transliteration || ''}</span>
    </button>
  `).join('');
}

function playQuizQuestionAudio() {
  quizEngine.playQuestionAudio(audioEngine.currentQari.baseUrl);
}

function submitQuizAnswer(selectedAyahNum) {
  const result = quizEngine.checkAnswer(selectedAyahNum);
  const buttons = document.querySelectorAll('.quiz-opt-btn');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerHTML.includes(`Ayat ${result.correctAyahNumber}`)) {
      btn.classList.add('correct');
    } else if (btn.innerHTML.includes(`Ayat ${selectedAyahNum}`) && !result.isCorrect) {
      btn.classList.add('wrong');
    }
  });

  setTimeout(() => {
    quizEngine.nextQuestion();
    renderQuizQuestion();
  }, 1300);
}

function showQuizResults() {
  document.getElementById('quizPlayCard').classList.add('hidden');
  const resultCard = document.getElementById('quizResultCard');
  resultCard.classList.remove('hidden');

  const res = quizEngine.getResults();
  document.getElementById('quizResultScore').textContent = `${res.score} / ${res.total}`;
  document.getElementById('quizResultGrade').textContent = res.grade;
  document.getElementById('quizResultNote').textContent = res.note;
}

function resetQuiz() {
  document.getElementById('quizSetupCard').classList.remove('hidden');
  document.getElementById('quizPlayCard').classList.add('hidden');
  document.getElementById('quizResultCard').classList.add('hidden');
}

// ==========================================================================
// PROFILE & SETTINGS
// ==========================================================================

function syncProfileFormValues() {
  const qariSelect = document.getElementById('profileQariSelect');
  if (qariSelect) {
    qariSelect.innerHTML = QARI_LIST.map(q => `
      <option value="${q.id}" ${q.id === AppState.settings.qariId ? 'selected' : ''}>
        ${q.name} (${q.subtext})
      </option>
    `).join('');
  }

  const fontSlider = document.getElementById('profileFontSlider');
  const fontValLabel = document.getElementById('fontValLabel');
  if (fontSlider) {
    fontSlider.value = AppState.settings.fontSizeArabic;
    if (fontValLabel) fontValLabel.textContent = `${AppState.settings.fontSizeArabic}px`;
  }

  const toggleLatin = document.getElementById('toggleTransliteration');
  if (toggleLatin) toggleLatin.checked = AppState.settings.showTransliteration;

  const toggleTrans = document.getElementById('toggleTranslation');
  if (toggleTrans) toggleTrans.checked = AppState.settings.showTranslation;

  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) themeSelect.value = AppState.settings.theme;
}

function updateQariSelection(qariId) {
  AppState.settings.qariId = qariId;
  audioEngine.setQari(qariId);
  saveSettings();
}

function updateArabicFontSize(size) {
  AppState.settings.fontSizeArabic = size;
  document.documentElement.style.setProperty('--font-size-arabic', `${size}px`);
  document.getElementById('fontValLabel').textContent = `${size}px`;
  saveSettings();
}

function updateTransliterationToggle(checked) {
  AppState.settings.showTransliteration = checked;
  saveSettings();
  document.querySelectorAll('.latin-transliteration').forEach(el => {
    el.classList.toggle('hidden', !checked);
  });
}

function updateTranslationToggle(checked) {
  AppState.settings.showTranslation = checked;
  saveSettings();
  document.querySelectorAll('.indonesian-translation').forEach(el => {
    el.classList.toggle('hidden', !checked);
  });
}

function applyTheme(theme) {
  AppState.settings.theme = theme;
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  saveSettings();
}

function exportProgressJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.memorizationData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `murojaahku_hafalan_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function resetAllProgress() {
  if (confirm("Apakah Anda yakin ingin mengatur ulang (reset) semua data progres hafalan? Tindakan ini tidak dapat dibatalkan.")) {
    AppState.memorizationData = {};
    saveProgress();
    alert("Progres hafalan berhasil di-reset.");
    switchTab('dashboard');
  }
}

// Quick Settings Modal
function openQuickSettingsModal() {
  document.getElementById('quickSettingsModal').classList.add('open');
}

function closeQuickSettingsModal() {
  document.getElementById('quickSettingsModal').classList.remove('open');
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();

  // Search and filter listeners
  const searchInput = document.getElementById('searchSurahInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSurahList();
    });
  }

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      activeFilterCategory = e.target.dataset.category;
      renderSurahList();
    });
  });

  // Init initial view
  switchTab('dashboard');
});
