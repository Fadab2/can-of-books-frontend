import { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  

  render() {
    /* TODO: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return <p>User email: {this.props.auth0.user.email}</p>
  }
};

export default withAuth0(Profile);
