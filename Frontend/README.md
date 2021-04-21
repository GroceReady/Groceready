
# GroceReady 

## How to Run
Install Expo CLI on your computer and the Expo app on your phone: https://expo.io/tools

Run the following in your console:
```
expo install
```

After packages have been installed, run the project using:
```
expo start
```

A browser window will launch, use the Expo app to scan the QR code in the Expo app to load the project.

You *may* need to change the connection type in the browser to 'Tunnel'

## Connecting to the Backend

This project will be connected to the remote backend automatically upon running. However, if you would like to test with a local backend, go into axiosCalls.js and uncomment the 5th line where indicated. Please note that only access through the web desktop will be available with local backend testing. Mobile testing should be done with a remote backend.

## React Native Firebase

This project utilizes Firebase for user authentication - the login process is based off of boilerplate code, with modifications relevant for the GroceReady App.
The boilerplate code can be found here: https://github.com/instamobile/react-native-firebase


# Division of Labor
While each member focused/specialized on certain aspects on the project, each wore many hats and greatly contributed to various debugging, testing, and overall design of this app. This was a very successful collaborative effort.

## Isabella Ting
Designed all front-end mock-ups. Set up MySQL database and initial table structure on AWS. Implemented joining, many style revisions, and general household layout in the app. Contributed a lot to testing and debugging.

## Jacob Jackson
Setup all backend node.js code and designed and implemented list and item functionality. Greatly contributed to debugging, overall design choices, and further development/refinement on various other screens.

## Christopher Cataldo
Designed database schema and made functionality adjustments when necessary after the db had been deployed. Set up and integrated Firebase connection. Added swipe to delete and scroll functionality to household and list items. Contributed a lot to debugging.
