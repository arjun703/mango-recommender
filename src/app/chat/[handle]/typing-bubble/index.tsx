import React from 'react';
import './index.css'; // Adjust the path as necessary
const TypingBubble = () => {
  return (
    <div style={styles.container}>
      <div className="bubble">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start', // Align left like a chat bubble
    padding: '10px',
  },
};

export default TypingBubble;