import {actualMap, actualGeo} from '../Places' ;


function place_signs(event) {
  event.preventDefault() ;
  var address = '201 Moore street, Princeton'
  actualGeo.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      actualMap.setCenter(results[0].geometry.location);
      var marker = new window.google.maps.Marker({
          map: actualMap,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

export default place_signs ;
