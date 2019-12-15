import React from "react";
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavMenu.css";
import { connect } from "react-redux";
import { LoginState } from "../store";

const NavMenu = (loginState: LoginState) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            Landmark Remark Demo
          </NavbarBrand>
          <NavbarToggler
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-2"
          />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={isMenuOpen}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              {!loginState.IsLoggedIn && (
                <NavItem>
                  <NavLink tag={Link} to="/Login">
                    Login
                  </NavLink>
                </NavItem>
              )}
              {loginState.IsLoggedIn && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {loginState.UserInfo && loginState.UserInfo.displayName}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/Profile">
                      Profile
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/Note">
                      Take note
                    </DropdownItem>
                    <DropdownItem>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default connect((state: any) => {
  return state.LoginResults;
})(NavMenu as any);
