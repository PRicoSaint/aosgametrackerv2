import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameHistory from "./pages/GameHistory";
import Navbar from "./components/Navbar";
import GameCreation from "./pages/GameCreation";
import LandingPage from "./pages/LandingPage";
import GameInfo from "./pages/GameInfo";
import Footer from "./components/Footer";
import IDK from "./images/AoSIDK.jpg";


function App() {
  return (
    <Router>
      <div style={{
        backgroundImage: `url(${IDK})`,
        backgroundPosition: 'center',
        backgroundSize:'cover',
      }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/gamecreation" component={GameCreation} />
          <Route exact path="/saved/:id" component={GameInfo} />
          <Route exact path="/saved" component={GameHistory} />
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
