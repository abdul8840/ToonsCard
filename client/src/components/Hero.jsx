import React, { useState, useEffect } from 'react';
import Dora from '../assets/doraemon_family.jpg'
import Poke from '../assets/pokemon_family.jpg'
import Hattori from '../assets/hattori_family.jpg'
import Trans from '../assets/trans_family.jpg'
import Httyd from '../assets/httyd_family.jpg'

const images = [
  Dora,
  Poke,
  Hattori,
  Trans,
  Httyd
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set up an interval to change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRadioChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-full overflow-hidden border-2 rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-[80vh] transition-opacity duration-500 object-cover"
        />
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="carousel"
              checked={currentIndex === index}
              onChange={() => handleRadioChange(index)}
              className="hidden"
            />
            <span
              className={`inline-block w-4 h-4 rounded-full ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Hero;
