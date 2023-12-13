import { useEffect, useState } from 'react';
import Tasks from './components/Tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  // console.log(tasks)

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

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Submit')
  }

  return (
    <>
      <div className= 'container'>
        <div id="task-container">
          <div className="form-wrapper">
            <form id="form" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex-wrapper align-items-center p-5">
                  <div style={{flex: 6}}>
                      <input className="form-control" id="title" type="text" name="title" placeholder="Add task.." />
                   </div>
                   <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="Add" />
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
