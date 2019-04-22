import {actualMap, actualGeo} from '../Places' ;
var lat ;
var lng ;
var name ;
var address_to_send ;
function new_sign(event) {

  event.preventDefault() ;
  var address1 = document.getElementById('new_address').value
  var address = `${address1}, Princeton`
  actualGeo.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      actualMap.setCenter(results[0].geometry.location);
      var marker = new window.google.maps.Marker({
          map: actualMap,
          position: results[0].geometry.location
      });
      lat = results[0].geometry.location.lat() ;
      lng = results[0].geometry.location.lng() ;
      name = document.getElementById('new_name').value
      address_to_send = address1 ;

      send_sign();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function send_sign() {
  var url = `api/signs`
  let status_select = document.getElementById('new_status')
  let delivery = status_select.options[status_select.options.selectedIndex].value //this totally isn't working. Fix it
  console.log(`delivery status is: ${delivery}`);


  var data = {lat: lat, lng: lng, name: name, delivery: delivery, address: address_to_send}
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(results => results.json())
  .then(function(json){
    console.log(json)
  })
}
export default new_sign ;
