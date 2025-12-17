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

//CRUD OPERATIONS

// Create a new user
const insertUser = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');

function addUser(username, email) {
    try {
        const info = insertUser.run(username, email);
        console.log(`User created with ID: ${info.lastInsertRowid}`);
    } catch (error) {
        console.error('Error adding user:', error.message); // Likely a unique constraint violation
    }
}

//read users
const selectAllUsers = db.prepare('SELECT * FROM users');
const selectUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?');

function getUsers() {
    const users = selectAllUsers.all(); // .all() returns an array
    console.log('All Users:', users);
    return users;
}

function getUserByEmail(email) {
    const user = selectUserByEmail.get(email); // .get() returns a single object or undefined
    console.log(`User found (${email}):`, user);
}