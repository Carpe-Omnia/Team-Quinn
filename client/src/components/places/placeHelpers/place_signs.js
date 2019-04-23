import {actualMap, actualGeo} from '../Places' ;
import React from 'react'
import { render } from 'react-dom';
import InfoWindow from '../InfoWindow' ;

function place_signs(event) {
  event.preventDefault() ;
  let url = '/api/signs' ;
  fetch(url)
  .then(res => res.json())
  .then(function(json){
    console.log(json);
    json.data.signs.forEach(function(sign){
      console.log(sign) ;
      let latlng = { lat: parseFloat(sign.lat), lng: parseFloat(sign.lng) }
      let marker = new window.google.maps.Marker({
        map: actualMap,
        position: latlng,
        animation: window.google.maps.Animation.DROP
      })
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
          />,
          document.getElementById('infoWindow'))
        })
        infoWindow.open(actualMap)
      })
    })
  })
}

export default place_signs ;
