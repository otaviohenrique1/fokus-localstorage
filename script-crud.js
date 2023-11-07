const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const taskAtiveDescription = document.querySelector('.app__section-active-task-description');
const cancelFormTaskBtn = document.querySelector(".app__form-footer__button--cancel");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const btnDeletar = document.querySelector(".app__form-footer__button--delete");
const btnDeletarConcluidas = document.querySelector('#btn-remover-concluidas');
const btnDeletarTodas = document.querySelector('#btn-remover-todas');
;
// Pega as tarefas no localStorage
const localStorageTarefas = localStorage.getItem("tarefas");

// Atribui as tarefas pegas no localStorage a variavel tarefas, se nao tem nenhum dado no localStorage ele atribui um array vazio a variavel tarefas
let tarefas = (localStorageTarefas) ? JSON.parse(localStorageTarefas) : [];

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

let tarefaEmEdicao = null;
let paragraphEmEdicao = null;

const selecionaTarefa = (tarefa, elemento) => {
  if (tarefa.concluida) {
    return;
  }

  document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
    button.classList.remove('app__section-task-list-item-active');
  });

  if (tarefaSelecionada == tarefa) {
    taskAtiveDescription.textContent = null;
    itemTarefaSelecionada = null;
    tarefaSelecionada = null;
    return;
  }

  tarefaSelecionada = tarefa;
  itemTarefaSelecionada = elemento;
  taskAtiveDescription.textContent = tarefa.descricao;
  elemento.classList.add('app__section-task-list-item-active');
};

// Limpa o formulario
const limparForm = () => {
  tarefaEmEdicao = null;
  paragraphEmEdicao = null;
  textArea.value = "";
  formTask.classList.add("hidden");
};

const selecionaTarefaParaEditar = (tarefa, elemento) => {
  if (tarefaEmEdicao == tarefa) {
    limparForm();
    return;
  }

  formLabel.textContent = "Editando tarefa";
  tarefaEmEdicao = tarefa;
  paragraphEmEdicao = elemento;
  textArea.value = tarefa.descricao;
  formTask.classList.remove("hidden");
}

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
  
  // Cria o elemento 'button'
  const button = document.createElement("button");

  button.classList.add('app_button-edit');
  const editIcon = document.createElement('img');
  editIcon.setAttribute('src', 'imagens/edit.png');

  button.appendChild(editIcon);

  button.addEventListener("click", (evento) => {
    evento.stopPropagation();
    selecionaTarefaParaEditar(tarefa, paragraph);
  });

  svgIcon.addEventListener("click", (evento) => {
    if (tarefa == tarefaSelecionada) {
      evento.stopPropagation();
      button.setAttribute("disabled", true);
      li.classList.add("app__section-task-list-item-complete");
      tarefaSelecionada.concluida = true;
      updateLocalStorage();
    }
  });

  if (tarefas.concluida) {
    button.setAttribute("disabled", true);
    li.classList.add("app__section-task-list-item-complete");
  }

  // Coloca os elementos 'svg' e 'p' dentro do elemento 'li'
  li.appendChild(svgIcon);
  li.appendChild(paragraph);
  li.appendChild(button);

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

btnCancelar.addEventListener("click", () => limparForm);

btnDeletar.addEventListener("click", () => {
  if (tarefaSelecionada) {
    const index = tarefas.indexOf(tarefaSelecionada);
    if (index !== -1) {
      tarefas.splice(index, 1);
    }
    itemTarefaSelecionada.remove();
    tarefas.filter((t) => r != tarefaSelecionada);
    itemTarefaSelecionada = null;
    tarefaSelecionada = null;
  }
  updateLocalStorage();
  limparForm();
});

const removerTarefas = (somenteConcluidas) => {
  const seletor = somenteConcluidas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
  document.querySelectorAll(seletor).forEach((element) => {
      element.remove();
  });

  tarefas = somenteConcluidas ? tarefas.filter(t => !t.concluida) : []
  updateLocalStorage()
}

btnDeletarConcluidas.addEventListener('click', () => removerTarefas(true))
btnDeletarTodas.addEventListener('click', () => removerTarefas(false))

// Acao do formulario
formTask.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (tarefaEmEdicao) {
    tarefaEmEdicao.textContent = textArea.value;
    paragraphEmEdicao.textContent = textArea.value;
  } else {
    const task = {
      descricao: textArea.value,
      concluido: false
    };
  
    // Coloca a tarefa na lista de tarefas
    tarefas.push(task);
  
    // Cria o html da tarefa
    const taskItem = createTask(task);
  
    // Coloca a tarefa na pagina
    taskListContainer.appendChild(taskItem);
  }

  updateLocalStorage();

  // Limpa o formulario depois que o submit for realizado
  limparForm();
});

// Esconde o formulario
cancelFormTaskBtn.addEventListener("click", () => {
  formTask.classList.add('hidden');
  limparForm();
});

document.addEventListener("TarefaFinalizada", function(evento) {
  if (tarefaSelecionada) {
    tarefaSelecionada.concluida = true;
    itemTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    itemTarefaSelecionada.querySelector("button").setAttribute("disabled", true)
    updateLocalStorage();
  }
})

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