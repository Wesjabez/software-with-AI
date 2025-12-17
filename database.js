import Database from 'better-sqlite3';

const db= new Database('app.db');
db.pragma('journal_mode = WAL')

const createTable =  `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE
)
    `;

db.exec(createTable);

export default db;