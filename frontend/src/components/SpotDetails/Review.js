import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useState } from "react";
import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';

export default function Review({ user, review }) {
    const dispatch = useDispatch();
    const onDeleteClick = async () => {
        await dispatch(deleteReview(review));
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
      const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);


      console.log("Logged-in User ID:", user?.id);
console.log("Review's User ID:", review.User.id);


    return <div className="review">
        <div className="user">
        <h4>{review.User.firstName} · {formatDate(review.createdAt)}</h4>

        {showDeleteReviewModal && 
    <ConfirmationModal 
        title="Confirm Delete" 
        message="Are you sure you want to delete this review?" 
        onConfirm={() => {
            dispatch(deleteReview(review));
            setShowDeleteReviewModal(false);
        }} 
        onCancel={() => setShowDeleteReviewModal(false)}
    />
}
        
        {(user && user.user.id === review.User.id) && <button className="button" onClick={() => setShowDeleteReviewModal(true)}>Delete review</button>}
        </div>
        <p>{review.review}</p>
    </div>
}
// {(user && String(user.id) === String(review.User.id)) && <button className="button" onClick={onDeleteClick}>Delete review</button>}