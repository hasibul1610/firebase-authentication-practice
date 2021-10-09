import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeFirebaseApp from '../../Firebase/firebase.init';
import { Button } from 'react-bootstrap';

initializeFirebaseApp();
const googleProvider = new GoogleAuthProvider();

const handleGoogleSign = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
        .then(result => {
            console.log(result.user);
        })

}


const Login = () => {
    return (
        <div>
            <Button
                className="btn btn-outline-primary text-white"
                onClick={handleGoogleSign}
            >Google with Google</Button>

        </div>
    );
};

export default Login;