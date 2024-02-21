//ContactsTable.js
import React, { useState } from 'react';
import { Table, Pagination, Badge, Form ,Button} from 'react-bootstrap';
import * as XLSX from 'xlsx';

const ContactsTable = ({ contacts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const contactsPerPage = 5;

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
