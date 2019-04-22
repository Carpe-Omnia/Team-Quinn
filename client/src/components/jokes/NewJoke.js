import React from 'react';
import NavArrow from '../NavArrow';
import Hotkey from '../Hotkey'

class NewJoke extends React.Component {
  doThing(event){
    event.preventDefault();
    var setup = document.getElementById('setup_input').value ;
    var punchline = document.getElementById('punchline_input').value ;
    var id = localStorage.getItem("id") ;
    //var postData = {setup: setup, punchline: punchline, username: username, id: id } ;
    var link = `/api/jokes/create/${setup}/${punchline}/${id}` ;
    console.log(link)
    if (!!setup && !!punchline){
      console.log('working');
      fetch(link, {
        method: 'post'
      })
      .then(res => res.json())
      .then(function(json){
        console.log(json);
        if(json.message === "joke created"){
          alert("nice job making that joke")
          this.props.actions.add_joke(json.data["joke"]);
        }
        else{
          alert("something went terribly wrong")
        }
      })
    }
    else {
      alert('make sure to include a punchline and a setup')
    }
  }
  render(){
    return (
      <div>
        <NavArrow direction="Right" actions={this.props.actions} z={this.props.z} text="Read Jokes" />
        <div className="main_page_content">
          <h3>
            Make a new joke
          </h3>
          <form onSubmit={event => this.doThing(event)} >
            setup<Hotkey text="s" /><input type="text" id="setup_input" /><br></br>
            punchline<Hotkey text="p" /><input type="text" id="punchline_input" /><br></br>
            <button type="submit" value="submit" id="submit_joke" >
              Submit <Hotkey text="j" click={true}/>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewJoke
