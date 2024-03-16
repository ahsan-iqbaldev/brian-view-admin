const initialState = {
    email: null,
    uid: null,
  };
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          email: action.payload.email,
          uid: action.payload.uid
        };
        
      default:
        return state;
    }
  };
  export default authReducer;
  