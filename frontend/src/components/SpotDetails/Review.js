import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";

export default function Review({ user, review }) {
    const dispatch = useDispatch();
    const onDeleteClick = async () => {
        await dispatch(deleteReview(review));
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    return <div className="review">
        <div className="user">
        <h4>{review.User.firstName} · {formatDate(review.createdAt)}</h4>
            {(user && user.id === review.User.id) && <button className="button" onClick={onDeleteClick}>Delete review</button>}
        </div>
        <p>{review.review}</p>
    </div>
}
