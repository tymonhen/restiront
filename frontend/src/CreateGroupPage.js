import React, { useState } from 'react';
import axios from 'axios';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const [groupId, setGroupId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const createGroup = async () => {
    try {
      const response = await axios.post('http://localhost:5025/create-group');
      setGroupId(response.data.groupId);
      setShowModal(true); // Show modal after creating group
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/form/${groupId}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="create-group-page">
      <img src="/images/logo.png" alt="Logo" className="create-group-logo" />
      <button onClick={createGroup} className="create-group-button">
        Create Bunch
      </button>
      <img src="/images/chick.png" alt="Chick" className="bottom-image" />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Share this link with your bunch:</p>
            <div className="link-box">
              {window.location.origin}/form/{groupId}
            </div>
            <button onClick={copyToClipboard} className="copy-button">Copy to Clipboard</button>
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default CreateGroupPage; 