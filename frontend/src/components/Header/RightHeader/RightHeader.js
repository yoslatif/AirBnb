import "./RightHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setSpotModal, setSpotForEditing } from "../../../store/ui";
import ProfileButton from "./ProfileButton/ProfileButton";

export default function RightHeader() {
  const session = useSelector((state) => state.session);
  const sessionUser = session.user ? session.user : null;

  

  console.log("RightHeader sessionUser:", sessionUser);
  const dispatch = useDispatch();
  return (
    <span>
      {
        <div className="rightHeader">
          {sessionUser && (
            <button
              className="createASpot button"
              onClick={() => {
                dispatch(setSpotModal(true));
                dispatch(setSpotForEditing(null));

              }}>
              Create a Spot!!!
            </button>
          )}
          <ProfileButton user={sessionUser} />
        </div>
      }
    </span>
  );
};