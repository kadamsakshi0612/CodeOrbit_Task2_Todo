let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");
        li.className = "task-item";

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editTask(index);
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteTask(index);
        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(text);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
}

function addTask() {
    const input = document.getElementById("taskInput");
    const message = document.getElementById("message");

    const task = input.value.trim();

    if (task === "") {
        message.textContent = "Please enter a task.";
        return;
    }

    tasks.push(task);
    saveTasks();

    input.value = "";
    message.textContent = "";

    displayTasks();
}

function editTask(index) {
    const updatedTask = prompt("Edit your task:", tasks[index]);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index] = updatedTask.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function clearAllTasks() {
    if (tasks.length === 0) {
        return;
    }

    const confirmation = confirm("Are you sure you want to delete all tasks?");

    if (confirmation) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
}

displayTasks();