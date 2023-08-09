import Task from './task.js';

function editPriority() {
    let editPrio = document.getElementsByName("edit-priority");
    for (let i = 0; i < editPrio.length; i++) {
        if (editPrio[i].checked) {
            return editPrio[i].value;
        }
    }
}

export default function displayTask(Task) {
    const taskElement = document.getElementById("tasks");
    let task = document.createElement("div");
    task.id = Task.id;
    task.classList.add("task");
    let title = document.createElement("div");
    let desc = document.createElement("div");
    let date = document.createElement("div");
    let priority = document.createElement("div");
    let buttons = document.createElement("div");
    let completed = document.createElement("button");
    let removeTask = document.createElement("button");
    let editTask = document.createElement("button");
    buttons.classList.add("task-btns");
    completed.classList.add("task-btn");
    removeTask.classList.add("task-btn");
    editTask.classList.add("task-btn");
    removeTask.addEventListener("click", () => {
        taskElement.removeChild(task);
    })
    completed.addEventListener("click", () => {
        if (Task.completed) {
            Task.completed = false;
            completed.style.color = "red";
            task.classList.add("not-completed");
            task.classList.remove("completed");
        } else {
            Task.completed = true;
            completed.style.color = "green";
            task.classList.remove("not-completed");
            task.classList.add("completed");
        }
        completed.innerHTML = Task.completed ? "✓":"✗";
    })
    task.classList.add("not-completed");
    buttons.appendChild(completed);
    buttons.appendChild(removeTask);
    buttons.appendChild(editTask);
    title.innerText = Task.title;
    desc.innerText = Task.description;
    date.innerText = Task.dueDate;
    if (Task.priority == undefined) {
        priority.innerText = "";
    } else {
        priority.innerText = "Priority: " + Task.priority;
    }
    completed.innerHTML = Task.completed ? "✓":"✗";
    completed.style.color = "red";
    removeTask.innerHTML = "Del";
    editTask.innerHTML = "Edit";
    task.classList.add(Task.priority);
    title.classList.add("title-content");
    desc.classList.add("desc-content");
    priority.classList.add("prio-content");
    date.classList.add("date-content");
    task.appendChild(title);
    task.appendChild(desc);
    task.appendChild(date);
    task.appendChild(priority);
    task.appendChild(buttons);
    taskElement.appendChild(task);
}
