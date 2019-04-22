import React, {Component} from 'react'

class Map extends Component {
  constructor(props){
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }
  onScriptLoad(){
    //console.log("on script load is running now") ;
    const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options)
    this.props.onMapLoad(map) ;
  }
  componentDidMount() {
    if(!window.google){
      const s = document.createElement("script");
      s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzvrsKvl_NoIttnyQINaC2EUoPkdXifcE";
      s.async = true;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      document.body.appendChild(s);
      s.addEventListener('load', e => {
       this.onScriptLoad();
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div>
        <div style={{ width: 500, height: 500 }} id={"map"} />
      </div>
    );
  }




}

export default Map
