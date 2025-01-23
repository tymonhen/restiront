import React from 'react';
import './RecommendationDisplay.css';

function RecommendationDisplay({ recommendation }) {
  const parseRestaurantName = (text) => {
    const [restaurantName] = text.split('%');
    return restaurantName.trim();
  };

  const parseUserDishes = (text) => {
    const [, userDishes] = text.split('%');
    return userDishes.split(',').map((userDish) => {
      const [userName, dishName] = userDish.split(':');
      return { userName: userName.trim(), dishName: dishName.trim() };
    });
  };

  const restaurantName = parseRestaurantName(recommendation);
  const recommendations = parseUserDishes(recommendation);

  return (
    <div className="recommendation-display">
      <h3 className="restaurant-name">{restaurantName}</h3>
      <ul className="user-dish-list">
        {recommendations.map((rec, index) => (
          <li key={index} className="user-dish-item">
            <strong>{rec.userName}</strong>: {rec.dishName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendationDisplay; 