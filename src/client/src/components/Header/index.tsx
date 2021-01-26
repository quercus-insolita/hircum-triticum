import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

import projectLogo from 'assets/images/groats-logo.png';

import styles from 'components/Header/styles.module.scss';

const Header: React.FC = (): React.ReactElement => {
  return (
    <Navbar expand="lg" bg="transparent">
      <Container>
        <Navbar.Brand href="/" className={styles.navbar}>
          <img
            src={projectLogo}
            width="50"
            height="50"
            className={styles.navbarImg}
            alt="Project logo"
          />
          Quercus Insolita
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
