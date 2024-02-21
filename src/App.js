//App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container ,Button} from 'react-bootstrap';
import ContactsTable from './components/ContactsTable';
import AddContactModal from './components/AddContactModal';
// Importer les packages nécessaires
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Ajouter les icônes à la bibliothèque
library.add(faAddressBook);

function App() {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [contactsData, setContactsData] = useState([]);
  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/contact/lister');
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des contacts: ${response.statusText}`);
      }
      const data = await response.json();
      // Suppose que la liste des contacts est dans un objet nommé "liste"
      setContactsData(data.liste || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);



  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch('http://localhost:3001/contact/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        // La requête a réussi, mettez à jour votre liste de contacts
        fetchContacts(); // Actualisez la liste des contacts après l'ajout
        console.log('Contact ajouté avec succès.');
      } else {
        // La requête a échoué, traitez les erreurs si nécessaire
        console.error('Erreur lors de l\'ajout du contact.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'ajout de contact :', error);
    }

    // Fermez le modal après l'ajout du contact, si nécessaire
    setShowAddContactModal(false);
  };




  

  return (
    <>
      <div className="App ">
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <FontAwesomeIcon icon={faAddressBook} size="2x" color="white" />&nbsp;  &nbsp;
            <Navbar.Brand href="#home">Contacts Manager</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">V1.0</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className='container'>
          <div className='p-4'></div>

          <Button variant="danger" onClick={() => setShowAddContactModal(true)}>
            Ajouter un contact
          </Button>

          <AddContactModal
            show={showAddContactModal}
            handleClose={() => setShowAddContactModal(false)}
            handleAddContact={handleAddContact}
          />

          <ContactsTable contacts={contactsData} />
        </div>

      </div>
    </>
  );
}

export default App;
