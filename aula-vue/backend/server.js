const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para listar pilotos
app.get("/pilotos", (req, res) => {
  db.all("SELECT nome, numero, equipe, id FROM pilotos", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/pilotos/:id", (req, res) => {
  const { id } = req.params; 
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
    res.json(row);
  });
});

app.post("/pilotos", (req, res) => {
  const { nome, numero, equipe, nacionalidade, nascimento, vitorias, altura } = req.body;
  const query = `INSERT INTO pilotos (nome, numero, equipe, nacionalidade, nascimento, vitorias, altura) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [nome, numero, equipe, nacionalidade, nascimento, vitorias, altura], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, nome, numero, equipe });
  });
});

app.delete("/pilotos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pilotos WHERE id = ?";

  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      // Se nenhum registro foi alterado, significa que o ID não existe
      res.status(404).json({ message: "Piloto não encontrado" });
    } else {
      res.json({ message: "Piloto deletado com sucesso" });
    }
  });
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
