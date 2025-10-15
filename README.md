

# Cricket Tournament Management Dashboard

This is a full-stack web application designed to manage cricket tournaments, teams, players, and matches. The backend is built with Java and connects to a MySQL database, while the frontend is a modern dashboard built with React and Vite.

## Features

  * **Tournament Management:** Add and view tournament details.
  * **Team Management:** Add and view cricket teams and their coaches.
  * **Player Management:** Add and view players with their roles and stats.
  * **Match Management:** Add and view match schedules, venues, and results.
  * **Interactive UI:** A responsive dashboard with quick actions, summary cards, and a tabbed interface for easy navigation.
  * **Chatbot Assistant:** An in-app chatbot to help users navigate the dashboard and get quick information.

-----

## Project Structure

The project is contained in a single repository with the backend and frontend in separate folders.

```
CricketDBMS/
├── cricket-dashboard-ui/   # React Frontend Application
├── src/                    # Java Backend Source Code
├── pom.xml                 # Backend Maven Configuration
├── schema.sql              # Database table structure
└── data.sql                # Sample data for the database
```

-----

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following software installed on your system:

  * **Java (JDK 11 or higher)**
  * **Apache Maven**
  * **Node.js (v18 or higher) and npm**
  * **MySQL Server**
  * A database client like **DBeaver**

-----

### 1\. Database Setup

You need to create the database and a dedicated user, then import the schema and data.

1.  **Create the User and Database:** Open your MySQL client (like DBeaver or the command line) as a root user and run the following SQL commands:

    ```sql
    -- Create the database
    CREATE DATABASE IF NOT EXISTS localhost2;

    -- Create the dedicated user and set its password
    CREATE USER IF NOT EXISTS 'cricket_user'@'localhost' IDENTIFIED BY 'Cr1ck3tP@ss';

    -- Grant all permissions on the database to the new user
    GRANT ALL PRIVILEGES ON localhost2.* TO 'cricket_user'@'localhost';

    -- Apply the changes
    FLUSH PRIVILEGES;
    ```

2.  **Import the Schema:** In your database client, connect to the `localhost2` database and execute the `schema.sql` file to create all the necessary tables.

3.  **Import the Data (Optional):** To populate the database with sample entries, execute the `data.sql` file.

-----

### 2\. Backend Setup

The backend is a Java web server built with Javalin.

1.  **Open a terminal** and navigate to the root project directory:
    ```bash
    cd ~/CricketDBMS
    ```
2.  **Compile and run the server** using Maven. This will download dependencies and start the application.
    ```bash
    mvn compile exec:java
    ```
3.  The backend server will start and run on `http://localhost:7070`.

-----

### 3\. Frontend Setup

The frontend is a React application built with Vite.

1.  **Open a second terminal** (keep the backend server running in the first one).
2.  **Navigate into the frontend directory**:
    ```bash
    cd ~/CricketDBMS/cricket-dashboard-ui
    ```
3.  **Install the dependencies** using npm:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  The frontend will open automatically in your browser at `http://localhost:5173` (or the next available port).

-----

## Usage

  * **Access the Frontend:** Open your web browser and go to `http://localhost:5173`.
  * **Access the Backend API:** The backend exposes several endpoints that the frontend will use. You can test them directly in your browser:
      * `http://localhost:7070/api/tournaments`
      * `http://localhost:7070/api/teams`
      * `http://localhost:7070/api/players`
      * `http://localhost:7070/api/matches`

-----

## Technology Stack

  * **Backend:** Java, Javalin (for web server), Maven (for dependency management)
  * **Frontend:** React, TypeScript, Vite, Tailwind CSS
  * **Database:** MySQL