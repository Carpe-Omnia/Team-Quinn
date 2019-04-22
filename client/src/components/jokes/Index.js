import React from 'react';
import NavArrow from '../NavArrow';
import Joke from './Joke';

const Index = (props) =>  {
  return (
    <div>
    {!! localStorage.getItem('username') ?
    <span>
    <NavArrow direction="Left" actions={props.actions} z={props.z} text="submit a joke" />
    <NavArrow direction="Right" actions={props.actions} z={props.z} text="my jokes" />
    </span>
    :
    <p>Log in to write jokes or view your own </p>
    }
      <div className="main_page_content" >
        <h2> Read Jokes </h2>
        <h4> Tap/click on jokes to reveal the punchline <span className="non_mobile">(The spacebar also works)</span></h4>

        <div id="joke_zone">
            {props.jokes.map(function(joke){
              return (
                <Joke joke={joke} key={joke.id} />
              )
            })}
        </div>
      </div>
    </div>
  )
}



export default Index
