import React from 'react';
import getCSSRule from '../utility/getCSSRule';

class HotkeyToggle extends React.Component {
  doThing(event){
    event.preventDefault();
    var non_mobile = getCSSRule('.non_mobile');
    var anti_mobile = getCSSRule('.anti_mobile');
    if (non_mobile.style.display === 'none'){
      non_mobile.style.display = 'inline' ;
      anti_mobile.style.display = 'none' ;
    }
    else {
      non_mobile.style.display = 'none' ;
      anti_mobile.style.display = 'inline' ;
    }
  }
  render() {
    return (
      <form>
        <span className="non_mobile1" >
          <button id="hotkey_toggle" onClick={event => this.doThing(event)} >
          <span className="non_mobile">Disable hotkey helpers (h)</span>
          <span className="anti_mobile">Enable hotkey helpers (h)</span>
          </button>
        </span>
      </form>
    )
  }
}

export default HotkeyToggle
