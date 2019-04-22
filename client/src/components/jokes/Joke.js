import React from 'react';

const Joke = (props) => {
  return (
    <div key={props.joke.id}>
      <div className="setup clickme" id={`setup${props.joke.id}`} onClick={function(){
        var placeId = `placeholder${props.joke.id}` ;
        var punchId = `punchline${props.joke.id}`  ;
        document.getElementById(`${placeId}`).style.display = "none" ;
        document.getElementById(`${punchId}`).style.display = "block" ;
        document.getElementById(`setup${props.joke.id}`).className = "setup"
        document.getElementById(`placeholder${props.joke.id}`).className = "placeholder"
      }} >
        {props.joke.setup}
      </div>
      <div className="placeholder clickme" id={`placeholder${props.joke.id}`} onClick={function(){
        document.getElementById(`setup${props.joke.id}`).click() ;
      }}>
        -------------
      </div>
      <div className="punchline" id={`punchline${props.joke.id}`}>
        {props.joke.punchline} <br/>
        - {props.joke.user_name}
      </div>

      <br/>
    </div>
  )
}

export default Joke
