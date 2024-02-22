// EditContactModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditContactModal = ({ show, handleClose, editContact, contact }) => {
  const [editedData, setEditedData] = useState({
    nom: contact.nom,
    tel: contact.tel,
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      // Perform validation or additional logic as needed

      // Call the function to edit the contact
      await editContact(contact._id, editedData);

      toast.success('Contact modifié avec succès.', {
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
      toast.error('Erreur lors de la modification du contact.', {
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
        <Modal.Title>Modifier le contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editNom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le nouveau nom"
              name="nom"
              value={editedData.nom}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="editTel">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Entrez le nouveau numéro de téléphone"
              name="tel"
              value={editedData.tel}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Add other form fields for editing other contact details */}

          <Button variant="primary" onClick={handleEdit}>
            Enregistrer les modifications
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditContactModal;
