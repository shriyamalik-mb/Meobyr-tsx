// src/utils/colorScale.ts

export function getIntensityColor(value: number): [number, number, number] {
    // value is in [0, 1]
    // 1) Anything ≤ 0.5 is pure red
    if (value <= 0.5) {
      return [255, 0, 0];
    }
  
    // 2) Between 0.5 and 0.75 → red → yellow
    if (value <= 0.75) {
      const t = (value - 0.5) / 0.25; // maps 0.50→0, 0.75→1
      const g = Math.round(255 * t); // g goes 0→255
      return [255, g, 0];            // r=255, g interpolates, b=0
    }
  
    // 3) Between 0.75 and 1.0 → yellow → green
    const t = (value - 0.75) / 0.25; // maps 0.75→0, 1.0→1
    const r = Math.round(255 * (1 - t)); // r goes 255→0
    return [r, 255, 0];                  // g=255, b=0
  }
  