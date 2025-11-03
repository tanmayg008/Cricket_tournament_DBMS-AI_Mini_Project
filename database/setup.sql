CREATE DATABASE cricket_tournament;

CREATE USER 'cricket_admin'@'localhost' IDENTIFIED BY 'cricket123';

GRANT ALL PRIVILEGES ON cricket_tournament.* TO 'cricket_admin'@'localhost';

FLUSH PRIVILEGES;

USE cricket_tournament;