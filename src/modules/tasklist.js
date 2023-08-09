export default class Tasklist {
    constructor(list) {
        this.list = list;
    }
    addTask(task) {
        this.list.push(task);
    }
    getTask(id) {
        return this.list[id];
    }
}