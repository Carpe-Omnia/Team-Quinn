import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from './style/logo.svg';
import './style/App.css';
import './style/places.css' ;
import {  BrowserRouter as Router, Route} from 'react-router-dom';
import * as actions from './actions/orientationActions'
import NavBar from './components/NavBar';
import PlacesContainer from './components/places/PlacesContainer'
import { SnackbarProvider } from 'notistack';
import SnackDemo1 from './components/Snackbar2' ;
import {SnackbarMessages} from './components/Snackbar2'
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
        <SnackbarMessages />
        <SnackbarProvider maxSnack={3}>
          <SnackDemo1 />
        </SnackbarProvider>
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
