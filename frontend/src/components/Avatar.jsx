// src/components/Avatar.jsx

import React from 'react';
import '../components/index.css';

const Avatar = ({ image, name, size = 'medium' }) => {
  return (
    <div className={`avatar ${size}`}>
      <img src={image} alt={`${name}'s avatar`} className="avatar-img" />
      {name && <span className="avatar-name">{name}</span>}
    </div>
  );
};

export default Avatar;