import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './GroupResultsPage.css';

function GroupResultsPage() {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        console.log(`Fetching data for group: ${groupId}`);
        const response = await axios.get(`http://localhost:5025/group-results/${groupId}`);
        console.log('Received group data:', response.data);
        setGroupData(response.data);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleDone = () => {
    // Redirect to the final results page
    navigate(`/final-results/${groupId}`);
  };

  return (
    <div className="group-results-page">
      <img src='/images/logo.png' alt="Logo" className="logo" />
      {groupData ? (
        <div>
          <h2>Participants Ready to Munch</h2>
          <ul>
            {groupData.participants.map((name) => (
              <li key={name}>
                <strong>{name}</strong>
              </li>
            ))}
          </ul>
          <button onClick={handleDone} className="done-button">Done</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupResultsPage; 