const goldenRatioConjugate = 0.618033988749895
let h = Math.random()

export default {
  generateRandomColor (saturation, value) {
    h += goldenRatioConjugate
    h %= 1
    return this.hsv_to_rgb(h, saturation, value)
  },

  hsv_to_rgb (h, s, v) {
    const hi = Math.floor(h * 6)
    const f = h * 6 - hi
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r = 0
    let g = 0
    let b = 0

    switch (parseInt(hi)) {
      case 0:
        r = v
        g = t
        b = p
        break

      case 1:
        r = q
        g = v
        b = p
        break

      case 2:
        r = p
        g = v
        b = t
        break

      case 3:
        r = p
        g = q
        b = v
        break

      case 4:
        r = t
        g = p
        b = v
        break

      case 5:
        r = v
        g = p
        b = q
        break
    }

    return {
      r: Math.floor(r * 256),
      g: Math.floor(g * 256),
      b: Math.floor(b * 256)
    }
  }
}
