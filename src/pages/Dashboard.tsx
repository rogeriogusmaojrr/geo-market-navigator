
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapComponent from '@/components/MapComponent';
import SalesChart from '@/components/SalesChart';
import { ArrowUp, ArrowDown, Store, DollarSign, Users, TrendingUp } from 'lucide-react';
import { keyMetrics, monthlySalesData, productPerformanceData, regionSalesData, regions, storeTypes, timeRanges } from '@/data/mockData';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('2');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStoreType, setSelectedStoreType] = useState('all');

  // Function to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Overview of your business performance</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.id} value={range.id.toString()}>
                    {range.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id.toString()}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStoreType} onValueChange={setSelectedStoreType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Store Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Store Types</SelectItem>
                {storeTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${formatNumber(keyMetrics.totalRevenue)}</h3>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-geo-primary" />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">12.5%</span>
                <span className="text-gray-500 text-sm ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Stores</p>
                  <h3 className="text-2xl font-bold mt-1">{formatNumber(keyMetrics.totalStores)}</h3>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Store className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">4.2%</span>
                <span className="text-gray-500 text-sm ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Average Ticket</p>
                  <h3 className="text-2xl font-bold mt-1">${formatNumber(keyMetrics.averageTicket)}</h3>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">7.8%</span>
                <span className="text-gray-500 text-sm ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Market Penetration</p>
                  <h3 className="text-2xl font-bold mt-1">{keyMetrics.marketPenetration}%</h3>
                </div>
                <div className="bg-orange-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 text-sm">1.3%</span>
                <span className="text-gray-500 text-sm ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Geographic Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
              <MapComponent />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center">
              <SalesChart 
                title=""
                data={regionSalesData}
                type="bar"
                height={440}
                yAxisLabel="Sales ($)"
              />
            </CardContent>
          </Card>
        </div>

        {/* More Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart 
            title="Monthly Sales Trend"
            description="Current period vs previous period"
            data={monthlySalesData}
            type="area"
            height={350}
            colors={['#1E88E5', '#26A69A']}
            yAxisLabel="Revenue ($)"
            showLegend
          />
          
          <SalesChart 
            title="Product Performance"
            description="Sales by product category"
            data={productPerformanceData}
            type="bar"
            height={350}
            colors={['#5C6BC0']}
            yAxisLabel="Revenue ($)"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
