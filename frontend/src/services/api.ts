// API Service Layer for Cricket Tournament Management System
// Backend: Java with MySQL database

// Read base URL and mock flag from Vite environment variables. Defaults kept to
// localhost and mock enabled to avoid breaking development when backend is
// not running.
const API_BASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || 'http://localhost:8080';

// Vite exposes env vars under import.meta.env and values are strings. Set
// VITE_USE_MOCK_DATA to "true" in your .env to enable mock mode; default is
// true to keep existing behaviour during local development.
const USE_MOCK_DATA = (typeof import.meta !== 'undefined' && typeof (import.meta as any).env?.VITE_USE_MOCK_DATA !== 'undefined')
  ? (import.meta as any).env.VITE_USE_MOCK_DATA === 'true'
  : true;

// Mock data storage
let mockTournaments: Tournament[] = [
  { id: 1, name: 'IPL 2024', startDate: '2024-03-22', venue: 'Mumbai', status: 'Active' },
  { id: 2, name: 'World Cup 2024', startDate: '2024-06-01', venue: 'London', status: 'Upcoming' },
];

let mockTeams: Team[] = [
  { id: 1, name: 'Mumbai Indians', tournamentId: 1, tournament: 'IPL 2024', captain: 'Rohit Sharma', coach: 'Mark Boucher', players: 18 },
  { id: 2, name: 'Chennai Super Kings', tournamentId: 1, tournament: 'IPL 2024', captain: 'MS Dhoni', coach: 'Stephen Fleming', players: 20 },
];

let mockPlayers: Player[] = [
  { id: 1, name: 'Virat Kohli', teamId: 1, team: 'Mumbai Indians', role: 'Batsman', age: 35, matches: 223 },
  { id: 2, name: 'Jasprit Bumrah', teamId: 1, team: 'Mumbai Indians', role: 'Bowler', age: 30, matches: 120 },
];

let mockMatches: Match[] = [
  { id: 1, tournamentId: 1, tournament: 'IPL 2024', team1Id: 1, team1: 'Mumbai Indians', team2Id: 2, team2: 'Chennai Super Kings', date: '2024-03-25', venue: 'Wankhede Stadium', status: 'Scheduled' },
];

let nextId = { tournament: 3, team: 3, player: 3, match: 2 };

