//DeleteContactModal
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const DeleteContactModal = ({ show, handleClose, deleteContact, contactId }) => {
    const handleDelete = async () => {

        try {
            // Appeler la fonction pour supprimer le contact
            await deleteContact(contactId); // Pass the contactId to the deleteContact function

            toast.success('Contact supprimé avec succès.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
        } catch (error) {
            toast.error('Erreur lors de la suppression du contact.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Supprimer le contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes-vous sûr de vouloir supprimer ce contact?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteContactModal;
