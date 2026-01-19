import { getTasks, setCurrentEditingTaskId, getCurrentEditingTaskId, setTasks } from './state.js';
import { descriptionModal, descriptionInput } from './dom.js';
import { saveTasks } from './storage.js';
import { renderTasks } from './rendering.js';

export function openDescriptionModal(taskId) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        setCurrentEditingTaskId(taskId);
        descriptionInput.value = task.description || '';
        descriptionModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        descriptionInput.focus();
    }
}

export function closeDescriptionModalFunc() {
    descriptionModal.classList.remove('show');
    document.body.style.overflow = '';
    setCurrentEditingTaskId(null);
    descriptionInput.value = '';
}

export function saveDescription() {
    const currentEditingTaskId = getCurrentEditingTaskId();
    if (currentEditingTaskId === null) return;

    const tasks = getTasks();
    const description = descriptionInput.value.trim();
    const updatedTasks = tasks.map(task => 
        task.id === currentEditingTaskId 
            ? { ...task, description: description }
            : task
    );
    
    setTasks(updatedTasks);
    saveTasks();
    renderTasks();
    closeDescriptionModalFunc();
}
