import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {

    const statesObject = useSelector((state) => { 
        return { 
            isAuth: state.isAuth 
        }
    });

    return (
        < Route 
            {...rest}
            render={(props) => statesObject.isAuth ? <Component /> : <Redirect to={ { pathname: '/', state: {from: props.location}} } />
        }/>
    )
}
