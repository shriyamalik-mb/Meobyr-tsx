
export interface DistributionPoint {
  lat: number;
  lng: number;
  value: number; // quality score ∈ [0, 1]
}

export const distributionData: DistributionPoint[] = [
  { lat: 25.112707, lng: 55.192918, value: 0.79 }, // Al Barsha 1 – BRS
  { lat: 25.090744, lng: 55.237969, value: 0.79 }, // Al Barsha South – BST
  { lat: 25.342135, lng: 55.407654, value: 0.71 }, // Al Ghubaiba – SHJ – GBB
  { lat: 25.139583, lng: 55.218699, value: 0.79 }, // Al Qouz – AQZ
  { lat: 25.188683, lng: 55.405375, value: 0.79 }, // Al Warqa 1
  { lat: 25.228185, lng: 55.348836, value: 0.79 }, // Business Bay
  { lat: 25.204781, lng: 55.264026, value: 0.79 }, // Dubai Marina – MRN
  { lat: 25.046101, lng: 55.235555, value: 0.79 }, // Dubai Motor City
  { lat: 25.258090, lng: 55.297558, value: 0.71 }, // Dubai Silicon Oasis – DSO
  { lat: 25.000000, lng: 55.000000, value: 0.79 }, // Jazira – JZR
  { lat: 25.353447, lng: 55.405739, value: 0.79 }, // Jumeirah 1 – JMR
  { lat: 24.364017, lng: 54.476949, value: 0.85 }, // Mussafah – MSF
  { lat: 25.198553, lng: 55.386017, value: 0.85 }, // Nad Al Hamar – NHM
  { lat: 25.107430, lng: 55.145837, value: 0.79 }, // Palm Jumeirah – PAJ
  { lat: 25.253757, lng: 55.331950, value: 0.85 }, // Port Saeed – DRA
  { lat: 25.300000, lng: 55.433500, value: 0.85 }, // Quasais – QSS
  { lat: 25.571769, lng: 56.237259, value: 0.77 }, // Refa`ah – RFA
  { lat: 24.210114, lng: 55.752871, value: 0.85 }, // Uptown Mirdiff – UMD
  { lat: 25.387138, lng: 55.420316, value: 1.0 }, // Zone 1 – ZNE
];
