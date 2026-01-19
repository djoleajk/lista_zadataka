import { tasksList, emptyState } from './dom.js';
import { getFilteredTasks } from './filters.js';
import { escapeHtml } from './utils.js';

export function renderTasks() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');
    tasksList.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="window.toggleTask(${task.id})"
            >
            <div class="task-content">
                <span class="task-text">${escapeHtml(task.text)}</span>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn-icon btn-description" onclick="window.openDescriptionModal(${task.id})" title="Opis">
                    ${task.description ? '📝' : '✏️'}
                </button>
                <button class="btn-icon btn-delete" onclick="window.deleteTask(${task.id})" title="Obriši">
                    🗑️
                </button>
            </div>
        </li>
    `).join('');
}
