
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PricePromotions = () => {
  return (
    <div className="min-h-screen bg-[#F4F1DE] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#283044] mb-8">Price and Promotions</h1>
        
        <Card className="border-[#C1CFDA]">
          <CardHeader className="bg-[#A52A2A] text-white">
            <CardTitle>Pricing & Promotional Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <p className="text-[#283044]">
              Monitor and optimize your pricing strategies and promotional campaigns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricePromotions;
