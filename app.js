const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "") {
    taskList.innerHTML = "";

    tasks
        .filter(task =>
            task.text.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((task, index) => {

            const article = document.createElement("article");
            article.classList.add("task", task.priority);

            article.innerHTML = `
                <div class="task-info">
                    <h3>${task.text}</h3>
                </div>
                <span class="priority ${task.priority}">
                    Prioridad ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <button class="delete-btn" data-index="${index}">✕</button>
            `;

            taskList.appendChild(article);
        });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newTask = input.value.trim();
    const priority = prioritySelect.value;

    if (newTask === "") return;

    tasks.push({ text: newTask, priority });
    saveTasks();
    renderTasks(searchInput.value);

    input.value = "";
});

taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(searchInput.value);
    }
});

searchInput.addEventListener("input", function () {
    renderTasks(searchInput.value);
});

renderTasks();