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
      console.log('Recommendations fetched:', response.data.recommendations); // Debugging log
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="final-results-page">
      <h1>We Recommend:</h1>
      {groupData ? (
        <div>
          <p>{recommendations || 'Loading recommendations...'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <img src='/images/chick.png' alt="Chick" className="chick-image" />
    </div>
  );
}

export default FinalResultsPage; 