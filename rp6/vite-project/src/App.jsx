import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [editingId, setEditingId] = useState(null); // Added state for tracking the task being edited

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchData();
  }, []);

  const getTasks = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/task-list');
    const data = await response.json();
    return data;
  };

  const handleClick = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId !== null) {
      const res = await fetch(`http://127.0.0.1:8000/api/task-update/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: taskInput }),
      });
      const data = await res.json();
      const updatedTasks = tasks.map((task) =>
        task.id === editingId ? { ...task, title: data.title } : task
      );
      setTasks(updatedTasks);
      setTaskInput('');
      setUpdatedTitle('');
      setEditingId(null);
    } else {
      const res = await fetch('http://127.0.0.1:8000/api/task-create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: taskInput }),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setTaskInput('');
    }
  };

  const onDelete = async (id, e) => {
    e.stopPropagation();
    const res = await fetch(`http://localhost:8000/api/task-delete/${id}`, {
      method: 'DELETE',
    });

    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task');
  };

  const editTask = async (id, e) => {
    e.stopPropagation();
    const res = await fetch(`http://localhost:8000/api/task-detail/${id}`);
    const data = await res.json();
    setTaskInput(data.title);
    setUpdatedTitle(data.title);
    setEditingId(id);
  };

  return (
    <>
      <div className="container">
        <div id="task-container">
          <div className="form-wrapper">
            <form id="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex-wrapper align-items-center p-5">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    value={taskInput}
                    type="text"
                    name="title"
                    placeholder="Add task.."
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <button id="submit" className="btn btn-warning" type="submit">
                    {editingId !== null ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Tasks tasks={tasks} handleClick={handleClick} onDelete={onDelete} editTask={editTask} />
        </div>
      </div>
    </>
  );
}

export default App;
