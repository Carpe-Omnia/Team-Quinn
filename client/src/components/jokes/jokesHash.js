import Index from './Index'
import NewJoke from './NewJoke'
import MyJokes from './MyJokes'

var jokesHash;
//if (!!localStorage.getItem('username')){
  jokesHash = {
    "-1,0": NewJoke ,
    "0,0": Index ,
    "1,0": MyJokes
  }
//}
//else {
  //jokesHash = {
    //"-1,0": Index ,
    //"0,0": Index ,
    //"1,0": Index
  //}
//}

export default jokesHash
