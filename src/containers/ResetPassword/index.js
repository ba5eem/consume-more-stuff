import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { loadUsers } from '../../actions/users.js';
import { addQues } from '../../actions/login';
import PasswordRequirements from '../../components/PasswordRequirements';
import filterRegistration from '../../lib/filterRegistration';
const validator = require("email-validator");


class ResetPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      questionOne:'',
      questionTwo:'',
      redirect: false,
      reqNotMet: false,
      email: '',
      matchedUser: {},
      emailFound: false,
      resetApproved: false
    }
    this.handleQuestionOne = this.handleQuestionOne.bind(this);
    this.handleQuestionTwo = this.handleQuestionTwo.bind(this);
    this.handleQuestionsSubmit=this.handleQuestionsSubmit.bind(this);
    this.handleEmailSubmit=this.handleEmailSubmit.bind(this);
    this.handleEmail=this.handleEmail.bind(this);
  }





  handleEmail(e){
     this.setState({
      email: e.target.value
    })
  }
  handleEmailSubmit(e){
    e.preventDefault();
     let matchedUser = filterRegistration(this.props.users,'email',this.state.email);
     this.setState({matchedUser: matchedUser, emailFound: true})
  }
  handleQuestionOne(e){
     this.setState({
      questionOne: e.target.value, reqNotMet: false
    })
  }
  handleQuestionTwo(e){
     this.setState({
      questionTwo: e.target.value, reqNotMet: false
    })
  }


  handleQuestionsSubmit(e){
    e.preventDefault();
    let userSavedQOne = this.state.matchedUser.qone;
    let userSavedQTwo = this.state.matchedUser.qtwo;
    let checkOne = (userSavedQOne === this.state.questionOne);
    let checkTwo = (userSavedQTwo === this.state.questionTwo);
    if(checkOne && checkTwo){
      this.setState({resetApproved: true})
    }
  }


  componentWillMount(){ this.props.loadUsers(); }


  render(){
    console.log(this.state.resetApproved);
    return (
      <div id="registration-form">
        <form onSubmit={this.handleEmailSubmit}>
            <input type="text" 
              value={this.state.email} 
              placeholder="email"
              onChange={this.handleEmail}/>
            <input type="submit" className="button" value=""/>
        </form>





        <form onSubmit={this.handleQuestionsSubmit}>
          What is your pets name?
          <input type="text" 
            value={this.state.qOne} 
            placeholder="pets name"
            onChange={this.handleQuestionOne}/>

          <br></br>
          <br></br>
          What is your favorite color?
          <input type="text" 
            value={this.state.qTwo} 
            placeholder="favorite color"
            onChange={this.handleQuestionTwo}/>


          <br></br>
          <br></br>

          <input type="submit" className="button" value="Complete"/>
          {this.state.reqNotMet ? "Requirements have not been met, please try again" : null}
        </form>
      </div>

    ) 
  }


}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}

const ConnectedResetPassword = connect(
  mapStateToProps,
  {loadUsers,addQues}
)(ResetPassword);

export default withRouter(ConnectedResetPassword);