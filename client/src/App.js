import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private/Private";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import Profile from "./components/profiles/Profile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import useMediaQuery from "./hooks/useMediaQuery";
// redux
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Profiles from "./components/profiles/Profiles";

const authToken = localStorage.getItem("socialAppToken");
if (authToken) {
  setAuthToken(authToken);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const matchMediaQuery = useMediaQuery("(max-width: 768px)", 1000);
  const styles = {
    background: "#fff",
    color: "#000",
    border: "1px solid #000",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10000000,
  };

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        {matchMediaQuery ? (
          <h1 style={styles}>IS BELOW 768px</h1>
        ) : (
          <h1 style={styles}>IS ABOVE 768px</h1>
        )}
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            <PrivateRoute path="/posts" component={Posts} />
            <PrivateRoute path="/post/:id" component={Post} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
