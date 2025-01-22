import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

// Sample data for food images
const foodImages = [
  { id: 1, src: '/images/burger.jpg', name: 'Burger' },
  { id: 2, src: '/images/pizza.jpg', name: 'Pizza' },
  { id: 3, src: '/images/sushi.jpg', name: 'Sushi' },
  // Add more food images as needed
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedFoods, setLikedFoods] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === 'right') {
        setLikedFoods([...likedFoods, foodImages[currentIndex]]);
      }
      setCurrentIndex((prevIndex) => (prevIndex + 1) % foodImages.length);
      setSwipeDirection(null);
    }, 300); // Duration of the animation
  };

  return (
    <div className="App">
      <header className="App-header">
        {foodImages[currentIndex] ? (
          <div
            {...handlers}
            className={`swipe-container ${swipeDirection}`}
          >
            <img
              src={foodImages[currentIndex].src}
              className="App-food-image"
              alt={foodImages[currentIndex].name}
              draggable="false"
            />
          </div>
        ) : (
          <p>No more food to swipe!</p>
        )}
      </header>
    </div>
  );
}

export default App;
