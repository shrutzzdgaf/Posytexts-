/**
 * POSYTEXTS.COM — Web Audio Micro-Interaction Synthesizer
 * Pure Web Audio API — zero external mp3/audio files needed.
 * Works seamlessly offline with soft chimes, paper rustles, and wax stamp thuds.
 */

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('posytexts_muted') === 'true';
    this.pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('posytexts_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  /**
   * Plays a delicate chime/bell note when a flower blooms.
   * Maps character index or letter code to a harmonized pentatonic frequency.
   */
  playBloomNote(letter = 'A', index = 0) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const code = letter.toUpperCase().charCodeAt(0) - 65;
      const noteIdx = Math.abs((code + index) % this.pentatonicNotes.length);
      const freq = this.pentatonicNotes[noteIdx];

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Subtle pitch vibrato
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  /**
   * Plays a soft paper rustling whisper when letters fold, unfold, or change paper.
   */
  playPaperRustle() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.23);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  /**
   * Plays a warm wax stamp thud + chime when sealing an envelope.
   */
  playWaxSeal() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Soft bass thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);

      // Sweet metallic stamp ring
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        const ringNow = this.ctx.currentTime;
        const ringOsc = this.ctx.createOscillator();
        const ringGain = this.ctx.createGain();

        ringOsc.type = 'sine';
        ringOsc.frequency.setValueAtTime(1046.5, ringNow); // C6

        ringGain.gain.setValueAtTime(0.15, ringNow);
        ringGain.gain.exponentialRampToValueAtTime(0.0001, ringNow + 0.8);

        ringOsc.connect(ringGain);
        ringGain.connect(this.ctx.destination);

        ringOsc.start(ringNow);
        ringOsc.stop(ringNow + 0.85);
      }, 70);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  /**
   * Arpeggiated sparkle chords when the recipient opens the envelope.
   */
  playSparkleUnseal() {
    if (this.muted) return;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.muted) return;
        try {
          this.init();
          if (!this.ctx) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.65);
        } catch (e) {}
      }, idx * 110);
    });
  }
}

const audioSynth = new AudioSynth();
