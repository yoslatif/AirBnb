// SpotGrid.js
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSpots,
  deleteSpot,
} from "../../store/spots";
import { clearSpotDetails } from "../../store/spotDetails";
import {
  resetPadding,
  setHeaderPosition,
  setEditSpotModal,
  setSpotForEditing,
} from "../../store/ui";
import Header from "../Header/Header";
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

  // Filter spots based on search term
  const filteredSpots = searchTerm
    ? spots.filter(
        (spot) =>
          (spot.location &&
            spot.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (spot.name &&
            spot.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : spots;

  // Functions for editing and deleting spots
  const editData = (spot) => {
    dispatch(setSpotForEditing(null));
    dispatch(setEditSpotModal(true));
    dispatch(setSpotForEditing(spot));
  };

  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  return (
    <>
      <div className="TextCenter">
        {location.pathname === "/spotsgrid" && <h2>Manage Spots</h2>}
      </div>
      <div className="SpotGrid">
        {filteredSpots.map((spot, i) =>
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
        )}
      </div>
    </>
  );
}
