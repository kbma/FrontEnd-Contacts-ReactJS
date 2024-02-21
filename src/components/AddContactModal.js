//AddContactModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddContactModal = ({ show, handleClose, handleAddContact }) => {
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');

  const handleSave = () => {
    // Validez les données si nécessaire
    // Appel de la fonction pour ajouter le contact
    handleAddContact({ nom, tel });

    // Réinitialisez les champs du formulaire
    setNom('');
    setTel('');

    // Fermez le modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="tel">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le numéro de téléphone"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactModal;
