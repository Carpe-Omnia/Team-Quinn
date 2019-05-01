import configureStore from '../store/configureStore'
import {home} from '../actions/orientationActions'

const store = configureStore();
store.dispatch(home());

export  {store} ;
