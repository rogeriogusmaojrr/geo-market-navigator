
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesChart from '@/components/SalesChart';
import { monthlySalesData, productPerformanceData, regionSalesData, regions, storeTypes, timeRanges } from '@/data/mockData';

const Sales = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('2');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStoreType, setSelectedStoreType] = useState('all');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Sales Analytics</h1>
            <p className="text-gray-600">In-depth analysis of your sales performance</p>
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

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart 
                title="Revenue Trends"
                description="Monthly revenue for the selected period"
                data={monthlySalesData}
                type="area"
                height={400}
                colors={['#1E88E5', '#26A69A']}
                yAxisLabel="Revenue ($)"
                showLegend
              />
              
              <SalesChart 
                title="Regional Performance"
                description="Sales distribution by region"
                data={regionSalesData}
                type="bar"
                height={400}
                colors={['#5C6BC0']}
                yAxisLabel="Revenue ($)"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sales Growth Analysis</CardTitle>
                <CardDescription>Year-over-year growth rate by month</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart 
                  title=""
                  data={[
                    { name: 'Jan', value: 12.5 },
                    { name: 'Feb', value: 15.4 },
                    { name: 'Mar', value: 4.2 },
                    { name: 'Apr', value: 13.8 },
                    { name: 'May', value: 16.9 },
                    { name: 'Jun', value: 3.5 },
                    { name: 'Jul', value: 7.2 },
                    { name: 'Aug', value: 9.8 },
                    { name: 'Sep', value: 10.7 },
                    { name: 'Oct', value: 1.5 },
                    { name: 'Nov', value: 9.8 },
                    { name: 'Dec', value: 17.5 }
                  ]}
                  type="line"
                  height={300}
                  colors={['#26A69A']}
                  yAxisLabel="Growth (%)"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Velocity</CardTitle>
                <CardDescription>Daily sales rate for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart 
                  title=""
                  data={[
                    { name: 'Week 1', value: 125000 },
                    { name: 'Week 2', value: 142000 },
                    { name: 'Week 3', value: 158000 },
                    { name: 'Week 4', value: 136000 },
                    { name: 'Week 5', value: 170000 },
                    { name: 'Week 6', value: 182000 },
                    { name: 'Week 7', value: 190000 },
                    { name: 'Week 8', value: 174000 },
                    { name: 'Week 9', value: 185000 },
                    { name: 'Week 10', value: 196000 },
                    { name: 'Week 11', value: 205000 },
                    { name: 'Week 12', value: 215000 }
                  ]}
                  type="line"
                  height={400}
                  colors={['#1E88E5']}
                  yAxisLabel="Revenue ($)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Analysis</CardTitle>
                <CardDescription>Quarterly sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart 
                  title=""
                  data={[
                    { name: 'Q1 2023', value: 1450000, previous: 1320000 },
                    { name: 'Q2 2023', value: 1790000, previous: 1650000 },
                    { name: 'Q3 2023', value: 2020000, previous: 1850000 },
                    { name: 'Q4 2023', value: 2320000, previous: 2150000 },
                    { name: 'Q1 2024', value: 1680000, previous: 1450000 },
                    { name: 'Q2 2024', value: 1950000, previous: 1790000 },
                  ]}
                  type="bar"
                  height={400}
                  colors={['#5C6BC0', '#9575CD']}
                  yAxisLabel="Revenue ($)"
                  showLegend
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Revenue by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart 
                    title=""
                    data={productPerformanceData}
                    type="bar"
                    height={400}
                    colors={['#5C6BC0']}
                    yAxisLabel="Revenue ($)"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Mix</CardTitle>
                  <CardDescription>Proportion of sales by product</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      Pie chart would be implemented here in a full version
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Growth Trends</CardTitle>
                <CardDescription>Year-over-year growth by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart 
                  title=""
                  data={[
                    { name: 'Product A', value: 17.5 },
                    { name: 'Product B', value: 12.3 },
                    { name: 'Product C', value: 21.8 },
                    { name: 'Product D', value: 8.7 },
                    { name: 'Product E', value: -3.2 },
                  ]}
                  type="bar"
                  height={300}
                  colors={['#26A69A']}
                  yAxisLabel="Growth (%)"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Sales by geographic region</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart 
                  title=""
                  data={regionSalesData}
                  type="bar"
                  height={400}
                  colors={['#5C6BC0']}
                  yAxisLabel="Revenue ($)"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Growth</CardTitle>
                  <CardDescription>Year-over-year growth by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart 
                    title=""
                    data={[
                      { name: 'North', value: 14.5 },
                      { name: 'South', value: 9.8 },
                      { name: 'East', value: 17.2 },
                      { name: 'West', value: 15.9 },
                      { name: 'Central', value: 6.3 },
                    ]}
                    type="bar"
                    height={300}
                    colors={['#26A69A']}
                    yAxisLabel="Growth (%)"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Performance by Region</CardTitle>
                  <CardDescription>Average revenue per store by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart 
                    title=""
                    data={[
                      { name: 'North', value: 284000 },
                      { name: 'South', value: 235000 },
                      { name: 'East', value: 315000 },
                      { name: 'West', value: 298000 },
                      { name: 'Central', value: 225000 },
                    ]}
                    type="bar"
                    height={300}
                    colors={['#1E88E5']}
                    yAxisLabel="Avg Revenue ($)"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sales;
