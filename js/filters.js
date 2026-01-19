import { tasks, getCurrentFilter } from './state.js';

export function getFilteredTasks() {
    const currentFilter = getCurrentFilter();
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}
