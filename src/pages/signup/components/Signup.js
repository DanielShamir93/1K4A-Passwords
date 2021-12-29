import { useState, useRef } from "react";
import { Link } from "react-router-dom"

import { auth } from "../../../firebase/firebase-config";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import PasswordInput from '../../../mui.components/PasswordInput.components';
import TextFieldInput from '../../../mui.components/TextFieldInput.component';


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const signup = async (e) => {
        if (password === confirm) {
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
            } catch(err) {
                console.log(err.message);
            }
        } else {
            console.log("confirm is incorrect");
        }
    }

    const signout = async () => {
        try {
            const status = await signOut(auth);
            console.log(status);
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div>
                <h1>Sign Up</h1>
                <h2>User Logged In: {user?.email}</h2>
                <div className="user-inputs">
                    <div className="email">
                        <TextFieldInput
                            label="Email"
                        />
                    </div>
                    <div className="password">
                        <PasswordInput
                            label="Password"
                        />
                    </div>
                    <div className="confirm">
                        <PasswordInput
                            label="Confirm"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={(e) => {signup(e)}}>Sign Up</button>
                        <button onClick={(e) => {signout(e)}}>Sign Out</button>
                    </div>
                    <div>
                        <p>
                            Already have an account? <Link to="/">Log In</Link> 
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
