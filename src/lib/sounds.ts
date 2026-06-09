let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function play(freq: number, type: OscillatorType, duration: number, vol = 0.3) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

export function sfxCorrect() {
  const c = getCtx()
  const now = c.currentTime
  ;[523, 659, 784].forEach((freq, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.25, now + i * 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(now + i * 0.08)
    osc.stop(now + i * 0.08 + 0.2)
  })
}

export function sfxWrong() {
  play(200, 'sawtooth', 0.3, 0.2)
  setTimeout(() => play(150, 'sawtooth', 0.4, 0.15), 100)
}

export function sfxTap() {
  play(800, 'sine', 0.05, 0.15)
}

export function sfxCashout() {
  const c = getCtx()
  const now = c.currentTime
  ;[523, 659, 784, 1047].forEach((freq, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.2, now + i * 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(now + i * 0.1)
    osc.stop(now + i * 0.1 + 0.3)
  })
}

export function sfxLaser() {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(2000, c.currentTime)
  osc.frequency.exponentialRampToValueAtTime(100, c.currentTime + 0.5)
  gain.gain.setValueAtTime(0.2, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.5)
}

export function sfxBust() {
  const c = getCtx()
  const now = c.currentTime
  for (let i = 0; i < 5; i++) {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'square'
    osc.frequency.value = 80 + Math.random() * 60
    gain.gain.setValueAtTime(0.15, now + i * 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(now + i * 0.06)
    osc.stop(now + i * 0.06 + 0.15)
  }
}

export function sfxSuspense() {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(200, c.currentTime)
  osc.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.6)
  gain.gain.setValueAtTime(0.18, c.currentTime)
  gain.gain.setValueAtTime(0.18, c.currentTime + 0.5)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.65)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.65)
}

export function sfxStreak() {
  const c = getCtx()
  const now = c.currentTime
  ;[784, 988, 1175, 1318].forEach((freq, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.15, now + i * 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(now + i * 0.06)
    osc.stop(now + i * 0.06 + 0.15)
  })
}
