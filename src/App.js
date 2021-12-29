import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './pages/signup/components/Signup.component';
import Home from './pages/home/components/Home.component';
import ProtectedRoute from './components/ProtectedRoute.component';

function App() {
  return (
      <Router>
        <Route path="/" exact component={Signup} />
        <ProtectedRoute path="/home" component={Home} />
      </Router>
  );
}

export default App;
