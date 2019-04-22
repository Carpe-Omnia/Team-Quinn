import React from 'react';
import Hotkey from './Hotkey'

class Logout extends React.Component {
  doThing(event){
    event.preventDefault() ;
    localStorage.setItem("username", "");
    localStorage.setItem("id", "");
    document.getElementById('navlink1').click() ;
  }
  render(){
    return (
      <form onSubmit={event => this.doThing(event)} >
        <button id="log_in_button" type="submit" >Logout<Hotkey text="d" /></button>
      </form>
    )
  }
}

export default Logout
