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
                    <button onclick="remove(${i})">❌</button>`;
    list.appendChild(li);
  });
}

function save(){
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
