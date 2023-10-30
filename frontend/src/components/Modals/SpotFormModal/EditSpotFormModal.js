import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setEditSpotModal, setSpotForEditing } from '../../../store/ui';
import SpotForm from './SpotForm';

function EditSpotFormModal({ spot }) {
    const dispatch = useDispatch();
    console.log('spot EditSpotFormModal')
    const showEditSpotModal = useSelector(state => state.ui.showEditSpotModal);
    if (!showEditSpotModal) return;

    return <Modal onClose={() => { dispatch(setEditSpotModal(false)); dispatch(setSpotForEditing(null)) }}>
        <SpotForm spot={spot} />
    </Modal>;
}

export default EditSpotFormModal;
