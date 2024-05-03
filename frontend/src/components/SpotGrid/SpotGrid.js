import { NavLink, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setSpotModal,
  setEditSpotModal,
  setSpotForEditing,
} from "../../store/ui";

import "./SpotGrid.css";
import { getSpots } from "../../store/spots";
import SpotGridItem from "./SpotGridItem";
import { clearSpotDetails } from "../../store/spotDetails";
import { resetPadding, setHeaderPosition } from "../../store/ui";
import Header from "../Header/Header";
import { deleteSpot } from "../../store/spots";
import ConfirmationModal from '../Modals/ConfirmationModal/ConfirmationModal';


export default function SpotGrid({ searchTerm }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const spots = useSelector((state) => Object.values(state.spots));
  const padding = useSelector((state) => state.ui.padding);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpots());
    dispatch(clearSpotDetails());
    dispatch(resetPadding());
    dispatch(setHeaderPosition("fixed"));
  }, [dispatch]);

  // Filter spots based on the search term
  const filteredSpots = searchTerm ? spots.filter(spot =>
    (spot.location && spot.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (spot.name && spot.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : spots;
  
  

  const editData = (spot) => {
    dispatch(setSpotForEditing(null));
    dispatch(setEditSpotModal(true));
    dispatch(setSpotForEditing(spot));
    console.log("editData", spot);
  };
  const handleDelete = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  const [showDeleteSpotModal, setShowDeleteSpotModal] = useState(false);
  const [spotIdToDelete, setSpotIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(getSpots());
    dispatch(clearSpotDetails());
    dispatch(resetPadding());
    dispatch(setHeaderPosition("fixed"));
  }, [dispatch]);

  return (
    <>
      <Header className="homepageHeader" />
      <div className="TextCenter">
        {location.pathname == "/spotsgrid" ? <h2>Manage Spots</h2> : ""}
      </div>
      <div className="SpotGrid">
        
        {spots.map((spot, i) =>
          location.pathname == "/spotsgrid" ? (
            <span>
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
                key={i}
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
