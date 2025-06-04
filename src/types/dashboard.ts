
export interface FilterState {
  retailer: string;
  brand: string;
  category: string;
  sku: string;
}

export interface Score {
  execution: number;
  quality: number;
  overall: number;
}

export interface TitleData {
  lengthCompliant: boolean;
  minLength: number;
  maxLength: number;
  currentLength: number;
  hasRecommendedStructure: boolean;
  containsSearchTerms: boolean;
  recommendedTitles: string[];
  score: Score;
}

export interface HeroImageData {
  isPresent: boolean;
  isCorrectImage: boolean;
  optimalSizing: boolean;
  imageClarity: 'clear' | 'moderate' | 'blurry';
  textReadable: boolean;
  blockedByUI: boolean;
  imageType: 'enhanced' | 'manual';
  imageUrl: string;
  score: Score;
}

export interface DescriptionData {
  lengthCompliant: boolean;
  minLength: number;
  maxLength: number;
  currentLength: number;
  containsSearchTerms: boolean;
  hasFeaturesBenefits: boolean;
  hasProductContent: boolean;
  hasUsageInstructions: boolean;
  hasUseCases: boolean;
  hasDifferentiators: boolean;
  recommendedDescriptions: string[];
  score: Score;
}

export interface TaxonomyData {
  correctCategory: boolean;
  currentCategory: string;
  recommendedCategory: string;
  score: Score;
}

export interface EnhancedContentData {
  secondaryImagesCount: number;
  hasVideo: boolean;
  hasAPlusContent: boolean;
  productRating: number;
  reviewCount: number;
  reviewSentiment: 'positive' | 'neutral' | 'negative';
  secondaryImageQuality: Score;
  score: Score;
}

export interface SKUData {
  id: string;
  name: string;
  brand: string;
  category: string;
  retailer: string;
  platform: string;
  title: TitleData;
  heroImage: HeroImageData;
  description: DescriptionData;
  taxonomy: TaxonomyData;
  enhancedContent: EnhancedContentData;
  overallScore: Score;
}
