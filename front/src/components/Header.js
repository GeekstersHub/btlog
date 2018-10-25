// @flow
import React from 'react';
import { Container, NavbarBrand, Collapse, Navbar, Nav } from 'reactstrap';

const Header = () => (
  <div>
    <Navbar color="light" light expand="md">
      <Container>
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavbarBrand href="/">Refresh</NavbarBrand>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  </div>
);

export default Header;
