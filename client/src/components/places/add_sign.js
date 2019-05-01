import React from 'react'

const Add_Sign = (props) => {
  return (
    <div>
      <form onSubmit={function(event){
        event.preventDefault();
        props.actions.new_sign();
      }}>
        Address <input type="text" id="new_address" placeholder="full street address" /><br/>
        Name <input type="text" id="new_name" placeholder="name of owner"/><br/>
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
