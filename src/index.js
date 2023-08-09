import Task from './modules/task.js';
import displayTask from './modules/UI.js'
import Tasklist from './modules/tasklist.js';

function getPriority() {
    let prio = document.getElementsByName("priority");
    for (let i = 0; i < prio.length; i++) {
        if (prio[i].checked) {
            return prio[i].value;
        }
    }
}

const addBtn = document.getElementById("add-task-btn");
const modal = document.getElementById("add-task");
const editModal = document.getElementById("edit-task");
const closeForm = document.getElementById("add-close");
const closeEdit = document.getElementById("edit-close");
const taskForm = document.getElementById("new-task-form");

addBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

closeForm.addEventListener("click", () => {
    modal.style.display = "none";
    taskForm.reset();
});

closeEdit.addEventListener("click", () => {
    editModal.style.display = "none";
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        modal.style.display = "none";
        editModal.style.display = "none";
        taskForm.reset();
    }
})

let i = 0;
let allTaskList = new Array();
let allTasks = new Tasklist(allTaskList);

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTitle = document.getElementById("new-title").value;
    let newDesc = document.getElementById("new-desc").value;
    let newDate = document.getElementById("new-date").value;
    let newPriority = getPriority();
    let newTask = new Task(i, newTitle, newDesc, newDate, newPriority, false);
    displayTask(newTask);
    allTasks.addTask(newTask);
    taskForm.reset();
    modal.style.display = "none";
    i++;
})