// Generic API call handler with mock fallback
async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> {
  // Try real API first
  if (!USE_MOCK_DATA) {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${method} ${endpoint}):`, error);
      throw error;
    }
  }

  // Use mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(handleMockRequest(endpoint, method, data) as T);
    }, 300);
  });
}

// Mock request handler
function handleMockRequest(endpoint: string, method: string, data?: any): any {
  // Tournament endpoints
  if (endpoint === '/api/tournament/list') {
    return mockTournaments;
  }
  if (endpoint === '/api/tournament/add' && method === 'POST') {
    const newTournament = { ...data, id: nextId.tournament++, status: 'Active' };
    mockTournaments.push(newTournament);
    return { success: true, message: 'Tournament added successfully', id: newTournament.id };
  }
  if (endpoint.startsWith('/api/tournament/update/') && method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const index = mockTournaments.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTournaments[index] = { ...data, id };
      return { success: true, message: 'Tournament updated successfully' };
    }
    return { success: false, message: 'Tournament not found' };
  }
  if (endpoint.startsWith('/api/tournament/delete/') && method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    mockTournaments = mockTournaments.filter(t => t.id !== id);
    return { success: true, message: 'Tournament deleted successfully' };
  }

  // Team endpoints
  if (endpoint === '/api/team/list') {
    return mockTeams;
  }
  if (endpoint === '/api/team/add' && method === 'POST') {
    const newTeam = { ...data, id: nextId.team++, players: 0 };
    mockTeams.push(newTeam);
    return { success: true, message: 'Team added successfully', id: newTeam.id };
  }
  if (endpoint.startsWith('/api/team/update/') && method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const index = mockTeams.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTeams[index] = { ...data, id };
      return { success: true, message: 'Team updated successfully' };
    }
    return { success: false, message: 'Team not found' };
  }
  if (endpoint.startsWith('/api/team/delete/') && method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    mockTeams = mockTeams.filter(t => t.id !== id);
    return { success: true, message: 'Team deleted successfully' };
  }

  // Player endpoints
  if (endpoint === '/api/player/list') {
    return mockPlayers;
  }
  if (endpoint === '/api/player/add' && method === 'POST') {
    const newPlayer = { ...data, id: nextId.player++, matches: 0 };
    mockPlayers.push(newPlayer);
    return { success: true, message: 'Player added successfully', id: newPlayer.id };
  }
  if (endpoint.startsWith('/api/player/update/') && method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const index = mockPlayers.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPlayers[index] = { ...data, id };
      return { success: true, message: 'Player updated successfully' };
    }
    return { success: false, message: 'Player not found' };
  }
  if (endpoint.startsWith('/api/player/delete/') && method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    mockPlayers = mockPlayers.filter(p => p.id !== id);
    return { success: true, message: 'Player deleted successfully' };
  }

  // Match endpoints
  if (endpoint === '/api/match/list') {
    return mockMatches;
  }
  if (endpoint === '/api/match/add' && method === 'POST') {
    const newMatch = { ...data, id: nextId.match++, status: 'Scheduled' };
    mockMatches.push(newMatch);
    return { success: true, message: 'Match added successfully', id: newMatch.id };
  }
  if (endpoint.startsWith('/api/match/update/') && method === 'PUT') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    const index = mockMatches.findIndex(m => m.id === id);
    if (index !== -1) {
      mockMatches[index] = { ...data, id };
      return { success: true, message: 'Match updated successfully' };
    }
    return { success: false, message: 'Match not found' };
  }
  if (endpoint.startsWith('/api/match/delete/') && method === 'DELETE') {
    const id = parseInt(endpoint.split('/').pop() || '0');
    mockMatches = mockMatches.filter(m => m.id !== id);
    return { success: true, message: 'Match deleted successfully' };
  }

  return { success: false, message: 'Endpoint not found' };
}

// Tournament API
export interface Tournament {
  id?: number;
  name: string;
  startDate: string;
  venue: string;
  status?: string;
}

export const tournamentAPI = {
  add: (tournament: Tournament) => 
    apiCall<{ success: boolean; message: string; id?: number }>('/api/tournament/add', 'POST', tournament),
  
  list: () => 
    apiCall<Tournament[]>('/api/tournament/list', 'GET'),
  
  update: (id: number, tournament: Tournament) => 
    apiCall<{ success: boolean; message: string }>(`/api/tournament/update/${id}`, 'PUT', tournament),
  
  delete: (id: number) => 
    apiCall<{ success: boolean; message: string }>(`/api/tournament/delete/${id}`, 'DELETE'),
};

// Team API
export interface Team {
  id?: number;
  name: string;
  tournamentId?: number;
  tournament?: string;
  captain: string;
  coach?: string;
  players?: number;
}

export const teamAPI = {
  add: (team: Team) => 
    apiCall<{ success: boolean; message: string; id?: number }>('/api/team/add', 'POST', team),
  
  list: () => 
    apiCall<Team[]>('/api/team/list', 'GET'),
  
  update: (id: number, team: Team) => 
    apiCall<{ success: boolean; message: string }>(`/api/team/update/${id}`, 'PUT', team),
  
  delete: (id: number) => 
    apiCall<{ success: boolean; message: string }>(`/api/team/delete/${id}`, 'DELETE'),
};

// Player API
export interface Player {
  id?: number;
  name: string;
  teamId?: number;
  team?: string;
  role: string;
  age?: number;
  matches?: number;
}

export const playerAPI = {
  add: (player: Player) => 
    apiCall<{ success: boolean; message: string; id?: number }>('/api/player/add', 'POST', player),
  
  list: () => 
    apiCall<Player[]>('/api/player/list', 'GET'),
  
  update: (id: number, player: Player) => 
    apiCall<{ success: boolean; message: string }>(`/api/player/update/${id}`, 'PUT', player),
  
  delete: (id: number) => 
    apiCall<{ success: boolean; message: string }>(`/api/player/delete/${id}`, 'DELETE'),
};

// Match API
export interface Match {
  id?: number;
  tournamentId?: number;
  tournament?: string;
  team1Id?: number;
  team1?: string;
  team2Id?: number;
  team2?: string;
  date: string;
  venue: string;
  winnerId?: number;
  winner?: string;
  status?: string;
}

export const matchAPI = {
  add: (match: Match) => 
    apiCall<{ success: boolean; message: string; id?: number }>('/api/match/add', 'POST', match),
  
  list: () => 
    apiCall<Match[]>('/api/match/list', 'GET'),
  
  update: (id: number, match: Match) => 
    apiCall<{ success: boolean; message: string }>(`/api/match/update/${id}`, 'PUT', match),
  
  delete: (id: number) => 
    apiCall<{ success: boolean; message: string }>(`/api/match/delete/${id}`, 'DELETE'),
};
