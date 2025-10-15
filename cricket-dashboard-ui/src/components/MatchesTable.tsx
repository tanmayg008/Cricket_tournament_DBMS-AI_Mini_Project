import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Badge } from "./Badge";

const matches = [
  { 
    id: 1, 
    team1: "Mumbai Warriors", 
    team2: "Delhi Strikers", 
    date: "2025-10-20", 
    venue: "Wankhede Stadium", 
    status: "Scheduled" 
  },
  { 
    id: 2, 
    team1: "Bangalore Royals", 
    team2: "Chennai Kings", 
    date: "2025-10-18", 
    venue: "M. Chinnaswamy Stadium", 
    status: "Live" 
  },
  { 
    id: 3, 
    team1: "Mumbai Warriors", 
    team2: "Bangalore Royals", 
    date: "2025-10-10", 
    venue: "Wankhede Stadium", 
    status: "Completed" 
  },
  { 
    id: 4, 
    team1: "Delhi Strikers", 
    team2: "Chennai Kings", 
    date: "2025-10-25", 
    venue: "Arun Jaitley Stadium", 
    status: "Scheduled" 
  },
];

export function MatchesTable() {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-600 animate-pulse";
      case "Scheduled":
        return "bg-blue-600";
      case "Completed":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>Match ID</TableHead>
            <TableHead>Team 1</TableHead>
            <TableHead>Team 2</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell>{match.id}</TableCell>
              <TableCell>{match.team1}</TableCell>
              <TableCell>{match.team2}</TableCell>
              <TableCell>{match.date}</TableCell>
              <TableCell>{match.venue}</TableCell>
              <TableCell>
                <Badge className={`${getStatusBadgeColor(match.status)} text-white`}>
                  {match.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
