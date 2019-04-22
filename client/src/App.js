import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from './style/logo.svg';
import './style/App.css';
import {  BrowserRouter as Router, Route} from 'react-router-dom';

import * as actions from './actions/orientationActions'
import NavBar from './components/NavBar';


import HomeContainer from './components/home/HomeContainer'
import PlacesContainer from './components/places/PlacesContainer'

class App extends Component {
  /*
  constructor(props){
    super(props);
  }
  */
  componentWillMount() {
    this.props.actions.home();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>Team Quinn Sign Tracker</h4>
          <span className="non_mobile" >press ';' to access hotkeys from within an input </span>
        </header>
        <div className="App-body">
        <Router>
          <React.Fragment >
            <NavBar id="NavBar" />
            <Route
              exact path="/"
              render={(props) => <PlacesContainer {...props} actions={this.props.actions} orientation={this.props.orientation} z="3" />}
            />
          </React.Fragment >
        </Router >
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {orientation: state.orientation}
}
function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(actions, dispatch)}
}
const connector = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = connector(App)



export default connectedComponent;
