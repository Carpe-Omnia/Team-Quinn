import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
var autocomplete ;
class AddSign extends React.Component {
  state = {open: false, status: "authorized"};
  handleClickOpen = () => {
    this.setState({ open: true }) ;
    setTimeout(() =>{
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('new_address'), {
          types: ['geocode'],
          location: {lat: 40.356821, lng: -74.657421 },
          radius: 10000
        });
      autocomplete.setFields(['address_component']);
      console.log(autocomplete) ;
    }, 1000) ;
  };
  handleClose = () => {
    autocomplete = null ;
    this.setState({ open: false }) ;
    let element = document.getElementsByClassName('pac-container')[0] ;
    if (!!element){element.parentNode.removeChild(element)} ;
  };
  handleChange = (event) => {
    this.setState({status: event.target.value});
  };
  handleSubmit = () => {
    let name = document.getElementById('new_name').value ;
    let address = document.getElementById('new_address').value ;
    this.props.actions.new_sign(address, name, this.state.status);
    this.setState({ open: false })
    let element = document.getElementsByClassName('pac-container')[0] ;
    if (!!element){element.parentNode.removeChild(element)} ;
  }
  render() {
    return (
      <div>
        <span onClick={this.handleClickOpen} style={{display: 'none'}} id="add_sign_button">
          add_box
        </span>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a New Sign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the full street address and keep name short
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="new_address"
              label="Address"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="new_name"
              label="Name"
              type="text"
              fullWidth
            />
            <InputLabel htmlFor="status-native-simple">Status</InputLabel>
            <Select
              native
              value={this.state.status}
              onChange={event => this.handleChange(event)}
              inputProps={{
                name: 'status',
                id: 'status-native-simple',
              }}
            >
            <option value="authorized">Authorized</option>
            <option value="delivered">Delivered</option>
            <option value="picked up">Picked up</option>
          </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddSign
