import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameHistory from './pages/GameHistory';
import Navbar from './components/Navbar';
import GameCreation from './pages/GameCreation';
import LandingPage from './pages/LandingPage';
import GameInfo from './pages/GameInfo';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
        <Route exact path='/' component={LandingPage} />
          <Route exact path='/gamecreation' component={GameCreation} />
          <Route exact path='/saved/:id' component={GameInfo} />
          <Route exact path='/saved' component={GameHistory} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
