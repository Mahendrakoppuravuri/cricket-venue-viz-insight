
export interface Venue {
  id: string;
  name: string;
  location: string;
  country: string;
  capacity: number;
}

export const venues: Venue[] = [
  {
    id: "wankhede",
    name: "Wankhede Stadium",
    location: "Mumbai, Maharashtra",
    country: "India",
    capacity: 33108
  },
  {
    id: "eden-gardens",
    name: "Eden Gardens",
    location: "Kolkata, West Bengal",
    country: "India",
    capacity: 66000
  },
  {
    id: "chepauk",
    name: "M. A. Chidambaram Stadium",
    location: "Chennai, Tamil Nadu",
    country: "India",
    capacity: 50000
  },
  {
    id: "chinnaswamy",
    name: "M. Chinnaswamy Stadium",
    location: "Bangalore, Karnataka",
    country: "India",
    capacity: 40000
  },
  {
    id: "mcg",
    name: "Melbourne Cricket Ground",
    location: "Melbourne, Victoria",
    country: "Australia",
    capacity: 100024
  },
  {
    id: "scg",
    name: "Sydney Cricket Ground",
    location: "Sydney, New South Wales",
    country: "Australia",
    capacity: 48000
  },
  {
    id: "gabba",
    name: "The Gabba",
    location: "Brisbane, Queensland",
    country: "Australia",
    capacity: 42000
  },
  {
    id: "lords",
    name: "Lord's Cricket Ground",
    location: "London",
    country: "England",
    capacity: 30000
  },
  {
    id: "oval",
    name: "The Oval",
    location: "London",
    country: "England",
    capacity: 25500
  },
  {
    id: "wanderers",
    name: "Wanderers Stadium",
    location: "Johannesburg",
    country: "South Africa",
    capacity: 34000
  }
];

export interface VenueSummaryData {
  avgFirstInningsScore: number;
  avgSecondInningsScore: number;
  battingFirstWinPercentage: number;
  chasingWinPercentage: number;
  avgRunRate: number;
  avgWickets: number;
  pitchBehavior: "batting" | "bowling" | "balanced";
  highestTeamScore: number;
  lowestTeamScore: number;
}

// Mock venue summary data
export const getVenueSummaryData = (venueId: string): VenueSummaryData => {
  // In a real app, this would come from an API
  const mockData: Record<string, VenueSummaryData> = {
    "wankhede": {
      avgFirstInningsScore: 175.3,
      avgSecondInningsScore: 161.8,
      battingFirstWinPercentage: 56.7,
      chasingWinPercentage: 43.3,
      avgRunRate: 8.76,
      avgWickets: 7.2,
      pitchBehavior: "batting",
      highestTeamScore: 235,
      lowestTeamScore: 87
    },
    "eden-gardens": {
      avgFirstInningsScore: 162.4,
      avgSecondInningsScore: 151.9,
      battingFirstWinPercentage: 62.1,
      chasingWinPercentage: 37.9,
      avgRunRate: 8.12,
      avgWickets: 7.9,
      pitchBehavior: "balanced",
      highestTeamScore: 218,
      lowestTeamScore: 92
    },
    "mcg": {
      avgFirstInningsScore: 169.8,
      avgSecondInningsScore: 155.2,
      battingFirstWinPercentage: 58.5,
      chasingWinPercentage: 41.5,
      avgRunRate: 8.49,
      avgWickets: 7.1,
      pitchBehavior: "batting",
      highestTeamScore: 226,
      lowestTeamScore: 98
    },
    "lords": {
      avgFirstInningsScore: 158.6,
      avgSecondInningsScore: 145.3,
      battingFirstWinPercentage: 59.2,
      chasingWinPercentage: 40.8,
      avgRunRate: 7.93,
      avgWickets: 8.3,
      pitchBehavior: "bowling",
      highestTeamScore: 210,
      lowestTeamScore: 102
    }
  };
  
  // Return data for the selected venue or default data if not found
  return mockData[venueId] || {
    avgFirstInningsScore: 165.5,
    avgSecondInningsScore: 152.1,
    battingFirstWinPercentage: 54.8,
    chasingWinPercentage: 45.2,
    avgRunRate: 8.28,
    avgWickets: 7.5,
    pitchBehavior: "balanced",
    highestTeamScore: 220,
    lowestTeamScore: 95
  };
};

export interface MatchData {
  id: string;
  date: string;
  teams: [string, string];
  scores: [number, number];
  winner: string;
  playerOfMatch: string;
}

