import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom"; //routes

import profile from "./components/profile";
import landingpage from "./components/landingpage";
import register from "./components/register";
import login from "./components/login";
import dashboard from "./components/dashboard";
import verify from "./components/verify";



function App() {
  return (
    <>
      <div>
        




        <Router>
          {/* ROUTES LANG SAKALAM */}
          <Route exact path="/" component={landingpage} />
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={login} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/profile" component={profile} />
          <Route exact path="/verify/:userId" component={verify} />

        </Router>
      </div>
    </>
  );
}

export default App;
