import { addTask } from './tasks.js';
import { taskInput, taskDescriptionInput, addTaskBtn, filterButtons, saveDescriptionBtn, cancelDescriptionBtn, closeDescriptionModal, descriptionModal, deleteAllBtn, deleteConfirmModal, confirmDeleteBtn, cancelDeleteBtn, closeDeleteModal, deleteCountEl } from './dom.js';
import { setCurrentFilter, getTasks } from './state.js';
import { renderTasks } from './rendering.js';
import { saveDescription, closeDescriptionModalFunc } from './modal.js';
import { deleteAllTasks } from './tasks.js';
import { openDeleteConfirmModal, closeDeleteConfirmModal } from './deleteModal.js';

export function setupEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addTask();
        }
    });
    
    taskDescriptionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            addTask();
        }
    });
    
    // Remove error class when user starts typing
    taskDescriptionInput.addEventListener('input', () => {
        taskDescriptionInput.classList.remove('error');
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setCurrentFilter(btn.dataset.filter);
            renderTasks();
        });
    });

    // Modal event listeners
    saveDescriptionBtn.addEventListener('click', saveDescription);
    cancelDescriptionBtn.addEventListener('click', closeDescriptionModalFunc);
    closeDescriptionModal.addEventListener('click', closeDescriptionModalFunc);
    
    // Close modal when clicking outside
    descriptionModal.addEventListener('click', (e) => {
        if (e.target === descriptionModal) {
            closeDescriptionModalFunc();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && descriptionModal.classList.contains('show')) {
            closeDescriptionModalFunc();
        }
        if (e.key === 'Escape' && deleteConfirmModal.classList.contains('show')) {
            closeDeleteConfirmModal();
        }
    });

    // Delete all tasks button
    deleteAllBtn.addEventListener('click', () => {
        const tasks = getTasks();
        if (tasks.length === 0) {
            return;
        }
        openDeleteConfirmModal();
    });

    // Delete confirmation buttons
    confirmDeleteBtn.addEventListener('click', () => {
        deleteAllTasks();
        closeDeleteConfirmModal();
    });

    cancelDeleteBtn.addEventListener('click', closeDeleteConfirmModal);
    closeDeleteModal.addEventListener('click', closeDeleteConfirmModal);

    // Close delete modal when clicking outside
    deleteConfirmModal.addEventListener('click', (e) => {
        if (e.target === deleteConfirmModal) {
            closeDeleteConfirmModal();
        }
    });
}
