import React from 'react'
import Places from './Places'
import AddShapes from './AddShapes'
import Add_Sign from './add_sign'

class PlacesContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <Places actions={this.props.actions} orientation={this.props.orientation} z="3" locations={this.props.locations} />
        <AddShapes actions={this.props.actions} />
        <Add_Sign actions={this.props.actions} />
      </div>
    )
  }
}

export default PlacesContainer ;
