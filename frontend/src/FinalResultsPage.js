import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FinalResultsPage.css';

function FinalResultsPage() {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:5025/group-results/${groupId}`);
        setGroupData(response.data);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  useEffect(() => {
    if (groupData) {
      fetchRecommendations();
    }
  }, [groupData]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post(`http://localhost:5025/get-recommendations/${groupId}`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="final-results-page">
      <h1>Final Group Results</h1>
      {groupData ? (
        <div>
          <h2>All Members, Their Liked Foods, and Allergies:</h2>
          <ul>
            {groupData.participants.map((name) => (
              <li key={name}>
                <strong>{name}</strong>: 
                <br />Liked Foods: {groupData.swipes[name].join(', ')}
                <br />Allergies: {groupData.allergies[name] || 'None'}
              </li>
            ))}
          </ul>
          <h2>Recommendations:</h2>
          <p>{recommendations || 'Loading recommendations...'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FinalResultsPage; 