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
    <div className="container">
      <div><ListGroup /></div>
      <ul className="list-group">
        {cities.map((city) => (
          <li key={city} onClick={() => handleClick(city)} className={`list-group-item ${activeItems.includes(city) ? 'active': ''}`}>{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
