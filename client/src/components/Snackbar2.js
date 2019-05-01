import React from 'react';
//import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

class SnackDemo extends React.Component {
  handleClick = () => {
    let text = document.getElementById('snackbar_default_message').innerHTML ;
    this.props.enqueueSnackbar(text);
  }
  handleClickSuccess =  () => {
    // variant could be success, error, warning or info
    let variant = 'success'
    let text = document.getElementById('snackbar_success_message').innerHTML ;
    this.props.enqueueSnackbar(text, { variant });
  };
  handleClickError =  () => {
    let variant = 'error'
    let text = document.getElementById('snackbar_error_message').innerHTML ;
    this.props.enqueueSnackbar(text, { variant });
  };
  handleClickWarning =  () => {
    let variant = 'warning'
    let text = document.getElementById('snackbar_warning_message').innerHTML ;
    this.props.enqueueSnackbar(text, { variant });
  };
  handleClickInfo =  () => {
    let variant = 'info'
    let text = document.getElementById('snackbar_info_message').innerHTML ;
    this.props.enqueueSnackbar(text, {variant});
  };
  render() {
    return (
      <React.Fragment>
        <span id="show_snackbar_default" style={{display: "none"}} onClick={this.handleClick}>Show snackbar</span>
        <span id="show_snackbar_success" style={{display: "none"}} onClick={this.handleClickSuccess}>Success</span>
        <span id="show_snackbar_error" style={{display: "none"}} onClick={this.handleClickError}>Error</span>
        <span id="show_snackbar_warning" style={{display: "none"}} onClick={this.handleClickWarning}>Warning</span>
        <span id="show_snackbar_info" style={{display: "none"}} onClick={this.handleClickInfo}>Info</span>
      </React.Fragment>
    );
  }
}
const SnackDemo1 = withSnackbar(SnackDemo);
export const SnackbarMessages = () => {
  return(
    <div>
      <span id="snackbar_default_message"style={{display: "none"}}>I love snacks.</span>
      <span id="snackbar_success_message"style={{display: "none"}}>This is a success message!</span>
      <span id="snackbar_error_message"style={{display: "none"}}>This is a error message!</span>
      <span id="snackbar_warning_message"style={{display: "none"}}>This is a warning message!</span>
      <span id="snackbar_info_message"style={{display: "none"}}>This is an info message!</span>
    </div>
  )
}
export default SnackDemo1
