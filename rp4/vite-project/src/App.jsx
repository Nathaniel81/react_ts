import { useEffect, useState } from 'react';
import Navabar from './Components/Navbar.jsx';
import Foods from './Components/Foods.jsx';
import Footer from './Components/Footer.jsx';
import About from './Components/About.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const fetchFood = async (id) => {
  const getFood = await fetch(`http://localhost:5000/data/${id}`);
  const data = await getFood.json();
  return data;
};

const handleClick = async (id, setFoods) => {
  const food = await fetchFood(id);
  console.log(food);
  const currPrice = parseFloat(food.price);
  const updatedData = { ...food, price: `$${currPrice + 10}` };

  await fetch(`http://localhost:5000/data/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  // Fetch the updated data after the PUT request
  const updatedFood = await fetchFood(id);
  console.log(updatedFood);

  // Update the state with the updated data
  setFoods((prevFoods) =>
    prevFoods.map((prevFood) => (prevFood.id === id ? updatedFood : prevFood))
  );
};

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('http://localhost:5000/data');
      const data = await response.json();
      setFoods(data);
    };

    fetchFoods();
  }, []);

  return (
    <Router>
      <div className="mx-auto text-lime-50">
        <div className="container">
          <Navabar />
        </div>
      </div>
      <div className="container">
        <Foods foods={foods} handleClick={(id) => handleClick(id, setFoods)} />
      </div>
      <Routes>
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
