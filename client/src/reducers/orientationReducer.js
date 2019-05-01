function orientationReducer(state={
  orientation: [[0,0],[0,0],[0,0],[0,0]],
  datapackage: [],
  profile: {
    name: "",
    bio: {headline: "", content: ""}
  },
  testing: "",
  locations: [],
  user: {},
  snackbar_message:""
}, action){
  switch(action.type) {
    case 'DEFAULT_ORIENTATION':
      return state
    case 'SET_DATAPACKAGE':
      return Object.assign({}, state, {datapackage: action.payload.datapackage})
    case 'SET_PROFILE':
      return Object.assign({}, state, {profile: action.payload.profile})
    case 'SET_TESTING':
      return Object.assign({}, state, {testing: action.payload.testing})
    case 'SET_LOCATIONS':
      return Object.assign({}, state, {locations: action.payload.locations})
    case 'SET_USER':
      return Object.assign({}, state, {user: action.payload.user})
    case 'SET_SNACKBAR_MESSAGE':
      return Object.assign({}, state, {snackbar_message: action.payload.snackbar_message})
    default:
      return state
  }
}

export default orientationReducer
