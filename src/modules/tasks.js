const taskList = document.querySelector('#tasks');
const titleElement = document.createElement('span');
let tasks = [];
function createTitleElement(title) {
  const element = document.createElement('span');
  element.className = 'title';
  element.contentEditable = true;
  element.textContent = title;
  return element;
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleTitleInput(e) {
  const taskElement = e.target.parentElement;
  const taskId = taskElement.dataset.id;
  const task = tasks.find((task) => task.id.toString() === taskId.toString());
  task.title = e.target.textContent;
  saveTasksToLocalStorage();
}

function createDeleteButton() {
  const element = document.createElement('span');
  element.className = 'del';
  element.appendChild(document.createTextNode('Delete'));
  return element;
}

function addTaskToDOM(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  if (task.completed) {
    taskElement.classList.add('done');
  }
  taskElement.dataset.id = task.id;

  const titleElement = createTitleElement(task.title);
  titleElement.addEventListener('input', handleTitleInput);

  const deleteButton = createDeleteButton();
  taskElement.appendChild(titleElement);
  taskElement.appendChild(deleteButton);
  taskList.appendChild(taskElement);
}

function loadTasks() {
  const data = localStorage.getItem('tasks');
  tasks = data ? JSON.parse(data) : [];
  tasks.forEach(addTaskToDOM);
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id.toString() !== taskId.toString());
  saveTasksToLocalStorage();
}

function handleTaskListClick(e) {
  if (e.target.classList.contains('del')) {
    const taskId = e.target.parentElement.dataset.id;
    deleteTask(taskId);
    e.target.parentElement.remove();
  }
  titleElement.focus();
}

function setupEventListeners() {
  taskList.addEventListener('click', handleTaskListClick);
}

function initializeTasks() {
  loadTasks();
  setupEventListeners();
}

function createNewTask(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasks.push(task);
  addTaskToDOM(task);
  saveTasksToLocalStorage();
}

export { initializeTasks, createNewTask, deleteTask };
