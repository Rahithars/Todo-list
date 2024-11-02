const API_URL = 'http://localhost:5000/todos';

async function fetchTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  renderTodos(todos);
}

async function addTodo() {
  const taskInput = document.getElementById('new-task');
  const newTask = taskInput.value;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: newTask })
  });
  const todo = await response.json();
  taskInput.value = '';
  fetchTodos();
}

async function toggleTodoCompletion(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTodoCompletion(${todo.id}, ${todo.completed})">${todo.task}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

fetchTodos();
