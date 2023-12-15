import Inc from "./components/Inc"
import Dec from "./components/Dec"
import Counter from "./components/counter"
import { useState } from "react"

const App = () => {
  const [count, setCount] = useState(0);
  const incCount = () => {
    setCount(count + 1);
  }
  const decCount = () => {
    setCount(count - 1)
  }
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <Counter count={count}/>
        <Inc incCount={incCount}/>
        <Dec decCount={decCount}/>
      </div>
    </>
  )
}

export default App