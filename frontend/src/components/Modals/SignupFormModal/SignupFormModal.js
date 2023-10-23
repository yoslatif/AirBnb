import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setSignupModal } from '../../../store/ui';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const dispatch = useDispatch();
    const showSignupModal = useSelector(state => state.ui.showSignupModal);
    return showSignupModal ?
        (
            <Modal onClose={() => dispatch(setSignupModal(false))}>
                <SignupForm />
            </Modal>
        ) :
        (
            <div onClick={() => dispatch(setSignupModal(true))}>Sign up</div>
        );
}

export default SignupFormModal;
