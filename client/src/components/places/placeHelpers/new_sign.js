import {actualMap, actualGeo} from '../Places' ;
import React from 'react'
import { render } from 'react-dom';
import InfoWindow from '../InfoWindow' ;

var lat ;
var lng ;
var name ;
var address_to_send ;
var results_location ;
function new_sign(event) {

  event.preventDefault() ;
  var address1 = document.getElementById('new_address').value
  var address = `${address1}, Princeton`
  actualGeo.geocode( { 'address': address}, function(results, status) {
    if (status === 'OK') {
      lat = results[0].geometry.location.lat() ;
      lng = results[0].geometry.location.lng() ;
      results_location = results[0].geometry.location ;
      console.log(results_location) ;
      name = document.getElementById('new_name').value ;
      address_to_send = address1 ;
      send_sign();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function send_sign() {
  if (!!name && address_to_send){
    var url = `api/signs`
    let status_select = document.getElementById('new_status') ;
    let index = status_select.options.selectedIndex ;
    let delivery = status_select.options[index].value ;
    console.log(`delivery status is: ${delivery}`);

    var data = {lat: lat, lng: lng, name: name, delivery: delivery, address: address_to_send}

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(results => results.json())
    .then(function(json){
      console.log(json) ;
      if (json.status === "success"){
        actualMap.setCenter(results_location);
        var marker = new window.google.maps.Marker({
            map: actualMap,
            position: results_location
        });
        marker.addListener('click', e => {
          var infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
          })
          infoWindow.addListener('domready', e => {
            render(<InfoWindow
              name={name}
              address={document.getElementById('new_address').value}
              status={delivery}
            />,
            document.getElementById('infoWindow'))
          })
          infoWindow.open(actualMap)
        })
      }
      else {
        alert("there was in issue persisting the address to the database")
      }
    })
  }
  else {
    alert("please fill out both address and name")
  }

}
export default new_sign ;
