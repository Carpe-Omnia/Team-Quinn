import configureStore from '../store/configureStore'
import {home} from '../actions/orientationActions'
import {clickHash, hotkeyHash} from './keybinding.js'
//import {navHash} from './keybinding.js'

const store = configureStore();
store.dispatch(home());

function setup() {
  document.addEventListener('keydown', function(e){
    var act = document.activeElement;
    if (act.tagName !== "INPUT" && act.tagName !== "TEXTAREA"){
      handleKey(e, act);
      console.log()
    }
    else if (e.key === ";"){
      act.blur();
    }
  })
}
function hotkeyHandler(e, act){
  var target;
  target = document.getElementById(`hotkey_click_${e.key}`)
  if (!!target){target.click()}
  else {
    target = document.querySelector(clickHash[e.key])
    if (!!target){
      target.click() ;
    }
    target = document.querySelector(hotkeyHash[e.key])
    if (!!target){
      target.focus() ;
      e.preventDefault() ;
    }
  }
}

function handleKey(e, act){

  if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    moveAround(e);
  }
  /*
  else if (!!parseInt(e.key, 10)) {
    navigate(e)
  }
  */
  else {
    hotkeyHandler(e, act)
  }
}

function moveAround(e) {
  var direction = e.key.replace("Arrow","");
  var target = document.getElementById(`arrow ${direction}`)
  if (!!target){target.click()}
}
/*
function navigate(e) {
  //var target = document.getElementById(navHash[e.key])
  var target = document.getElementById(`hotkey_click_${e.key}`)
  if (!!target){target.click()}
}
*/
export  {store, setup, hotkeyHandler, handleKey, moveAround} ;
// export {navigate}
