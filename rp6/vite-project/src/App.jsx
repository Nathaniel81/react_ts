import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    getTasks()
  })

  const getTasks = async() => {
    const tasks = await fetch('http://127.0.0.1:8000/api/task-list')
    const data = await tasks.json()
    console.log(data)
  }


  return (
    <>
      <div className= 'container'>
        <div id="task-container"  >
          <div className="form-wrapper">
            <form id="form">
              <div className="flex-wrapper align-items-center p-5 gap-3">
                  <div style={{flex: 6}}>
                      <input className="form-control" id="title" type="text" name="title" placeholder="Add task.." />
                   </div>
                   <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                    </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
