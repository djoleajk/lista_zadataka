import { getTasks, setTasks } from './state.js';
import { taskInput, taskDescriptionInput } from './dom.js';
import { saveTasks } from './storage.js';
import { renderTasks } from './rendering.js';
import { updateStats } from './stats.js';

export function addTask() {
    const tasks = getTasks();
    const taskText = taskInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    
    if (taskText === '') {
        taskInput.focus();
        return;
    }

    if (taskDescription === '') {
        taskDescriptionInput.focus();
        taskDescriptionInput.classList.add('error');
        return;
    }

    // Remove error class if it exists
    taskDescriptionInput.classList.remove('error');

    const newTask = {
        id: Date.now(),
        text: taskText,
        description: taskDescription,
        completed: false,
        createdAt: new Date().toISOString()
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks();
    taskInput.value = '';
    taskDescriptionInput.value = '';
    taskInput.focus();
    renderTasks();
    updateStats();
}

export function deleteTask(id) {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks();
    renderTasks();
    updateStats();
}

export function toggleTask(id) {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks();
    renderTasks();
    updateStats();
}

export function deleteAllTasks() {
    setTasks([]);
    saveTasks();
    renderTasks();
    updateStats();
}

export function deleteCompletedTasks() {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
    saveTasks();
    renderTasks();
    updateStats();
}
