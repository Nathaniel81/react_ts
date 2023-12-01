import ListGroup from "./components/ListGroup";
// import { MouseEvent } from "react";
import { useState } from "react";


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

  return (
    <ListGroup 
    activeItems={activeItems}
    cities={cities}
    handleClick={handleClick}
    />
  )
}

export default App;
