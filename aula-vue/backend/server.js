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

app.get("/pilotos/:id", (req, res) => {
  const { id } = req.params; // Pega o id da URL
  console.log("ID recebido:", id); // Verifique se o id está sendo capturado corretamente

  const query = "SELECT * FROM pilotos WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Piloto não encontrado" });
      return;
    }
    res.json(row); // Retorna os dados do piloto
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
