import React, { useState } from 'react';

const StarRatingInput = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (index) => {
    onChange(index);
  };

  return (
    <div className="flex text-lg">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer text-lg"
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1 <= (hoverValue || value) ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
};


export default StarRatingInput