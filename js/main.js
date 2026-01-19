import { renderTasks } from './rendering.js';
import { updateStats } from './stats.js';
import { setupEventListeners } from './events.js';
import { toggleTask, deleteTask } from './tasks.js';
import { openDescriptionModal } from './modal.js';

export function init() {
    renderTasks();
    updateStats();
    setupEventListeners();
    
    // Make functions globally available for inline event handlers
    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;
    window.openDescriptionModal = openDescriptionModal;
}
