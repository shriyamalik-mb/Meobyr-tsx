// src/utils/colorScaleDist.ts

export function getIntensityColor(value: number): [number, number, number] {
    // 1) For values <= 0.5 → red → yellow
    if (value <= 0.5) {
      const t = (value - 0.5) / 0.5; // maps 0.50→0, 0.0→-1
      const g = Math.round(255 * t); // g goes from negative → 0
      return [255, Math.max(0, g), 0]; // Clamp to avoid negative green
    }
  
    // 2) For values > 0.5 → yellow → green
    const t = (value - 0.5) / 0.5; // maps 0.5→0, 1.0→1
    const r = Math.round(255 * (1 - t)); // r goes 255→0
    return [r, 255, 0]; // g=255, b=0
  }
  