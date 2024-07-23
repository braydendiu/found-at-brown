import React from 'react';

const ItemCard = ({ item }) => (
  <div className="item-card">
    <img src={item.image} alt={item.title} className="item-image" />
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <p>${item.price}</p>
  </div>
);

export default ItemCard;