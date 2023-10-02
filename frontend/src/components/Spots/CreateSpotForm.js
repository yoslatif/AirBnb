import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import csrfFetch from "../../store/csrf"

function CreateSpotForm() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [spotName, setSpotName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [otherImages, setOtherImages] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //refs
  const countryRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const descriptionRef = useRef(null);
  const spotNameRef = useRef(null);
  const priceRef = useRef(null);
  const previewImageURLRef = useRef(null);
  // const otherImagesRefs = Array(otherImages.length).fill().map(() => useRef(null));

  const history = useHistory();

  const removeError = (errorMessage) => {
    setErrors((prevErrors) =>
      prevErrors.filter((error) => error !== errorMessage)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data here...

    let validationErrors = [];

    if (!country) validationErrors.push("Country is required.");
    if (!address) validationErrors.push("Street Address is required.");
    if (!city) validationErrors.push("City is required.");
    if (!state) validationErrors.push("State is required.");
    if (description.length < 30)
      validationErrors.push("Description needs 30 or more characters.");
    if (!spotName) validationErrors.push("Spot name is required.");
    if (!price || price <= 0)
      validationErrors.push("Price must be a positive number.");
    if (!previewImageURL)
      validationErrors.push("Preview Image URL is required.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (errors.includes("Country is required.")) {
      countryRef.current.focus();
    }

    if (errors.includes("Street Address is required.")) {
      addressRef.current.focus();
    }

    if (errors.includes("City is required.")) {
      cityRef.current.focus();
    }

    if (errors.includes("State is required.")) {
      stateRef.current.focus();
    }

    if (errors.includes("Description needs 30 or more characters.")) {
      descriptionRef.current.focus();
    }

    if (errors.includes("Spot name is required.")) {
      spotNameRef.current.focus();
    }

    if (errors.includes("Price must be a positive number.")) {
      priceRef.current.focus();
    }

    if (errors.includes("Preview Image URL is required.")) {
      previewImageURLRef.current.focus();
    }

    // If validation passes, make API call to create the spot...
    const requestOptions = {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // country,
        // address,
        // city,
        // state,
        // description,
        // name: spotName,
        // price,
        address,
        city,
        state,
        country,
        lat: "23.24242422",
        lng: "123.2323232",
        name: spotName,
        description,
        price,
        // previewImageURL,
        // otherImages,
      }),
    };

    console.log(typeof(requestOptions))

   csrfFetch('http://localhost:8000/api/spots', requestOptions)
      .then((response) => response.json())
      .then((data) => {
  
        const newSpotId = data.id;
        // If successful, navigate to the new spot's detail page...
        history.push(`/spots/${newSpotId}`);
      })
      .catch((error) => {
        console.error("Error creating spot:", error);

      });
    setIsLoading(false);
    setIsSuccess(true);
  };


  return (
    <div>
      <div className="form-errors">
        {errors.map((error, idx) => (
          <div key={idx} className="error">
            {error}
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>

      <h1>Create a New Spot</h1>
      <div className="location-section">
        <h2>Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <input
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            removeError("Country is required.");
          }}
          placeholder="Country"
          ref={countryRef}
        />
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            removeError("Address is required.");
          }}
          placeholder="Street Address"
          ref={addressRef}
        />
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            removeError("City is required.");
          }}
          placeholder="City"
          ref={cityRef}
        />
        <input
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            removeError("State is required.");
          }}
          placeholder="State"
          ref={stateRef}
        />
        {/* Optional Latitude and Longitude inputs */}
      </div>

      <div className="description-section">
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            removeError("Description needs 30 or more characters.");
          }}
          placeholder="Please write at least 30 characters"
          ref={descriptionRef}
        />
      </div>

      <div className="title-section">
        <h2>Create a title for your spot</h2>
        <p>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </p>
        <input
          type="text"
          value={spotName}
          onChange={(e) => {
            setSpotName(e.target.value);
            removeError("Spot name is required.");
          }}
          placeholder="Name of your spot"
          ref={spotNameRef}
        />
      </div>

      <div className="price-section">
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <input
          type="number"
          value={price}
          min={0}
          onChange={(e) => {
            setPrice(e.target.value);
            removeError("Price must be a positive number");
          }}
          placeholder="Price per night (USD)"
          ref={priceRef}
        />
      </div>

      <div className="photos-section">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="text"
          value={previewImageURL}
          onChange={(e) => {
            setPreviewImageURL(e.target.value);
            removeError("Preview Image URL is required.");
          }}
          placeholder="Preview Image URL"
          ref={previewImageURLRef}
        />
        {otherImages.map((img, idx) => (
          <input
            key={idx}
            type="text"
            value={img}
            onChange={(e) => {
              const newImages = [...otherImages];
              newImages[idx] = e.target.value;
              setOtherImages(newImages);
            }}
            placeholder="Image URL"
            //   ref={otherImagesRefs[idx]}
          />
        ))}
      </div>

      <button onClick={handleSubmit}>Create Spot</button>
      {isSuccess && (
        <div className="success-message">Spot successfully created!</div>
      )}
    </div>
  );
}

export default CreateSpotForm;
