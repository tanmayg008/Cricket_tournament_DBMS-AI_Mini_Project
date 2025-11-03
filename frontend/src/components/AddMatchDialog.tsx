import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./CustomDialog";
import { Input } from "./ui/input";
import { Label } from "./CustomLabel";
import { Button } from "./Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./CustomSelect";
import { matchAPI, Match, tournamentAPI, Tournament, teamAPI, Team } from "../services/api";
import { toast } from "./CustomToast";

interface AddMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editData?: Match | null;
}

export function AddMatchDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: AddMatchDialogProps) {
  const [formData, setFormData] = useState<Match>({
    tournamentId: editData?.tournamentId || undefined,
    team1Id: editData?.team1Id || undefined,
    team2Id: editData?.team2Id || undefined,
    date: editData?.date || "",
    venue: editData?.venue || "",
  });
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      loadTournaments();
      loadTeams();
    }
  }, [open]);

  const loadTournaments = async () => {
    try {
      const data = await tournamentAPI.list();
      setTournaments(data);
    } catch (error) {
      toast.error("Failed to load tournaments");
    }
  };

  const loadTeams = async () => {
    try {
      const data = await teamAPI.list();
      setTeams(data);
    } catch (error) {
      toast.error("Failed to load teams");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.tournamentId) {
      newErrors.tournament = "Tournament is required";
    }

    if (!formData.team1Id) {
      newErrors.team1 = "Team 1 is required";
    }

    if (!formData.team2Id) {
      newErrors.team2 = "Team 2 is required";
    }

    if (formData.team1Id === formData.team2Id) {
      newErrors.team2 = "Team 2 must be different from Team 1";
    }

    if (!formData.date) {
      newErrors.date = "Match date is required";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (editData?.id) {
        await matchAPI.update(editData.id, formData);
        toast.success("Match updated successfully!");
      } else {
        await matchAPI.add(formData);
        toast.success("Match added successfully!");
      }
      
      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save match");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tournamentId: undefined,
      team1Id: undefined,
      team2Id: undefined,
      date: "",
      venue: "",
    });
    setErrors({});
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Match" : "Add New Match"}</DialogTitle>
          <DialogDescription>
            {editData ? "Update match details" : "Enter match details to add to the system"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tournament">Tournament *</Label>
              <Select
                value={formData.tournamentId?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, tournamentId: parseInt(value) })
                }
              >
                <SelectTrigger className={errors.tournament ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a tournament" />
                </SelectTrigger>
                <SelectContent>
                  {tournaments.map((tournament) => (
                    <SelectItem key={tournament.id} value={tournament.id!.toString()}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tournament && (
                <span className="text-red-500 text-sm">{errors.tournament}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="team1">Team 1 *</Label>
                <Select
                  value={formData.team1Id?.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, team1Id: parseInt(value) })
                  }
                >
                  <SelectTrigger className={errors.team1 ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select team 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id!.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.team1 && (
                  <span className="text-red-500 text-sm">{errors.team1}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="team2">Team 2 *</Label>
                <Select
                  value={formData.team2Id?.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, team2Id: parseInt(value) })
                  }
                >
                  <SelectTrigger className={errors.team2 ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select team 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id!.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.team2 && (
                  <span className="text-red-500 text-sm">{errors.team2}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Match Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <span className="text-red-500 text-sm">{errors.date}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g., Wankhede Stadium"
                className={errors.venue ? "border-red-500" : ""}
              />
              {errors.venue && (
                <span className="text-red-500 text-sm">{errors.venue}</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : editData ? "Update" : "Add Match"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
