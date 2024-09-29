const TaskManager = (function() {
    let tasks = [];
    let nextId = 1;

    const createTask = (title) => ({
        id: nextId++,
        title,
        status: 'pending'
    });

    const addTask = (title) => {
        tasks.push(createTask(title));
        renderTasks();
    };

    const removeTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    const markTaskAsCompleted = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, status: 'completed' } : task
        );
        renderTasks();
    };

    const filterTasks = (status) => {
        return status ? tasks.filter(task => task.status === status) : tasks;
    };

    const renderTasks = (filteredTasks = tasks) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'list-group-item';
            taskItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${task.title}</h5>
                        ${task.status === 'completed' ? '<span class="badge bg-success">Completed</span>' : ''}
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm complete-btn" data-id="${task.id}" ${task.status === 'completed' ? 'disabled' : ''}>Complete</button>
                        <button class="btn btn-danger btn-sm remove-btn" data-id="${task.id}">Remove</button>
                    </div>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    return {
        addTask,
        removeTask,
        markTaskAsCompleted,
        filterTasks,
        renderTasks
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTaskBtn').addEventListener('click', () => {
        const title = document.getElementById('taskTitle').value;
        if (title) {
            TaskManager.addTask(title);
            document.getElementById('taskTitle').value = '';
        }
    });

    document.getElementById('showAllTasksBtn').addEventListener('click', () => {
        TaskManager.renderTasks();
    });

    document.getElementById('showPendingTasksBtn').addEventListener('click', () => {
        const pendingTasks = TaskManager.filterTasks('pending');
        TaskManager.renderTasks(pendingTasks);
    });

    document.getElementById('showCompletedTasksBtn').addEventListener('click', () => {
        const completedTasks = TaskManager.filterTasks('completed');
        TaskManager.renderTasks(completedTasks);
    });

    document.getElementById('taskList').addEventListener('click', (event) => {
        if (event.target.classList.contains('complete-btn')) {
            const taskId = parseInt(event.target.getAttribute('data-id'));
            TaskManager.markTaskAsCompleted(taskId);
        } else if (event.target.classList.contains('remove-btn')) {
            const taskId = parseInt(event.target.getAttribute('data-id'));
            TaskManager.removeTask(taskId);
        }
    });
});
