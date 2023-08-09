export default class Project {
    constructor(taskList) {
        this.taskList = taskList;
    }
    getTaskList() {
        return this.taskList;
    }
    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }
}