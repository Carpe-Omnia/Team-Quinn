import React from 'react'


const GetPlaces = (props) => {
  function near_me(event){
    event.preventDefault();
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords.latitude) ;
        console.log(position.coords.longitude) ;
        var coords = `${position.coords.latitude}, ${position.coords.longitude}` ;
        document.getElementById('places_near').value = coords ;
      })
    }
  }
  return(
    <div>
      This is Places:
      <form>
        Looking for:<input type="text" id="places_query" /><br/>
        Near: <input type="text" id="places_near" />
        <button onClick={event => near_me(event)}>
          Near me
        </button>
        <br/>
      </form>
      <button onClick={props.actions.get_places} >
        Get Places
      </button>

    </div>
  )
}

export default GetPlaces
