import io.javalin.Javalin;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CricketApp {

    // MySQL connection info
    static final String URL = "jdbc:mysql://localhost:3306/localhost2";
    static final String USER = "cricket_user";
    static final String PASS = "Cr1ck3tP@ss";

    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            // This enables CORS, which is required for your frontend
            // to communicate with your backend.
            config.http.enableCorsForAll();
        }).start(7070); // The backend will run on port 7070

        System.out.println("✅ Web server started on http://localhost:7070");

        // API Endpoint to get all tournaments
        app.get("/api/tournaments", ctx -> {
            try (Connection con = DriverManager.getConnection(URL, USER, PASS)) {
                List<Map<String, Object>> tournaments = viewTournaments(con);
                ctx.json(tournaments); // Send the list as JSON
            } catch (SQLException e) {
                ctx.status(500).result("Database error");
                e.printStackTrace();
            }
        });

        // API Endpoint to get all teams
        app.get("/api/teams", ctx -> {
            try (Connection con = DriverManager.getConnection(URL, USER, PASS)) {
                List<Map<String, Object>> teams = viewTeams(con);
                ctx.json(teams);
            } catch (SQLException e) {
                ctx.status(500).result("Database error");
                e.printStackTrace();
            }
        });

        // API Endpoint to get all players
        app.get("/api/players", ctx -> {
            try (Connection con = DriverManager.getConnection(URL, USER, PASS)) {
                List<Map<String, Object>> players = viewPlayers(con);
                ctx.json(players);
            } catch (SQLException e) {
                ctx.status(500).result("Database error");
                e.printStackTrace();
            }
        });

        // API Endpoint to get all matches
        app.get("/api/matches", ctx -> {
            try (Connection con = DriverManager.getConnection(URL, USER, PASS)) {
                List<Map<String, Object>> matches = viewMatches(con);
                ctx.json(matches);
            } catch (SQLException e) {
                ctx.status(500).result("Database error");
                e.printStackTrace();
            }
        });
    }

    // This method now returns a List of Maps, which can be easily converted to JSON
    static List<Map<String, Object>> viewTournaments(Connection con) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT tournament_id, name, year FROM tournament")) {

            while (rs.next()) {
                Map<String, Object> tournament = new HashMap<>();
                tournament.put("tournament_id", rs.getInt("tournament_id"));
                tournament.put("name", rs.getString("name"));
                tournament.put("year", rs.getInt("year"));
                result.add(tournament);
            }
        }
        return result;
    }

    // Converted viewTeams
    static List<Map<String, Object>> viewTeams(Connection con) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT team_id, name, coach, tournament_id FROM team")) {

            while (rs.next()) {
                Map<String, Object> team = new HashMap<>();
                team.put("team_id", rs.getInt("team_id"));
                team.put("name", rs.getString("name"));
                team.put("coach", rs.getString("coach"));
                team.put("tournament_id", rs.getInt("tournament_id"));
                result.add(team);
            }
        }
        return result;
    }

    // Converted viewPlayers
    static List<Map<String, Object>> viewPlayers(Connection con) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT player_id, name, role, team_id, runs, wickets FROM player")) {

            while (rs.next()) {
                Map<String, Object> player = new HashMap<>();
                player.put("player_id", rs.getInt("player_id"));
                player.put("name", rs.getString("name"));
                player.put("role", rs.getString("role"));
                player.put("team_id", rs.getInt("team_id"));
                player.put("runs", rs.getInt("runs"));
                player.put("wickets", rs.getInt("wickets"));
                result.add(player);
            }
        }
        return result;
    }

    // Converted viewMatches
    static List<Map<String, Object>> viewMatches(Connection con) throws SQLException {
        List<Map<String, Object>> result = new ArrayList<>();
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT match_id, tournament_id, team1_id, team2_id, winner_id, match_date, venue FROM match_details")) {

            while (rs.next()) {
                Map<String, Object> match = new HashMap<>();
                match.put("match_id", rs.getInt("match_id"));
                match.put("tournament_id", rs.getInt("tournament_id"));
                match.put("team1_id", rs.getInt("team1_id"));
                match.put("team2_id", rs.getInt("team2_id"));
                match.put("winner_id", rs.getInt("winner_id"));
                match.put("match_date", rs.getDate("match_date").toString());
                match.put("venue", rs.getString("venue"));
                result.add(match);
            }
        }
        return result;
    }
}