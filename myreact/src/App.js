import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom"; //routes

import profile from "./components/profile";
import landingpage from "./components/landingpage";

function App() {
  return (
    <>
      <div>
        






        <Router>
          {/* ROUTES LANG SAKALAM */}
          <Route exact path="/" component={landingpage} />
        </Router>
      </div>
    </>
  );
}

export default App;
