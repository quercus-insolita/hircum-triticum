import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header: React.FC = (): React.ReactElement => {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#home">logo goes here</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
