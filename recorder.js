/**
 * MurojaahKu Mode Rekam & Bandingkan
 * Memungkinkan pengguna merekam suara saat melafalkan ayat,
 * melihat visualisasi gelombang suara, dan membandingkan lantunan suara Qari dengan suara sendiri.
 */

class ReciteRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    this.userAudio = new Audio();
    this.isRecording = false;

    // Web Audio API for visualizer
    this.audioCtx = null;
    this.analyser = null;
    this.animFrameId = null;

    // Callbacks
    this.onStateChange = null;
    this.onRecordComplete = null;
  }

  async startRecording(canvasElement) {
    if (this.isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      // Setup audio analyzer for visualizer
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      const source = this.audioCtx.createMediaStreamSource(stream);
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      if (canvasElement) {
        this.startVisualizer(canvasElement);
      }

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        this.userAudio.src = this.audioUrl;
        
        // Stop all mic tracks
        stream.getTracks().forEach(track => track.stop());
        
        if (this.animFrameId) {
          cancelAnimationFrame(this.animFrameId);
        }
        if (this.audioCtx && this.audioCtx.state !== 'closed') {
          this.audioCtx.close();
        }

        if (this.onRecordComplete) {
          this.onRecordComplete(this.audioUrl);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;

      if (this.onStateChange) this.onStateChange(true);
    } catch (err) {
      console.error("Gagal mengakses mikrofon:", err);
      alert("Tidak dapat mengakses mikrofon. Pastikan Anda mengizinkan izin mikrofon di peramban (browser).");
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  toggleRecording(canvasElement) {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording(canvasElement);
    }
  }

  playUserRecitation() {
    if (this.userAudio.src) {
      this.userAudio.currentTime = 0;
      this.userAudio.play();
    }
  }

  pauseUserRecitation() {
    this.userAudio.pause();
  }

  startVisualizer(canvas) {
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        // Gradient emas hijau islami
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#e5b869');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }
}
