const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "done") return task.done;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.done ? 'done' : ''}">${task.text}</span>
      <div>
        <button onclick="toggleDone(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

renderTasks();