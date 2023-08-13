import Task from "./modules/task";
import Project from "./modules/project";
import Projectlist from "./modules/projectlist";

const taskFeed = document.getElementById("tasks");
const taskForm = document.getElementById("task-form");
const currTitle = document.getElementById("curr-project");

let projects = new Projectlist();
let allTasks = new Project("All tasks");
projects.addProject(allTasks);
projects.setCurrProject("All tasks");
currTitle.innerText = "All tasks";

taskForm.addEventListener("submit", e => createTask(e, projects.getCurrProject()));
document.addEventListener("DOMContentLoaded", () => {
    let savedTasks = JSON.parse(localStorage.getItem("All tasks"));
    if (savedTasks != null) {
        savedTasks.forEach(task => {
        displayTask(task.title);
        const nTask = new Task(task.title);
        projects.getProject("All tasks").addTask(nTask);
        });
    }
    let savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects != null) {
        savedProjects.forEach(project => {
            const nProject = new Project(project);
            projects.addProject(nProject);
            projects.addProjectName(nProject.getName());
            displayProject(project);
            let projectTasks = JSON.parse(localStorage.getItem(project));
            if (projectTasks != null) {
                projectTasks.forEach(task => {
                    const nPTask = new Task(task.title)
                    projects.getProject(nProject.getName()).addTask(nPTask);
                })
            }
        })
    }
})

function displayTask(task) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    const taskTitle = task;
    newTask.id = taskTitle;
    const textContent = document.createElement("div");
    textContent.innerText = taskTitle;
    textContent.classList.add("text-content");
    textContent.classList.add("hidden");
    textContent.classList.toggle("hidden");
    const textEdit = document.createElement("input");
    const textEditBtn = document.createElement("button");
    textEditBtn.addEventListener("click", e => confirmEdit(e));
    textEditBtn.innerHTML = "&check;";
    textEditBtn.classList.add("hidden");
    textEditBtn.classList.add("confirm-edit");
    textEdit.classList.add("hidden");
    textEdit.classList.add("edit-form");
    textEdit.autocomplete = "off";
    textEdit.type = "text";
    textEdit.placeholder = "edit task..."
    newTask.appendChild(textEdit);
    newTask.appendChild(textEditBtn);
    newTask.appendChild(textContent);
    addTaskBtns(newTask);
    taskFeed.appendChild(newTask);
}

function createTask(e, currProj) {
    e.preventDefault();
    const taskTitle = document.getElementById("task-title").value;
    if (projects.getProject("All tasks").containsTask(taskTitle)) {
        alert("Task already exists!");
        taskForm.reset();
        return;
    }
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.id = taskTitle;
    if (currProj == "All tasks") {
        let task = new Task(taskTitle);
        projects.getProject(currProj).addTask(task);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
    } else {
        let task = new Task(taskTitle);
        let projTask = new Task(taskTitle);
        projects.getProject("All tasks").addTask(task);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
        projects.getProject(currProj).addTask(projTask);
        localStorage.setItem(currProj, JSON.stringify(projects.getProject(currProj).getTaskList()));
    }
    const textContent = document.createElement("div");
    textContent.innerText = taskTitle;
    textContent.classList.add("text-content");
    textContent.classList.add("hidden");
    textContent.classList.toggle("hidden");
    const textEdit = document.createElement("input");
    const textEditBtn = document.createElement("button");
    textEditBtn.addEventListener("click", e => confirmEdit(e));
    textEditBtn.innerHTML = "&check;";
    textEditBtn.classList.add("hidden");
    textEditBtn.classList.add("confirm-edit");
    textEdit.classList.add("hidden");
    textEdit.classList.add("edit-form");
    textEdit.autocomplete = "off";
    textEdit.type = "text";
    textEdit.placeholder = "edit task..."
    newTask.appendChild(textEdit);
    newTask.appendChild(textEditBtn);
    newTask.appendChild(textContent);
    addTaskBtns(newTask);
    taskFeed.appendChild(newTask);
    taskForm.reset();
}

function addTaskBtns(task) {
    const btns = document.createElement("div");
    btns.classList.add("task-btns");
    const edit = document.createElement("button");
    const del = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit-btn");
    edit.addEventListener("click", e => editTask(e));
    del.innerText = "Del";
    del.classList.add("del-btn");
    del.addEventListener("click", e => deleteTask(e));
    btns.appendChild(edit);
    btns.appendChild(del);
    task.appendChild(btns);
}

function deleteTask(e) {
    const removedTask = e.target.parentNode.parentNode;
    const text = removedTask.querySelector(".text-content");
    if (projects.getCurrProject() == "All tasks") {
        projects.getProject("All tasks").deleteTask(text.innerText);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
    } else {
        projects.getProject("All tasks").deleteTask(text.innerText);
        projects.getProject(projects.getCurrProject()).deleteTask(text.innerText);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
        localStorage.setItem(projects.getCurrProject(), JSON.stringify(projects.getProject(projects.getCurrProject()).getTaskList()));
    }
    taskFeed.removeChild(removedTask);
}

function editTask(e) {
    const editTask = e.target.parentNode.parentNode;
    const text = editTask.querySelector(".text-content");
    const editForm = editTask.querySelector(".edit-form");
    const editFormBtn = editTask.querySelector(".confirm-edit");
    editForm.value = text.innerText;
    editForm.classList.toggle("hidden");
    editFormBtn.classList.toggle("hidden");
    text.classList.toggle("hidden");
    console.log(projects.getCurrProject());
}

