import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormPage({ setUserProfile }) {
  const [name, setName] = useState('');
  const [allergies, setAllergies] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfile = { name, allergies };
    setUserProfile(userProfile);
    navigate('/swipe'); // Navigate to the swiping page
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
            />
          </label>
        </div>
        <div>
          <label>
            Allergies/Dietary Restrictions:
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

export default FormPage; 