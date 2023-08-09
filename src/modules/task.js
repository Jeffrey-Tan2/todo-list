export default class Task {
    constructor(id, title, description, dueDate, priority, completed) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.completed = completed
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
}