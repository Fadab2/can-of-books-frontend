import { Component } from 'react'
import LoginForm from './LoginForm.js'

export default class LoginButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  handleClick = () => {
    this.setState({ clicked: true })
  }
  render() {

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */ //<button oncli
    return (
    <>
    {this.state.clicked ? <LoginForm loginHandler={this.props.loginHandler}/> : <button onClick={this.handleClick}>Log In</button> }
    </>
    )
  
  }
}