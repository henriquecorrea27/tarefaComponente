const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para listar pilotos
app.get("/pilotos", (req, res) => {
  db.all("SELECT * FROM pilotos", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para adicionar piloto
app.post("/pilotos", (req, res) => {
  const { nome, numero, equipe } = req.body;
  const query = `INSERT INTO pilotos (nome, numero, equipe) VALUES (?, ?, ?)`;
  db.run(query, [nome, numero, equipe], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nome, numero, equipe });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
