import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { HomePage, NotFoundPage } from 'pages';
import { store, browserHistory } from 'store';

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={browserHistory}>
			<Switch>
				<Route path="/character" component={HomePage} />
				<Route exact path="/">
					<Redirect to="/character" />
				</Route>
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</ConnectedRouter>
	</Provider>
);

export default App;
