import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { auth } from "../../../firebase/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import PasswordInput from '../../../components/mui.components/PasswordInput.components';
import TextFieldInput from '../../../components/mui.components/TextFieldInput.component';
import { useSelector } from 'react-redux';
import '../signup.styles.scss';

export default function Signup() {
    const [comment, setComment] = useState('');
    const history = useHistory();
    const statesObject = useSelector((state) => {
        return {
            email: state.email,
            password: state.password,
            confirm: state.confirm,
        };
    });

    // const [user, setUser] = useState({});
    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    const signup = async () => {
        try {
            isValidInput();
            const user = await createUserWithEmailAndPassword(auth, statesObject.email, statesObject.password);
            localStorage.setItem('authData', JSON.stringify(user));
            history.push('/home');
        } catch (err) {
            setComment(err.message);
        }
    } 

    const isValidInput = () => {
        if (statesObject.email === "") {
            throw new Error("Missing email");
        } else if (statesObject.password.length < 6 ) {
            throw new Error("Password must be at least 6 characters");
        } else if (statesObject.password !== statesObject.confirm) {
            throw new Error("Confirm input must match the password");
        }
    }

    return (
        <div className="Signup">
            <h1>Sign Up</h1>
            <h3>{comment}</h3>
            <div className="user-inputs">
                <div className="email">
                    <TextFieldInput
                        label="email"
                    />
                </div>
                <div className="password">
                    <PasswordInput
                        label="password"
                    />
                </div>
                <div className="confirm">
                    <PasswordInput
                        label="confirm"
                    />
                </div>
            </div>
            <div>
                <div>
                    <button onClick={signup}>Sign Up</button>
                </div>
                <div>
                    <p>
                        Already have an account? <Link to="/">Log In</Link> 
                    </p>
                </div>
            </div>
        </div>
    )
}
