import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/signup/components/Signup.component';
import Login from './pages/login/components/Login.component';
import Home from './pages/home/components/Home.component';
import ProtectedRoute from './components/ProtectedRoute.component';
import AuthRoute from './components/AuthRoute.component';

function App() {
  return (
    <Router>
      <AuthRoute path="/" redirectPath='/home' exact component={Signup} />
      <AuthRoute path="/login" redirectPath="/home" component={Login} />
      <ProtectedRoute path="/home" redirectPath="/" component={Home} />
    </Router>
  );
}

export default App;