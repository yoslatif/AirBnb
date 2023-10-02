import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import csrfFetch from "../../store/csrf";

function SpotDetail({ match }) {
  const [spot, setSpot] = useState({ ownerId: null });

  const spotId = match.params.id;
  const [reviews, setReviews] = useState([]);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const spotId = match.params.id;
    fetch(`/api/spots/${spotId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Spot Details:", data);
        setSpot(data);
      })
      .catch((error) => console.error("Error fetching spot details:", error));
  }, [match.params.id]);

  useEffect(() => {
    fetch(`/api/spots/${spotId}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Reviews:", data);
        setReviews(data.reviews);
      });
  }, [spotId]);

  const hasReviewed = reviews && currentUser && reviews.some(review => review.userId === currentUser.id);


  const showReviewButton = currentUser && currentUser.id !== spot.ownerId && !hasReviewed;

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(null);
  
  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
    setReviewText('');
    setStarRating(null);
  };
  
  const handleSubmitReview = async () => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review: reviewText, stars: starRating }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (!response) {
        console.error('No response received from the server.');
        return;
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting review:', errorData);
      } else {
        const newReview = await response.json();
        setReviews(prevReviews => [newReview, ...prevReviews]);
        setIsModalOpen(false);
        // You might also want to update the average star rating here
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  




if (!spot) return <div>Loading...</div>;

return (

  

    <div>

<Modal isOpen={isModalOpen} onRequestClose={handleCloseReviewModal}>
  <h2>How was your stay?</h2>
  <textarea 
    value={reviewText} 
    onChange={e => setReviewText(e.target.value)} 
    placeholder="Leave your review here..."
  />
  <div>
    <input 
      type="number" 
      min="1" 
      max="5" 
      value={starRating} 
      onChange={e => setStarRating(e.target.value)} 
    /> Stars
  </div>
  <button disabled={reviewText.length < 10 || !starRating} onClick={handleSubmitReview}>
    Submit Your Review
  </button>
</Modal>
      <h1>{spot.name}</h1>
      <p>
        Location: {spot.city}, {spot.state}, {spot.country}
      </p>
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
              {reviews &&
                reviews.map((review) => (
                  <div key={review.id} className="review">
                    <p>{review.User?.firstName}</p>
                    <p>
                      {new Date(review.createdAt).toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {new Date(review.createdAt).getFullYear()}
                    </p>
                    <p>{review.review}</p>
                  </div>
                ))}
            </div>
          ) : (
            currentUser &&
            currentUser.id !== spot.ownerId && (
              <p>Be the first to post a review!</p>
            )
          )}
        </div>
      </div>
      <p>
        Hosted by {spot?.Owner?.firstName}, {spot?.Owner?.lastName}
      </p>

      <p>{spot.description}</p>
      <div className="callout-box">
        <p>{spot.price} / night</p>
        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
        {showReviewButton && <button onClick={handleOpenReviewModal}>Post Your Review</button>}

      </div>
      
    </div>
  );
}

export default SpotDetail;
