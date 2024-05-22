import './DeleteSpotForm.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from "../../../store/spots";
import { setDeleteSpotModal } from "../../../store/ui";

export default function DeleteSpotForm({ spotId, onClose }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(deleteSpot(spotId))
            .then(() => {
                dispatch(setDeleteSpotModal(false));
                onClose();
                history.push("/");
            })
            .catch(errors => setErrors(Object.values(errors.errors)));
    };

    return (
        <div className="deleteFormContainer">
            <form className="deleteForm" onSubmit={handleSubmit}>
                <h1>Are you sure you want to delete this spot?</h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="deleteFormButton" type="submit">Delete spot</button>
                <button className="cancelButton" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
