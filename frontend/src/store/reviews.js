import { csrfFetch } from './csrf';
import { getSpotDetails } from './spotDetails';
import { setReviewModal } from './ui';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const body = await response.json();
    const reviews = body.Reviews;
    dispatch({ type: GET_REVIEWS, reviews });
    return response;
};

export const postReview = (spotId, body) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(body)
    });
    const review = await response.json();
    dispatch(getSpotDetails(review.spotId));
    dispatch(setReviewModal(false));
    await dispatch(getReviews(spotId));  
    window.scrollTo(0, document.body.scrollHeight);
    return review;
};

export const deleteReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, { method: "DELETE", });
    await response.json()
    dispatch(getReviews(review.spotId));
    dispatch(getSpotDetails(review.spotId));
};

// export const deleteReview = (reviewId) => async dispatch => {
//     try {
//         const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             dispatch(removeReview(reviewId));
//             return null;
//         } else {
//             const data = await response.json();
//             return data.errors;
//         }
//     } catch (err) {
//         console.error("Failed to delete review:", err);
//     }
// };

const removeReview = (reviewId) => ({
    type: 'REMOVE_REVIEW',
    payload: reviewId
});


export default function reviewsReducer(state = null, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews;
        case 'REMOVE_REVIEW':
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
            
        default:
            return state;
    }
};
