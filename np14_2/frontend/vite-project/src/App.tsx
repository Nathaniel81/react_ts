/*eslint-disable*/
// import { useState } from 'react'
import LoginForm from "./components/login/LoginForm"
import HomePage from "./Pages/HomePage";
import Register from "./components/Register"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/register" Component={Register} />
      </Routes>
    </Router>
  )
}

export default App
