import React from 'react';
import NavArrow from '../NavArrow'
import Hotkey from '../Hotkey'
const Home = (props) => {
  return (
    <div id="parent-top-center" className="parentElement">
    {!!localStorage.getItem('username') ?
      <div>
        <NavArrow direction="Left" actions={props.actions} z={props.z} text="Messages"/>
        <NavArrow direction="Right" actions={props.actions} z={props.z} text="Profile"/>
      </div>
      :
      <p> log in to see messages and profile </p>
    }
      <div className="main_page_content">
        <h1>Home</h1> {/* This is where I put whatever I want to be on the front page that day */}
        <h4>Today's featured content <span className="non_mobile"> (f)</span></h4>
        <iframe title="featured" width="600" height="450" src="https://www.youtube.com/embed/oYmqJl4MoNI"
        frameBorder="0" allow="accelerometer; encrypted-media; gyroscope;  picture-in-picture"
        allowFullScreen id="featured_content_today"><Hotkey click={true} text="f"/></iframe>
      </div>
    </div>
  )
}

export default Home
