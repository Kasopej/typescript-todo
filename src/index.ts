/* eslint-disable @typescript-eslint/no-unused-vars */
import './assets/styles/scss/custom.scss';
import 'bootstrap';
import debounce from '@/utils/debounce';

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

//TODO: add login page via webpack multi entry feature.
/*
useful guides for webpack multi entry config:
https://stackoverflow.com/questions/61446198/webpack-when-using-2-entry-files-both-files-include-the-same-css-is-there-a
https://webpack.js.org/guides/output-management/
https://webpack.js.org/plugins/split-chunks-plugin/
https://survivejs.com/webpack/output/multiple-pages/
*/

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

  const [todoTemplateInput] = Array.from(
    todoTemplateClone.getElementsByTagName('input'),
  ) as Array<HTMLInputElement>;

  //attach data & listeners to todo elements
  todoTemplateInput.id = String(todo.id);
  todoTemplateInput.value = todo.description;
  todoTemplateInput.addEventListener('focusin', function () {
    if (!todo.completed) this.readOnly = false;
  });
  todoTemplateInput.addEventListener('input', debounce(editTodo, 500));
  todoTemplateClone.getElementsByClassName('todo-timestamp')[0].textContent =
    new Date(todo.createdAt).toTimeString();

  //attach styles for todo icons
  const [todoTemplateStatusIcon] = Array.from(
    todoTemplateClone.getElementsByClassName('todo-status-icon'),
  );
  todoTemplateStatusIcon.id = String(todo.id);

  if (animate) {
    animateTodoElement(todoTemplateClone);
  }

  rootNode.appendChild(todoTemplateClone);
  if (todo.completed)
    todoTemplateStatusIcon.classList.add('bi-check-circle-fill');
  else {
    todoTemplateStatusIcon.classList.add('bi-check-circle');
    todoTemplateStatusIcon.addEventListener('click', completeTodo, {
      once: true,
    });
  }
}

function toggleElementDisplay(toggle: toggle, element: Element) {
  if (toggle === 'hide') element.classList.add('d-none');
  else element.classList.remove('d-none');
}

function animateTodoElement(todoElement: HTMLElement) {
  todoElement.classList.add('slide');
  setTimeout(() => todoElement.classList.remove('slide'), 2000);
}

function completeTodo(): void {
  todos.find((todo) => todo.id == this.id).completed = true;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateDom();
}

function updateDom(): void {
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
}
