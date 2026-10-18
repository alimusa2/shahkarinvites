// Ambient wedding sound generator using Web Audio API
// Produces a meditative, warm, soothing harp & acoustic string harmony
class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + delay + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration + 0.1);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Play an initial chime chord
    const playChord = () => {
      if (!this.isPlaying) return;
      const root = this.notes[Math.floor(Math.random() * 4)];
      const third = this.notes[2 + Math.floor(Math.random() * 3)];
      const fifth = this.notes[4 + Math.floor(Math.random() * 4)];

      this.playTone(root, 3.5, 0);
      this.playTone(third, 3.2, 0.4);
      this.playTone(fifth, 4.0, 0.8);
    };

    playChord();
    this.intervalId = window.setInterval(playChord, 3500);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundGenerator();
