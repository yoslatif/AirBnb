import './SpotForm.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../../../store/spotDetails";
import { postSpot, putSpot } from "../../../store/spots";
import { setSpotForEditing, setSpotModal } from "../../../store/ui";

export default function SpotForm({ spot }) {
    console.log('spotspotspot', spot)
    const [address, setAddress] = useState(spot ? spot.address : "");
    const [city, setCity] = useState(spot ? spot.city : "");
    const [state, setState] = useState(spot ? spot.state : "");
    const [country, setCountry] = useState(spot ? spot.country : "United States");
    const [name, setName] = useState(spot ? spot.name : "");
    const [description, setDescription] = useState(spot ? spot.description : "");
    const [price, setPrice] = useState(spot ? spot.price : "");

    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");


    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];
    
        // Validation check for description length
        if (description.length < 30) {
            newErrors.push("Please write a description of at least 30 characters");
        }
    
        if (newErrors.length === 0) {
            try {
                const body = { address, city, state, country, name, description, price, images: [imageUrl1, imageUrl2, imageUrl3] };
                if (spot) {
                    await dispatch(putSpot(spot.id, body));
                    dispatch(getSpotDetails(spot.id));
                    dispatch(setSpotForEditing(null));
                    history.push("/spots/" + spot.id);
                } else {
                    const spot = await dispatch(postSpot(body, imageUrl1, imageUrl2, imageUrl3));
                    history.push("/");
                    history.push("/spots/" + spot.id);
                }
                dispatch(setSpotModal(false));
            }
            catch (errors) {
                newErrors = newErrors.concat(Object.values(errors.errors));
            }
        }
    
        setErrors(newErrors);
    };
    

    return (
        <form className="spotForm" onSubmit={handleSubmit}>
            <div className="spotHeader">
                <img src="/images/x.png" onClick={() => dispatch(setSpotModal(false))} />
                <div>{spot ? "Edit" : "Create"} a spot</div>
            </div>
            <div className="line"></div>
            {errors.length > 0 && <ul className="spotErrors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
            <input
                className="field firstField"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
            />
            <input
                className="field"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
            />
            <input
                className="field"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="State"
            />
            <input
                className="field"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="Country"
            />
            <input
                className="field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
            />
            <textarea
    className="field"
    style={{ height: "125px" }}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    placeholder="Please describe your BnB!"
/>
            <input
                className={`field ${spot && "lastField"}`}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price"
            />

            {!spot &&
                < input
                    className="field"
                    type="url"
                    value={imageUrl1}
                    onChange={(e) => setImageUrl1(e.target.value)}
                    required
                    placeholder="Preview Image URL"
                />}
                {!spot &&
                < input
                    className="field"
                    type="url"
                    value={imageUrl2}
                    onChange={(e) => setImageUrl2(e.target.value)}
                    placeholder="Image Url"
                />}
                {!spot &&
                < input
                    className="field lastField"
                    type="url"
                    value={imageUrl3}
                    onChange={(e) => setImageUrl3(e.target.value)}
                    placeholder="Image Url"
                />}
            <button type="submit" className="spotButton">{spot ? "Edit" : "Create"} spot</button>
        </form>
    );
}
