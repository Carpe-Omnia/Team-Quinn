import React from 'react'
import add_shapes from './placeHelpers/place_shapes' ;
import place_signs from './placeHelpers/place_signs' ;

const AddShapes = (props) => {
  return(
    <div id="addShapes">
      <button onClick={event => add_shapes(event)}>
        Add Shapes
      </button>
      <button onClick={event => place_signs(event)}>
        Add Signs
      </button>
    </div>
  )
}

export default AddShapes