// Mock match data
export const getVenueMatches = (venueId: string): MatchData[] => {
  // In a real app, this would come from an API
  const mockData: Record<string, MatchData[]> = {
    "wankhede": [
      {
        id: "m1",
        date: "2023-05-12",
        teams: ["Mumbai Indians", "Chennai Super Kings"],
        scores: [218, 190],
        winner: "Mumbai Indians",
        playerOfMatch: "Rohit Sharma"
      },
      {
        id: "m2",
        date: "2023-05-06",
        teams: ["Mumbai Indians", "Royal Challengers Bangalore"],
        scores: [186, 192],
        winner: "Royal Challengers Bangalore",
        playerOfMatch: "Virat Kohli"
      },
      {
        id: "m3",
        date: "2023-04-29",
        teams: ["Mumbai Indians", "Kolkata Knight Riders"],
        scores: [171, 164],
        winner: "Mumbai Indians",
        playerOfMatch: "Suryakumar Yadav"
      },
      {
        id: "m4",
        date: "2023-04-22",
        teams: ["Mumbai Indians", "Rajasthan Royals"],
        scores: [212, 186],
        winner: "Mumbai Indians",
        playerOfMatch: "Tim David"
      }
    ],
    "eden-gardens": [
      {
        id: "m5",
        date: "2023-05-14",
        teams: ["Kolkata Knight Riders", "Sunrisers Hyderabad"],
        scores: [204, 182],
        winner: "Kolkata Knight Riders",
        playerOfMatch: "Rinku Singh"
      },
      {
        id: "m6",
        date: "2023-05-08",
        teams: ["Kolkata Knight Riders", "Punjab Kings"],
        scores: [179, 146],
        winner: "Kolkata Knight Riders",
        playerOfMatch: "Andre Russell"
      },
      {
        id: "m7",
        date: "2023-05-01",
        teams: ["Kolkata Knight Riders", "Gujarat Titans"],
        scores: [158, 161],
        winner: "Gujarat Titans",
        playerOfMatch: "Shubman Gill"
      }
    ]
  };
  
  // Return matches for the selected venue or empty array if not found
  return mockData[venueId] || [];
};

export interface TeamPerformanceData {
  team: string;
  matches: number;
  wins: number;
  losses: number;
  avgScore: number;
}

// Mock team performance data
export const getTeamPerformance = (venueId: string): TeamPerformanceData[] => {
  // In a real app, this would come from an API
  const mockData: Record<string, TeamPerformanceData[]> = {
    "wankhede": [
      {
        team: "Mumbai Indians",
        matches: 10,
        wins: 7,
        losses: 3,
        avgScore: 187.2
      },
      {
        team: "Chennai Super Kings",
        matches: 8,
        wins: 3,
        losses: 5,
        avgScore: 172.5
      },
      {
        team: "Royal Challengers Bangalore",
        matches: 6,
        wins: 2,
        losses: 4,
        avgScore: 165.8
      },
      {
        team: "Kolkata Knight Riders",
        matches: 5,
        wins: 1,
        losses: 4,
        avgScore: 158.4
      }
    ],
    "eden-gardens": [
      {
        team: "Kolkata Knight Riders",
        matches: 12,
        wins: 8,
        losses: 4,
        avgScore: 176.3
      },
      {
        team: "Chennai Super Kings",
        matches: 7,
        wins: 3,
        losses: 4,
        avgScore: 168.7
      },
      {
        team: "Mumbai Indians",
        matches: 6,
        wins: 2,
        losses: 4,
        avgScore: 163.2
      },
      {
        team: "Delhi Capitals",
        matches: 5,
        wins: 2,
        losses: 3,
        avgScore: 159.8
      }
    ]
  };
  
  // Return team performance for the selected venue or empty array if not found
  return mockData[venueId] || [];
};

export interface PlayerPerformanceData {
  player: string;
  team: string;
  matches: number;
  runs: number;
  wickets: number;
  avgStrikeRate: number;
  avgEconomy?: number;
}

// Mock player performance data
export const getPlayerPerformance = (venueId: string): PlayerPerformanceData[] => {
  // In a real app, this would come from an API
  const mockData: Record<string, PlayerPerformanceData[]> = {
    "wankhede": [
      {
        player: "Rohit Sharma",
        team: "Mumbai Indians",
        matches: 10,
        runs: 342,
        wickets: 0,
        avgStrikeRate: 147.2
      },
      {
        player: "Jasprit Bumrah",
        team: "Mumbai Indians",
        matches: 10,
        runs: 18,
        wickets: 15,
        avgStrikeRate: 116.4,
        avgEconomy: 6.8
      },
      {
        player: "MS Dhoni",
        team: "Chennai Super Kings",
        matches: 8,
        runs: 187,
        wickets: 0,
        avgStrikeRate: 162.7
      },
      {
        player: "Virat Kohli",
        team: "Royal Challengers Bangalore",
        matches: 6,
        runs: 256,
        wickets: 0,
        avgStrikeRate: 143.2
      }
    ],
    "eden-gardens": [
      {
        player: "Andre Russell",
        team: "Kolkata Knight Riders",
        matches: 12,
        runs: 278,
        wickets: 18,
        avgStrikeRate: 182.6,
        avgEconomy: 8.9
      },
      {
        player: "Sunil Narine",
        team: "Kolkata Knight Riders",
        matches: 12,
        runs: 156,
        wickets: 16,
        avgStrikeRate: 172.4,
        avgEconomy: 7.2
      },
      {
        player: "Ravindra Jadeja",
        team: "Chennai Super Kings",
        matches: 7,
        runs: 123,
        wickets: 9,
        avgStrikeRate: 142.8,
        avgEconomy: 7.8
      }
    ]
  };
  
  // Return player performance for the selected venue or empty array if not found
  return mockData[venueId] || [];
};
