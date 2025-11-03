import { Button } from "./Button";
import { Plus, Eye } from "./Icons";

interface ActionButtonsProps {
  onAction: (action: string) => void;
}

export function ActionButtons({ onAction }: ActionButtonsProps) {
  const buttons = [
    { label: "Add Tournament", action: "add-tournament", icon: Plus },
    { label: "View Tournaments", action: "view-tournaments", icon: Eye },
    { label: "Add Team", action: "add-team", icon: Plus },
    { label: "View Teams", action: "view-teams", icon: Eye },
    { label: "Add Player", action: "add-player", icon: Plus },
    { label: "View Players", action: "view-players", icon: Eye },
    { label: "Add Match", action: "add-match", icon: Plus },
    { label: "View Matches", action: "view-matches", icon: Eye },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {buttons.map((button) => {
        const Icon = button.icon;
        const isAdd = button.action.startsWith("add");
        
        return (
          <Button
            key={button.action}
            onClick={() => onAction(button.action)}
            variant={isAdd ? "primary" : "outline"}
          >
            <Icon className="w-4 h-4" />
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}
