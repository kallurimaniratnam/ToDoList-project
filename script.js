let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display existing tasks on load
tasks.forEach(addTaskToDOM);

addBtn.addEventListener("click", addTask);

function addTask() {
  let text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  let task = { text: text, completed: false };
  tasks.push(task);
  addTaskToDOM(task);
  saveTasks();
  taskInput.value = "";
}

function addTaskToDOM(task) {
  let li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  // Toggle complete
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.className = "delete";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering complete toggle
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
