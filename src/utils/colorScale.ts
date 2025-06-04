
export const getIntensityColor = (value: number): [number, number, number, number] => {
  // Values below 0.5 are red
  if (value < 0.5) {
    return [255, 0, 0, 180]; // Red with opacity
  }
  
  // Values between 0.5 and 1.0 interpolate from red to green
  const normalizedValue = (value - 0.5) / 0.5; // Normalize to 0-1 range
  const red = Math.round(255 * (1 - normalizedValue));
  const green = Math.round(255 * normalizedValue);
  
  return [red, green, 0, 180]; // RGBA
};
