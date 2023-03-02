import "./style.css";

const input = document.querySelector("#new-task-input");
const submit = document.querySelector(".add");
const listEL = document.querySelector("#tasks");
let arrayofTasks = [];
if (localStorage.getItem("tasks")) {
  arrayofTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorage();
// Add task
submit.onclick = function (e) {
  e.preventDefault();
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

listEL.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});

function addTaskToArray(tasktText) {
  const task = {
    id: Date.now(),
    title: tasktText,
    completed: false,
  };
  arrayofTasks.push(task);
  addElementsToForm(arrayofTasks);

  addToLocalStorage(arrayofTasks);
}
function addElementsToForm(arrayofTasks) {
  listEL.innerHTML = "";
  arrayofTasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    const span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    listEL.appendChild(div);
  });
}

function addToLocalStorage(arrayofTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayofTasks));
}

function getFromLocalStorage() {
  const data = window.localStorage.getItem("tasks");
  if (data) {
    const tasks = JSON.parse(data);
    addElementsToForm(tasks);
  }
}

function deleteTask(taskId) {
  arrayofTasks = arrayofTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayofTasks);
}
