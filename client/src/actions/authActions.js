import React from 'react'


export const facebookAuth = (response) => {
  console.log(response) ;
  var email = response.email ;
  var name = response.name.replace(" ", "_")
  var link = `/api/users/auth/facebook/${name}/${email}` ;
  return (dispatch) => {
    fetch(link, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(function(json){
      console.log(json);
      if (json.message === "logged in"){
        localStorage.setItem("username", json.data.name);
        localStorage.setItem("email", json.data.email);
        localStorage.setItem("id", json.data.id);
        dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              email: json.data.email,
              name: json.data.name,
              id: json.data.id
            }
          }
        })
      }
      else {
        alert("something went terribly wrong. Try again, or don't. See what I care")
      }
    })
  }
}

export const googleAuth = (response) => {
  var email = response.w3.U3 ;
  var name = response.w3.ig.replace(" ", "_") ;
  var link = `/api/users/auth/facebook/${name}/${email}` ;
  return (dispatch) => {
    fetch(link, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(function(json){
      console.log(json);
      if (json.message === "logged in"){
        localStorage.setItem("username", json.data.name);
        localStorage.setItem("email", json.data.email);
        localStorage.setItem("id", json.data.id);
        dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              email: json.data.email,
              name: json.data.name,
              id: json.data.id
            }
          }
        })
        document.getElementById('navlink1').click()
      }
      else {
        alert("something went terribly wrong. Try again, or don't. See what I care")
      }
    })
  }
}

export const googleAuthFail = (response) => {
  console.log(response) ;
}
