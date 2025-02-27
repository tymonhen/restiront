import React from 'react';

function TasteProfilePage({ profile }) {
  console.log('Rendering TasteProfilePage with profile:', profile);
  return (
    <div className="taste-profile-page">
      <h1>Your Taste Profile</h1>
      <p>{profile}</p>
    </div>
  );
}

export default TasteProfilePage; 