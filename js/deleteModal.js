import { getTasks } from './state.js';
import { deleteConfirmModal, deleteCountEl } from './dom.js';

export function openDeleteConfirmModal() {
    const tasks = getTasks();
    const count = tasks.length;
    
    if (count === 0) {
        return;
    }

    deleteCountEl.textContent = count === 1 ? '1 zadatak' : `${count} zadataka`;
    deleteConfirmModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

export function closeDeleteConfirmModal() {
    deleteConfirmModal.classList.remove('show');
    document.body.style.overflow = '';
}
