import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch } from 'react-redux'
import { isAuthAction } from "../../store/actions/actions";

export default function LogoutButton() {

    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch(isAuthAction(false));
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <Link 
            to="/">
            <button onClick={logout}>Logout</button>
        </Link>
    )
}
