const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Criação da tabela Pilotos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pilotos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      numero INTEGER NOT NULL,
      equipe TEXT NOT NULL,
      nacionalidade TEXT NOT NULL,
      nascimento DATE NOT NULL,
      vitorias INTEGER NOT NULL,
      altura TEXT NOT NULL
    )
  `);
});

module.exports = db;
