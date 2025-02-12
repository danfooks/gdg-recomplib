import React, {FC, ReactElement} from 'react';
import { SelfOverview as SelfOverviewPage } from "../../pages";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  signOut
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtJnJmtM8BEe3Jzgy9pT_gPIrCDpNe_Rw",
  authDomain: "gdg-proto-f7542.firebaseapp.com",
  databaseURL: "https://gdg-proto-f7542-default-rtdb.firebaseio.com",
  projectId: "gdg-proto-f7542",
  storageBucket: "gdg-proto-f7542.appspot.com",
  messagingSenderId: "822423637214",
  appId: "1:822423637214:web:5fa27bdc21b3f2e251c64f",
  measurementId: "G-90P3M7PT46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const LOGIN_CLASSNAMES : string[] = [ ];
export const LOGIN_STYLE : React.CSSProperties = {
};

export type SelfOverviewProps = {
     children ? : React.ReactNode;
    style ? : React.CSSProperties;
    overrideStyle ? : boolean;
    classNames ? : string[];
    overrideClasses ? : boolean;
    responsive ? : boolean;
};

export const SelfOverview : FC<SelfOverviewProps>  = (props) =>{

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if(!loading && !user) navigate("/");

  const handleLogout = async ()=>{
    await signOut(auth);
  }

  const handlePasswordSubmit = async (args : {
    password : string,
    confirmedPassword : string
  })=>{

    if(!user) throw new Error("You are not logged in.");

    if(args.password !== args.confirmedPassword) throw new Error("Passwords do not match.");
    
    await updatePassword(user, args.password);

  }

  return (
      <SelfOverviewPage 
        onLogOut={handleLogout}
        username={user?.email||""}
        onChangePasswordSubmit={handlePasswordSubmit}/>
  )
};