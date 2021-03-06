import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect} from 'react-redux';
import { logoutUser } from '../../actions/login';
import { loginUser } from '../../actions/login';

class Logout extends Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false
    }
  }


  handleLogout(event){
    localStorage.clear();
    this.setState({redirect: true});
    this.props.logoutUser();

  }

  render(){
    if(this.state.redirect){
      return ( <Redirect to='/all' /> )
    }else{
    return (
        <div id="logout-form">
          <form onClick={this.handleLogout.bind(this)}>
            <div>LOG OUT</div>
            {/*<input type="submit" className="button" value="Logout"/>*/}
          </form>
        </div>
      )
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    user : state.login

  }
}

const ConnectedLogout = connect(
  mapStatetoProps,
  {logoutUser,loginUser}
)(Logout)

export default ConnectedLogout;