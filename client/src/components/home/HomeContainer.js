import React from 'react';
import homeHash from './HomeHash'

class HomeContainer extends React.Component {
  constructor(props){
    super(props);
    if(!!localStorage.getItem("id")){
      this.props.actions.set_data_package(localStorage.getItem("id"));
      this.props.actions.set_profile(localStorage.getItem("username"))
    }
  }
  render() {
    var orientation = this.props.orientation.orientation[0] ;
    var Parent =  homeHash[`${orientation}`]  ;
    return (
    <div>
      < Parent actions={this.props.actions}  z={this.props.z} orientation={this.props.orientation} />
    </div>
    )
  }
}

export default HomeContainer
