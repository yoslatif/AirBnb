import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useState, useEffect } from "react";
import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';

export default function Review({ user, review }) {
    const { id: userId } = user || {};
    const { id: reviewUserId, firstName, createdAt } = review.User;
    const dispatch = useDispatch();

    const onDelete = async () => {
        await dispatch(deleteReview(review));
        setShowDeleteReviewModal(false);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);

    useEffect(() => {
        console.log("Logged-in User ID:", userId);
        console.log("Review's User ID:", reviewUserId);
    }, [userId, reviewUserId]);

    return (
        <div className="review">
            <div className="user">
                <h4>{firstName} · {formatDate(createdAt)}</h4>

                {showDeleteReviewModal && 
                    <ConfirmationModal 
                        title="Confirm Delete" 
                        message="Are you sure you want to delete this review?" 
                        onConfirm={onDelete}
                        onCancel={() => setShowDeleteReviewModal(false)}
                    />
                }

                {userId === reviewUserId && 
                    <button className="button" onClick={() => setShowDeleteReviewModal(true)}>
                        Delete review
                    </button>
                }
            </div>
            <p>{review.review}</p>
        </div>
    );
}

// {(user && String(user.id) === String(review.User.id)) && <button className="button" onClick={onDeleteClick}>Delete review</button>}