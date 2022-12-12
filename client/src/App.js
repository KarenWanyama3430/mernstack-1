import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";
import store from "./store";
import "./App.css";
import { clearCurrentProfile } from "./actions/profileAction";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateProfile from "./components/createprofile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import ViewProfile from "./components/view-profile/ViewProfile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//check for token
if (localStorage.jwtToken) {
  //set auth token to the headers
  setAuthToken(localStorage.jwtToken);
  //decode the toekn to get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //check for expiry date for the token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //log out the user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={Landing} />

          <div>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={ViewProfile} />

              <PrivateRoutes exact path="/dashboard" component={Dashboard} />

              <PrivateRoutes
                exact
                path="/create-profile"
                component={CreateProfile}
              />

              <PrivateRoutes
                exact
                path="/edit-profile"
                component={EditProfile}
              />

              <PrivateRoutes
                exact
                path="/add-experience"
                component={AddExperience}
              />

              <PrivateRoutes
                exact
                path="/add-education"
                component={AddEducation}
              />

              <PrivateRoutes exact path="/feed" component={Posts} />

              <PrivateRoutes exact path="/post/:id" component={Post} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
