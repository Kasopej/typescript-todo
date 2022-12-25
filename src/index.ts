/* eslint-disable @typescript-eslint/no-unused-vars */
import './assets/styles/scss/custom.scss';
import 'bootstrap';
import debounce from '@/utils/debounce';

!localStorage.getItem('access_token')
  ? (location.href = 'login')
  : document.getElementsByTagName('main')[0].classList.remove('d-none');

interface Todo {
  id: number;
  description: string;
  completed: boolean;
  createdAt: Date;
}
type Todos = Array<Todo>;
type toggle = 'show' | 'hide';

//Elements from DOM
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
const statsListContainer = document.getElementsByClassName('stats')[0];

//
//retrieve Todos from store
const todosInStore = JSON.parse(localStorage.getItem('todos'));
const todos: Todos = todosInStore ?? [];

if (todos.length) {
  toggleElementDisplay('hide', emptyTodoElements[0]);

  todos.forEach((todo) => {
    appendTodoToDom(todo, allTodosPane.children[1]);
  });
  updateDom();
}

createTodoButton.addEventListener('click', () => {
  if (!createTodoInput.value) return;
  createTodo(createTodoInput.value, todos);
});

createTodoInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') createTodoButton.dispatchEvent(new Event('click'));
});

function createTodo(todoText: string, todos: Todos): void {
  let nextId = 1;

  todos.forEach((todo) => {
    nextId = todo.id >= nextId ? todo.id + 1 : nextId;
  });
  todos.push({
    id: nextId,
    description: todoText,
    completed: false,
    createdAt: new Date(),
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  updateDom();
}

function editTodo(): void {
  const todo: Todo = todos.find((todo) => todo.id == this.id);
  if (todo.completed) return;
  todo.description = this.value;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateDom();
}

function appendTodoToDom(todo: Todo, rootNode: Element, animate?: boolean) {
  const todoTemplateClone = todoTemplate.content.firstElementChild?.cloneNode(
    true,
  ) as HTMLElement;

  const [todoInputElem] = Array.from(
    todoTemplateClone.getElementsByTagName('input'),
  ) as Array<HTMLInputElement>;

  //attach data & listeners to todo elements
  todoInputElem.id = String(todo.id);
  todoInputElem.value = todo.description;
  todoInputElem.addEventListener('focusin', function () {
    if (!todo.completed) this.readOnly = false;
  });
  todoInputElem.addEventListener('input', debounce(editTodo, 500));
  todoTemplateClone.getElementsByClassName('todo-timestamp')[0].textContent =
    new Date(todo.createdAt).toTimeString();

  //attach styles for todo icons
  const [todoStatusIcon, todoDeleteIcon] = Array.from(
    todoTemplateClone.getElementsByClassName('todo-action-icons'),
  );
  todoStatusIcon.id = String(todo.id);
  todoDeleteIcon.id = String(todo.id);

  if (animate) {
    animateTodoElement(todoTemplateClone);
  }

  todoDeleteIcon.addEventListener('click', deleteTodo);
  if (todo.completed) todoStatusIcon.classList.add('bi-check-circle-fill');
  else {
    todoStatusIcon.classList.add('bi-check-circle');
    todoStatusIcon.addEventListener('click', completeTodo, {
      once: true,
    });
  }
  rootNode.appendChild(todoTemplateClone);
}

function toggleElementDisplay(toggle: toggle, element: Element) {
  if (toggle === 'hide') element.classList.add('d-none');
  else element.classList.remove('d-none');
}

function animateTodoElement(todoElement: HTMLElement) {
  todoElement.classList.add('slide');
  // setTimeout(() => todoElement.classList.remove('slide'), 2000);
}

function completeTodo(): void {
  todos.find((todo) => todo.id == this.id).completed = true;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateDom();
}

function deleteTodo(): void {
  const todoIndex = todos.findIndex((todo) => todo.id == this.id);
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  updateDom();
}

function updateDom(animate?: boolean): void {
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const pendingTodoPaneEmptyElemToggle: toggle = pendingTodos.length
    ? 'hide'
    : 'show';
  const allTodoPaneEmptyElemToggle: toggle = todos.length ? 'hide' : 'show';
  toggleElementDisplay(pendingTodoPaneEmptyElemToggle, emptyTodoElements[1]);
  toggleElementDisplay(allTodoPaneEmptyElemToggle, emptyTodoElements[0]);

  pendingTodosPane.children[1].textContent = '';
  allTodosPane.children[1].textContent = '';

  todos.forEach((todo) => {
    appendTodoToDom(todo, allTodosPane.children[1]);
  });
  pendingTodos.forEach((todo) =>
    appendTodoToDom(todo, pendingTodosPane.children[1]),
  );

  updateStatistics();
}

function updateStatistics(): void {
  const pendingTodos = todos.filter((todo) => !todo.completed);
  statsListContainer.getElementsByClassName(
    'stats-all',
  )[0].childNodes[0].nodeValue = String(todos.length);
  statsListContainer.getElementsByClassName(
    'stats-pending',
  )[0].childNodes[0].nodeValue = String(pendingTodos.length);
  statsListContainer.getElementsByClassName(
    'stats-completed',
  )[0].childNodes[0].nodeValue = String(todos.length - pendingTodos.length);
}
