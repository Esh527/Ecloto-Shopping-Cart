import React from 'react';
import { THRESHOLD } from '../constants';

const ProgressBar = ({ progress, subtotal }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">
        {subtotal < THRESHOLD 
          ? `Spend $${THRESHOLD - subtotal} more to get a free gift!`
          : "You've earned a free gift!"}
      </div>
    </div>
  );
};

export default ProgressBar;