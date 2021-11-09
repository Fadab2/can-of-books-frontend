import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';

class Header extends React.Component {
  handleClick = () => {
    this.props.onLogout()
  }

  render() {

    
    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {this.props.user &&
          <>
            <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
            <button onClick={this.handleClick}>Log Out</button>
          </>
        }
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
      </Navbar>

    )
  }
}

export default Header;
