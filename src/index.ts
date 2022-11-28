/* eslint-disable @typescript-eslint/no-unused-vars */
import './assets/styles/scss/custom.scss';
import 'bootstrap';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type HTMLString = string;
type Tasks = Array<Task>;

const allTodosPane = document.getElementById('pills-home');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const todoTemplate = document.getElementById(
  'todo-template',
) as HTMLTemplateElement;

const todoTemplateClone = todoTemplate.content.cloneNode(true);
allTodosPane.appendChild(todoTemplateClone);
// const mainHTMLElement: HTMLElement = document.querySelector('main');
// mainHTMLElement.innerHTML = noTodosHTML;
