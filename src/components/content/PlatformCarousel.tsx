
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PlatformDetailCard from './PlatformDetailCard';

interface PlatformData {
  platform: string;
  overallScore: { value: number; delta: string };
  executionScore: { value: number; delta: string };
  qualityScore: { value: number; delta: string };
  contentScores: Array<{ field: string; score: number; delta: string }>;
}

const PlatformCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const platformData: PlatformData[] = [
    {
      platform: "Amazon",
      overallScore: { value: 77, delta: "+5" },
      executionScore: { value: 77, delta: "+5" },
      qualityScore: { value: 76, delta: "+5" },
      contentScores: [
        { field: "Title", score: 76, delta: "+5" },
        { field: "Hero Image", score: 78, delta: "-6" },
        { field: "Description", score: 78, delta: "+5" },
        { field: "A+ / B+", score: 79, delta: "-6" }
      ]
    },
    {
      platform: "Uber Eats",
      overallScore: { value: 75, delta: "+3" },
      executionScore: { value: 85, delta: "+7" },
      qualityScore: { value: 65, delta: "-1" },
      contentScores: [
        { field: "Title", score: 85, delta: "+3" },
        { field: "Hero Image", score: 70, delta: "+2" },
        { field: "Description", score: 80, delta: "+8" },
        { field: "A+ / B+", score: 55, delta: "-2" }
      ]
    },
    {
      platform: "Instacart",
      overallScore: { value: 68, delta: "-2" },
      executionScore: { value: 72, delta: "+1" },
      qualityScore: { value: 64, delta: "-5" },
      contentScores: [
        { field: "Title", score: 75, delta: "-1" },
        { field: "Hero Image", score: 55, delta: "-8" },
        { field: "Description", score: 65, delta: "+3" },
        { field: "A+ / B+", score: 45, delta: "-4" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % platformData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + platformData.length) % platformData.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-brand-navy">Platform Performance Details</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} of {platformData.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            disabled={currentSlide === platformData.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {platformData.map((platform, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <PlatformDetailCard {...platform} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformCarousel;
