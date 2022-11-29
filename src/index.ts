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

const allTodosPane = document.getElementById('pills-home');
const todoTemplate = document.getElementById(
  'todo-template',
) as HTMLTemplateElement;
const emptyTodosTemplate = document.getElementById(
  'no-todos-template',
) as HTMLTemplateElement;

if (!todos.length) {
  const emptyTemplateClone = emptyTodosTemplate.content.cloneNode(true);
  allTodosPane.appendChild(emptyTemplateClone);
} else {
  todos.forEach((todo) => {
    const todoTemplateClone = todoTemplate.content.cloneNode(true);
    allTodosPane.appendChild(todoTemplateClone);
  });
}
