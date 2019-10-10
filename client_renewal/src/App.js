import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout } from 'components/Layout';
import { IntroPage } from 'pages';

const App = () => (
	<BrowserRouter>
		<Switch>
			<LayoutRoute exact path="/" layout={MainLayout} component={IntroPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
