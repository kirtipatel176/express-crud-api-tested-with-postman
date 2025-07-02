// server.js
//in this code for the todo list
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: "Learn REST API", completed: false },
  { id: 2, task: "Practice fetch()", completed: false },
];

// GET – Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST – Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT – Update a todo
app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.task = req.body.task || todo.task;
    todo.completed = req.body.completed ?? todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// DELETE – Remove a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

