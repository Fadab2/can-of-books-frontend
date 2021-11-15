import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { withAuth0 } from "@auth0/auth0-react";

class Header extends React.Component {
  handleClick = () => {
    this.props.onLogout()
  }

  render() {

    
    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {this.props.auth0.authenticated &&
          <>
            <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
          </>
        }
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
      </Navbar>

    )
  }
}

export default withAuth0(Header);
