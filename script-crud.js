const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const cancelFormTaskBtn = document.querySelector(".app__form-footer__button--cancel");
const taskAtiveDescription = document.querySelector('.app__section-active-task-description');

// Pega as tarefas no localStorage
const localStorageTarefas = localStorage.getItem("tarefas");

// Atribui as tarefas pegas no localStorage a variavel tarefas, se nao tem nenhum dado no localStorage ele atribui um array vazio a variavel tarefas
let tarefas = (localStorageTarefas) ? JSON.parse(localStorageTarefas) : [];

// Lista de tarefas
// let tarefas = [
// {
//   descricao: 'Tarefa Concluída',
//   concluida: true
// },
// {
//   descricao: 'Tarefa Pendente',
//   concluida: false
// }
// ];

// Imagem no formato svg
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

let tarefaSelecionada = null;
let itemTarefaSelecionada = null;

const selecionaTarefa = () => {};

// Limpa o formulario
const limparForm = () => {
  textArea.value = "";
  formTask.classList.add("hidden");
};

// Cria uma tarefa
function createTask(tarefa) {
  // Cria o elemento 'li'
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  // Cria o elemento 'svg'
  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSvg;

  // Cria o elemento 'p'
  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = tarefa.descricao;

  li.onclick = () => {
    selecionaTarefa(tarefa, li);
  }

  // Coloca os elementos 'svg' e 'p' dentro do elemento 'li'
  li.appendChild(svgIcon);
  li.appendChild(paragraph);

  return li;
}

// Adiciona a lista na pagina as tarefas
tarefas.forEach((task) => {
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
});

// Mostra o formulario
toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando tarefa";
  formTask.classList.toggle("hidden");
});

// Atualiza o localStorage com as novas tarefas
const updateLocalStorage = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
};

// Acao do formulario
formTask.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const task = {
    descricao: textArea.value,
    concluido: false
  };

  // Coloca a tarefa na lista de tarefas
  tarefas.push(task);

  // Cria o html da tarefa
  const taskItem = createTask(task);

  // Coloca a tarefa na pagina
  taskListContainer.appendChild(taskItem)

  updateLocalStorage();

  // Limpa o formulario depois que o submit for realizado
  limparForm();
});

// Esconde o formulario
cancelFormTaskBtn.addEventListener("click", () => {
  formTask.classList.add('hidden');
  limparForm();
});

/*
const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const cancelFormTaskBtn = document.querySelector(".app__form-footer__button--cancel");

// Lista de tarefas
let tarefas = [
  // {
  //   descricao: 'Tarefa Concluída',
  //   concluida: true
  // },
  // {
  //   descricao: 'Tarefa Pendente',
  //   concluida: false
  // }
];

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

// Limpa o formulario
const limparForm = () => {
  textArea.value = "";
  formTask.classList.add("hidden");
};

// Cria uma tarefa
function createTask(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = tarefa.descricao;

  li.appendChild(svgIcon);
  li.appendChild(paragraph);

  return li;
}

// Adiciona a lista na pagina as tarefas
tarefas.forEach((task) => {
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
});

// Mostra o formulario
toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando tarefa";
  formTask.classList.toggle("hidden");
});

// Acao do formulario
formTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    descricao: textArea.value,
    concluido: false
  };
  tarefas.push(task);
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem)

  limparForm();
});

// Esconde o formulario
cancelFormTaskBtn.addEventListener("click", () => {
  formTask.classList.add('hidden');
  limparForm();
});

localStorage.setItem("quantidade", 10);
*/