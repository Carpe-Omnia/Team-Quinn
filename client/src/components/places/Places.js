import React from 'react'
import Map from './Map'
import ShowShapes from './placeHelpers/show_shapes_button' ;
import ShowSigns from './placeHelpers/show_signs_button' ;
import ReloadSigns from './placeHelpers/reload_signs_button' ;
import AddSign from './placeHelpers/new_sign_button' ;
var actualMap ;
var actualGeo ;
var signs_array = [] ;

class Places extends React.Component {
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
            var showShapesDiv = document.createElement('div');
            var showShapes = new ShowShapes(showShapesDiv, map);
            showShapesDiv.index = 1;
            var showSignsDiv = document.createElement('div');
            var showSigns = new ShowSigns(showSignsDiv, map);
            showSignsDiv.index = 1;
            var reloadSignsDiv = document.createElement('div');
            var reloadSigns = new ReloadSigns(showSignsDiv, map);
            reloadSignsDiv.index = 1;
            var addSignDiv = document.createElement('div');
            var addSign = new AddSign(addSignDiv, map);
            addSignDiv.index = 1;
            map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(showShapesDiv);
            map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(showSignsDiv);
            map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(reloadSignsDiv);
            map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(addSignDiv);
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
