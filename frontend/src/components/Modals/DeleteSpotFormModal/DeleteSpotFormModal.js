// import { useDispatch, useSelector } from 'react-redux';
// import { Modal } from '../../../context/Modal';
// import DeleteSpotForm from './DeleteSpotForm';
// import { setDeleteSpotModal } from '../../../store/ui';

// function DeleteSpotFormModal() {
//     const dispatch = useDispatch();
//     const showDeleteSpotModal = useSelector(state => state.ui.showDeleteSpotModal);
//     if (!showDeleteSpotModal) return;
//     return <Modal onClose={() => dispatch(setDeleteSpotModal(false))}>
//         <DeleteSpotForm />
//     </Modal>
// }

// export default DeleteSpotFormModal;

import ReactModal from 'react-modal';

export const DeleteSpotFormModal = ({isOpen, onClose, onDelete}) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <button onClick={onDelete} style={{backgroundColor: "red"}}>Yes (Delete Spot)</button>
      <button onClick={onClose} style={{backgroundColor: "darkgrey"}}>No (Keep Spot)</button>
    </ReactModal>
  );
}