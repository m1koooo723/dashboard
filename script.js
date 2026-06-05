// ===== ЧАСЫ =====

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("ru-RU");

    const date = now.toLocaleDateString("ru-RU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();


// ===== ЗАДАЧИ =====

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    const taskList = document.getElementById("tasks");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";

        const span = document.createElement("span");
        span.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.style.width = "40px";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.onclick = () => {
            deleteTask(index);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateStats();

    saveTasks();
}

function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") {
        return;
    }

    tasks.push(task);

    input.value = "";

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    renderTasks();
}


// ===== СТАТИСТИКА =====

function updateStats() {

    const count = document.getElementById("count");

    count.textContent = tasks.length;
}


// ===== ENTER =====

document
    .getElementById("taskInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    });


// ===== ЗАГРУЗКА =====

renderTasks();