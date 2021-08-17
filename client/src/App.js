import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

const App = () => (
	<>
		<Router>
			<Navbar />
			<Route exact path='/' component={Landing} />
			<section className='container'>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</section>
		</Router>
	</>
);

export default App;
