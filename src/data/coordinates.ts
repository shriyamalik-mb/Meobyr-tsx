
export interface LatLng {
  lat: number;
  lng: number;
}

// A mapping from location name → { lat, lng }
export const coordinates: Record<string, LatLng> = {
  "Al Barsha 1 - BRS":        { lat: 25.112707, lng: 55.192918 },
  "Al Barsha South - BST":   { lat: 25.090744, lng: 55.237969 },
  "Al Ghubaiba - SHJ - GBB": { lat: 25.342135, lng: 55.407654 },
  "Al Qouz - AQZ":           { lat: 25.139583, lng: 55.218699 },
  "Al Warqa 1":              { lat: 25.188683, lng: 55.405375 },
  "Business Bay":            { lat: 25.228185, lng: 55.348836 },
  "Dubai Marina - MRN":       { lat: 25.204781, lng: 55.264026 },
  "Dubai Motor City":        { lat: 25.046101, lng: 55.235555 },
  "Dubai Silicon Oasis - DSO": { lat: 25.258090, lng: 55.297558 },
  "Jazira - JZR":            { lat: 25.0,      lng: 55.0      },
  "Jumeirah 1 - JMR":         { lat: 25.353447, lng: 55.405739 },
  "Mussafah - MSF":          { lat: 24.364017, lng: 54.476949 },
  "Nad Al Hamar - NHM":       { lat: 25.198553, lng: 55.386017 },
  "Palm Jumeirah - PAJ":      { lat: 25.107430, lng: 55.145837 },
  "Port Saeed - DRA":         { lat: 25.253757, lng: 55.331950 },
  "Quasais - QSS":           { lat: 25.300000, lng: 55.433500 },
  "Refa`ah - RFA":           { lat: 25.571769, lng: 56.237259 },
  "Uptown Mirdiff - UMD":     { lat: 24.210114, lng: 55.752871 },
  "Zone 1 - ZNE":            { lat: 25.387138, lng: 55.420316 },
};
