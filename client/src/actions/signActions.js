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
      console.log(json);
      dispatch({
        type: 'SET_SNACKBAR_MESSAGE',
        payload: {snackbar_message: "signs loaded"}
      })
      document.getElementById('snackbar_info_message').innerHTML = "signs loaded" ;
      document.getElementById('show_snackbar_info').click();
      json.data.signs.forEach(function(sign){
        let icon = "http://maps.google.com/mapfiles/kml/paddle/"
        if (sign.delivery === "authorized"){icon += "red-circle.png"}
        else if (sign.delivery === "delivered"){icon += "grn-circle.png"}
        else{icon += "blu-circle.png"}
        console.log(sign) ;
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
      document.getElementById('reload_signs_button').style.display = "inline" ;
    })
  }
}

export function new_sign(){
  return(dispatch) => {
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
        if (!!name && address_to_send){
          var url = `api/signs`
          let status_select = document.getElementById('new_status') ;
          let index = status_select.options.selectedIndex ;
          let delivery = status_select.options[index].value ;
          let icon = "http://maps.google.com/mapfiles/kml/paddle/"
          if (index === 0){icon += "red-circle.png"}
          else if (index === 1){icon += "grn-circle.png"}
          else{icon += "blu-circle.png"}
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
                    address={document.getElementById('new_address').value}
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
              dispatch({
                type: 'SET_SNACKBAR_MESSAGE',
                payload: {snackbar_message: "there was in issue persisting the address to the database" + status}
              })
            }
          })
        }
        else {
          document.getElementById('snackbar_warning_message').innerHTML = "please fill out both address and name"
          document.getElementById('show_snackbar_warning').click();
          dispatch({
            type: 'SET_SNACKBAR_MESSAGE',
            payload: {snackbar_message: "please fill out both address and name"}
          })
        }

      } else {
        document.getElementById('snackbar_error_message').innerHTML = 'Geocode was not successful for the following reason: ' + status ;
        document.getElementById('show_snackbar_error').click();
        dispatch({
          type: 'SET_SNACKBAR_MESSAGE',
          payload: {snackbar_message: 'Geocode was not successful for the following reason: ' + status}
        })
      }
    });
    //document.getElementById('activate_snackbar').click();
  }
}
