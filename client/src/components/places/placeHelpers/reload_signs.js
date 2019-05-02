import {signs_array} from '../Places' ;

function reload_signs(event){
  event.preventDefault() ;
  let temp = signs_array ;
  document.getElementById('snackbar_info_message').innerHTML = 'reloading signs' ;
  document.getElementById('show_snackbar_info').click() ;
  for (var i = 0; i < signs_array.length; i++){
    if (!!signs_array[i]){signs_array[i].setMap(null)}
    signs_array[i] = null
  }
  temp.length = 0 ;
  document.getElementById('place_signs_button').click() ; //don't remove this
}

export default reload_signs ;
