//ContactsTable.js
import React, { useState } from 'react';
import { Table, Pagination, Badge, Form, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel , faFilePdf , faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteContactModal from './DeleteContactModal';
import EditContactModal from './EditContactModal';   
import axios from 'axios';
// JsPDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ContactsTable = ({ contacts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const contactsPerPage = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
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
  if (!contacts || contacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const sortedContacts = contacts.filter(
    (contact) =>
      contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.tel.toString().includes(searchTerm)
  ).sort((a, b) => {
    if (sortBy === 'numero') {
      return sortOrder === 'asc' ? a.numero - b.numero : b.numero - a.numero;
    } else if (sortBy === 'nom') {
      return sortOrder === 'asc' ? a.nom.localeCompare(b.nom) : b.nom.localeCompare(a.nom);
    } else if (sortBy === 'tel') {
      return sortOrder === 'asc' ? a.tel - b.tel : b.tel - a.tel;
    }
    // Ajoutez d'autres critères de tri si nécessaire
    return 0;
  });

  const currentContacts = sortedContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(sortedContacts.length / contactsPerPage);







  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  //Mettre en forme le terme cherché
  const highlightText = (text, query) => {
    if (typeof text !== 'string') {
      text = String(text);
    }
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? <strong key={i}>{part}</strong> : part
    );
  };


  const handleExportExcel = () => {
    const dataToExport = sortedContacts.map((contact) => ({
      Numéro: indexOfFirstContact + sortedContacts.indexOf(contact) + 1,
      Avatar: contact.avatarUrl || 'https://picsum.photos/200/300',
      Nom: contact.nom,
      Téléphone: contact.tel,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    XLSX.writeFile(wb, 'contacts.xlsx');
  };


// Function to handle exporting to PDF
const handleExportPDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  

  // Set text color to red
  doc.setTextColor(255, 0, 0);

  // Set font style to bold
  doc.setFont('bold');

  // Add title in red and bold
  doc.setFontSize(20);
  doc.text('Liste des contacts', 100, 10, { align: 'center' });

  // Reset text color and font style
  doc.setTextColor(0, 0, 0);
  doc.setFont('normal');

  // Add date and time at the top of the page
  const today = new Date();
  const newdat = "Imprimé le: " + today.toLocaleString();
  doc.text(newdat, 10, 20);

  // Add an image at a specific location on the page
  var img = new Image();
  img.src = 'img/elife.jpg';
  doc.addImage(img, 'png', 150, 10, 20, 15);

  // Add some space before the table
  const spaceBeforeTable = 30;


  doc.autoTable({
    head: [['Numéro', 'Avatar', 'Nom', 'Téléphone']],
    body: contacts.map((contact, index) => [
      indexOfFirstContact + index + 1,
      { image: 'https://picsum.photos/200/300', width: 20, height: 20 },
      contact.nom,
      contact.tel,
    ]),
    startY: spaceBeforeTable, // Adjust the Y-coordinate to add space
    
    margin: { top: 10 }, // Add extra margin to accommodate the header
  });

  // Add page numbering on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text( 'Page '+ i + '/' + pageCount, 180, doc.internal.pageSize.height - 10);
  }
  // Save the PDF with the specified filename
  doc.save('contacts.pdf');
};


const handleDeleteClick = (contactId) => {
  setContactIdToDelete(contactId);
  setShowDeleteModal(true);
};

const handleDeleteContact = async (contactId) => {
  try {
    // Make the API call to delete the contact
    await axios.delete(`http://localhost:3001/contact/${contactId}/supprimer`);

    // Handle success, e.g., update your contact list
    console.log('Contact deleted successfully');
    window.location.reload(); // Reload the entire page
  } catch (error) {
    // Handle error, show an error message, etc.
    console.error('Error deleting contact', error);
  }
};

const handleCloseDeleteModal = () => {
  setShowDeleteModal(false);
  setContactIdToDelete(null);
};

const handleEditClick = (contact) => {
  setContactToEdit(contact);
  setShowEditModal(true);
};

const handleEditContact = async (contactId, editedData) => {
  try {
    await axios.put(`http://localhost:3001/contact/${contactId}/modifier`, editedData);
    fetchContacts();
    console.log('Contact edited successfully');
  } catch (error) {
    console.error('Error editing contact', error);
  } finally {
    setShowEditModal(false);
    setContactToEdit(null);
  }
};

const handleCloseEditModal = () => {
  setShowEditModal(false);
  setContactToEdit(null);
};

  

  return (
    <>
      <h2 className="text-muted">
        Votre liste des contacts contient{' '}
        <Badge variant="primary">{contacts.length}</Badge> contacts
      </h2>

      <p>
        contacts triés par: <span class="badge bg-primary">{sortBy ? "" + sortBy : ""}</span>
      </p>


      <Form>
        <Form.Group controlId="searchTerm">
          <Form.Control
            type="text"
            placeholder="Rechercher par nom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className='m-2'></div>
      <Button variant="success" onClick={handleExportExcel}>
        <FontAwesomeIcon icon={faFileExcel} className="mr-1" /> Exporter en Excel
      </Button>
      &nbsp;

      <Button variant="primary" onClick={handleExportPDF} className="ml-2">
        <FontAwesomeIcon icon={faFilePdf} className="mr-1" /> Exporter en PDF
      </Button>
      <div className='m-2'></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort('numero')}>Numéro</th>
            <th>Avatar</th>
            <th onClick={() => handleSort('nom')}>Nom</th>
            <th onClick={() => handleSort('tel')}>Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr key={index}>
              <td>{indexOfFirstContact + index + 1}</td>
              <td>
                <img
                  src={contact.avatarUrl || 'https://picsum.photos/200/300'}
                  alt={`Avatar de ${contact.nom}`}
                  width="50"
                  height="50"
                />
              </td>
              <td>
                {highlightText(contact.nom, searchTerm)}
              </td>
              <td>
                {highlightText(contact.tel, searchTerm)}
              </td>
              <td>
                {/* Example button to trigger the modal */}
                <Button variant="danger" onClick={() => handleDeleteClick(contact._id)}>
                  Supprimer le contact
                </Button>
                <Button variant="info" onClick={() => handleEditClick(contact)} className="ml-2">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" /> Modifier le contact
                </Button>


                {/* DeleteContactModal usage */}
                {showDeleteModal && (
                  <DeleteContactModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    deleteContact={handleDeleteContact}
                    contactId={contactIdToDelete}

                  />
                )}
{showEditModal && (
        <EditContactModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          editContact={handleEditContact}
          contact={contactToEdit}
        />
      )}



              </td>



            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default ContactsTable;
