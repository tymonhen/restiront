import React from 'react';
import './RestaurantRecommendation.css';

function RestaurantRecommendation({ restaurantName, recommendations }) {
  return (
    <div className="restaurant-recommendation">
      <h3 className="restaurant-name">{restaurantName}</h3>
      <ul className="recommendation-list">
        {recommendations.map((rec, index) => (
          <li key={index} className="recommendation-item">
            <strong>{rec.userName}</strong>: {rec.dishName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantRecommendation; 