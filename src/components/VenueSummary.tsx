
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Activity, Target, ChevronUp, ChevronDown } from 'lucide-react';
import { getVenueSummaryData, VenueSummaryData } from '@/data/venues';
import { Progress } from '@/components/ui/progress';

interface VenueSummaryProps {
  venueId: string;
}

const VenueSummary: React.FC<VenueSummaryProps> = ({ venueId }) => {
  const venueData: VenueSummaryData = getVenueSummaryData(venueId);
  
  const getPitchBehaviorColor = (behavior: string) => {
    switch (behavior) {
      case 'batting':
        return 'text-orange-500';
      case 'bowling':
        return 'text-blue-500';
      default:
        return 'text-purple-500';
    }
  };

  const getPitchBehaviorDescription = (behavior: string) => {
    switch (behavior) {
      case 'batting':
        return 'Batting-friendly pitch with high scores, flat surface, and minimal assistance for bowlers.';
      case 'bowling':
        return 'Bowling-friendly pitch offering seam movement, bounce, and/or spin assistance.';
      default:
        return 'Balanced pitch offering something for both batsmen and bowlers throughout the match.';
    }
  };
  
  return (
    <div className="cricket-card">
      <h2 className="text-xl font-semibold mb-4">Venue Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Average Scores</h3>
            <Activity className="h-4 w-4 text-cricket-green" />
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm">1st Innings</span>
                <span className="font-medium">{venueData.avgFirstInningsScore.toFixed(1)}</span>
              </div>
              <Progress value={venueData.avgFirstInningsScore / 3} className="h-1 mt-1" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm">2nd Innings</span>
                <span className="font-medium">{venueData.avgSecondInningsScore.toFixed(1)}</span>
              </div>
              <Progress value={venueData.avgSecondInningsScore / 3} className="h-1 mt-1" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-muted-foreground">
            <div className="flex justify-between items-center">
              <span>Difference</span>
              <span className="font-semibold text-cricket-green">
                {(venueData.avgFirstInningsScore - venueData.avgSecondInningsScore).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Win Percentage</h3>
            <Target className="h-4 w-4 text-cricket-green" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <ArrowUpCircle className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm">Batting First</span>
              </div>
              <span className="text-2xl font-bold mt-1">
                {venueData.battingFirstWinPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-10 border-l border-gray-200"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <ArrowDownCircle className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm">Chasing</span>
              </div>
              <span className="text-2xl font-bold mt-1">
                {venueData.chasingWinPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="bg-gray-100 rounded-full h-2 mb-1">
              <div 
                className="bg-cricket-green h-2 rounded-full" 
                style={{ width: `${venueData.battingFirstWinPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Batting First</span>
              <span>Chasing</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Pitch Behavior</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              venueData.pitchBehavior === 'batting' ? 'bg-orange-50 text-orange-600' :
              venueData.pitchBehavior === 'bowling' ? 'bg-blue-50 text-blue-600' :
              'bg-purple-50 text-purple-600'
            }`}>
              {venueData.pitchBehavior.charAt(0).toUpperCase() + venueData.pitchBehavior.slice(1)}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {getPitchBehaviorDescription(venueData.pitchBehavior)}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-muted-foreground">Run Rate:</span>
              <div className="font-medium mt-1">{venueData.avgRunRate.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-muted-foreground">Avg Wickets:</span>
              <div className="font-medium mt-1">{venueData.avgWickets.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <ChevronUp className="h-5 w-5 text-green-600 mr-2" />
            <span>Highest Team Score</span>
          </div>
          <span className="text-lg font-bold">{venueData.highestTeamScore}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
          <div className="flex items-center">
            <ChevronDown className="h-5 w-5 text-red-600 mr-2" />
            <span>Lowest Team Score</span>
          </div>
          <span className="text-lg font-bold">{venueData.lowestTeamScore}</span>
        </div>
      </div>
    </div>
  );
};

export default VenueSummary;
