
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SearchMedia = () => {
  return (
    <div className="min-h-screen bg-[#F4F1DE] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#283044] mb-8">Search Media</h1>
        
        <Card className="border-[#C1CFDA]">
          <CardHeader className="bg-[#182825] text-white">
            <CardTitle>Search Media Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <p className="text-[#283044]">
              Track and analyze your search media performance and advertising campaigns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchMedia;
