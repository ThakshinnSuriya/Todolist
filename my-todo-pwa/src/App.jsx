import React, { useState, useEffect } from 'react';
import { Container, Button, Form, ListGroup, Navbar } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = dark ? 'bg-dark text-light' : 'bg-light text-dark';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput('');
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar bg={dark ? "dark" : "primary"} variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand>📝 My To-Do</Navbar.Brand>
          <Button variant={dark ? "light" : "dark"} onClick={() => setDark(!dark)}>
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </Container>
      </Navbar>

      <Container style={{ maxWidth: '500px' }}>
        <Form onSubmit={addTask} className="d-flex mb-3">
          <Form.Control
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="success" className="ms-2">Add</Button>
        </Form>

        <ListGroup>
          {tasks.map((task, index) => (
            <ListGroup.Item
              key={index}
              variant={dark ? 'secondary' : ''}
              className="d-flex justify-content-between align-items-center"
            >
              <span
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => toggleDone(index)}
              >
                {task.text}
              </span>
              <Button variant="danger" size="sm" onClick={() => deleteTask(index)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default App;
