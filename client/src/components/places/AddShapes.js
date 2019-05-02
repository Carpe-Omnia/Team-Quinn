import React from 'react'
import toggle_shapes from './placeHelpers/place_shapes' ;
import reload_signs from './placeHelpers/reload_signs' ;
//import {actualMap, signs_array} from './Places' ;

const AddShapes = (props) => {
  return(
    <div id="addShapes">
      <button onClick={event => toggle_shapes(event)} id="place_shapes_button" style={{display: 'none'}}>
        Add Shapes
      </button>
      <button onClick={props.actions.place_signs} id="place_signs_button" style={{display: 'none'}}>
        Add Signs
      </button>
      <button onClick={event => reload_signs(event)} style={{display: "none"}} id="reload_signs_button">
        Reload Signs
      </button>
    </div>
  )
}

export default AddShapes
