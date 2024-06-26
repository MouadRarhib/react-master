import React from 'react';
import Card from '../Card/Card';
import './List.css';

function List({ title, cards }){
  return (
    <div className="list">
      <h3>{title}</h3>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={index} text={card.text} />
        ))}
      </div>
    </div>
  );
};

export default List;
