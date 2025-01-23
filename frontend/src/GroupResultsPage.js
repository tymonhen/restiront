import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GroupResultsPage() {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);

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

  return (
    <div>
      <h1>Group Results</h1>
      {groupData ? (
        <div>
          <h2>Participants, Their Liked Foods, and Allergies:</h2>
          <ul>
            {groupData.participants.map((name) => (
              <li key={name}>
                <strong>{name}</strong>: 
                <br />Liked Foods: {groupData.swipes[name].join(', ')}
                <br />Allergies: {groupData.allergies[name] || 'None'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupResultsPage; 