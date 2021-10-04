import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './lib/react/reportWebVitals';

import { isAuth, logout } from './lib/auth';
import { Header, HeaderLoggedIn } from './component/header';
import { PrivateRoute, UnprivateRoute } from './lib/route';
import { Home, Login, Register, Kanban, KanbanDetail, NotFound } from './page';
import { Prop as PropInterface, State as StateInterface } from './interface/app';

import './asset/scss/style.scss';
import logo from './asset/image/eat_bread.gif';

class App extends React.Component<PropInterface, StateInterface> {
	constructor(props: PropInterface) {
		super(props);
		this.state = {
			isLoggedIn: isAuth()
		};

		this.checkAuth = this.checkAuth.bind(this);
		this.logoutButton = this.logoutButton.bind(this);
	}

	checkAuth = () => {
		const newState = {
			...this.state,
			isLoggedIn: isAuth()
		}
		this.setState(newState);
	}

	logoutButton = () => {
		if (window.confirm('are you sure do you want to logout?')) {
			logout();
			this.checkAuth();
			alert('logout success');
		}
	}

	render() {
		return (
			<Router>
				<div className="app">
					<header>
						<div className="container">
							<div className="brand">
								<img className="logo" src={logo} alt="logo" />
								<h1 className="title">&#27005;&#12375;&#12356;</h1>
							</div>
							{this.state.isLoggedIn
								? <HeaderLoggedIn logoutButton={this.logoutButton}/>
								: <Header/>
							}
						</div>
					</header>
					<main>
						<div className="container">
							<Switch>
								<Route exact path="/">
									<Home/>
								</Route>
								<PrivateRoute path="/kanban/:kanbanId">
									<KanbanDetail/>
								</PrivateRoute>
								<PrivateRoute path="/kanban">
									<Kanban/>
								</PrivateRoute>
								<UnprivateRoute path="/login">
									<Login checkAuth={this.checkAuth} />
								</UnprivateRoute>
								<UnprivateRoute path="/register">
									<Register/>
								</UnprivateRoute>
								<Route path="*">
									<NotFound/>
								</Route>
							</Switch>
						</div>
					</main>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
	,
	document.getElementById('tanoshii')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
