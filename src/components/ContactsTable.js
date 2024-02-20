//ContactsTable.js
import React ,{ useState }from 'react';
import { Table, Pagination , Badge } from 'react-bootstrap';

const ContactsTable = ({ contacts }) => {

    //Systeme de pagination
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 2; // Nombre de contacts par page
  
    if (!contacts || contacts.length === 0) {
      return <p>No contacts available.</p>;
    }
  
    // Calcule l'index du premier et du dernier contact sur la page actuelle
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  
    const totalPages = Math.ceil(contacts.length / contactsPerPage);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    //Fin systeme de pagination

  return (
    <>
  <h2 className="text-muted">Votre liste des contacts contient <Badge variant="primary">{contacts.length}</Badge> contacts</h2>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Numéro</th>
          <th>Avatar</th>
          <th>Nom</th>
          <th>Téléphone</th>
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
            <td>{contact.nom}</td>
            <td>{contact.tel}</td>
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
