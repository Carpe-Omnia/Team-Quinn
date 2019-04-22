import React from 'react';

const Hotkey = (props) => {
  if (!!props.click){
    return (
      <span id={`hotkey_click_${props.text}`}className="non_mobile"> ({props.text})</span>
    )
  }
  else{
    return (
      <span id={`hotkey_${props.text}`}className="non_mobile"> ({props.text})</span>
    )
  }
}

export default Hotkey
//
