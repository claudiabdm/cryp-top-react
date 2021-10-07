import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TheHeader from './components/TheHeader';

function App() {
  return (
    <Router>
      <TheHeader />
      <main>
        <Switch>
          <Route path="/currencies/:symbol"></Route>
          <Route path="/"></Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
