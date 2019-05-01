import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class SimpleSnackbar extends React.Component {
  constructor(props){
    super(props);
  }
  state = {
    open: false,
    message: ""
  };

  handleClick = () => {
    this.setState({message: this.props.message})
    this.setState({ open: true });
  };
  handleClick2 = () => {
    this.setState({message: document.getElementById("manual_message").value})
    this.setState({ open: true });
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <span style={{display: "none"}} onClick={this.handleClick} id="activate_snackbar">click me</span>
        <span style={{display: "none"}} id="manual_message">snackbar_message_here</span>
        <span style={{display: "none"}} onClick={this.handleClick2} id="activate_snackbar_manual">click me</span>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="close_thing"
              onClick={this.handleClose}
            >
              X
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
export default SimpleSnackbar ;
