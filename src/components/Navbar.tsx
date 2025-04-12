
import React from 'react';
import { SidebarIcon, BarChart3, Upload, MapPin } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarIcon className="h-6 w-6 text-cricket-green" />
          <h1 className="text-xl font-heading font-semibold text-cricket-green">
            <span className="hidden sm:inline">Venue Influence</span> Insight System
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#upload" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-cricket-green">
            <Upload className="h-4 w-4" />
            Upload Data
          </a>
          <a href="#venues" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-cricket-green">
            <MapPin className="h-4 w-4" />
            Venues
          </a>
          <a href="#insights" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-cricket-green">
            <BarChart3 className="h-4 w-4" />
            Insights
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
