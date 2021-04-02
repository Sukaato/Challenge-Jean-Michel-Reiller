import nosqlite from 'nosqlite';

export const connection = new nosqlite.Connection();

export const db_teams = connection.database(__dirname + '/challenge_teams');
if (!db_teams.existsSync()) {
  db_teams.createSync();
}

export const db_params = connection.database(__dirname + '/challenge_params');
if (!db_params.existsSync()) {
  db_params.createSync();
}

export const db_logs = connection.database(__dirname + '/challenge_logs');
if (!db_logs.existsSync()) {
  db_logs.createSync();
}