document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    tasks.forEach(task => renderTask(task));

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask); 
        todoInput.value = "";
        console.log(tasks);
    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button">Delete</button>
        `;

        
        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                return; 
            }
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTask();
        });

        
        li.querySelector('.delete-button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id);
            saveTask();
            li.remove();
        });

        todoList.appendChild(li);
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
