const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/salvar-contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  const novoContato = {
    nome,
    email,
    mensagem,
    data: new Date().toISOString(),
  };

  fs.readFile("contatos.json", "utf8", (err, data) => {
    let contatos = [];

    if (!err && data) {
      contatos = JSON.parse(data);
    }

    contatos.push(novoContato);

    fs.writeFile("contatos.json", JSON.stringify(contatos, null, 2), (err) => {
      if (err) {
        console.error("Erro ao salvar:", err);
        return res.status(500).send("Erro ao salvar os dados.");
      }
      res.send("Dados enviados com sucesso!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
