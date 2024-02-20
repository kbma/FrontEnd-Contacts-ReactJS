import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Container } from 'react-bootstrap';

// Importer les packages nécessaires
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Ajouter les icônes à la bibliothèque
library.add(faAddressBook);

function App() {

  return (
    <>
    <div className="App ">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
       
        <FontAwesomeIcon icon={faAddressBook} size="2x" color="white"/>&nbsp; &nbsp;  
          <Navbar.Brand href="#home">Contacts Manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">V1.0</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
    </>
  );
}

export default App;
