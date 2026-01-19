import { getTasks } from './state.js';
import { totalTasksEl, activeTasksEl, completedTasksEl, deleteAllBtn } from './dom.js';

export function updateStats() {
    const tasks = getTasks();
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = total;
    activeTasksEl.textContent = active;
    completedTasksEl.textContent = completed;

    // Enable/disable delete all button
    if (deleteAllBtn) {
        deleteAllBtn.disabled = total === 0;
        deleteAllBtn.style.opacity = total === 0 ? '0.5' : '1';
        deleteAllBtn.style.cursor = total === 0 ? 'not-allowed' : 'pointer';
    }
}
