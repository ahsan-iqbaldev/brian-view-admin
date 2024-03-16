import firebase from "../../config/firebase";

const login = (navigate) => async (dispatch) => {
    try {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.auth().signInWithPopup(provider);

    const { user } = result;
    const { email, uid } = user;

    await firebase.firestore().collection('users').doc(uid).set({
        email: email,
        role: "guest",
      });

    dispatch({ type: 'LOGIN_SUCCESS', payload: { email, uid } });
    localStorage.setItem('auth', JSON.stringify({ email, uid }));
    navigate('/')

  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOGIN_ERROR', payload: error.message });
  }
};

export default login;
