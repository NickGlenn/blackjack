import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDc5H9Tlo_GbWJw7O-MHnjpb0zDy53SWuQ",
  authDomain: "blackjackapp-34992.firebaseapp.com",
  databaseURL: "https://blackjackapp-34992.firebaseio.com",
  projectId: "blackjackapp-34992",
  storageBucket: "blackjackapp-34992.appspot.com",
  messagingSenderId: "683020977962"
};

firebase.initializeApp(config);
// const database = firebase.database();

// export default database;


// stub, add handle error library
const handleErr = (err) => {
    const message = err.message ? err.message : 'Unknown error occurred.';
    console.log('messagehandler: ', message);
};

/**
 * This function creates a user. Will automatically
 * sign in new user or return an error
 * @param {string} email this is the user's email.
 * @param {string} password this is the user's password.
 * @param {function} cb callback function; called on success.
 */
export function createUserAccount (email, password, cb) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(cb)
      .catch(handleErr);
}


/**
 * This function logs in a user.
 * @param {string} email this is the user's email.
 * @param {string} password  this is the user's password.
 * @param {function} cb callback function; called on success.
 * @return will log in the user or return an error.
 */
export function loginUser (email, password, cb) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(cb)
      .catch(handleErr);
}

/**
 * This function will check the current user.
 * @param {function} userCb this is function called when a user is successfully retrieved.
 * @param {function} noUserCb this is function called when a user is not retrieved.
 * @return will return userCb on success and noUserCb on fail.
 */
export function checkUser (userCb) {
    firebase.auth().onAuthStateChanged(userCb);
}

/**
 * This function logs out a user.
 * @param {function} cb callback function; called on success.
 * @return will log out the user.
 */
export function logoutUser (cb) {
    firebase.auth().signOut()
      .then(cb)
      .catch(handleErr);
}

export const Auth = {
    loginUser,
    checkUser,
    logoutUser,
    createUserAccount
};


/**
 * Reads a value from the FB database.
 * @param {string} path database url path.
 * @param {function} cb callback function; called on success.
 */
export function read (path, cb) {
    firebase.database().ref(path).once('value')
      .then((success) => {
        cb(success.val());
      })
      .catch(handleErr);
  }


/**
 * Creates or replaces data at the specified path in the database.
 * @param {string} path the relative object path in the database.
 * @param {object} dataObj the data object to be saved.
 * @param {function} cb callback function; called on success.
 */
export function create (path, dataObj, cb) {
    firebase.database().ref(path).set(dataObj)
      .then(cb)
      .catch(handleErr);
  }

export const Database = {
    create,
    read
}

export const Firebase = {
    Auth,
    Database
};