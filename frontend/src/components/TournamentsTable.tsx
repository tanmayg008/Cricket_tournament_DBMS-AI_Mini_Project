import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Edit, Trash2 } from "./Icons";
import { tournamentAPI, Tournament } from "../services/api";
import { toast } from "./CustomToast";

interface TournamentsTableProps {
  onEdit?: (tournament: Tournament) => void;
  refresh?: number;
}

export function TournamentsTable({ onEdit, refresh }: TournamentsTableProps) {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTournaments();
  }, [refresh]);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const data = await tournamentAPI.list();
      setTournaments(data);
    } catch (error) {
      toast.error("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await tournamentAPI.delete(id);
      toast.success("Tournament deleted successfully!");
      loadTournaments();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete tournament");
    }
  };

  const getStatus = (startDate: string) => {
    const date = new Date(startDate);
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return "Upcoming";
    if (diffDays >= -30 && diffDays <= 7) return "Active";
    return "Completed";
  };

  if (loading) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        Loading tournaments...
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        No tournaments found. Add your first tournament to get started!
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Tournament Name</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map((tournament) => {
            const status = tournament.status || getStatus(tournament.startDate);
            return (
              <TableRow key={tournament.id}>
                <TableCell>{tournament.id}</TableCell>
                <TableCell>{tournament.name}</TableCell>
                <TableCell>{tournament.venue}</TableCell>
                <TableCell>{tournament.startDate}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      status === "Active"
                        ? "bg-green-600 text-white"
                        : status === "Upcoming"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-500 text-white"
                    }
                  >
                    {status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(tournament)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tournament.id!, tournament.name)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
