import { getTasks } from './state.js';

export function saveTasks() {
    const tasks = getTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
