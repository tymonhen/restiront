import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import FormPage from './FormPage'; // Import the form component
import TasteProfilePage from './TasteProfilePage'; // Import the taste profile component
import axios from 'axios';

// Sample data for food images
const foodImages = [
  { id: 1, src: '/images/burger.jpg', name: 'Burger' },
  { id: 2, src: '/images/pizza.jpg', name: 'Pizza' },
  { id: 3, src: '/images/sushi.jpg', name: 'Sushi' },
  // Add more food images as needed
];

function SwipePage({ userProfile, setProfile }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedFoods, setLikedFoods] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

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
        setLikedFoods([...likedFoods, foodImages[currentIndex].name]);
      }
      const nextIndex = currentIndex + 1;
      if (nextIndex < foodImages.length) {
        setCurrentIndex(nextIndex);
      } else {
        setTransitioning(true);
        // Generate taste profile after swiping
        setTimeout(async () => {
          try {
            const response = await axios.post('http://localhost:5025/generate-taste-profile', {
              name: userProfile.name,
              allergies: userProfile.allergies,
              likedFoods
            });
            setProfile(response.data.profile);
            navigate('/taste-profile'); // Redirect to taste profile page
          } catch (error) {
            console.error('Error generating taste profile:', error);
          }
        }, 500);
      }
      setSwipeDirection(null);
    }, 300); // Duration of the animation
  };

  return (
    <div className={`App ${transitioning ? 'fade-out' : ''}`}>
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

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [profile, setProfile] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage setUserProfile={setUserProfile} />} /> {/* Form page as the initial route */}
        <Route path="/swipe" element={<SwipePage userProfile={userProfile} setProfile={setProfile} />} /> {/* Swiping page as the subsequent route */}
        <Route path="/taste-profile" element={<TasteProfilePage profile={profile} />} />
      </Routes>
    </Router>
  );
}

export default App;
