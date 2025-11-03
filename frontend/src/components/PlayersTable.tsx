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
import { playerAPI, Player } from "../services/api";
import { toast } from "./CustomToast";

interface PlayersTableProps {
  onEdit?: (player: Player) => void;
  refresh?: number;
}

export function PlayersTable({ onEdit, refresh }: PlayersTableProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, [refresh]);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await playerAPI.list();
      setPlayers(data);
    } catch (error) {
      toast.error("Failed to load players");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await playerAPI.delete(id);
      toast.success("Player deleted successfully!");
      loadPlayers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete player");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Batsman":
        return "bg-blue-600";
      case "Bowler":
        return "bg-green-600";
      case "All-rounder":
        return "bg-purple-600";
      case "Wicket-keeper":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        Loading players...
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white p-8 text-center text-slate-600">
        No players found. Add your first player to get started!
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead>ID</TableHead>
            <TableHead>Player Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.id}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.team || "N/A"}</TableCell>
              <TableCell>
                <Badge className={`${getRoleBadgeColor(player.role)} text-white`}>
                  {player.role}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(player)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id!, player.name)}
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
