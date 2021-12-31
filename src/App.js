import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/signup/Signup.component';
import Login from './pages/login/components/Login.component';
import Home from './pages/home/Home.component';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.component';
import AuthRoute from './components/authRoute/AuthRoute.component';
import Navbar from './components/navbar/Navbar.component';

function App() {
  return (
    <Router>
      <Navbar />
      <AuthRoute path="/" redirectPath='/home' exact component={Signup} />
      <AuthRoute path="/login" redirectPath="/home" component={Login} />
      <div></div>
      <ProtectedRoute path="/home" redirectPath="/" component={Home} />
    </Router>
  );
}

export default App;