import { render } from 'react-dom';
import {actualMap, actualGeo} from '../components/places/Places' ;
import {signs_array} from '../components/places/Places' ;
import InfoWindow from '../components/places/InfoWindow' ;
import React from 'react'

var lat ;
var lng ;
var name ;
var address_to_send ;
var results_location ;

export function place_signs(){
  return(dispatch) => {
    let url = '/api/signs' ;
    fetch(url)
    .then(res => res.json())
    .then(function(json){
      dispatch({
        type: 'SET_SNACKBAR_MESSAGE',
        payload: {snackbar_message: "signs loaded"}
      })
      json.data.signs.forEach(function(sign){
        let icon = "http://maps.google.com/mapfiles/kml/paddle/"
        if (sign.delivery === "authorized"){icon += "red-circle.png"}
        else if (sign.delivery === "delivered"){icon += "grn-circle.png"}
        else{icon += "blu-circle.png"}
        let latlng = { lat: parseFloat(sign.lat), lng: parseFloat(sign.lng) }
        let marker = new window.google.maps.Marker({
          map: actualMap,
          position: latlng,
          icon: icon,
          animation: window.google.maps.Animation.DROP
        })
        signs_array.push(marker) ;
        marker.addListener('click', e => {
          var infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
          })
          infoWindow.addListener('domready', e => {
            render(<InfoWindow
              name={sign.name}
              address={sign.address}
              status={sign.delivery}
              sign_id={sign.id}
              sign_lng={sign.lng}
              sign_lat={sign.lat}
            />,
            document.getElementById('infoWindow'))
          })
          infoWindow.open(actualMap)
        })
      })
      document.getElementById('snackbar_success_message').innerHTML = "signs loaded" ;
      document.getElementById('show_snackbar_success').click(); 
      document.getElementById('reload_signs_map_button').style.display = "block" ;
      document.getElementById('show_signs_map_button').style.display = "none" ;
    })
  }
}

export function new_sign(new_address, new_name, new_status){
  return(dispatch) => {
    if (!!new_name && !!new_address){
      actualGeo.geocode( { 'address': new_address}, function(results, status) {
        if (status === 'OK') {
          lat = results[0].geometry.location.lat() ;
          lng = results[0].geometry.location.lng() ;
          results_location = results[0].geometry.location ;
          name = new_name ;
          address_to_send = new_address;
          var url = `api/signs`
          let delivery = new_status
          let icon = "http://maps.google.com/mapfiles/kml/paddle/"
          if (delivery === 'authorized'){icon += "red-circle.png"}
          else if (delivery === 'delivered'){icon += "grn-circle.png"}
          else{icon += "blu-circle.png"}
          var data = {lat: lat, lng: lng, name: name, delivery: delivery, address: address_to_send}
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
          })
          .then(results => results.json())
          .then(function(json){
            if (json.status === "success"){
                actualMap.setCenter(results_location);
                var marker = new window.google.maps.Marker({
                    map: actualMap,
                    position: results_location,
                    icon: icon
                });
                signs_array.push(marker);
                marker.addListener('click', e => {
                  var infoWindow = new window.google.maps.InfoWindow({
                    content: '<div id="infoWindow" />',
                    position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
                  })
                  infoWindow.addListener('domready', e => {
                    render(<InfoWindow
                      name={name}
                      address={new_address}
                      status={delivery}
                      id={json.data.sign.id}
                      sign_lat={lat}
                      sign_lng={lng}
                    />,
                    document.getElementById('infoWindow'))
                  })
                  infoWindow.open(actualMap)
                })
                document.getElementById('snackbar_success_message').innerHTML = "Sign added succesfully" ;
                document.getElementById('show_snackbar_success').click() ;
              }
            else {
                document.getElementById('snackbar_error_message').innerHTML = "there was in issue persisting the address to the database" ;
                document.getElementById('show_snackbar_error').click();
              }
          })
        }
        else {
          document.getElementById('snackbar_error_message').innerHTML = 'Geocode was not successful for the following reason: ' + status ;
          document.getElementById('show_snackbar_error').click();
        }
      })
    }
    else {
      document.getElementById('snackbar_warning_message').innerHTML = "please fill out both address and name"
      document.getElementById('show_snackbar_warning').click();
    }
  }
}
