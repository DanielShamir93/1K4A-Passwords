import { useState } from "react";
import { Link } from "react-router-dom"
import { auth } from "../../../firebase/firebase-config";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const signup = async (e) => {
        e.preventDefault();

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
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}    
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} 
                        />
                    </div>
                    <div className="confirm">
                        <label htmlFor="confirm">Confirm: </label>
                        <input 
                            type="password" 
                            id="confirm"
                            value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value);
                            }} 
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
