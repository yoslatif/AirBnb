import React from 'react';
import './ConfirmationModal.css';

export default function ConfirmationModal({ title, message, onConfirm, onCancel }) {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} style={{backgroundColor: 'red'}}>Yes</button>
                    <button onClick={onCancel} style={{backgroundColor: 'darkgrey'}}>No</button>
                </div>
            </div>
        </div>
    );
}