import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './pages/signup/components/Signup.component';
import Login from './pages/login/components/Login.component';
import Home from './pages/home/components/Home.component';
import ProtectedRoute from './components/ProtectedRoute.component';

function App() {
  return (
    <Router>
        <Route path="/" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/home" exact component={Home} />
      </Router>
  );
}

export default App;