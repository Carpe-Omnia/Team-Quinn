import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent' ;
import CardMedia  from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography' ;
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {actualGeo} from './Places' ;
import {set_snackbar_message} from '../../actions/orientationActions' ;
import PlacesContainer from './PlacesContainer' ;

/*
const styles = {
  card: {maxWidth: 345,},
  media: {height: 0,paddingTop: '56.25%',},
};
*/

function edit_form(name, address, status, sign_id){
  return(
    `<form>
      <div><input type="text" value="${name}" id="sign_${sign_id}_name" placeholder="name" /></div>
      <div><input type="text" value="${address}" id="sign_${sign_id}_address" placeholder="address"/></div>
      <div><select id="sign_${sign_id}_status" >
        <option value="authorized">Authorized</option>
        <option value="delivered">Delivered</option>
        <option value="picked up">Picked up</option>
      </select>
      </div>
    </form`
  )
}

const InfoWindow = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: '#00d8ff',
      },
      type: 'dark',
    }
  });

  let send_lat = props.sign_lat ;
  let send_lng = props.sign_lng ;
  let send_address = props.address ;
  function update_sign(){
    let url = `api/signs/update` ;
    let status_select = document.getElementById(`sign_${props.sign_id}_status`) ;
    let index = status_select.options.selectedIndex ;
    var data = {
      id: props.sign_id,
      name: document.getElementById(`sign_${props.sign_id}_name`).value ,
      address: document.getElementById(`sign_${props.sign_id}_address`).value ,
      delivery: status_select.options[index].value ,
      lng: send_lng,
      lat: send_lat
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(function(json){
      console.log(json.data.sign);
      document.getElementById('snackbar_info_message').innerHTML = 'reload page to see changes' ;
      document.getElementById('show_snackbar_info').click();
    })
  }
  function make_update_form(){
    console.log("updating Sign") ;
    //document.getElementById(`edit_button_for_sign_${props.sign_id}`).innerHTML = edit_form(props.name, props.address, props.status, props.sign_id) ;
    document.getElementById(`card_content_for_sign_${props.sign_id}`).innerHTML = edit_form(props.name, props.address, props.status, props.sign_id) ;
    let status_index = 0
    if (props.status === "authorized"){status_index = 0}
    else if(props.status === "delivered"){status_index = 1}
    else{status_index = 2}
    document.getElementById(`sign_${props.sign_id}_status`).options.selectedIndex = status_index ;
    document.getElementById(`make_update_form_for_sign_${props.sign_id}`).style.display = "none"
    document.getElementById(`update_button_for_sign_${props.sign_id}`).style.display = "inline"
    document.getElementById(`update_button_for_sign_${props.sign_id}`).addEventListener('click', function(){
      console.log("sending sign changes");
      let send_address = document.getElementById(`sign_${props.sign_id}_address`).value ;
      if(send_address !== props.address) {
        console.log("send_address !== prop address")
        var address = `${send_address}, Princeton` ;
        actualGeo.geocode( { 'address': address}, function(results, status) {
          if (status === 'OK') {
            send_lat = results[0].geometry.location.lat() ;
            send_lng = results[0].geometry.location.lng() ;
            update_sign() ;
            document.getElementById('snackbar_info_message').innerHTML = 'You have changed the address of a sign. Please reload to see the new position' ;
            document.getElementById('show_snackbar_info').click();
          }
          else {
            document.getElementById('snackbar_error_message').innerHTML = 'New geocode was not successful for the following reason: ' + status
            document.getElementById('show_snackbar_error').click();
          }
        })
      }
      else{
        update_sign();
      }
    })
  }
  const { classes } = props;
    return (
      <div>
        <MuiThemeProvider theme={theme} >
          <Card className="card" id={`card_for_sign_${props.sign_id}`}>

            {/*<CardMedia
              className="card-media"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Bosphorus.jpg/397px-Bosphorus.jpg"
              title="Contemplative Reptile"
            />*/}
            <CardContent id={`card_content_for_sign_${props.sign_id}`}>
              <Typography gutterBottom variant="headline" component="h6" >
                <span id={`sign_${props.sign_id}_name_typography`}>{props.name}</span>
              </Typography>
              <Typography component="p" id={`sign_${props.sign_id}_address_typography`}>
                address: {props.address}
              </Typography>
              <Typography component="p" id={`sign_${props.sign_id}_status_typography`}>
                delivery status: {props.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" id={`edit_button_for_sign_${props.sign_id}`}>
                <span onClick={event => make_update_form(event)} id={`make_update_form_for_sign_${props.sign_id}`}> Edit </span>
                <span style={{display: "none"}} id={`update_button_for_sign_${props.sign_id}`}> Update </span>
              </Button>
              <Button size="small" color="secondary">
                Destroy (upcoming)
              </Button>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );

}



export default InfoWindow ;
//export default withStyles(styles)(InfoWindow);
