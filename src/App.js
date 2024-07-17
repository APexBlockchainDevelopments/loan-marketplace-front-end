import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Lender from './components/Lender';
import Borrower from './components/Borrower';
import Admin from './components/Admin'; // Import the Admin component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/lender">Lender</Link></li>
            <li><Link to="/borrower">Borrower</Link></li>
            <li><Link to="/admin">Admin</Link></li> {/* Add link to Admin */}
          </ul>
        </nav>
        <Switch>
          <Route path="/lender">
            <Lender />
          </Route>
          <Route path="/borrower">
            <Borrower />
          </Route>
          <Route path="/admin">
            <Admin /> {/* Add route for Admin */}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
