
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getVenueMatches, MatchData } from '@/data/venues';
import { CalendarIcon, Trophy } from 'lucide-react';

interface MatchHistoryProps {
  venueId: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ venueId }) => {
  const matches = getVenueMatches(venueId);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="cricket-card">
      <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
      
      {matches.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Recent matches played at this venue</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead className="text-center">Scores</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formatDate(match.date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={match.winner === match.teams[0] ? "font-medium" : ""}>
                        {match.teams[0]} 
                        {match.winner === match.teams[0] && (
                          <Trophy className="h-3.5 w-3.5 text-amber-500 inline-block ml-1" />
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <span className={match.winner === match.teams[1] ? "font-medium" : ""}>
                        {match.teams[1]}
                        {match.winner === match.teams[1] && (
                          <Trophy className="h-3.5 w-3.5 text-amber-500 inline-block ml-1" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <span>{match.scores[0]}</span>
                      <span className="text-xs text-muted-foreground">-</span>
                      <span>{match.scores[1]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-medium text-cricket-green">{match.winner}</span>
                      <span className="text-xs text-muted-foreground">
                        Player of the Match: {match.playerOfMatch}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">No match data available for this venue.</p>
        </div>
      )}
    </div>
  );
};

export default MatchHistory;
