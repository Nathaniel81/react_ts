import ListGroup from "./components/ListGroup";
// import { MouseEvent } from "react";
import { useState, useRef } from "react";

const App = () => {
  const cities = [
    'AA',
    'HW',
    'AD',
    'BD',
    'MK'
  ]
  // const [activeItem, setActiveItems] = useState<string | null>(null);
  const [activeItems, setActiveItems] = useState<string[]>([]);
  
  // useEffect(() => {
  //   inc.current = 0
  // }, [])
  
  const inc = useRef(0);
  const handleClick = (city: string) => {
    // setActiveItems(city)
    const isSelected = activeItems.includes(city);
    setActiveItems(prevItems => {
      if (isSelected) {
        return prevItems.filter((ct) => ct !== city);
      } else {
        return [...prevItems, city]
      }
    })
  }

  const incNum = () => {
    inc.current += 1;
    console.log(inc);
  }

  return (
    <>
      <ListGroup 
      activeItems={activeItems}
      cities={cities}
      handleClick={handleClick}
      >
      <span>Hello</span>
      <button className="btn btn-primary ms-5" onClick={incNum}>+</button>
      <input type='text' onChange={incNum} />
      <div>{inc.current}</div>
      </ListGroup>
    </>
  )
}

export default App;
