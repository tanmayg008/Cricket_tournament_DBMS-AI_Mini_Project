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
import { Edit, Trash2 } from "./Icons";
import { matchAPI, Match } from "../services/api";
import { toast } from "./CustomToast";

interface MatchesTableProps {
  onEdit?: (match: Match) => void;
  refresh?: number;
}

export function MatchesTable({ onEdit, refresh }: MatchesTableProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [refresh]);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await matchAPI.list();
      setMatches(data);
    } catch (error) {
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Are you sure you want to delete this match?`)) {
      return;
    }

    try {
      await matchAPI.delete(id);
      toast.success("Match deleted successfully!");
      loadMatches();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete match");
    }
  };

  const getStatus = (date: string) => {
    const matchDate = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const matchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());

    if (matchDay.getTime() === today.getTime()) return "Live";
    if (matchDay > today) return "Scheduled";
    return "Completed";
  };

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

  if (loading) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        Loading matches...
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        No matches found. Add your first match to get started!
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>Match ID</TableHead>
            <TableHead>Tournament</TableHead>
            <TableHead>Team 1</TableHead>
            <TableHead>Team 2</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => {
            const status = match.status || getStatus(match.date);
            return (
              <TableRow key={match.id}>
                <TableCell>{match.id}</TableCell>
                <TableCell>{match.tournament || "N/A"}</TableCell>
                <TableCell>{match.team1 || "N/A"}</TableCell>
                <TableCell>{match.team2 || "N/A"}</TableCell>
                <TableCell>{match.date}</TableCell>
                <TableCell>{match.venue}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadgeColor(status)} text-white`}>
                    {status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(match)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(match.id!)}
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
