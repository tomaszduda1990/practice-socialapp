import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private/Private';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Profiles from './components/profiles/Profiles';
const authToken = localStorage.getItem('socialAppToken');
if (authToken) {
	setAuthToken(authToken);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<section className='container'>
					<Alert />
					<Switch>
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<Route path='/profiles' component={Profiles} />
						<PrivateRoute path='/dashboard' component={Dashboard} />
						<PrivateRoute path='/create-profile' component={CreateProfile} />
						<PrivateRoute path='/edit-profile' component={EditProfile} />
						<PrivateRoute path='/add-experience' component={AddExperience} />
						<PrivateRoute path='/add-education' component={AddEducation} />
					</Switch>
				</section>
			</Router>
		</Provider>
	);
};

export default App;
