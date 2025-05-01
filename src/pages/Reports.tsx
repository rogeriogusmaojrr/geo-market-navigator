
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { regions, timeRanges } from '@/data/mockData';
import { Download, FileText, Mail, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reportTemplates = [
  { id: 1, name: 'Sales Performance Summary', description: 'Overview of sales performance by region and product', type: 'PDF', lastGenerated: '2025-04-25' },
  { id: 2, name: 'Store Positivation Analysis', description: 'Detailed analysis of store positivation rates', type: 'PDF', lastGenerated: '2025-04-22' },
  { id: 3, name: 'Market Penetration Report', description: 'Geographic analysis of market coverage and opportunities', type: 'PDF', lastGenerated: '2025-04-20' },
  { id: 4, name: 'Product Distribution Efficiency', description: 'Analysis of distribution routes and efficiency', type: 'XLSX', lastGenerated: '2025-04-18' },
  { id: 5, name: 'Sales Forecasting Model', description: 'Predictive analysis based on historical data', type: 'XLSX', lastGenerated: '2025-04-15' },
];

const scheduledReports = [
  { id: 1, name: 'Weekly Sales Summary', frequency: 'Weekly', recipients: 'sales@example.com', nextScheduled: '2025-05-06' },
  { id: 2, name: 'Monthly Performance Report', frequency: 'Monthly', recipients: 'management@example.com', nextScheduled: '2025-05-31' },
  { id: 3, name: 'Quarterly Business Review', frequency: 'Quarterly', recipients: 'executives@example.com', nextScheduled: '2025-06-30' },
];

const Reports = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('2');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-gray-600">Generate and manage business reports</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Select a template to generate a custom report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Last Generated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportTemplates.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{report.description}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.type}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{report.lastGenerated}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Report</CardTitle>
              <CardDescription>Generate a custom report with specific filters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="sales">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Analysis</SelectItem>
                    <SelectItem value="stores">Store Performance</SelectItem>
                    <SelectItem value="products">Product Distribution</SelectItem>
                    <SelectItem value="territories">Territory Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-period">Time Period</Label>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger id="time-period">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id.toString()}>
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Include Sections</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="executive-summary" defaultChecked />
                    <Label htmlFor="executive-summary">Executive Summary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="charts" defaultChecked />
                    <Label htmlFor="charts">Charts and Graphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="raw-data" />
                    <Label htmlFor="raw-data">Raw Data Tables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="maps" defaultChecked />
                    <Label htmlFor="maps">Geographic Maps</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automated reports sent on a recurring basis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Next Scheduled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{report.recipients}</TableCell>
                      <TableCell>{report.nextScheduled}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Edit Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Schedule
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Create New Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
