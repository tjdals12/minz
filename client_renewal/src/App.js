import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout, PostLayout } from 'components/Layout';
import { IntroPage, ListPage, PostPage, SeriesPage } from 'pages';

const App = () => (
	<BrowserRouter>
		<Switch>
			<LayoutRoute exact path="/" layout={MainLayout} component={IntroPage} />
			<LayoutRoute exact path="/list" layout={MainLayout} component={ListPage} />
			<LayoutRoute exact path="/series" layout={MainLayout} component={SeriesPage} />
			<LayoutRoute exact path="/post/:id" layout={PostLayout} component={PostPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
