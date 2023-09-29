import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';




function SpotDetail({ match }) {
  const [spot, setSpot] = useState(null);
  const spotId = match.params.id;
  const [reviews, setReviews] = useState([]);
  const currentUser = useSelector(state => state.session.user);


  useEffect(() => {
    const spotId = match.params.id;
    fetch(`/api/spots/${spotId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Spot Details:", data);
        setSpot(data); 
  })
      .catch(error => console.error('Error fetching spot details:', error));
  }, [match.params.id]);


  useEffect(() => {
    fetch(`/api/spots/${spotId}/reviews`)
        .then(response => response.json())
        .then(data => {
            console.log("Reviews:", data);
            setReviews(data.reviews);
        });
}, [spotId]);


  if (!spot) return <div>Loading...</div>;

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
      <div>
        <img src={spot.previewImage} alt={spot.name} />
        
        {/* other images */}

        <div className="review-summary">
        <span>⭐</span> {spot.avgStarRating || "New"} 
  {spot.numReviews > 0 && (
    <>
      · {spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}
    </>
  )}
</div>

<div>
{reviews?.length > 0 ? (
        <div className="reviews-list">
          {reviews && reviews.map(review => (
            <div key={review.id} className="review">
              <p>{review.User?.firstName}</p>
              <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long' })} {new Date(review.createdAt).getFullYear()}</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      ) : (currentUser && currentUser.id !== spot.ownerId) && (
        <p>Be the first to post a review!</p>
      )}

    
</div>


      </div>
      <p>Hosted by {spot?.Owner?.firstName}, {spot?.Owner?.lastName}</p>

      <p>{spot.description}</p>
      <div className="callout-box">
  <p>{spot.price} / night</p>
  <button onClick={() => alert('Feature coming soon')}>Reserve</button>
</div>

    </div>
  );
}


export default SpotDetail;
