import {signs_array} from '../Places' ;

function reload_signs(event){
  event.preventDefault() ;
  console.log("reloading signs");
  console.log(signs_array) ;
  for (var i = 0; i < signs_array.length; i++){
    console.log(signs_array);
    signs_array[i].setMap(null);
  }
  document.getElementById('place_signs_button').click() ;
}

export default reload_signs ;
