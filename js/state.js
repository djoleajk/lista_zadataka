// State management
export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentEditingTaskId = null;

export function setTasks(newTasks) {
    tasks = newTasks;
}

export function getTasks() {
    return tasks;
}

export function setCurrentFilter(filter) {
    currentFilter = filter;
}

export function getCurrentFilter() {
    return currentFilter;
}

export function setCurrentEditingTaskId(id) {
    currentEditingTaskId = id;
}

export function getCurrentEditingTaskId() {
    return currentEditingTaskId;
}
