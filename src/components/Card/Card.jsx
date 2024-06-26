import React from 'react';
import './Card.css';

function Card({ text, username }) {
  return (
    <div className="card">
      <h2>{text}</h2>
      <h4>username</h4>
      <div className="card-buttons">
        <button className="card-button update">Update</button>
        <button className="card-button delete">Delete</button>
      </div>
    </div>
  );
}

export default Card;
