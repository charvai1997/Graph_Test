import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../Component/Dashboard";
import Login from "../Component/Login";
import SingUp from "../Component/SingUp";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login}></Route>
				<Route exact path='/singUp' component={SingUp}></Route>
				<Route exact path='/dashboard' component={Dashboard}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
