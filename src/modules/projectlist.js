export default class Projectlist {
    constructor() {
        this.projects = [];
        this.projectNames = [];
        this.currProject = "";
    }
    getCurrProject() {
        return this.currProject;
    }
    setCurrProject(projectName) {
        this.currProject = projectName;
    }
    getProjects() {
        return this.projects;
    }
    setProjects(projects) {
        this.projects = projects;
    }
    getProject(projectName) {
        return this.projects.find((project) => project.getName() == projectName);
    }
    addProject(project) {
        this.projects.push(project);
    }
    addProjectName(projectName) {
        this.projectNames.push(projectName);
    }
    getProjectNames() {
        return this.projectNames;
    }
    deleteProject(projectName) {
        this.projects = this.projects.filter((project) => project.getName() != projectName);
    }
    deleteProjectName(projectName) {
        this.projectNames = this.projectNames.filter(function (projectNames) {
            return projectNames != projectName;
        })
    }
}