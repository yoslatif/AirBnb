import "./RightHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setSpotModal, setSpotForEditing } from "../../../store/ui";
import ProfileButton from "./ProfileButton/ProfileButton";

export default function RightHeader() {
  const session = useSelector((state) => state.session);
  const sessionUser = session?.user || null;
  const dispatch = useDispatch();


  return (
    <div className="rightHeader">
      {sessionUser ? (
        <button
          className="createASpot button"
          onClick={() => {
            dispatch(setSpotModal(true));
            dispatch(setSpotForEditing(null));
          }}
        >
          Create a Spot!!!
        </button>
      ) : null}
      <ProfileButton user={sessionUser} />
    </div>
  );
}
