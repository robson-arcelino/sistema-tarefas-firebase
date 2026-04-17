const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SUA_URL",
  databaseURL: "SUA_DATABASE_URL",
  projectId: "SEU_ID"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function salvarTarefa() {
  const input = document.getElementById("inputTarefa");
  const tarefa = input.value;

  if (tarefa === "") return;

  db.ref("tarefas").push({
    texto: tarefa
  });

  input.value = "";
}

function carregarTarefas() {
  const lista = document.getElementById("lista");

  db.ref("tarefas").on("value", snapshot => {
    lista.innerHTML = "";

    snapshot.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.val().texto}
        <button onclick="remover('${item.key}')">❌</button>
      `;
      lista.appendChild(li);
    });
  });
}

function remover(id) {
  db.ref("tarefas/" + id).remove();
}

carregarTarefas();