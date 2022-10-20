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

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const noTodosHTML: HTMLString = `<h3 class="mb-4 mx-auto text-center">Nothing Here (Yet)</h3>
<button>Create Todo</button>`;

const mainHTMLElement: HTMLElement = document.querySelector('main');
mainHTMLElement.innerHTML = noTodosHTML;
