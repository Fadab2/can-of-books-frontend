import { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    }
  }
onChange = (e) => {
  this.setState({user: e.target.value})
}
handleClick = () => {
 this.props.loginHandler(this.state.user)
}

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <>
        <input onChange={this.onChange} type="text" placeholder="Enter Email" />
        <button onClick={this.handleClick}>Log In</button>
      </>
    );
  }
};

export default LoginForm;
