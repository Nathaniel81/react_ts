// import { useState } from 'react'
// import './App.css'
import * as React from "react";
import { motion } from "framer-motion";

function App() {
  // const [count, setCount] = useState(0)
  const [move, setMove] = React.useState(false)

  return (
    <>
      <motion.div 
      animate={{ rotate: move ? [0, 45, 0] : [0, -45, 0]  }} 
      transition={{ ease: "easeOut", duration: 0.2 }}
      onClick={() => {setMove(!move)}}
      className="h-[250px] w-[250px] bg-slate-950 p-5 mx-auto m-10 rounded-xl"
      >
      </motion.div>
    </>
  )
}

export default App
