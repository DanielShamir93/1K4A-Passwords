import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { auth } from "../../firebase/firebase-config";
import Box from '@mui/material/Box';
import { createUserWithEmailAndPassword } from "firebase/auth";
import PasswordInput from '../../components/mui/PasswordInput.components';
import TextFieldInput from '../../components/mui/TextFieldInput.component';
import { useSelector } from 'react-redux';
import BasicButton from '../../components/mui/BasicButton.component';
import UnderlineLink from '../../components/mui/UnderlineLink.component';
import './signup.styles.scss';
import { useDispatch } from "react-redux";
import { isAuthAction } from "../../store/actions/actions";
import Spinner from "../../components/spinner/Spinner.component";

export default function Signup() {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const statesObject = useSelector((state) => {
        return {
            email: state.email,
            password: state.password,
            confirm: state.confirm
        };
    });

    useEffect(() => {
        localStorage.removeItem("persist:root");
    }, [])

    const signup = async () => {
        try {
            setIsLoading(true);
            isValidInput();
            await createUserWithEmailAndPassword(auth, statesObject.email, statesObject.password);
            dispatch(isAuthAction(true));
            history.push('/home');
        } catch (err) {
            setComment(err.message);
        }
        setIsLoading(false);
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
                <div className="signup-box">
                    <div className="signup-box-inputs">
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 300, alignItems: 'center'}}>
                            <p className="signup-comment">{comment}</p>
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
                        </Box>
                    </div>
                    <div className="submit-button">
                        <BasicButton 
                        label="submit"
                        variant="contained"
                        cb={signup}
                        />
                    </div>
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
            {isLoading && <Spinner />}
        </div>
    )
}
