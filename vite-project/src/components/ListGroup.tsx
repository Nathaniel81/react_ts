import React, { ReactNode } from "react";

interface ListGroupProps {
  cities: string[];
  handleClick: (city: string) => void;
  activeItems: string[];
  children: ReactNode;
}

const ListGroup: React.FC<ListGroupProps> = ({ cities, handleClick, activeItems, children }) => {
  return (
    <div className="container py-5">
		<h1>{children}</h1>
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