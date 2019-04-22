import React from 'react';
import NavArrow from '../NavArrow';
import Joke from './Joke';

const MyJokes = (props) => {
  return (
    <div>
      <NavArrow direction="Left" actions={props.actions} z={props.z} text="Read Jokes" />
      <div className="main_page_content">
        <h1>
          my jokes
        </h1>
        {props.my_jokes.map (function(joke){
          return (
            <Joke joke={joke} key={joke.id} />
          )
        })}
      </div>
    </div>
  )
}

export default MyJokes
