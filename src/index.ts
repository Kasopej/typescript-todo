/* eslint-disable @typescript-eslint/no-unused-vars */
import './assets/styles/scss/custom.scss';
import 'bootstrap';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
}
type Todos = Array<Todo>;
type toggle = 'show' | 'hide';

const allTodosPane = document.getElementById('pills-all-todos');
const pendingTodosPane = document.getElementById('pills-pending-todos');
const createTodoModal = document.getElementById('newTodoModal');
const createTodoInput = createTodoModal.getElementsByTagName('input')[0];
const createTodoButton = document.getElementById(
  'new-todo-btn',
) as HTMLButtonElement;
const todoTemplate = document.getElementById(
  'todo-template',
) as HTMLTemplateElement;
const emptyTodoElements = Array.from(
  document.getElementsByClassName('empty-todos'),
);

function createTodo(todoText: string, todos: Todos): Todo {
  let nextId = 1;

  todos.forEach((todo) => {
    nextId = todo.id > nextId ? todo.id + 1 : nextId;
  });

  const newTodo =
    todos[
      todos.push({
        id: nextId,
        description: todoText,
        completed: false,
        createdAt: new Date(),
      }) - 1
    ];
  localStorage.setItem('todos', JSON.stringify(todos));
  return newTodo;
}

function appendTodoToDom(todo: Todo) {
  const todoTemplateClone = todoTemplate.content.firstElementChild?.cloneNode(
    true,
  ) as HTMLElement;

  const todoTemplateInput = todoTemplateClone.getElementsByTagName(
    'input',
  )[0] as HTMLInputElement;
  todoTemplateInput.value = todo.description;
  todoTemplateInput.addEventListener('click', function () {
    this.readOnly = false;
  });

  todoTemplateClone.getElementsByClassName('todo-timestamp')[0].textContent =
    new Date(todo.createdAt).toTimeString();
  const todoTemplateStatusBtn =
    todoTemplateClone.getElementsByClassName('todo-status-btn')[0];

  allTodosPane.appendChild(todoTemplateClone);
  if (todo.completed)
    todoTemplateStatusBtn.classList.add('bi-check-circle-fill');
  else todoTemplateStatusBtn.classList.add('bi-check-circle');
}

function toggleEmptyTodoElements(toggle: toggle) {
  emptyTodoElements.forEach((emptyTodoEl) => {
    if (toggle === 'hide') emptyTodoEl.classList.add('d-none');
    else emptyTodoEl.classList.remove('d-none');
  });
}

//TODO: edit todo via input element. Create function for this
//TODO: make addition of new todo smooth via CSS move transition/animation

//
//retrieve Todos from store
const todosInStore = JSON.parse(localStorage.getItem('todos'));
const todos: Todos = todosInStore ? todosInStore : [];

createTodoButton.addEventListener('click', () => {
  if (!createTodoInput.value) return;
  appendTodoToDom(createTodo(createTodoInput.value, todos));
});

if (todos.length) {
  toggleEmptyTodoElements('hide');

  todos.forEach((todo) => {
    appendTodoToDom(todo);
  });
}
