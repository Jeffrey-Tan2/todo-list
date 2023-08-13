export default class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getTaskList() {
        return this.taskList;
    }
    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }
    addTask(Task) {
        this.taskList.push(Task);
    }
    containsTask(name) {
        for (let i = 0; i < this.taskList.length; i++) {
            if (name == this.taskList[i].title) {
                return true;
            }
        }
        return false;
    }
    deleteTask(name) {
        this.taskList = this.taskList.filter((task) => task.title != name);
    }
    findTask(title) {
        return this.taskList.find((task) => task.getTitle() == title);
    }
}