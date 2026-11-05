// Web Audio API Synthesized Sacred Soundscape & Interactive FX
class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private tanpuraOscs: OscillatorNode[] = []
  private isMuted: boolean = false
  private isSoundEnabled: boolean = false
  private windGain: GainNode | null = null
  private windFilter: BiquadFilterNode | null = null

  public init(enableSound: boolean = true) {
    if (this.ctx) return
    this.isSoundEnabled = enableSound
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(enableSound ? 0.35 : 0.0001, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)

      if (enableSound) {
        this.startTanpura()
        this.initWindSynth()
      }
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e)
    }
  }

  public enableAudioWithInteraction() {
    if (!this.ctx) {
      this.init(true)
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.isSoundEnabled = true
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.5)
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (!this.masterGain || !this.ctx) return
    const target = muted ? 0.00001 : 0.35
    this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1)
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  public getIsSoundEnabled(): boolean {
    return this.isSoundEnabled
  }

  // 1. Tanpura Synthesizer (Sa-Pa-Sa'-Sa)
  private startTanpura() {
    if (!this.ctx || !this.masterGain) return
    const freqs = [138.59, 138.59 * 1.003, 207.65, 277.18] // C# tuning

    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      // Jawari buzz LFO
      const lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      lfo.frequency.setValueAtTime(0.18 + i * 0.06, this.ctx.currentTime)
      lfoGain.gain.setValueAtTime(0.7, this.ctx.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.start()

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start()
      this.tanpuraOscs.push(osc)
    })
  }

  // 2. Wind Synthesizer for Storm scene
  private initWindSynth() {
    if (!this.ctx || !this.masterGain) return
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    this.windFilter = this.ctx.createBiquadFilter()
    this.windFilter.type = 'bandpass'
    this.windFilter.frequency.setValueAtTime(320, this.ctx.currentTime)
    this.windFilter.Q.setValueAtTime(3.0, this.ctx.currentTime)

    this.windGain = this.ctx.createGain()
    this.windGain.gain.setValueAtTime(0.0001, this.ctx.currentTime)

    whiteNoise.connect(this.windFilter)
    this.windFilter.connect(this.windGain)
    this.windGain.connect(this.masterGain)
    whiteNoise.start()
  }

  public setStormIntensity(intensity: number) { // 1 to 4
    if (!this.ctx || !this.windGain || !this.windFilter) return
    const t = this.ctx.currentTime
    const gainVal = [0.0001, 0.04, 0.12, 0.28, 0.45][intensity] || 0.01
    const cutoff = [200, 350, 600, 1100, 1800][intensity] || 350

    this.windGain.gain.setTargetAtTime(gainVal, t, 0.3)
    this.windFilter.frequency.setTargetAtTime(cutoff, t, 0.3)

    if (intensity >= 3) {
      this.triggerThunder()
    }
  }

  // 3. Cinematic Quote Gate Resonant Chime
  public playQuoteChime() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime

    // Deep sub-bass pulse
    const subOsc = this.ctx.createOscillator()
    const subGain = this.ctx.createGain()
    subOsc.type = 'sine'
    subOsc.frequency.setValueAtTime(65, t)
    subOsc.frequency.exponentialRampToValueAtTime(30, t + 1.2)

    subGain.gain.setValueAtTime(0.6, t)
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8)

    subOsc.connect(subGain)
    subGain.connect(this.masterGain)
    subOsc.start(t)
    subOsc.stop(t + 2)

    // Temple Bell Ring
    this.playTempleBell(880, 4.0, 0.3)
  }

  // 4. Temple Bell
  public playTempleBell(freq: number = 740, decay: number = 3.5, vol: number = 0.25) {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t)

    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.00001, t + decay)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + decay + 0.1)
  }

  // 5. Thunder Rumble
  public triggerThunder() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(75, t)
    osc.frequency.exponentialRampToValueAtTime(25, t + 2.5)

    gain.gain.setValueAtTime(0.001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 3)
  }

  // 6. Chariot Gallop & Reins Sound
  public playHorseWhinny() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(450, t)
    osc.frequency.linearRampToValueAtTime(620, t + 0.3)
    osc.frequency.linearRampToValueAtTime(320, t + 0.7)

    gain.gain.setValueAtTime(0.08, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 0.85)
  }

  // 7. Breathing Chime (Inhale/Exhale harmonic cue)
  public playBreathTone(isInhale: boolean) {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const freq = isInhale ? 392 : 261.63 // G4 (upward) or C4 (grounding)
    this.playTempleBell(freq, 2.5, 0.15)
  }

  // 8. Kintsugi Fracture & Gold Flow Synthesis
  public playKintsugiCrack() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime

    // High transient snap
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(1800, t)
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.18)
    gain.gain.setValueAtTime(0.25, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 0.25)
  }

  public playGoldFlow() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const freqs = [528, 660, 792, 1056]
    freqs.forEach((freq, i) => {
      setTimeout(() => {
        this.playTempleBell(freq, 2.8, 0.12)
      }, i * 160)
    })
  }

  // 9. Offer a Worry Star Chime
  public playStarAscend() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(432, t)
    osc.frequency.exponentialRampToValueAtTime(864, t + 1.2)
    gain.gain.setValueAtTime(0.001, t)
    gain.gain.exponentialRampToValueAtTime(0.2, t + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4)
    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 2.5)
  }

  // 10. Well Descent Subterranean Drone & Ascent Resonance
  public playWellDescent() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(90, t)
    osc.frequency.exponentialRampToValueAtTime(40, t + 2.0)
    gain.gain.setValueAtTime(0.18, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5)
    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 2.6)
  }

  public playWellAscent() {
    if (!this.ctx || !this.masterGain || this.isMuted) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, t)
    osc.frequency.exponentialRampToValueAtTime(330, t + 1.8)
    gain.gain.setValueAtTime(0.001, t)
    gain.gain.exponentialRampToValueAtTime(0.22, t + 1.2)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2)
    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 2.3)
  }
}

export const audioEngine = new AudioEngine()
