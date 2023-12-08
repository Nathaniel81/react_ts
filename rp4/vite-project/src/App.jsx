import { useEffect, useState } from 'react';
import Navabar from './Components/Navbar.jsx'
// import Hero from './Components/Hero.jsx'
import Foods from './Components/Foods.jsx';

const handleClick = async(id) => {
    const getFood = await fetch(`http://localhost:5000/data/${id}`)
    const data = await getFood.json()
    const currPrice = parseFloat(data.price);
    const updatedData = { ...data, price: `${currPrice + 10}` };
    await fetch(`http://localhost:5000/data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
}

function App() {
  const [foods, setFoods] = useState([])
  useEffect(() => {
    const fetchFoods = async() => {
      const response = await fetch('http://localhost:5000/data');
      const data = await response.json();
      setFoods(data);
    }
    fetchFoods();
  }, [])

  return (
    <>
      <div className="mx-auto text-lime-50">
        <div className="container">
          <Navabar />
        </div>
      </div>
      <div className="container">
        {/* <div className=''>
          <Hero food={foods[0]}/>
        </div> */}
        <Foods foods={foods} handleClick={handleClick}/>
      </div>
    </>
  )
}
export default App