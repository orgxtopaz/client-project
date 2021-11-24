import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom"; //routes

// import profile from "./components/profile";
import landingpage from "./components/landingpage";
import register from "./components/register";
import login from "./components/login";
import dashboard from "./components/dashboard";


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

        </Router>
      </div>
    </>
  );
}

export default App;
