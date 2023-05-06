import { tasks, saveTasksToLocalStorage } from './tasks.js';

function markTaskComplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = true;
  saveTasksToLocalStorage();
}

function markTaskIncomplete(taskId) {
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.completed = false;
  saveTasksToLocalStorage();
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage();
}

export { markTaskComplete, markTaskIncomplete, clearCompletedTasks };
