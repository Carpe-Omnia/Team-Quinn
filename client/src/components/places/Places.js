import React from 'react'
import { render } from 'react-dom';
import Map from './Map'
import InfoWindow from './InfoWindow'

var actualMap ;
var actualGeo ;
class Places extends React.Component {
  constructor(props){
    super(props);
  }
  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: {lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow foursquare_id="zz2" topText="Central Park Zoo" tagline="Testing Node" />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map) ;
  }
  render(){
    return (
      <div id="places">
        <h3>
          This is places
        </h3>
        <div>
        <Map
          id="map"
          options={{
            center: {lat: 40.356821, lng: -74.657421 },
            zoom: 14,
          /*gestureHandling: 'cooperative'*/
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: {lat: 40.356821, lng: -74.657421 },
              map: map,
              title: 'Testing Node'
            })
            marker.addListener('click', e => {
              this.createInfoWindow(e, map)
            })
            actualMap = map ;
            actualGeo = new window.google.maps.Geocoder() ;
            window.google.maps.event.addListener(map, "click", function(event){
              var latitude = event.latLng.lat();
              var longitude = event.latLng.lng();
              console.log(`{ lat: ${latitude}, lng: ${longitude} },`);
            })
          }}
        />
        </div>
      </div>
    )
  }
}

export default Places
export {actualMap, actualGeo}
