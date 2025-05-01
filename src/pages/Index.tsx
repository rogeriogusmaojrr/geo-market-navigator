
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Globe, Map, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Map className="h-8 w-8 text-geo-primary" />
            <span className="ml-2 text-2xl font-bold text-gray-800">GeoMarket</span>
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 lg:pr-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Location-based 
            <span className="text-geo-primary"> Business Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Make smarter business decisions with powerful geospatial analytics. Visualize sales data, optimize store locations, and unlock regional market insights.
          </p>
          <div className="flex space-x-4">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=2070&auto=format&fit=crop"
              alt="Geomarketing Dashboard" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Geomarketing Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive tools for location-based business intelligence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <MapPin className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Mapping</h3>
            <p className="text-gray-600">
              Interactive maps with multiple layers for sales territories, store locations, and customer distribution.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <BarChart className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">
              Comprehensive dashboards with real-time data visualization for sales performance and market trends.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Globe className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Regional Insights</h3>
            <p className="text-gray-600">
              Understand geographic variations in customer behavior and optimize regional marketing strategies.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Users className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Multi-tenant System</h3>
            <p className="text-gray-600">
              Secure access control with admin and client roles, ensuring data isolation between organizations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Map className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Heat Maps</h3>
            <p className="text-gray-600">
              Visualize high-performing regions and identify untapped market opportunities with intuitive heat maps.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ArrowRight className="text-geo-primary h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Export & Reports</h3>
            <p className="text-gray-600">
              Generate customized reports and export data in multiple formats for further analysis and presentations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-geo-primary py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your business intelligence?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join companies using GeoMarket to make data-driven decisions and optimize their retail strategies.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Map className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">GeoMarket</span>
              </div>
              <p className="mt-4 max-w-xs text-gray-400">
                Location-based business intelligence for retail and industrial companies.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Case Studies</a></li>
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 GeoMarket. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                {/* Icon would go here */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                {/* Icon would go here */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                {/* Icon would go here */}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
