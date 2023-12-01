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
  const [activeItem, setActiveItems] = useState<string | null>(null);


  const handleClick = (city: string) => {
    setActiveItems(city)
  }

  return (
    <div className="container">
      <div><ListGroup /></div>
      <ul className="list-group">
        {cities.map((city) => (
          <li key={city} onClick={() => handleClick(city)} className={`list-group-item ${city === activeItem ? 'active': ''}`}>{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
