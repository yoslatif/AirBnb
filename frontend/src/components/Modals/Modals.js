import SpotFormModal from './SpotFormModal/SpotFormModal';
import EditSpotFormModal from './SpotFormModal/EditSpotFormModal';
import ReviewFormModal from './ReviewFormModal/ReviewFormModal';
import { DeleteSpotFormModal as DeleteSpotForm } from './DeleteSpotFormModal/DeleteSpotFormModal';

import LoginFormModal from './LoginFormModal/LoginFormModal';
import SignupFormModal from './SignupFormModal/SignupFormModal';
import { useSelector } from 'react-redux';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    console.log('uiuiuiui', ui)
    return <>
        {ui.showLoginModal && <LoginFormModal />}
        {ui.showSignupModal && <SignupFormModal />}
        {ui.showDeleteSpotModal && <DeleteSpotForm />}
        {ui.showLoginModal && <LoginFormModal />}
        {ui.showSpotModal && <SpotFormModal spot={ui.spot} />}
        {ui.showEditSpotModal && <EditSpotFormModal spot={ui.spot}/>}
        {ui.showReviewModal && <ReviewFormModal />}
    </>
}
