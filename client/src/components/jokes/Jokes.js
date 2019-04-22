import React from 'react';
import jokesHash from './jokesHash'


class Jokes extends React.Component {
  constructor(props){
    super(props);
    this.props.actions.set_all_jokes();
    if (!!localStorage.getItem("username")){
      this.props.actions.set_my_jokes(localStorage.getItem("id"));
    }
  }

  render() {
    var orientation = this.props.orientation.orientation[1] ;
    var Parent = jokesHash[`${orientation}`] ;
    return (
    <div>
      < Parent
      actions={this.props.actions}
      z={this.props.z}
      jokes={this.props.orientation.all_jokes}
      my_jokes={this.props.orientation.my_jokes}
      />
    </div>
    )
  }
}

export default Jokes
