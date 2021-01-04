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
  form.addEventListener('submit', addTask);
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
