import ListGroup from "./components/ListGroup";

const App = () => {
  const cities = [
    'AA',
    'HW',
    'AD',
    'BD',
    'MK'
  ]

  return (
    <div className="container">
      <div><ListGroup /></div>
      <ul className="list-group">
        {cities.map((city) => (
          <li key={city} className="list-group-item">{city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
