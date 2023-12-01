import React from "react";

interface ListGroupProps {
  cities: string[];
  handleClick: (city: string) => void;
  activeItems: string[];
}

const ListGroup: React.FC<ListGroupProps> = ({ cities, handleClick, activeItems }) => {
  return (
    <div className="container">
      <ul className="list-group">
        {cities.map((city) => (
          <li
            key={city}
            onClick={() => handleClick(city)}
			className={`list-group-item ${activeItems.includes(city) ? 'active': ''}`}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;