
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PricePromotionsAnalytics = () => {
  const location = useLocation();
  
  const tabItems = [
    { title: 'Dashboard', path: '/price-promotions/dashboard' },
    { title: 'Analytics', path: '/price-promotions/analytics' },
    { title: 'Promotions Database', path: '/price-promotions/promotions-database' }
  ];

  // State for toggles
  const [performanceMetric, setPerformanceMetric] = useState('discount');
  const [categoryView, setCategoryView] = useState('retailer');
  const [categoryBrand, setCategoryBrand] = useState('our');

  // Performance Analytics Data
  const performanceData = [
    {
      month: 'Jan',
      ourDiscount: 20.0,
      compDiscount: 21.0,
      ourPrice: 18.5,
      compPrice: 18.8
    },
    {
      month: 'Feb',
      ourDiscount: 21.3,
      compDiscount: 22.5,
      ourPrice: 19.0,
      compPrice: 19.3
    },
    {
      month: 'Mar',
      ourDiscount: 19.8,
      compDiscount: 20.5,
      ourPrice: 18.2,
      compPrice: 18.7
    },
    {
      month: 'Apr',
      ourDiscount: 22.1,
      compDiscount: 24.3,
      ourPrice: 19.4,
      compPrice: 19.7
    },
    {
      month: 'May',
      ourDiscount: 21.7,
      compDiscount: 22.0,
      ourPrice: 19.1,
      compPrice: 19.2
    },
    {
      month: 'Jun',
      ourDiscount: 22.5,
      compDiscount: 23.0,
      ourPrice: 19.6,
      compPrice: 19.8
    }
  ];

  // Category Bar Chart Data
  const categoryDataRetailerOur = [
    { name: 'Body Lotion', Carrefour: 18, Walmart: 20, Target: 17, Kroger: 19 },
    { name: 'Face Cream', Carrefour: 22, Walmart: 23, Target: 21, Kroger: 22 },
    { name: 'Body Wash', Carrefour: 15, Walmart: 16, Target: 14, Kroger: 15 },
    { name: 'Shampoo', Carrefour: 20, Walmart: 21, Target: 19, Kroger: 20 }
  ];

  const categoryDataPlatformOur = [
    { name: 'Body Lotion', Amazon: 18, 'Uber Eats': 19, Instacart: 17, DoorDash: 19 },
    { name: 'Face Cream', Amazon: 22, 'Uber Eats': 23, Instacart: 21, DoorDash: 22 },
    { name: 'Body Wash', Amazon: 15, 'Uber Eats': 16, Instacart: 14, DoorDash: 15 },
    { name: 'Shampoo', Amazon: 20, 'Uber Eats': 21, Instacart: 19, DoorDash: 20 }
  ];

  const categoryDataRetailerComp = [
    { name: 'Body Lotion', Carrefour: 19, Walmart: 21, Target: 18, Kroger: 20 },
    { name: 'Face Cream', Carrefour: 23, Walmart: 24, Target: 22, Kroger: 23 },
    { name: 'Body Wash', Carrefour: 16, Walmart: 17, Target: 15, Kroger: 16 },
    { name: 'Shampoo', Carrefour: 21, Walmart: 22, Target: 20, Kroger: 21 }
  ];

  const categoryDataPlatformComp = [
    { name: 'Body Lotion', Amazon: 19, 'Uber Eats': 20, Instacart: 18, DoorDash: 20 },
    { name: 'Face Cream', Amazon: 23, 'Uber Eats': 24, Instacart: 22, DoorDash: 23 },
    { name: 'Body Wash', Amazon: 16, 'Uber Eats': 17, Instacart: 15, DoorDash: 16 },
    { name: 'Shampoo', Amazon: 21, 'Uber Eats': 22, Instacart: 20, DoorDash: 21 }
  ];

  const getCurrentCategoryData = () => {
    if (categoryView === 'retailer' && categoryBrand === 'our') return categoryDataRetailerOur;
    if (categoryView === 'retailer' && categoryBrand === 'competitors') return categoryDataRetailerComp;
    if (categoryView === 'platform' && categoryBrand === 'our') return categoryDataPlatformOur;
    return categoryDataPlatformComp;
  };

  const getYAxisLabel = () => {
    return performanceMetric === 'discount' ? 'Discount %' : 'Average Price ($)';
  };

  const getOurDataKey = () => {
    return performanceMetric === 'discount' ? 'ourDiscount' : 'ourPrice';
  };

  const getCompDataKey = () => {
    return performanceMetric === 'discount' ? 'compDiscount' : 'compPrice';
  };

  const getOurLabel = () => {
    return performanceMetric === 'discount' ? 'Our Discount %' : 'Our Avg Price';
  };

  const getCompLabel = () => {
    return performanceMetric === 'discount' ? 'Competitor Discount %' : 'Competitor Avg Price';
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="px-6 pt-6">
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

        {/* Analytics Content */}
        <div className="p-6 space-y-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-8">Price and Promotions Analytics</h1>
          
          {/* Filters Section */}
          <Card className="border-brand-light">
            <CardHeader>
              <CardTitle className="text-brand-navy">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">Brand</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand1">Brand 1</SelectItem>
                      <SelectItem value="brand2">Brand 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="haircare">Haircare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">Product</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product1">Product 1</SelectItem>
                      <SelectItem value="product2">Product 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">SKU</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SKU" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sku1">SKU-001</SelectItem>
                      <SelectItem value="sku2">SKU-002</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">Retailer</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retailer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="carrefour">Carrefour</SelectItem>
                      <SelectItem value="walmart">Walmart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-2">Platform</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="ubereats">Uber Eats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics Line Chart */}
          <Card className="border-brand-light">
            <CardHeader>
              <CardTitle className="text-brand-navy">Performance Analytics</CardTitle>
              <p className="text-sm text-gray-600">Track performance over time</p>
              <div className="flex justify-end">
                <ToggleGroup type="single" value={performanceMetric} onValueChange={setPerformanceMetric}>
                  <ToggleGroupItem value="discount" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Discount %
                  </ToggleGroupItem>
                  <ToggleGroupItem value="price" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Avg Price
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C1CFDA" />
                    <XAxis dataKey="month" tick={{ fill: '#283044' }} />
                    <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} tick={{ fill: '#283044' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #C1CFDA',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey={getOurDataKey()} 
                      stroke="#A52A2A" 
                      name={getOurLabel()}
                      strokeWidth={3}
                      dot={{ fill: '#A52A2A', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={getCompDataKey()} 
                      stroke="#548687" 
                      name={getCompLabel()}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      dot={{ fill: '#548687', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Average Discount Rate by Category Bar Chart */}
          <Card className="border-brand-light">
            <CardHeader>
              <CardTitle className="text-brand-navy">Average Discount Rate by Category</CardTitle>
              <p className="text-sm text-gray-600">Breakdown by retailer</p>
              <div className="flex gap-4">
                <ToggleGroup type="single" value={categoryView} onValueChange={setCategoryView}>
                  <ToggleGroupItem value="retailer" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Retailer
                  </ToggleGroupItem>
                  <ToggleGroupItem value="platform" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Platform
                  </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" value={categoryBrand} onValueChange={setCategoryBrand}>
                  <ToggleGroupItem value="our" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Our Brand
                  </ToggleGroupItem>
                  <ToggleGroupItem value="competitors" className="data-[state=on]:bg-brand-sage data-[state=on]:text-white">
                    Competitors
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getCurrentCategoryData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C1CFDA" />
                    <XAxis dataKey="name" tick={{ fill: '#283044' }} />
                    <YAxis label={{ value: 'Discount %', angle: -90, position: 'insideLeft' }} tick={{ fill: '#283044' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #C1CFDA',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    {categoryView === 'retailer' ? (
                      <>
                        <Bar dataKey="Carrefour" fill="#A52A2A" />
                        <Bar dataKey="Walmart" fill="#548687" />
                        <Bar dataKey="Target" fill="#283044" />
                        <Bar dataKey="Kroger" fill="#C1CFDA" />
                      </>
                    ) : (
                      <>
                        <Bar dataKey="Amazon" fill="#A52A2A" />
                        <Bar dataKey="Uber Eats" fill="#548687" />
                        <Bar dataKey="Instacart" fill="#283044" />
                        <Bar dataKey="DoorDash" fill="#C1CFDA" />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PricePromotionsAnalytics;
