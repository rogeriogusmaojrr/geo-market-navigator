
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MapComponent from '@/components/MapComponent';
import { regions, storeTypes } from '@/data/mockData';
import { Search, Filter, MapPin } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockStores = [
  { id: 1, name: "Downtown Market", type: "Supermarket", region: "North", address: "123 Main St, New York, NY", revenue: "$285,450", positivation: "95%" },
  { id: 2, name: "Corner Express", type: "Convenience Store", region: "South", address: "456 Pine Ave, Miami, FL", revenue: "$124,750", positivation: "82%" },
  { id: 3, name: "MegaMart Center", type: "Department Store", region: "East", address: "789 Oak Rd, Boston, MA", revenue: "$542,320", positivation: "97%" },
  { id: 4, name: "Fashion Boutique", type: "Specialty Store", region: "West", address: "321 Cedar Ln, Los Angeles, CA", revenue: "$187,920", positivation: "76%" },
  { id: 5, name: "Budget Bazaar", type: "Discount Store", region: "Central", address: "654 Elm St, Chicago, IL", revenue: "$310,580", positivation: "89%" },
  { id: 6, name: "Quick Stop", type: "Convenience Store", region: "North", address: "987 Maple Ave, Buffalo, NY", revenue: "$98,450", positivation: "71%" },
  { id: 7, name: "Gourmet Gallery", type: "Specialty Store", region: "West", address: "135 Sunset Blvd, San Francisco, CA", revenue: "$215,780", positivation: "92%" },
  { id: 8, name: "Value Village", type: "Discount Store", region: "South", address: "246 Palm Dr, Orlando, FL", revenue: "$275,340", positivation: "85%" },
  { id: 9, name: "Metro Center", type: "Department Store", region: "East", address: "579 River St, Philadelphia, PA", revenue: "$492,670", positivation: "94%" },
  { id: 10, name: "Local Grocer", type: "Supermarket", region: "Central", address: "864 Lake View, Detroit, MI", revenue: "$325,120", positivation: "88%" },
];

const Stores = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStoreType, setSelectedStoreType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = mockStores.filter(store => {
    const regionMatch = selectedRegion === 'all' || store.region === regions.find(r => r.id.toString() === selectedRegion)?.name;
    const typeMatch = selectedStoreType === 'all' || store.type === storeTypes.find(t => t.id.toString() === selectedStoreType)?.name;
    const searchMatch = !searchTerm || 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      store.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return regionMatch && typeMatch && searchMatch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Store Locations</h1>
            <p className="text-gray-600">Manage and analyze your retail network</p>
          </div>

          <Button>
            <MapPin className="mr-2 h-4 w-4" />
            Add New Store
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Store Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <MapComponent />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Store Directory</CardTitle>
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search stores by name or address..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
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

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Positivation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.length > 0 ? (
                    filteredStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.name}</TableCell>
                        <TableCell>{store.type}</TableCell>
                        <TableCell>{store.region}</TableCell>
                        <TableCell>{store.address}</TableCell>
                        <TableCell>{store.revenue}</TableCell>
                        <TableCell>{store.positivation}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No stores found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Stores;
