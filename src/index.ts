import { v4 as uuidV4 } from 'uuid';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type Tasks = Array<Task>;

const list = document.querySelector<HTMLUListElement>("/#list");
const form = document.querySelector<HTMLFormElement>("/#new-task-form");
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// const tasks: Tasks = loadTasks();
// tasks.forEach((task) => {
//   addListItem(task);
// });

// form?.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   if (input) {
//     if (!input.value) return;

//     const newTask: Task = {
//       id: uuidV4(),
//       title: input.value,
//       completed: false,
//       createdAt: new Date(),
//     };

//     addListItem(newTask);
//     input.value = '';

//     saveTasks(newTask);
//   }
// });

// function addListItem<T>(newTask: Task) {
//   const listItem = document.createElement('li');
//   const label = document.createElement('label');
//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.checked = newTask.completed;

//   label.append(checkbox, newTask.title);
//   listItem.append(label);
//   list && list.append(listItem);

//   checkbox.addEventListener('change', function (evt) {
//     const target = evt.currentTarget as HTMLInputElement;
//     newTask.completed = target.checked;
//     saveTasks(newTask);
//   });
// }

// function saveTasks(task: Task) {
//   const foundTaskIndex: number = tasks.findIndex(
//     (savedTask) => savedTask.id === task.id,
//   );
//   foundTaskIndex >= 0
//     ? tasks.splice(foundTaskIndex, 1, task)
//     : tasks.push(task);
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks(): Tasks {
//   return JSON.parse(localStorage.getItem('tasks') as string) || [];
// }
