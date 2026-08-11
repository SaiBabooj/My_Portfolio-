let ctx = null

export function isSoundEnabled() {
  try {
    return localStorage.getItem('sfx') !== '0'
  } catch {
    return true
  }
}

export function setSoundEnabled(on) {
  try {
    localStorage.setItem('sfx', on ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function blip(freq, dur, type = 'square', gain = 0.05, when = 0, slideTo = null) {
  if (!isSoundEnabled()) return
  try {
    const c = getCtx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.setValueAtTime(freq, c.currentTime + when)
    if (slideTo) {
      o.frequency.exponentialRampToValueAtTime(
        slideTo,
        c.currentTime + when + dur
      )
    }
    g.gain.setValueAtTime(gain, c.currentTime + when)
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + when + dur)
    o.connect(g)
    g.connect(c.destination)
    o.start(c.currentTime + when)
    o.stop(c.currentTime + when + dur + 0.03)
  } catch {
    /* audio blocked — silent */
  }
}

export function playClick() {
  blip(880, 0.05, 'square', 0.035, 0, 620)
}

export function playNav() {
  blip(520, 0.08, 'square', 0.045, 0, 900)
}

export function playKey() {
  blip(1250, 0.02, 'square', 0.018, 0, 1100)
}

export function playLoadStart() {
  blip(340, 0.18, 'sawtooth', 0.04, 0, 95)
}

export function playLoadDone() {
  blip(660, 0.09, 'square', 0.045, 0)
  blip(990, 0.12, 'square', 0.045, 0.09)
}

export function playBootDone() {
  blip(440, 0.07, 'square', 0.04, 0)
  blip(660, 0.07, 'square', 0.04, 0.08)
  blip(880, 0.12, 'square', 0.04, 0.16)
}
