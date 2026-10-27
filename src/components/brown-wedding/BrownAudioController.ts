/**
 * Scoped Audio Controller for Brown Luxury Wedding Card
 * Provides:
 * 1. Background romantic soundtrack playback with polite autoplay handling
 * 2. Web Audio API synthesized romantic piano/harp ambient chords (zero network latency fallback)
 * 3. Soft chime and wax-seal audio effects
 */

class BrownAudioController {
  private audioCtx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlayingSynth: boolean = false;
  private synthInterval: number | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Check saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bw_card_muted');
      this.isMuted = saved === 'true';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('bw_card_muted', String(this.isMuted));
    } catch {
      // Ignore storage errors
    }

    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }

    if (this.isMuted) {
      this.stopAmbientSynth();
    } else {
      this.startAmbientSynth();
    }

    this.listeners.forEach((l) => l(this.isMuted));
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    if (this.isMuted === muted) return;
    this.toggleMute();
  }

  /**
   * Initializes background music.
   * If a custom audio file is provided and accessible, it uses it.
   * Otherwise, it runs a gentle romantic harmonic synthesizer via Web Audio.
   */
  public startMusic(audioSrc?: string): void {
    if (this.isMuted) return;

    if (audioSrc) {
      try {
        if (!this.bgAudio) {
          this.bgAudio = new Audio(audioSrc);
          this.bgAudio.loop = true;
          this.bgAudio.volume = 0.45;
        }
        this.bgAudio.muted = this.isMuted;
        this.bgAudio.play().catch(() => {
          // If browser blocks unmuted autoplay, activate synth ambient mode on user gesture
          this.startAmbientSynth();
        });
        return;
      } catch {
        // Fallback to synth
      }
    }

    this.startAmbientSynth();
  }

  public pauseMusic(): void {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientSynth();
  }

  /**
   * Ambient Romantic Piano / Harp Chords (Web Audio API)
   * Uses gentle pure sine/triangle waves with smooth exponential decay.
   * Key: F Major / D Minor romantic progression [F3, A3, C4, E4, G4]
   */
  public startAmbientSynth(): void {
    if (this.isMuted || this.isPlayingSynth) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isPlayingSynth = true;

    const chords = [
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [146.83, 220.00, 261.63, 349.23], // Dm7 (D3, A3, C4, F4)
      [130.81, 196.00, 261.63, 329.63], // Cmaj (C3, G3, C4, E4)
      [164.81, 220.00, 261.63, 329.63], // Am7 (A2, A3, C4, E4)
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.isPlayingSynth || this.isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle stagger for harp-like acoustic roll
        const startTime = ctx.currentTime + i * 0.12;
        const duration = 4.8;

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.035 / (i + 1), startTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    };

    playChord();
    this.synthInterval = window.setInterval(playChord, 5200);
  }

  public stopAmbientSynth(): void {
    this.isPlayingSynth = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  /**
   * Delicate crystal chime sound for card opening
   */
  public playCardOpenChime(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 1.4;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  }

  /**
   * Wax Seal tap sound: soft resonant low-thump and golden shimmer chime
   */
  public playSealBreakSound(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Resonant soft tap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);

    // Sparkle shimmer
    [880, 1174.66, 1760].forEach((freq, idx) => {
      const sOsc = ctx.createOscillator();
      const sGain = ctx.createGain();
      sOsc.type = 'sine';
      sOsc.frequency.setValueAtTime(freq, ctx.currentTime);

      const start = ctx.currentTime + 0.06 + idx * 0.05;
      sGain.gain.setValueAtTime(0.0001, start);
      sGain.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
      sGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);

      sOsc.connect(sGain);
      sGain.connect(ctx.destination);
      sOsc.start(start);
      sOsc.stop(start + 0.82);
    });
  }
}

export const brownAudio = new BrownAudioController();
