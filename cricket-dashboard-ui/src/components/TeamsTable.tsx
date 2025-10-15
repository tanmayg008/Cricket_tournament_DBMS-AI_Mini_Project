import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const teams = [
  { id: 1, name: "Mumbai Warriors", coach: "Ravi Kumar", players: 15, tournament: "Premier League 2025" },
  { id: 2, name: "Delhi Strikers", coach: "Amit Singh", players: 16, tournament: "Champions Cup" },
  { id: 3, name: "Bangalore Royals", coach: "Suresh Patel", players: 15, tournament: "Summer Series" },
  { id: 4, name: "Chennai Kings", coach: "Vijay Sharma", players: 14, tournament: "T20 Blast" },
];

export function TeamsTable() {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>Coach</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Tournament</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.id}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.coach}</TableCell>
              <TableCell>{team.players}</TableCell>
              <TableCell>{team.tournament}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
