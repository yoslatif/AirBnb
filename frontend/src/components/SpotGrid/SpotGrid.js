import { NavLink, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { setSpotModal, setEditSpotModal, setSpotForEditing } from '../../store/ui';

import "./SpotGrid.css";
import { getSpots } from "../../store/spots";
import SpotGridItem from "./SpotGridItem";
import { clearSpotDetails } from "../../store/spotDetails";
import { resetPadding, setHeaderPosition } from "../../store/ui";
import Header from "../Header/Header";
import { deleteSpot } from "../../store/spots";


export default function SpotGrid() {
    const dispatch = useDispatch();
    const location = useLocation();
    const spots = useSelector(state => Object.values(state.spots));
    const padding = useSelector(state => state.ui.padding);
    const sessionUser = useSelector(state => state.session.user);

    const editData = (spot) => {
        dispatch(setSpotForEditing(null)) 
        dispatch(setEditSpotModal(true))
        dispatch(setSpotForEditing(spot))
        console.log('editData', spot)
    }
    const handleDelete = (spotId) => {
        dispatch(deleteSpot(spotId));
    };
    

    
    useEffect(() => {
        dispatch(getSpots());
        dispatch(clearSpotDetails());
        dispatch(resetPadding());
        dispatch(setHeaderPosition("fixed"));
    }, [dispatch]);

    return <>
        <Header className="homepageHeader" />
        <div className="TextCenter">
            {location.pathname=="/spotsgrid"?
                <h2>Manage Spots</h2>
                :''
            }
        </div>
        <div className="SpotGrid">
            {spots.map((spot, i) =>
                    location.pathname=="/spotsgrid"?
                        <span>
                            <div className="EditDelete">
                                <div style={{color:'green'}} onClick={() => editData(spot)}>Update</div>
                                <div style={{color:'red'}} onClick={() => handleDelete(spot.id)}>Delete</div>

                            </div>
                            <NavLink key={i} to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
                                <SpotGridItem spot={spot} />
                            </NavLink>
                        </span>
                        :
                        <NavLink key={i} to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
                            <SpotGridItem spot={spot} />
                        </NavLink>
                )
            }
            {console.log('useParams', window.location.pathname=="/spotsgrid")}
            {location.pathname=="/spotsgrid"?
                spots.length>0?
                    sessionUser && <button
                    className="createASpot button"
                    onClick={() => dispatch(setSpotModal(true))}>Create a Spot
                    </button>
                    :''
                :''
            }
            
            </div >
    </>

}
