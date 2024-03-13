import { Admin, Resource, ListGuesser, ShowGuesser } from "react-admin";
import * as React from "react";

import firebase from "firebase/compat/app";

import { getStorage, connectStorageEmulator } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBJbXsrD99nN_IxMFfgSex8nuzq7XQRjgc",
  projectId: "hellograham",
  storageBucket: "hellograham.appspot.com",
  appId: "1:107943486538:web:03b5730c8282a7f3d9b2b3",
};

let firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}
export const storage = getStorage(firebaseApp);

const isDevelopment =
  process.env.NODE_ENV === "development" ||
  process.env.FUNCTIONS_EMULATOR === "true";

connectStorageEmulator(storage, "localhost", 9199);
import CreateTest from "./create";
export const App = () => (
  <Admin>
    <Resource
      name="firebase"
      list={ListGuesser}
      create={CreateTest}
      show={ShowGuesser}
    />
  </Admin>
);
