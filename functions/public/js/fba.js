  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDyqWMuRtuH6p9f0dfne6XkBlV3wszJKMo",
    authDomain: "scoultimate.firebaseapp.com",
    databaseURL: "https://scoultimate.firebaseio.com",
    projectId: "scoultimate",
    storageBucket: "scoultimate.appspot.com",
    messagingSenderId: "640701949151",
    appId: "1:640701949151:web:0850d0d0c979c83b81f56a",
    measurementId: "G-LNG7TWCH8H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Initialize Firebase UI For Authentication
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
        //   document.getElementById('loader').style.display = 'none';
        }
      },
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      user.getIdToken()
      .then((idToken) => {
          if(Cookies.get('session')) return;
        return fetch('/sessionLogin', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get('SXSRF-TOKEN')
            },
            body: JSON.stringify({ idToken })
        })
        .then(() => {
            return firebase.auth().signOut();
        })
        .then(() => {
            window.location.assign('/')
        })
      })
      // ...


    } else {
      // User is signed out.
      // ...
    }
  });

