import { useState } from "react";
import { useHistory } from "react-router-dom"
import { auth } from "../../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import PasswordInput from '../../../components/mui.components/PasswordInput.components';
import TextFieldInput from '../../../components/mui.components/TextFieldInput.component';
import { useSelector } from 'react-redux';
import BasicButton from '../../../components/mui.components/BasicButton.component';
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
