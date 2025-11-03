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
import { teamAPI, Team, tournamentAPI, Tournament } from "../services/api";
import { toast } from "./CustomToast";

interface AddTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editData?: Team | null;
}

export function AddTeamDialog({
  open,
  onOpenChange,
  onSuccess,
  editData,
}: AddTeamDialogProps) {
  const [formData, setFormData] = useState<Team>({
    name: editData?.name || "",
    tournamentId: editData?.tournamentId || undefined,
    captain: editData?.captain || "",
  });
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      loadTournaments();
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Team name is required";
    }

    if (!formData.tournamentId) {
      newErrors.tournament = "Tournament is required";
    }

    if (!formData.captain.trim()) {
      newErrors.captain = "Captain name is required";
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
        await teamAPI.update(editData.id, formData);
        toast.success("Team updated successfully!");
      } else {
        await teamAPI.add(formData);
        toast.success("Team added successfully!");
      }
      
      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save team");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", tournamentId: undefined, captain: "" });
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
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Team" : "Add New Team"}</DialogTitle>
          <DialogDescription>
            {editData ? "Update team details" : "Enter team details to add to the system"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Mumbai Warriors"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

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

            <div className="grid gap-2">
              <Label htmlFor="captain">Captain *</Label>
              <Input
                id="captain"
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                placeholder="e.g., Rohit Sharma"
                className={errors.captain ? "border-red-500" : ""}
              />
              {errors.captain && (
                <span className="text-red-500 text-sm">{errors.captain}</span>
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
              {loading ? "Saving..." : editData ? "Update" : "Add Team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
