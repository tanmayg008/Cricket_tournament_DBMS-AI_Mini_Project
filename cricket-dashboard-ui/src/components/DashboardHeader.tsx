import { Trophy } from "./Icons";

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Trophy className="w-10 h-10" />
          <div>
            <h1>Cricket Tournament Management</h1>
            <p className="text-blue-100 mt-1">Manage your tournaments, teams, players and matches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
