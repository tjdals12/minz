import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout } from 'components/Layout';
import { IntroPage, ListPage, SeriesPage } from 'pages';

const App = () => (
	<BrowserRouter>
		<Switch>
			<LayoutRoute exact path="/" layout={MainLayout} component={IntroPage} />
			<LayoutRoute exact path="/list" layout={MainLayout} component={ListPage} />
			<LayoutRoute exact path="/series" layout={MainLayout} component={SeriesPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
