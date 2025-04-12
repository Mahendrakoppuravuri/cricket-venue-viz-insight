
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { getTeamPerformance, getPlayerPerformance, TeamPerformanceData, PlayerPerformanceData } from '@/data/venues';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PerformanceChartsProps {
  venueId: string;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ venueId }) => {
  const teamData = getTeamPerformance(venueId);
  const playerData = getPlayerPerformance(venueId);
  
  // Add win percentage to team data
  const teamDataWithWinPercentage = teamData.map(team => ({
    ...team,
    winPercentage: Math.round((team.wins / team.matches) * 100)
  }));
  
  // Filter players for batting & bowling charts
  const topBatsmen = [...playerData]
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 5);
    
  const topBowlers = [...playerData]
    .filter(player => player.wickets > 0)
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 5);

  // Colors for the charts
  const COLORS = ['#1A5D1A', '#7DCE13', '#3E8914', '#D1E7DD', '#5BB318'];
  
  return (
    <div className="cricket-card">
      <h2 className="text-xl font-semibold mb-4">Performance Analysis</h2>
      
      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="teams">Team Performance</TabsTrigger>
          <TabsTrigger value="players">Player Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams" className="space-y-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-md font-medium mb-4">Team Win Percentage</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamDataWithWinPercentage}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Win Rate']}
                    labelStyle={{ color: '#333' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="winPercentage" name="Win %" fill="#1A5D1A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-md font-medium mb-4">Matches Played</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="matches"
                    >
                      {teamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [value, 'Matches']}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-md font-medium mb-4">Average Score</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={teamData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip 
                      formatter={(value: number) => [value, 'Avg Score']}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="avgScore" stroke="#7DCE13" activeDot={{ r: 8 }} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="players" className="space-y-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-md font-medium mb-4">Top Batsmen (by Runs)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topBatsmen}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="player" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [value, name === 'avgStrikeRate' ? 'Strike Rate' : 'Runs']}
                    labelStyle={{ color: '#333' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="runs" name="Runs" fill="#1A5D1A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgStrikeRate" name="Strike Rate" fill="#7DCE13" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-md font-medium mb-4">Top Bowlers (by Wickets)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topBowlers}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="player" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value, 
                      name === 'wickets' ? 'Wickets' : 'Economy'
                    ]}
                    labelStyle={{ color: '#333' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="wickets" name="Wickets" fill="#1A5D1A" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="avgEconomy" name="Economy" fill="#D1E7DD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceCharts;
