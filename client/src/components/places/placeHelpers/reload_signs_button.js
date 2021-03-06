import {reload} from '../../icons/icons' ;
function ReloadSigns(controlDiv, map){
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click show signs';
  controlUI.id = 'reload_signs_map_button'
  controlUI.style.display = 'none' ;
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '14px';
  controlText.style.lineHeight = '30px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = reload
  controlUI.appendChild(controlText);


  controlUI.addEventListener('click', function() {
    document.getElementById('reload_signs_button').click();
  });
}

export default ReloadSigns
