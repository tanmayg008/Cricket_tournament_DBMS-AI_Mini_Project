import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Edit, Trash2 } from "./Icons";
import { teamAPI, Team } from "../services/api";
import { toast } from "./CustomToast";

interface TeamsTableProps {
  onEdit?: (team: Team) => void;
  refresh?: number;
}

export function TeamsTable({ onEdit, refresh }: TeamsTableProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, [refresh]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await teamAPI.list();
      setTeams(data);
    } catch (error) {
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await teamAPI.delete(id);
      toast.success("Team deleted successfully!");
      loadTeams();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete team");
    }
  };

  if (loading) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        Loading teams...
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        No teams found. Add your first team to get started!
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>Captain</TableHead>
            <TableHead>Tournament</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.id}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.captain}</TableCell>
              <TableCell>{team.tournament || "N/A"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(team)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(team.id!, team.name)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
