import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart as BarChartIcon, Package, CheckCircle, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import KpiCard from '@/components/content/KpiCard';
import PerformanceDistributionChart from '@/components/content/PerformanceDistributionChart';
import ContentTypePerformanceList from '@/components/content/ContentTypePerformanceList';
import CustomBarChart from '@/components/content/BarChart';
import PlatformCarousel from '@/components/content/PlatformCarousel';

// Reusable Components
const KpiCircle = ({ title, subtitle, value, delta, size = "large" }: { title: any; subtitle: any; value: any; delta: any; size?: string }) => {
  const sizeClasses = size === "small" ? "w-16 h-16" : "w-24 h-24";
  const textSizeClasses = size === "small" ? "text-lg" : "text-xl";
  
  return (
    <div className="text-center">
      <p className="text-sm font-medium text-gray-700 mb-4">{title}</p>
      <div className={`relative ${sizeClasses} mx-auto`}>
        <svg className={`${sizeClasses} transform -rotate-90`}>
          <circle cx="50%" cy="50%" r="40%" stroke="#E5E7EB" strokeWidth="8" fill="none" />
          <circle
            cx="50%" cy="50%" r="40%"
            stroke="#548687" strokeWidth="8" fill="none"
            strokeDasharray={`${value * 2.51} 251`} strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${textSizeClasses} font-bold text-brand-navy`}>{value}%</span>
          <span className={`text-xs ${delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{delta}</span>
        </div>
      </div>
      {subtitle && <p className="text-xs text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
};

const RecommendedActionCard = ({ title, subtitle, impact }: { title: string; subtitle: string; impact: string }) => (
  <div className="flex items-center justify-between p-4 border border-brand-light rounded-lg hover:shadow-md transition-shadow duration-200">
    <div className="flex-1">
      <h3 className="font-medium text-brand-navy mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
    <div className="ml-4">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-sage text-white">
        {impact}
      </span>
    </div>
  </div>
);

const ScoreListColumn = ({ title, items }: { title: string; items: Array<{name: string; score: number}> }) => (
  <div className="bg-white rounded-lg p-4 border border-brand-light">
    <h3 className="font-semibold text-brand-navy mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{item.name}</span>
          <span className="px-2 py-1 bg-brand-light text-brand-navy text-xs font-medium rounded">
            {item.score}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ContentFieldBar = ({ field, score, delta }: { field: string; score: number; delta: string }) => (
  <div className="flex items-center justify-between mb-3">
    <span className="text-sm text-gray-700 w-32">{field}</span>
    <div className="flex-1 mx-4">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-brand-sage h-2 rounded-full" 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
    <span className={`text-xs w-8 ${delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {delta}
    </span>
  </div>
);

const PlatformSlide = ({ platform, overallScore, executionScore, qualityScore, contentScores }: {
  platform: string;
  overallScore: { value: number; delta: string };
  executionScore: { value: number; delta: string };
  qualityScore: { value: number; delta: string };
  contentScores: Array<{ field: string; score: number; delta: string }>;
}) => (
  <div className="bg-white rounded-lg p-6 border border-brand-light min-w-[400px] mx-2">
    <h3 className="text-xl font-bold text-brand-navy mb-6">{platform}</h3>
    
    <div className="grid grid-cols-3 gap-4 mb-6">
      <KpiCircle 
        title="Overall Score" 
        subtitle=""
        value={overallScore.value} 
        delta={overallScore.delta} 
        size="small" 
      />
      <KpiCircle 
        title="Execution Score" 
        subtitle=""
        value={executionScore.value} 
        delta={executionScore.delta} 
        size="small" 
      />
      <KpiCircle 
        title="Quality Score" 
        subtitle=""
        value={qualityScore.value} 
        delta={qualityScore.delta} 
        size="small" 
      />
    </div>
    
    <div>
      <h4 className="font-medium text-brand-navy mb-3">Content Field Breakdown</h4>
      {contentScores.map((content, index) => (
        <ContentFieldBar key={index} {...content} />
      ))}
    </div>
  </div>
);

const ContentDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompetition, setShowCompetition] = useState(false);
  const location = useLocation();
  
  const tabItems = [
    { title: 'Dashboard', path: '/content/dashboard' },
    { title: 'Title', path: '/content/title' },
    { title: 'Hero Image', path: '/content/hero-image' },
    { title: 'Description', path: '/content/description' },
    { title: 'Taxonomy', path: '/content/taxonomy' },
    { title: 'Enhanced Content', path: '/content/enhanced-content' }
  ];

  // Sample data
  const recommendedActions = [
    {
      title: "Fix content execution issues on Talabat",
      subtitle: "Talabat has the lowest execution score out of all platforms",
      impact: "+5"
    },
    {
      title: "Improve hero images for Amazon listings",
      subtitle: "Current images are below quality standards",
      impact: "+8"
    },
    {
      title: "Update product descriptions for Uber Eats",
      subtitle: "Missing key product features and benefits",
      impact: "+3"
    }
  ];

  const platformData = [
    { name: "Amazon", score: 78 },
    { name: "Pharmacy", score: 76 },
    { name: "Walmart", score: 72 },
    { name: "Target", score: 79 },
    { name: "E-commerce", score: 77 }
  ];

  const retailerData = [
    { name: "Amazon", score: 78 },
    { name: "CVS", score: 77 },
    { name: "Walmart", score: 72 },
    { name: "Target", score: 78 },
    { name: "Carrefour", score: 77 }
  ];

  const productData = [
    { name: "Nivea Bodywash", score: 89 },
    { name: "Head & Shoulders", score: 84 },
    { name: "Dove Soap", score: 81 },
    { name: "Pantene Shampoo", score: 77 },
    { name: "Oral-B Toothbrush", score: 73 }
  ];

  const competitorSlides = [
    {
      platform: "Amazon",
      overallScore: { value: 80, delta: "+5" },
      executionScore: { value: 80, delta: "+5" },
      qualityScore: { value: 80, delta: "+5" },
      contentScores: [
        { field: "Title Score", score: 90, delta: "+5" },
        { field: "Hero Image Score", score: 60, delta: "-6" },
        { field: "Description Score", score: 70, delta: "+5" },
        { field: "A+/B+ Score", score: 40, delta: "-6" }
      ]
    },
    {
      platform: "Uber Eats",
      overallScore: { value: 75, delta: "+3" },
      executionScore: { value: 85, delta: "+7" },
      qualityScore: { value: 65, delta: "-1" },
      contentScores: [
        { field: "Title Score", score: 85, delta: "+3" },
        { field: "Hero Image Score", score: 70, delta: "+2" },
        { field: "Description Score", score: 80, delta: "+8" },
        { field: "A+/B+ Score", score: 55, delta: "-2" }
      ]
    },
    {
      platform: "Instacart",
      overallScore: { value: 68, delta: "-2" },
      executionScore: { value: 72, delta: "+1" },
      qualityScore: { value: 64, delta: "-5" },
      contentScores: [
        { field: "Title Score", score: 75, delta: "-1" },
        { field: "Hero Image Score", score: 55, delta: "-8" },
        { field: "Description Score", score: 65, delta: "+3" },
        { field: "A+/B+ Score", score: 45, delta: "-4" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % competitorSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + competitorSlides.length) % competitorSlides.length);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-brand-light">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    location.pathname === tab.path
                      ? 'border-brand-sage text-brand-sage'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-8">
          <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Content Dashboard</h1>
        </div>
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Overall Score"
              value="75%"
              subtitle="↘ -1 from last week"
              icon={
                <div className="w-12 h-12 bg-brand-sage/20 rounded-full flex items-center justify-center">
                  <BarChartIcon className="w-6 h-6 text-brand-sage" />
                </div>
              }
            />
            <KpiCard
              title="Total SKUs"
              value="120"
              subtitle="↗ +12 this month"
              icon={
                <div className="w-12 h-12 bg-brand-navy/20 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-brand-navy" />
                </div>
              }
            />
            <KpiCard
              title="High Performers"
              value="56"
              subtitle="SKUs scoring 80%+"
              icon={
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              }
            />
            <KpiCard
              title="Needs Attention"
              value="14"
              subtitle="SKUs scoring <60%"
              valueColor="text-brand-brick"
              icon={
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
              }
            />
          </div>

          {/* Recommended Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-brand-navy">Recommended Actions</h2>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showCompetition}
                  onChange={(e) => setShowCompetition(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Show Competition</span>
              </label>
            </div>
            <div className="space-y-4">
              {recommendedActions.map((action, index) => (
                <RecommendedActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Performance Distribution and Content Type Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceDistributionChart />
            <ContentTypePerformanceList />
          </div>

          {/* Platform and Retailer Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomBarChart 
              title="Platform Performance" 
              data={platformData} 
              color="#548687" 
            />
            <CustomBarChart 
              title="Retailer Performance" 
              data={retailerData} 
              color="#A52A2A" 
            />
          </div>

          {/* Platform Detail Carousel */}
          <PlatformCarousel />
        </div>
      </main>
    </div>
  );
};

export default ContentDashboard;
