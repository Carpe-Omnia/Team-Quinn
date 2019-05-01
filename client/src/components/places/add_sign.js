import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AddSign extends React.Component {
  state = {open: false, status: "other"};
  handleClickOpen = () => {this.setState({ open: true }) };
  handleCancel = () => {  this.setState({ open: false }) };
  handleClose = () => {
    let name = document.getElementById('new_name').value ;
    console.log(name)
    let address = document.getElementById('new_address').value ;
    console.log(address)
    this.props.actions.new_sign(address, name, this.state.status);
    console.log(this.props);
    this.setState({ open: false }) ;
  };
  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({status: event.target.value});
  };
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
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddSign
