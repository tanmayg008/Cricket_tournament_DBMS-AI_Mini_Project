import { useState, useEffect } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { ActionButtons } from "./components/ActionButtons";
import { TournamentsTable } from "./components/TournamentsTable";
import { TeamsTable } from "./components/TeamsTable";
import { PlayersTable } from "./components/PlayersTable";
import { MatchesTable } from "./components/MatchesTable";
import { AddTournamentDialog } from "./components/AddTournamentDialog";
import { AddTeamDialog } from "./components/AddTeamDialog";
import { AddPlayerDialog } from "./components/AddPlayerDialog";
import { AddMatchDialog } from "./components/AddMatchDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/Tabs";
import { Trophy, Users, UserCircle, Calendar } from "./components/Icons";
import { Chatbot } from "./components/Chatbot";
import { Toaster } from "./components/CustomToast";
import { tournamentAPI, teamAPI, playerAPI, matchAPI, Tournament, Team, Player, Match } from "./services/api";

export default function App() {
  const [activeView, setActiveView] = useState("tournaments");
  const [tournamentDialogOpen, setTournamentDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  
  const [editTournament, setEditTournament] = useState<Tournament | null>(null);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [editMatch, setEditMatch] = useState<Match | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const [counts, setCounts] = useState({
    tournaments: 0,
    teams: 0,
    players: 0,
    matches: 0,
  });

  useEffect(() => {
    loadCounts();
  }, [refreshKey]);

  const loadCounts = async () => {
    try {
      const [tournaments, teams, players, matches] = await Promise.all([
        tournamentAPI.list(),
        teamAPI.list(),
        playerAPI.list(),
        matchAPI.list(),
      ]);
      setCounts({
        tournaments: tournaments.length,
        teams: teams.length,
        players: players.length,
        matches: matches.length,
      });
    } catch (error) {
      console.error("Failed to load counts:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleAction = (action: string) => {
    if (action.startsWith("view-")) {
      const view = action.replace("view-", "");
      setActiveView(view);
    } else if (action === "add-tournament") {
      setEditTournament(null);
      setTournamentDialogOpen(true);
    } else if (action === "add-team") {
      setEditTeam(null);
      setTeamDialogOpen(true);
    } else if (action === "add-player") {
      setEditPlayer(null);
      setPlayerDialogOpen(true);
    } else if (action === "add-match") {
      setEditMatch(null);
      setMatchDialogOpen(true);
    }
  };

  const handleEditTournament = (tournament: Tournament) => {
    setEditTournament(tournament);
    setTournamentDialogOpen(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditTeam(team);
    setTeamDialogOpen(true);
  };

  const handleEditPlayer = (player: Player) => {
    setEditPlayer(player);
    setPlayerDialogOpen(true);
  };

  const handleEditMatch = (match: Match) => {
    setEditMatch(match);
    setMatchDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage tournaments, teams, players, and matches</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionButtons onAction={handleAction} />
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList className="grid w-full grid-cols-4 bg-slate-200">
                <TabsTrigger value="tournaments">
                  <Trophy className="w-4 h-4" />
                  Tournaments
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Users className="w-4 h-4" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="players">
                  <UserCircle className="w-4 h-4" />
                  Players
                </TabsTrigger>
                <TabsTrigger value="matches">
                  <Calendar className="w-4 h-4" />
                  Matches
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tournaments" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-blue-900">Tournaments Overview</h3>
                    <p className="text-slate-600">View and manage all cricket tournaments</p>
                  </div>
                  <TournamentsTable onEdit={handleEditTournament} refresh={refreshKey} />
                </div>
              </TabsContent>

              <TabsContent value="teams" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-blue-900">Teams Overview</h3>
                    <p className="text-slate-600">View and manage all teams</p>
                  </div>
                  <TeamsTable onEdit={handleEditTeam} refresh={refreshKey} />
                </div>
              </TabsContent>

              <TabsContent value="players" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-blue-900">Players Overview</h3>
                    <p className="text-slate-600">View and manage all players</p>
                  </div>
                  <PlayersTable onEdit={handleEditPlayer} refresh={refreshKey} />
                </div>
              </TabsContent>

              <TabsContent value="matches" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-blue-900">Matches Overview</h3>
                    <p className="text-slate-600">View and manage all matches</p>
                  </div>
                  <MatchesTable onEdit={handleEditMatch} refresh={refreshKey} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100">Total Tournaments</CardDescription>
              <CardTitle className="text-white">{counts.tournaments}</CardTitle>
            </CardHeader>
            <CardContent>
              <Trophy className="w-8 h-8 opacity-50" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100">Total Teams</CardDescription>
              <CardTitle className="text-white">{counts.teams}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="w-8 h-8 opacity-50" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100">Total Players</CardDescription>
              <CardTitle className="text-white">{counts.players}</CardTitle>
            </CardHeader>
            <CardContent>
              <UserCircle className="w-8 h-8 opacity-50" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-300 to-blue-400 text-white shadow-md">
            <CardHeader className="pb-3">
              <CardDescription className="text-blue-100">Total Matches</CardDescription>
              <CardTitle className="text-white">{counts.matches}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="w-8 h-8 opacity-50" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot onNavigate={setActiveView} />

      {/* Dialogs */}
      <AddTournamentDialog
        open={tournamentDialogOpen}
        onOpenChange={setTournamentDialogOpen}
        onSuccess={handleRefresh}
        editData={editTournament}
      />
      <AddTeamDialog
        open={teamDialogOpen}
        onOpenChange={setTeamDialogOpen}
        onSuccess={handleRefresh}
        editData={editTeam}
      />
      <AddPlayerDialog
        open={playerDialogOpen}
        onOpenChange={setPlayerDialogOpen}
        onSuccess={handleRefresh}
        editData={editPlayer}
      />
      <AddMatchDialog
        open={matchDialogOpen}
        onOpenChange={setMatchDialogOpen}
        onSuccess={handleRefresh}
        editData={editMatch}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
