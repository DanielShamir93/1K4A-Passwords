import './styles/App.css';
import Signup from './pages/signup/components/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
