// frontend/src/components/Spots/SpotList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SpotList() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('/api/spots')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.Spots) {
          setSpots(data.Spots);
        } else {
          console.error('Unexpected API response', data);
        }
      })
      .catch(error => {
        console.error('Error fetching spots:', error);
      });
  }, []);
  

  return (
    <div>
      {spots && spots.map(spot => (
  <Link to={`/spots/${spot.id}`}>
  <div key={spot.id} title={spot.name}>
  <p>{spot.city}, {spot.state}</p>
    {/* <span>
        <i className="fas fa-star"></i> 
        {spot.avgRating ? spot.avgRating : "New"}
    </span> */}
    <span>⭐</span> {spot.avgRating || "New"}
    <p>${spot.price} / night</p>
  </div>
</Link>

))}

    </div>
  );
}

export default SpotList;