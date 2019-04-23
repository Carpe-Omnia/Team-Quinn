import React from 'react'
import new_sign from './placeHelpers/new_sign' ;

const Add_Sign = (props) => {
  return (
    <div>
      <form onSubmit={event => new_sign(event)}>
        Address <input type="text" id="new_address"/><br/>
        Name <input type="text" id="new_name" /><br/>
        status:
        <select id="new_status" >
          <option value="authorized">Authorized</option>
          <option value="delivered">Delivered</option>
          <option value="picked up">Picked up</option>
        </select>
        <br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Add_Sign
