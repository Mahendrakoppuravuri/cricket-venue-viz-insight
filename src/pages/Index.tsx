
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import FileUpload from '@/components/FileUpload';
import VenueSelector from '@/components/VenueSelector';
import VenueSummary from '@/components/VenueSummary';
import PerformanceCharts from '@/components/PerformanceCharts';
import MatchHistory from '@/components/MatchHistory';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BarChart3 } from 'lucide-react';

const Index = () => {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleVenueChange = (venueId: string) => {
    setIsLoading(true);
    setSelectedVenue(venueId);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-cricket-bg/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-cricket-green mb-4">
              Cricket Venue Influence Insight System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover data-driven insights about cricket venues, understand pitch behavior, 
              analyze team performances, and explore match statistics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div id="upload">
              <FileUpload />
            </div>
            <div id="venues">
              <VenueSelector 
                selectedVenue={selectedVenue} 
                onVenueChange={handleVenueChange}
              />
            </div>
          </div>
        </div>

        {selectedVenue && (
          <div id="insights" className="max-w-5xl mx-auto mt-8 space-y-8">
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cricket-green/10">
                <BarChart3 className="h-4 w-4 text-cricket-green mr-2" />
                <h2 className="text-md font-medium text-cricket-green">Venue Insights</h2>
              </div>
            </div>
            
            {isLoading ? (
              <LoadingSpinner size="lg" text="Loading venue data..." />
            ) : (
              <>
                <VenueSummary venueId={selectedVenue} />
                <PerformanceCharts venueId={selectedVenue} />
                <MatchHistory venueId={selectedVenue} />
              </>
            )}
          </div>
        )}
        
        {!selectedVenue && !isLoading && (
          <div className="max-w-2xl mx-auto mt-16 text-center p-8 border border-dashed rounded-lg">
            <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Venue Selected</h3>
            <p className="text-muted-foreground">
              Select a cricket venue from the dropdown above to view detailed insights and analytics.
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-white mt-20 border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cricket Venue Influence Insight System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
