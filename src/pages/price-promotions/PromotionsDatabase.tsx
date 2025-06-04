
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Filter, Download, Search } from 'lucide-react';

const PromotionsDatabase = () => {
  const location = useLocation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const tabItems = [
    { title: 'Dashboard', path: '/price-promotions/dashboard' },
    { title: 'Analytics', path: '/price-promotions/analytics' },
    { title: 'Promotions Database', path: '/price-promotions/promotions-database' }
  ];

  const activePromotions = [
    {
      brandLabel: "Competitor A",
      category: "Body Lotion",
      product: "Moisturizing Cream 500ml",
      sku: "SKU-001",
      retailer: "Carrefour",
      platform: "Amazon",
      promotionType: "BOGO",
      discount: "50%",
      description: "Buy One Get One Free on premium moisturizing cream"
    },
    {
      brandLabel: "Competitor B",
      category: "Face Cream",
      product: "Anti-Aging Serum 30ml",
      sku: "SKU-002",
      retailer: "Walmart",
      platform: "Instacart",
      promotionType: "Discount",
      discount: "25%",
      description: "25% off on all anti-aging products"
    },
    {
      brandLabel: "Our Brand",
      category: "Body Wash",
      product: "Refreshing Body Wash 400ml",
      sku: "SKU-003",
      retailer: "Target",
      platform: "Uber Eats",
      promotionType: "Bundle",
      discount: "30%",
      description: "Bundle deal - buy 3 get 30% off"
    },
    {
      brandLabel: "Competitor C",
      category: "Shampoo",
      product: "Strengthening Shampoo 250ml",
      sku: "SKU-004",
      retailer: "Kroger",
      platform: "DoorDash",
      promotionType: "BOGO",
      discount: "40%",
      description: "Limited time BOGO offer"
    }
  ];

  const filteredPromotions = activePromotions.filter(promotion =>
    searchTerm === '' || 
    Object.values(promotion).some(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

        {/* Promotions Database Content */}
        <div className="p-6 space-y-6">
          {/* Page Heading & Controls */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-brand-navy">Active Promotions Database</h1>
              <p className="text-gray-600 mt-2">Monitor all active promotions across retailers and channels</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleContent>
              <Card className="border-brand-light">
                <CardHeader>
                  <CardTitle className="text-brand-navy flex items-center gap-2">
                    Filters
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Filter Dropdowns */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-navy mb-2">Brand</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="our-brand">Our Brand</SelectItem>
                          <SelectItem value="competitor-a">Competitor A</SelectItem>
                          <SelectItem value="competitor-b">Competitor B</SelectItem>
                          <SelectItem value="competitor-c">Competitor C</SelectItem>
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
                          <SelectItem value="body-lotion">Body Lotion</SelectItem>
                          <SelectItem value="face-cream">Face Cream</SelectItem>
                          <SelectItem value="body-wash">Body Wash</SelectItem>
                          <SelectItem value="shampoo">Shampoo</SelectItem>
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
                          <SelectItem value="product1">Moisturizing Cream 500ml</SelectItem>
                          <SelectItem value="product2">Anti-Aging Serum 30ml</SelectItem>
                          <SelectItem value="product3">Refreshing Body Wash 400ml</SelectItem>
                          <SelectItem value="product4">Strengthening Shampoo 250ml</SelectItem>
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
                          <SelectItem value="sku3">SKU-003</SelectItem>
                          <SelectItem value="sku4">SKU-004</SelectItem>
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
                          <SelectItem value="target">Target</SelectItem>
                          <SelectItem value="kroger">Kroger</SelectItem>
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
                          <SelectItem value="instacart">Instacart</SelectItem>
                          <SelectItem value="ubereats">Uber Eats</SelectItem>
                          <SelectItem value="doordash">DoorDash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-brand-navy mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search promotions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-sage focus:border-transparent"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Active Promotions Table */}
          <Card className="border-brand-light">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-brand-navy">
                  Active Promotions ({filteredPromotions.length})
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Showing 1–{filteredPromotions.length} of {filteredPromotions.length}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Retailer</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Promotion Type</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPromotions.map((promotion, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge 
                          variant={promotion.brandLabel === "Our Brand" ? "default" : "outline"}
                          className={promotion.brandLabel === "Our Brand" ? "bg-brand-sage text-white" : ""}
                        >
                          {promotion.brandLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>{promotion.category}</TableCell>
                      <TableCell>{promotion.product}</TableCell>
                      <TableCell>{promotion.sku}</TableCell>
                      <TableCell>{promotion.retailer}</TableCell>
                      <TableCell>{promotion.platform}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {promotion.promotionType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{promotion.discount}</span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={promotion.description}>
                        {promotion.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-center text-sm text-gray-600 mt-2">Page 1 of 1</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PromotionsDatabase;
