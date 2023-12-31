import "./BookingForm.css";

export default function BookingForm({ spot }) {
    return (
        <div className="booking">
            <span className="price">${(+spot.price).toFixed(0)}</span> night
            <button className="reserveButton" onClick={() => alert("Feature coming soon")}>Reserve</button>
        </div>
    );
}