const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list  = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
render();

form.addEventListener('submit', e => {
  e.preventDefault();
  todos.push({ text: input.value, done: false });
  input.value = '';
  save();
});

function toggle(index) {
  todos[index].done = !todos[index].done;
  save();
}

function remove(index) {
  todos.splice(index,1);
  save();
}

function render(){
  list.innerHTML = '';
  todos.forEach((todo,i)=>{
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';
    li.innerHTML = `<span onclick="toggle(${i})">${todo.text}</span>
                    <button onclick="remove(${i})">Delete</button>`;
    list.appendChild(li);
  });
}
// Theme toggle logic
const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

// Load saved theme
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️ Light Mode';
}

// Toggle on click
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const darkMode = document.body.classList.contains('dark');
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  toggleBtn.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

function save(){
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
