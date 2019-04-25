import React from 'react'
import { render } from 'react-dom';
import Map from './Map'
import InfoWindow from './InfoWindow'

var actualMap ;
var actualGeo ;
var signs_array = [] ;

class Places extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id="places">
        <div>
        <br/>
        <Map
          id="map"
          options={{
            center: {lat: 40.356821, lng: -74.657421 },
            zoom: 14,
            gestureHandling: 'cooperative'
          }}
          onMapLoad={map => {
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

export default Places ;
export {actualMap, actualGeo} ;
export {signs_array} ;
