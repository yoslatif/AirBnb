export default function SpotGridItem({ spot }) {
    return (
        <div className="SpotGridItem" title={spot.name}>
            <img src={spot.previewImage ? spot.previewImage : "/images/placeholder.png"} alt="previewImage" />
            <div className="SpotGridItemDescription">
                <div className="SpotGridItemFirstRow">
                    <div><strong>{spot.city}, {spot.state}</strong></div>
                    <div className="SpotGridItemStarRating">
            <i className="fa-solid fa-star SpotGridItemStar" /> 
            {spot.avgRating ? spot.avgRating : "New"}
        </div>
                </div>
                <div className="SpotGridItemSubtext">
                    <div>185 miles away</div>
                    <div>Feb 5 – 10</div>
                </div>
                <div className="SpotGridItemPrice"><strong>${spot.price}</strong> night</div>
            </div>
        </div>
    );
}
