import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { auth } from "../../../firebase/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import PasswordInput from '../../../components/mui.components/PasswordInput.components';
import TextFieldInput from '../../../components/mui.components/TextFieldInput.component';
import { useSelector } from 'react-redux';
import BasicButton from '../../../components/mui.components/BasicButton.component';
import UnderlineLink from '../../../components/mui.components/UnderlineLink.component';
import { makeStyles } from '@mui/styles';
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
            <div className="signup-view">
                <p className="signup-title">Sign Up</p>
                <p className="signup-comment">{comment}</p>
                <div className="signup-box">
                    <div className="signup-box-inputs">
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
                    <BasicButton 
                    label="submit"
                    variant="contained"
                    signup={signup}
                    />
                </div>
                <div className="to-login">
                    <span className="to-login-text">
                        Already have an account?
                    </span>
                    <UnderlineLink 
                        label="Login"
                        underline="hover"
                        linkTo="/login"
                    />
                </div>
            </div>
            
        </div>
    )
}
