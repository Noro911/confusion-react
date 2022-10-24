import React, { useRef, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usernameRef = useRef()
  const passwordRef = useRef()
  const rememberRef = useRef()

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

 
  const handleLogin = (event) => {
    toggleModal();
    alert("Username: " + usernameRef.current.value + " Password: " + passwordRef.current.value
    + " Remember: " + rememberRef.current.checked);
    event.preventDefault();
    }

  return (
    <>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />

          <NavbarBrand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height="30"
              width="41"
              alt="Ristorante Con Fusion"
            />
          </NavbarBrand>

          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-list fa-lg"></span> Menu
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <Button outline onClick={toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span> Login
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>

              <Input
                type="text"
                id="username"
                name="username"
                innerRef={usernameRef}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>

              <Input
                type="password"
                id="password"
                name="password"
                innerRef={passwordRef}
              />
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="remember"
                  innerRef={rememberRef}
                />
                Remember me
              </Label>
            </FormGroup>

            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <div className="jumbotron">
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>

              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
