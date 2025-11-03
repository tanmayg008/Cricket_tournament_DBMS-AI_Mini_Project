# Cricket Tournament Management System

A modern, full-stack web application for managing cricket tournaments, teams, players, and matches. Built with React, TypeScript, Tailwind CSS, and integrated with a Java backend and MySQL database.

## Features

- **Tournament Management**: Add, view, edit, and delete cricket tournaments
- **Team Management**: Manage teams with tournament associations and captains
- **Player Management**: Track players with their teams and roles (Batsman, Bowler, All-rounder, Wicket-keeper)
- **Match Management**: Schedule and track matches between teams
- **Interactive Dashboard**: Real-time statistics and data visualization
- **Chatbot Assistant**: AI-powered navigation helper
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS v4.0 for styling
- Radix UI components for accessibility
- Sonner for toast notifications
- Custom component library

### Backend
- Java
- MySQL Database
- RESTful API

## Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher)
2. **Java Backend** running on port 8080 (or configure a different port)
3. **MySQL Database** set up with:
   - Database name: `localhost2`
   - Username: `cricket_user`
   - Password: `Cr1ck3tP@ss`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cricket-tournament-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint** (Optional)
   
   By default, the app connects to `http://localhost:8080`. To change this:
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://your-backend-url:port
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:5173` (default Vite port).

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Backend API Endpoints

Ensure your Java backend implements these endpoints:

### Tournaments
- `POST /api/tournament/add` - Add a new tournament
- `GET /api/tournament/list` - Get all tournaments
- `PUT /api/tournament/update/:id` - Update a tournament
- `DELETE /api/tournament/delete/:id` - Delete a tournament

### Teams
- `POST /api/team/add` - Add a new team
- `GET /api/team/list` - Get all teams
- `PUT /api/team/update/:id` - Update a team
- `DELETE /api/team/delete/:id` - Delete a team

### Players
- `POST /api/player/add` - Add a new player
- `GET /api/player/list` - Get all players
- `PUT /api/player/update/:id` - Update a player
- `DELETE /api/player/delete/:id` - Delete a player

### Matches
- `POST /api/match/add` - Add a new match
- `GET /api/match/list` - Get all matches
- `PUT /api/match/update/:id` - Update a match
- `DELETE /api/match/delete/:id` - Delete a match

### Expected API Response Format

All endpoints should return JSON:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "id": 123
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**List Response:**
```json
[
  {
    "id": 1,
    "name": "Premier League 2025",
    "startDate": "2025-11-01",
    "venue": "Mumbai",
    ...
  }
]
```

## Database Schema

### Tournaments Table
```sql
CREATE TABLE tournaments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  venue VARCHAR(255) NOT NULL,
  status VARCHAR(50)
);
```

### Teams Table
```sql
CREATE TABLE teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  tournamentId INT,
  captain VARCHAR(255) NOT NULL,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(id)
);
```

### Players Table
```sql
CREATE TABLE players (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  teamId INT,
  role VARCHAR(50) NOT NULL,
  FOREIGN KEY (teamId) REFERENCES teams(id)
);
```

### Matches Table
```sql
CREATE TABLE matches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tournamentId INT,
  team1Id INT,
  team2Id INT,
  date DATE NOT NULL,
  venue VARCHAR(255) NOT NULL,
  winnerId INT,
  status VARCHAR(50),
  FOREIGN KEY (tournamentId) REFERENCES tournaments(id),
  FOREIGN KEY (team1Id) REFERENCES teams(id),
  FOREIGN KEY (team2Id) REFERENCES teams(id),
  FOREIGN KEY (winnerId) REFERENCES teams(id)
);
```

## Usage Guide

### Adding a Tournament
1. Click the "Add Tournament" button
2. Fill in the tournament name, start date, and venue
3. Click "Add Tournament" to save

### Adding a Team
1. Click the "Add Team" button
2. Select a tournament from the dropdown
3. Enter team name and captain
4. Click "Add Team" to save

### Adding a Player
1. Click the "Add Player" button
2. Select a team from the dropdown
3. Enter player name and select role
4. Click "Add Player" to save

### Adding a Match
1. Click the "Add Match" button
2. Select tournament and both teams
3. Enter match date and venue
4. Click "Add Match" to save

### Editing Records
- Click the edit icon (pencil) next to any record
- Update the information in the dialog
- Click "Update" to save changes

### Deleting Records
- Click the delete icon (trash) next to any record
- Confirm the deletion in the prompt

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── ActionButtons.tsx
│   │   ├── AddTournamentDialog.tsx
│   │   ├── AddTeamDialog.tsx
│   │   ├── AddPlayerDialog.tsx
│   │   ├── AddMatchDialog.tsx
│   │   ├── TournamentsTable.tsx
│   │   ├── TeamsTable.tsx
│   │   ├── PlayersTable.tsx
│   │   ├── MatchesTable.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── Chatbot.tsx
│   ├── services/           # API service layer
│   │   └── api.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   └── App.tsx             # Main application component
├── public/                 # Static assets
└── package.json
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your Java backend has CORS enabled:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in your Java application
- Ensure the database `localhost2` exists

### API Connection Issues
- Verify the backend is running on the correct port
- Check the `VITE_API_BASE_URL` environment variable
- Review browser console for error messages

## Deployment

### Frontend Deployment

**Using Vercel:**
```bash
npm run build
vercel --prod
```

**Using Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Backend Deployment

Deploy your Java backend to services like:
- AWS EC2
- Heroku
- DigitalOcean
- Azure App Service

Update the `VITE_API_BASE_URL` environment variable to point to your deployed backend.

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
