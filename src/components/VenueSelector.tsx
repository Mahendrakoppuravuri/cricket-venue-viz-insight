
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { venues, Venue } from '@/data/venues';

interface VenueSelectorProps {
  selectedVenue: string | null;
  onVenueChange: (venueId: string) => void;
}

const VenueSelector: React.FC<VenueSelectorProps> = ({ selectedVenue, onVenueChange }) => {
  const handleVenueChange = (value: string) => {
    onVenueChange(value);
  };
  
  // Group venues by country
  const venuesByCountry: Record<string, Venue[]> = venues.reduce((acc, venue) => {
    if (!acc[venue.country]) {
      acc[venue.country] = [];
    }
    acc[venue.country].push(venue);
    return acc;
  }, {} as Record<string, Venue[]>);
  
  const countries = Object.keys(venuesByCountry).sort();
  
  return (
    <div className="cricket-card">
      <h2 className="text-xl font-semibold mb-4">Select Venue</h2>
      <p className="text-muted-foreground mb-6">
        Choose a cricket venue to view detailed performance insights and statistics.
      </p>
      
      <div className="w-full">
        <Select value={selectedVenue || undefined} onValueChange={handleVenueChange}>
          <SelectTrigger className="w-full py-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cricket-green" />
              <SelectValue placeholder="Select a venue" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectGroup key={country}>
                <SelectLabel>{country}</SelectLabel>
                {venuesByCountry[country].map(venue => (
                  <SelectItem key={venue.id} value={venue.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{venue.name}</span>
                      <span className="text-xs text-muted-foreground">{venue.location}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {selectedVenue && (
          <div className="mt-6 p-4 bg-cricket-accent/30 rounded-md">
            {venues.find(v => v.id === selectedVenue) && (
              <div>
                <h3 className="text-lg font-medium">
                  {venues.find(v => v.id === selectedVenue)?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {venues.find(v => v.id === selectedVenue)?.location}, 
                  {venues.find(v => v.id === selectedVenue)?.country}
                </p>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Capacity:</span> {venues.find(v => v.id === selectedVenue)?.capacity.toLocaleString()} spectators
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueSelector;
