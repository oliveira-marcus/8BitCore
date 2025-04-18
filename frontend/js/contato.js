document.querySelector(".formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  fetch("http://localhost:3000/salvar-contato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, email, mensagem }),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      document.querySelector(".formulario").reset();
    })
    .catch((err) => alert("Erro ao enviar: " + err));
});
