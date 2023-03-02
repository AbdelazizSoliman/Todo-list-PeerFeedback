import './style.css';

const input = document.querySelector('#new-task-input');
const submitButton = document.querySelector('.add');
const taskList = document.querySelector('#tasks');
let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

/*eslint-disable*/
loadTasks();

// Add task
submitButton.onclick = function (e) {
  e.preventDefault();
  if (input.value !== "") {
    /*eslint-disable*/
    createNewTask(input.value);
    input.value = "";
  }
};

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const { id } = e.target.parentElement.dataset;
    /*eslint-disable*/
    deleteTask(id);
    e.target.parentElement.remove();
  }
});

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

function addTaskToDOM(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "task";
  if (task.completed) {
    taskElement.classList.add("done");
  }
  taskElement.dataset.id = task.id;
  taskElement.appendChild(document.createTextNode(task.title));
  const deleteButton = document.createElement("span");
  deleteButton.className = "del";
  deleteButton.appendChild(document.createTextNode("Delete"));
  taskElement.appendChild(deleteButton);
  taskList.appendChild(taskElement);
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    const tasksFromStorage = JSON.parse(data);
    tasksFromStorage.forEach(addTaskToDOM);
    tasks = tasksFromStorage;
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id != taskId);
  saveTasksToLocalStorage();
}
