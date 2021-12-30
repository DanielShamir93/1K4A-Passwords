import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        < Route
            {...rest}
            render={(props) => {
                const authDataObject = JSON.parse(localStorage.getItem('authData'));
                if (authDataObject) {
                    return Object.keys(JSON.parse(localStorage.getItem('authData'))).length > 0 ? <Component /> : <Redirect to={ { pathname: '/', state: {from: props.location}} } />
                } else {
                    return <Redirect to={ { pathname: '/', state: {from: props.location}} } />;
                }
            }
        }/>
    )
}
