const input = document.getElementById("input");
const btn = document.getElementById("btn");
const listCont = document.getElementById("list_container");
const error = document.getElementById("errorMessage");

renderTasks();

function addTask() {
  const taskName = input.value.trim();
  if (taskName === "") {
    error.innerHTML = "You must type something!";
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;
    listCont.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    error.innerHTML = "";
  }
  input.value = "";
  saveTasks();
}

btn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

listCont.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveTasks();
    error.innerHTML = "";
  }
});

function saveTasks() {
  let tasks = [];
  listCont.querySelectorAll("li").forEach((task) => {
    tasks.push(task.textContent.slice(0, -1).trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = task;

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);

      listCont.appendChild(li);
    });
  }
}
