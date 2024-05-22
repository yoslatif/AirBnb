import ReactModal from 'react-modal';
import './DeleteSpotForm.css';
import DeleteSpotForm from './DeleteSpotForm';

export const DeleteSpotFormModal = ({ isOpen, onClose, spotId }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="deleteModal"
      overlayClassName="deleteOverlay"
      ariaHideApp={false} // This is needed for accessibility reasons
    >
      <DeleteSpotForm spotId={spotId} onClose={onClose} />
    </ReactModal>
  );
};