function confirmEdit(e) {
    console.log(projects.getCurrProject());
    const editTask = e.target.parentNode;
    const text = editTask.querySelector(".text-content");
    const editForm = editTask.querySelector(".edit-form");
    const editFormBtn = editTask.querySelector(".confirm-edit");
    console.log("before edit:");
    console.log(projects.getProject("All tasks").getTaskList());
    console.log(projects.getProject(projects.getCurrProject()).getTaskList());
    if (projects.getCurrProject() == "All tasks") {
        projects.getProject("All tasks").findTask(text.innerText).setTitle(editForm.value);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
        const projectList = projects.getProjects();
        projectList.forEach(project => {
            if (project.containsTask(text.innerText)) {
                project.findTask(text.innerText).setTitle(editForm.value);
                localStorage.setItem(project.getName(), JSON.stringify(project.getTaskList()));
            }
        });
    } else {
        projects.getProject("All tasks").findTask(text.innerText).setTitle(editForm.value);
        projects.getProject(projects.getCurrProject()).findTask(text.innerText).setTitle(editForm.value);
        localStorage.setItem("All tasks", JSON.stringify(projects.getProject("All tasks").getTaskList()));
        localStorage.setItem(projects.getCurrProject(), JSON.stringify(projects.getProject(projects.getCurrProject()).getTaskList()));
    }
    console.log("after edit:");
    console.log(projects.getProject("All tasks").getTaskList());
    console.log(projects.getProject(projects.getCurrProject()).getTaskList());
    text.innerText = editForm.value;
    editTask.id = editForm.value;
    editForm.classList.toggle("hidden");
    editFormBtn.classList.toggle("hidden");
    text.classList.toggle("hidden");
}

const allTaskBtn = document.getElementById("all-tasks");

allTaskBtn.addEventListener("click", () => {
    viewTasks("All tasks");
    toggleProject("All tasks");
})

function viewTasks(projectName) {
    const project = projects.getProject(projectName);
    const tasks = taskFeed.childNodes;
    for (let i = 0; i < tasks.length; i++) {
        if (!project.containsTask(tasks[i].id)) {
            tasks[i].classList.add("hidden");
            tasks[i].classList.remove("task");
        } else {
            tasks[i].classList.remove("hidden");
            tasks[i].classList.add("task");
        }
    }
    projects.setCurrProject(projectName);
}

const addProjectBtn = document.getElementById("add-project");
const addProjectInput = document.getElementById("project-title");
const confirmProject = document.getElementById("confirm-project");
const cancelProject = document.getElementById("cancel-project");

addProjectBtn.addEventListener("click", () => {
    addProjectInput.classList.toggle("hidden");
    confirmProject.classList.toggle("hidden");
    cancelProject.classList.toggle("hidden");
    addProjectInput.value = "";
})

cancelProject.addEventListener("click", () => {
    addProjectInput.classList.toggle("hidden");
    confirmProject.classList.toggle("hidden");
    cancelProject.classList.toggle("hidden");
    addProjectInput.value = "";
})

confirmProject.addEventListener("click", () => {
    const newProjName = addProjectInput.value;
    if (newProjName == "") {
        alert("Please enter a project name!");
        return;
    } else if (projects.getProjectNames().includes(newProjName)) {
        alert("Project with that name already exists!");
        addProjectInput.value = "";
        return;
    }
    let newProj = new Project(newProjName);
    projects.addProject(newProj);
    projects.addProjectName(newProj.getName());
    addProjectInput.classList.toggle("hidden");
    confirmProject.classList.toggle("hidden");
    cancelProject.classList.toggle("hidden");
    addProjectInput.value = "";
    const newProjDiv = document.createElement("div");
    newProjDiv.classList.add("project-tab");
    const delProjBtn = document.createElement("button");
    newProjDiv.addEventListener("click", () => {
        toggleProject(newProj.getName());
        viewTasks(newProj.getName());
    })
    const projBar = document.getElementById("projects");
    newProjDiv.innerText = newProj.getName();
    newProjDiv.id = newProj.getName();
    delProjBtn.classList.add("project-btn");
    delProjBtn.innerText = "x";
    delProjBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        delProject(newProj.getName());
        toggleProject("All tasks");
        viewTasks("All tasks");
    })
    newProjDiv.appendChild(delProjBtn);
    projBar.appendChild(newProjDiv);
    toggleProject(newProj.getName());
    viewTasks(newProj.getName());
    localStorage.setItem("projects", JSON.stringify(projects.getProjectNames()));
})

function displayProject(projectName) {
    const newProjDiv = document.createElement("div");
    const delProjBtn = document.createElement("button");
    newProjDiv.addEventListener("click", () => {
        toggleProject(projectName);
        viewTasks(projectName);
    })
    const projBar = document.getElementById("projects");
    newProjDiv.innerText = projectName;
    newProjDiv.id = projectName;
    newProjDiv.classList.add("project-tab");
    delProjBtn.classList.add("project-btn");
    delProjBtn.innerText = "x";
    delProjBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        delProject(projectName);
        toggleProject("All tasks");
        viewTasks("All tasks");
    })
    newProjDiv.appendChild(delProjBtn);
    projBar.appendChild(newProjDiv);
}

function toggleProject(toggleTo) {
    projects.setCurrProject(toggleTo);
    currTitle.innerText = toggleTo;
}

function delProject(projectName) {
    projects.deleteProject(projectName);
    projects.deleteProjectName(projectName);
    const newProjList = projects.getProjectNames();
    localStorage.setItem("projects", JSON.stringify(newProjList));
    const delProj = document.getElementById(projectName);
    document.getElementById("projects").removeChild(delProj);
}