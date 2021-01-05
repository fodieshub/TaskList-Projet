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
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Clear Task Event
  clearBtn.addEventListener('click', clearTask);
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);
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

  taskInput.value = '';

  e.preventDefault();
}

//Remove Task Function
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

//Clear Task Function
function clearTask(e) {
  //There are two ways to do this
  // taskList.innerHTML = "";

  //Second way which is faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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