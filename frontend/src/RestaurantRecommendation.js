import React from 'react';
import './RestaurantRecommendation.css';

function RestaurantRecommendation({ name, dish }) {
  return (
    <div className="restaurant-recommendation">
      <h3 className="restaurant-name">{name}</h3>
      <p className="recommended-dish">Recommended Dish: {dish}</p>
    </div>
  );
}

export default RestaurantRecommendation; 