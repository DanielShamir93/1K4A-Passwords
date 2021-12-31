import { useState } from "react";
import { useHistory, Link } from "react-router-dom"
import { auth } from "../../../firebase/firebase-config";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { signInWithEmailAndPassword } from "firebase/auth";
import PasswordInput from '../../../components/mui/PasswordInput.components';
import TextFieldInput from '../../../components/mui/TextFieldInput.component';
import { useSelector } from 'react-redux';
import BasicButton from '../../../components/mui/BasicButton.component';
import { useDispatch } from "react-redux";
import { isAuthAction } from "../../../store/actions/actions";
import '../login.styles.scss';

export default function Login() {
    const [comment, setComment] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const statesObject = useSelector((state) => {
        return {
            email: state.email,
            password: state.password,
            confirm: state.confirm,
        };
    });

    const login = async () => {
        try {
            isValidInput();
            await signInWithEmailAndPassword(auth, statesObject.email, statesObject.password);
            dispatch(isAuthAction(true));
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
        }
    }

    return (
        <div className="Login">
            <div className="login-view">
                <p className="login-title">Login</p>
                <p className="login-comment">{comment}</p>
                <div className="login-box">
                    <div className="login-box-inputs">
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 200}}>
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
                        </Box>
                    </div>
                    <BasicButton 
                        label="login"
                        variant="contained"
                        cb={login}
                    />
                </div>
            </div>
        </div>
    )
}
