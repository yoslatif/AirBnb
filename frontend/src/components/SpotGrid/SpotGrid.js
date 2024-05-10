// // SpotGrid.js
// import { NavLink, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { getSpots, deleteSpot } from "../../store/spots";
// import { clearSpotDetails } from "../../store/spotDetails";
// import {
//   resetPadding,
//   setHeaderPosition,
//   setEditSpotModal,
//   setSpotForEditing,
// } from "../../store/ui";
// import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
// import SpotGridItem from "./SpotGridItem";
// import "./SpotGrid.css";

// export default function SpotGrid({ searchTerm }) {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const spots = useSelector((state) => Object.values(state.spots));
//   const [showDeleteSpotModal, setShowDeleteSpotModal] = useState(false);
//   const [spotIdToDelete, setSpotIdToDelete] = useState(null);

//   // Fetch spots and reset UI settings
//   useEffect(() => {
//     dispatch(getSpots());
//     dispatch(clearSpotDetails());
//     dispatch(resetPadding());
//     dispatch(setHeaderPosition("fixed"));
//   }, [dispatch]);

//   // Enhanced filtering logic that includes multiple fields
//   const filteredSpots = searchTerm
//     ? spots.filter((spot) => {
//         // Convert all relevant spot fields to lowercase for a case-insensitive search
//         const searchText = searchTerm.toLowerCase();
//         const spotTitle = spot.name?.toLowerCase() || "";
//         const spotCity = spot.city?.toLowerCase() || "";
//         const spotState = spot.state?.toLowerCase() || "";
//         const spotCountry = spot.country?.toLowerCase() || "";
//         const spotHostName = spot.host?.name?.toLowerCase() || "";

//         // Check if any field contains the search term
//         return (
//           spotTitle.includes(searchText) ||
//           spotCity.includes(searchText) ||
//           spotState.includes(searchText) ||
//           spotCountry.includes(searchText) ||
//           spotHostName.includes(searchText)
//         );
//       })
//     : spots;

//   const editData = (spot) => {
//     dispatch(setSpotForEditing(null));
//     dispatch(setEditSpotModal(true));
//     dispatch(setSpotForEditing(spot));
//   };

//   const handleDelete = (spotId) => {
//     dispatch(deleteSpot(spotId));
//   };

//   return (
//     <div className="SpotGrid">
//       {filteredSpots.map((spot, i) =>
//         location.pathname === "/spotsgrid" ? (
//           <span key={i}>
//             <div className="EditDelete">
//               <div style={{ color: "green" }} onClick={() => editData(spot)}>
//                 Update
//               </div>
//               {showDeleteSpotModal && (
//                 <ConfirmationModal
//                   title="Confirm Delete"
//                   message="Are you sure you want to remove this spot?"
//                   onConfirm={() => {
//                     dispatch(deleteSpot(spotIdToDelete));
//                     setShowDeleteSpotModal(false);
//                   }}
//                   onCancel={() => setShowDeleteSpotModal(false)}
//                 />
//               )}
//               <div
//                 style={{ color: "red" }}
//                 onClick={() => {
//                   setSpotIdToDelete(spot.id);
//                   setShowDeleteSpotModal(true);
//                 }}
//               >
//                 Delete
//               </div>
//             </div>
//             <NavLink
//               to={`/spots/${spot.id}`}
//               style={{ textDecoration: "none" }}
//             >
//               <SpotGridItem spot={spot} />
//             </NavLink>
//           </span>
//         ) : (
//           <NavLink
//             key={i}
//             to={`/spots/${spot.id}`}
//             style={{ textDecoration: "none" }}
//           >
//             <SpotGridItem spot={spot} />
//           </NavLink>
//         )
//       )}
//     </div>
//   );
// }


// SpotGrid.js
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSpots, deleteSpot } from "../../store/spots";
import { clearSpotDetails } from "../../store/spotDetails";
import {
  resetPadding,
  setHeaderPosition,
  setEditSpotModal,
  setSpotForEditing,
} from "../../store/ui";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import SpotGridItem from "./SpotGridItem";
import "./SpotGrid.css";

export default function SpotGrid({ searchTerm }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const spots = useSelector((state) => Object.values(state.spots));
  const [showDeleteSpotModal, setShowDeleteSpotModal] = useState(false);
  const [spotIdToDelete, setSpotIdToDelete] = useState(null);

  // Fetch spots and reset UI settings
  useEffect(() => {
    dispatch(getSpots());
    dispatch(clearSpotDetails());
    dispatch(resetPadding());
    dispatch(setHeaderPosition("fixed"));
  }, [dispatch]);

  // Enhanced filtering logic that includes multiple fields
  const filteredSpots = searchTerm
    ? spots.filter((spot) => {
        const searchText = searchTerm.toLowerCase();
        const spotTitle = spot.name?.toLowerCase() || "";
        const spotCity = spot.city?.toLowerCase() || "";
        const spotState = spot.state?.toLowerCase() || "";
        const spotCountry = spot.country?.toLowerCase() || "";
        const spotHostName = spot.host?.name?.toLowerCase() || "";

        return (
          spotTitle.includes(searchText) ||
          spotCity.includes(searchText) ||
          spotState.includes(searchText) ||
          spotCountry.includes(searchText) ||
          spotHostName.includes(searchText)
        );
      })
    : spots;

  const editData = (spot) => {
    dispatch(setSpotForEditing(null));
    dispatch(setEditSpotModal(true));
    dispatch(setSpotForEditing(spot));
  };

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  return (
    <div className="SpotGrid">
      {filteredSpots.length > 0 ? (
        filteredSpots.map((spot, i) =>
          location.pathname === "/spotsgrid" ? (
            <span key={i}>
              <div className="EditDelete">
                <div style={{ color: "green" }} onClick={() => editData(spot)}>
                  Update
                </div>
                {showDeleteSpotModal && (
                  <ConfirmationModal
                    title="Confirm Delete"
                    message="Are you sure you want to remove this spot?"
                    onConfirm={() => {
                      dispatch(deleteSpot(spotIdToDelete));
                      setShowDeleteSpotModal(false);
                    }}
                    onCancel={() => setShowDeleteSpotModal(false)}
                  />
                )}
                <div
                  style={{ color: "red" }}
                  onClick={() => {
                    setSpotIdToDelete(spot.id);
                    setShowDeleteSpotModal(true);
                  }}
                >
                  Delete
                </div>
              </div>
              <NavLink
                to={`/spots/${spot.id}`}
                style={{ textDecoration: "none" }}
              >
                <SpotGridItem spot={spot} />
              </NavLink>
            </span>
          ) : (
            <NavLink
              key={i}
              to={`/spots/${spot.id}`}
              style={{ textDecoration: "none" }}
            >
              <SpotGridItem spot={spot} />
            </NavLink>
          )
        )
      ) : (
        // Display message if no spots match the search
        <div className="no-matches">
          <p>No spots match your search</p>
        </div>
      )}
    </div>
  );
}
