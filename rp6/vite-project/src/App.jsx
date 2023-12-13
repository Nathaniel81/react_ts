import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("")

  useEffect(() => {
    const tasksData = async() => {
      const data = await getTasks();
      setTasks(data)
    }
    tasksData();
  }, [])

  const getTasks = async() => {
    const tasks = await fetch('http://127.0.0.1:8000/api/task-list')
    const data = await tasks.json()
    return data;
  }

  function handleClick(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

   const handleSubmit = async(e) => {
    e.preventDefault()
      const res = fetch('http://127.0.0.1:8000/api/task-create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({title: taskInput}),
      })
      const data = await res.json();
      setTasks([...tasks, data]);
      setTaskInput('');
  }

  return (
    <>
      <div className= 'container'>
        <div id="task-container">
          <div className="form-wrapper">
            <form id="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex-wrapper align-items-center p-5">
                  <div style={{flex: 6}}>
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
                   <div style={{flex: 1}}>
                      <button id="submit" className="btn btn-warning" type="submit">Submit</button>
                    </div>
              </div>
            </form>
          </div>
          <Tasks tasks={tasks} handleClick={handleClick}/>
        </div>
      </div>
    </>
  )
}

export default App
