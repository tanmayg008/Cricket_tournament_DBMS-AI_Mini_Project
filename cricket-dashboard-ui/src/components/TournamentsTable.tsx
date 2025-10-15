import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Badge } from "./Badge";

const tournaments = [
  { id: 1, name: "Premier League 2025", location: "Mumbai", startDate: "2025-11-01", status: "Upcoming" },
  { id: 2, name: "Champions Cup", location: "Delhi", startDate: "2025-10-15", status: "Active" },
  { id: 3, name: "Summer Series", location: "Bangalore", startDate: "2025-08-20", status: "Completed" },
  { id: 4, name: "T20 Blast", location: "Chennai", startDate: "2025-12-05", status: "Upcoming" },
];

export function TournamentsTable() {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Tournament Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map((tournament) => (
            <TableRow key={tournament.id}>
              <TableCell>{tournament.id}</TableCell>
              <TableCell>{tournament.name}</TableCell>
              <TableCell>{tournament.location}</TableCell>
              <TableCell>{tournament.startDate}</TableCell>
              <TableCell>
                <Badge
                  className={
                    tournament.status === "Active"
                      ? "bg-green-600 text-white"
                      : tournament.status === "Upcoming"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {tournament.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
