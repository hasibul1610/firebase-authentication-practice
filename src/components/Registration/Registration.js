import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import initializeFirebaseApp from '../../Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";



initializeFirebaseApp();




const Registration = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const handleSignInEmail = (e) => {
        setEmail(e.target.value);

    }
    const handleSignInPassword = (e) => {
        setPassword(e.target.value);

    }
    const handleRegister = (e) => {
        e.preventDefault()
        if (!/^(?=.*[A-Za-z])/.test(password)) {
            setError("Please give at least Uppercase");
            return;
        }
        isLogin ? processLogin(email, password) : createNewUser(email, password);

    }
    const createNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setError("")
                verifyLogin()
            })
            .catch(error => {
                setError(error.message)
            })
    }
    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                console.log(result.user)
                setError("")
                // ...
            })
            .catch((error) => {
                setError(error.message);
            });

    }
    const verifyLogin = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result);
            })
    }
    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result);
            })
    }
    const toggleLogin = (e) => {
        setIsLogin(e.target.checked);
    }

    return (
        <div>
            <Form>
                <h3>Please {isLogin ? "Login" : "Register"}</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleSignInEmail} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handleSignInPassword} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={toggleLogin} type="checkbox" label="Already Registered" />
                </Form.Group>
                <Button onClick={handlePasswordReset} className="btn btn-primary"> Reset Password</Button>
                <p>{error}</p>
                <Button onClick={handleRegister} variant="primary" type="submit">
                    {isLogin ? "Login" : "Register"}
                </Button>
            </Form>

        </div>
    );
};

export default Registration;