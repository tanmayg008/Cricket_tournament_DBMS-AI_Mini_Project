import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Badge } from "./Badge";

const players = [
  { id: 1, name: "Rohit Sharma", team: "Mumbai Warriors", role: "Batsman", age: 28, matches: 45 },
  { id: 2, name: "Jasprit Bumrah", team: "Mumbai Warriors", role: "Bowler", age: 26, matches: 42 },
  { id: 3, name: "Virat Kohli", team: "Delhi Strikers", role: "Batsman", age: 30, matches: 58 },
  { id: 4, name: "Ravindra Jadeja", team: "Chennai Kings", role: "All-rounder", age: 29, matches: 51 },
  { id: 5, name: "KL Rahul", team: "Bangalore Royals", role: "Batsman", age: 27, matches: 38 },
];

export function PlayersTable() {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Batsman":
        return "bg-blue-600";
      case "Bowler":
        return "bg-green-600";
      case "All-rounder":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Player Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Matches</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.id}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.team}</TableCell>
              <TableCell>
                <Badge className={`${getRoleBadgeColor(player.role)} text-white`}>
                  {player.role}
                </Badge>
              </TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.matches}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
