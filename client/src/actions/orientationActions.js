import React from 'react'
import InfoWindow from '../components/places/InfoWindow' ;
import { render } from 'react-dom';
import {actualMap} from '../components/places/Places' ;
//import {signs_array} from '../components/places/Places' ;
import {facebookAuth, googleAuth, googleAuthFail} from './authActions.js';
import {place_signs, new_sign} from './signActions';

var get_count = 1 ;
var iconBase = "http://maps.google.com/mapfiles/kml/paddle/"
var iconArray = [
  "ltblue-circle.png", "red-circle.png",  "blu-circle.png",
  "grn-circle.png", "ylw-circle.png", "orange-circle.png",
  "purple-circle.png", "pink-circle.png", "wht-circle.png",
] ;

export function move(direction, z){
  return (
    {
      type: 'MOVE_ORIENTATION',
      payload: {
        direction: direction,
        z: z
      }
    }
  )
}

export function set_snackbar_message(message){
  return(dispatch) => {
    dispatch({
      type: 'SET_SNACKBAR_MESSAGE',
      payload: {snackbar_message: message }
    })
  }
}

export function home(){
  return (
    {
      type: 'DEFAULT_ORIENTATION',
      payload: {
        orientation: [[0,0],[0,0],[0,0]],
        z: 0
      }
    }
  )
}

export function set_data_package(id){
  return(dispatch) => {
    return fetch(`api/messages/index/${id}`)
    .then (res => res.json())
    .then (function(json){
      dispatch({
        type: 'SET_DATAPACKAGE',
        payload: {
          datapackage: json.data.datapackage
        }
      })
    })
  }
}

export function set_profile(username){
  return(dispatch) => {
    return fetch(`api/users/show/${username}`)
      .then(res => res.json())
      .then(function(json){
        dispatch({
          type: 'SET_PROFILE',
          payload: {
            profile: {
              name: json.data.name,
              bio: json.data.bio
            }
          }
        })
      })
  }
}

export function set_all_jokes(){
  return (dispatch) => {
    return fetch(`/api/jokes/index`)
        .then(res => res.json())
        .then(function(json){
          dispatch({
            type: 'SET_ALL_JOKES',
            payload: {
              all_jokes: json.data
            }
          })
        })
  }
}

export function set_my_jokes(id){
  return(dispatch) => {
    return fetch(`/api/jokes/myjokes/${id}`)
      .then(res => res.json())
      .then(function(json){
        dispatch({
          type: 'SET_MY_JOKES',
          payload: {
            my_jokes: json.data
          }
        })
      })
  }
}

export function add_joke(joke){
  return (
    {
      type: 'ADD_JOKE',
      payload: {
        joke: joke
      }
    }
  )
}

export function set_testing(){
  return (dispatch) => {
    return fetch('/api/jokes/testing')
      .then(response => response.json())
      .then(function(json){
        dispatch({
          type: 'SET_TESTING',
          payload: {
            testing: json.data
          }
        })
      })
  }
}

export function get_places(){
  return (dispatch) => {
    var start = 'https://api.foursquare.com/v2/venues/search?'
    var secret = 'B1WRD5T3HV10AFZMFFP4LVZ5UV4JY0OAWJMVS5W000AR1RO3'
    var id = 'OCCZ4YBNA05XSNJ2FCMDKAM5R0DLAUZJX2AMWGZWPDMUT0U2'
    var query = document.getElementById('places_query').value ;
    var near =  document.getElementById('places_near').value ;
    //var ver = '20160201'
    var ver = '20180323'
    var limit = 5
    fetch(`${start}client_id=${id}&client_secret=${secret}&v=${ver}&m=foursquare&limit=${limit}&near=${near}&query=${query}`)
    .then(res => res.json())
    .then(function(json){
      dispatch({
        type: 'SET_LOCATIONS',
        payload: {locations: json.response.venues}
      });
      console.log(json.response.venues)
      let icon = iconBase + iconArray[get_count % 8] ;
      get_count += 1;
      json.response.venues.forEach(function(location, index, array){
        var marker = new window.google.maps.Marker({
          position: {lat: location.location.lat , lng: location.location.lng },
          map: actualMap,
          title: location.name,
          icon: icon,
          animation: window.google.maps.Animation.DROP
        })
        if (index === 0){
          actualMap.setCenter(marker.getPosition());
        }
        marker.addListener('click', e => {
          var infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
          })
          infoWindow.addListener('domready', e => {
            render(<InfoWindow
              topText={location.name}
              tagline={location.location.formattedAddress[0]}
              foursquare_id={location.id}
            />,
            document.getElementById('infoWindow'))
          })
          infoWindow.open(actualMap) ;

        })
      })
    })
  }
}



export {facebookAuth, googleAuth, googleAuthFail} ;
export {place_signs, new_sign} ;
