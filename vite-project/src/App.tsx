import ListGroup from "./components/ListGroup";
import { MouseEvent } from "react";


const App = () => {
  const cities = [
    'AA',
    'HW',
    'AD',
    'BD',
    'MK'
  ]
  const handleClick = (e: MouseEvent) => {
    console.log(e);
  }

  return (
    <div className="container">
      <div><ListGroup /></div>
      <ul className="list-group">
        {cities.map((city) => (
          <li key={city} onClick={handleClick} className="list-group-item">{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
