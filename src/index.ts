/* eslint-disable @typescript-eslint/no-unused-vars */
import './assets/styles/scss/custom.scss';
import 'bootstrap';

interface Todo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}
type Todos = Array<Todo>;

//retrieve Todos from store
const todosInStore = JSON.parse(localStorage.getItem('todos'));
const todos: Todos = todosInStore ? todosInStore : [];

const allTodosPane = document.getElementById('pills-all-todos');
const pendingTodosPane = document.getElementById('pills-pending-todos');
const todoTemplate = document.getElementById(
  'todo-template',
) as HTMLTemplateElement;

const emptyTodos = Array.from(document.getElementsByClassName('empty-todos'));

if (todos.length) {
  emptyTodos.forEach((emptyTodoEl) => emptyTodoEl.classList.add('d-none'));

  todos.forEach((todo) => {
    const todoTemplateClone =
      todoTemplate.content.firstElementChild.cloneNode(true);
    allTodosPane.appendChild(todoTemplateClone);
  });
}
