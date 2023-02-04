let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let taskDiv = document.querySelector('.tasks');
let deleteBtn = document.querySelector('.deleteBtn');

let deleteAll = document.createElement('span');
deleteAll.appendChild(document.createTextNode('Delete All'));
deleteAll.className = 'deleteAll';

let arrayOfTasks = [];
let mainIndex = 0;

if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

getDataFromLocalStorage();

submit.onclick = function () {
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = '';
    }
}

taskDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains('del')) {
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('task')) {
        toggleStatusWith(e.target.getAttribute('data-id'));
        e.target.classList.toggle('done');

    }
});

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push(task);
    addElementsToPage(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
    taskDiv.innerHTML = '';
    arrayOfTasks.forEach((task) => {

        let div = document.createElement('div');

        div.className = 'task';

        if (task.completed) {
            div.classList = 'task done';
        }

        div.setAttribute('data-id', task.id);

        div.appendChild(document.createTextNode(task.title));
        
        let span = document.createElement('span');
        
        span.className = 'del';
        
        span.appendChild(document.createTextNode('Delete'));
        
        div.appendChild(span);
        
        taskDiv.appendChild(div);

        deleteBtn.appendChild(deleteAll);
    })
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem('tasks'); 
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

deleteAll.onclick = function () {
    taskDiv.innerHTML = '';
    deleteBtn.innerHTML = '';
    localStorage.clear();
    arrayOfTasks.splice(0);
}