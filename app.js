const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

function priorityClass(priority) {
    switch(priority){
        case 'Alta': return 'bg-red-600';
        case 'Media': return 'bg-yellow-500';
        case 'Baja': return 'bg-green-500';
        default: return 'bg-gray-500';
    }
}

function renderTasks(filter = "") {
    taskList.innerHTML = "";

    tasks
        .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {

            const article = document.createElement("div");
            article.className = `task flex justify-between items-center p-4 bg-black/30 backdrop-blur-md rounded-xl border border-cyan-500 shadow-[0_0_10px_#ff00ff,0_0_15px_#00ffff] hover:translate-y-[-6px] hover:shadow-[0_0_20px_#ff00ff,0_0_25px_#00ffff] transition`;

            const info = document.createElement("div");
            info.className = "task-info";
            const title = document.createElement("h3");
            title.className = "text-lg font-semibold";
            title.textContent = task.text;
            info.appendChild(title);

            const span = document.createElement("span");
            span.className = `priority px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${priorityClass(task.priority)} shadow-[0_0_5px_#fff]`;
            span.textContent = `Prioridad ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;

            const delBtn = document.createElement("button");
            delBtn.className = "delete-btn text-red-500 text-lg hover:scale-110 transition";
            delBtn.textContent = "✕";
            delBtn.onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(searchInput.value);
            };

            article.appendChild(info);
            article.appendChild(span);
            article.appendChild(delBtn);

            taskList.appendChild(article);
        });
}


form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newTask = input.value.trim();
    const priority = prioritySelect.value;

    if (newTask === "") return;

    tasks.push({ text: newTask, priority });
    saveTasks();
    renderTasks(searchInput.value);
    input.value = "";
});


searchInput.addEventListener("input", function() {
    renderTasks(searchInput.value);
});

const darkToggle = document.getElementById("dark-toggle");

darkToggle.addEventListener("click", () => {
    
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        darkToggle.textContent = "🌓 Modo Claro";
    } else {
        darkToggle.textContent = "🌓 Modo Oscuro";
    }
});


renderTasks();