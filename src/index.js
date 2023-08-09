import Task from './modules/task.js';
import displayTask from './modules/UI.js'

function getPriority() {
    let prio = document.getElementsByName("priority");
    for (let i = 0; i < prio.length; i++) {
        if (prio[i].checked) {
            return prio[i].value;
        }
    }
}

let allTasks = new Array();

const addBtn = document.getElementById("add-task-btn");
const modal = document.getElementById("add-task");
const closeForm = document.getElementsByClassName("close")[0];
const taskForm = document.getElementById("new-task-form");

addBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

closeForm.addEventListener("click", () => {
    modal.style.display = "none";
    taskForm.reset();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
        taskForm.reset();
    }
})

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTitle = document.getElementById("new-title").value;
    let newDesc = document.getElementById("new-desc").value;
    let newDate = document.getElementById("new-date").value;
    let newPriority = getPriority();
    let newTask = new Task(newTitle, newDesc, newDate, newPriority, false);
    displayTask(newTask);
    allTasks.push(newTask);
    taskForm.reset();
    modal.style.display = "none";
})
