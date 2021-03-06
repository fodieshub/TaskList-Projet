// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event Listeners
loadEventListeners();

// Create functions to load Eventlisteners

function loadEventListeners() {
  //DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Task Event
  clearBtn.addEventListener('click', clearTask);
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);
}
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create li elements
    const li = document.createElement('li');
    
    // Add Class
    li.className = 'collection-item';
    
    // Create Textnode and append to li
    li.appendChild(document.createTextNode(task));
    
    // Create New Link element
    const link = document.createElement('a');
    
    // Give clasd name to the link element
    link.className = 'delete-item secondary-content';
    
    // Add HTML icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link icon to the list item
    li.appendChild(link);
    
    // Append the list item to the UL
    taskList.appendChild(li);

  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
  }

  // Create li elements
  const li = document.createElement('li');
  
  // Add Class
  li.className = 'collection-item';
  
  // Create Textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  // Create New Link element
  const link = document.createElement('a');
  
  // Give clasd name to the link element
  link.className = 'delete-item secondary-content';
  
  // Add HTML icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  
  // Append the link icon to the list item
  li.appendChild(link);
  
  // Append the list item to the UL
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task Function
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    
    // if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove Tasks for LocalStorage
      removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    // }
  }
}

 //Remove Tasks for LocalStorage
 function removeTasksFromLocalStorage(taskItem) {
  //Check Local Storage
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
 }

//Clear Task Function
function clearTask(e) {
  //There are two ways to do this
  // taskList.innerHTML = "";

  //Second way which is faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear Task from Local Storage
  clearTaskFromLocalStorage();
}
//Clear Task from Local Storage
function clearTaskFromLocalStorage(){
  localStorage.clear();
}
//Filter Task 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}