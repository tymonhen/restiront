import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import './App.css';
import TasteProfilePage from './TasteProfilePage';
import CreateGroupPage from './CreateGroupPage';
import GroupResultsPage from './GroupResultsPage';
import FinalResultsPage from './FinalResultsPage';
import axios from 'axios';

// Sample data for food images
const foodImages = [
  { id: 1, src: '/images/burger.jpg', name: 'Burger' },
  { id: 2, src: '/images/pizza.jpg', name: 'Pizza' },
  { id: 3, src: '/images/sushi.jpg', name: 'Sushi' },
  // Add more food images as needed
];

function FormPage({ setUserProfile }) {
  const [name, setName] = useState('');
  const [allergies, setAllergies] = useState('');
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile({ name, allergies });
    navigate(`/swipe/${groupId}`); // Navigate to the swiping page with groupId
  };

  return (
    <div className="form-page">
      <h1>Tell us about yourself</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Allergies:
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function SwipePage({ userProfile, setProfile }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedFoods, setLikedFoods] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const { groupId } = useParams();

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
        const likedFood = foodImages[currentIndex].name;
        console.log(`Swiped right on: ${likedFood}`); // Debugging log
        setLikedFoods((prevLikedFoods) => [...prevLikedFoods, likedFood]);
      }
      const nextIndex = currentIndex + 1;
      if (nextIndex < foodImages.length) {
        setCurrentIndex(nextIndex);
      } else {
        setTransitioning(true);
        // Submit liked foods to backend
        setTimeout(async () => {
          try {
            console.log('Sending data to backend:', { name: userProfile.name, allergies: userProfile.allergies, likedFoods });
            const response = await axios.post(`http://localhost:5025/update-swipes/${groupId}`, {
              name: userProfile.name,
              likedFoods,
              allergies: userProfile.allergies
            });
            console.log('Received profile from backend:', response.data.profile);
            setProfile(response.data.profile);
            navigate(`/group-results/${groupId}`); // Redirect to group results page
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
        <Route path="/" element={<CreateGroupPage />} />
        <Route path="/form/:groupId" element={<FormPage setUserProfile={setUserProfile} />} />
        <Route path="/swipe/:groupId" element={<SwipePage userProfile={userProfile} setProfile={setProfile} />} />
        <Route path="/taste-profile" element={<TasteProfilePage profile={profile} />} />
        <Route path="/group-results/:groupId" element={<GroupResultsPage />} />
        <Route path="/final-results/:groupId" element={<FinalResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
