import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout, PostLayout } from 'components/Layout';
import { IntroPage, ListPage, PostPage, SeriesPage, EditorPage } from 'pages';

const App = () => (
	<BrowserRouter>
		<Switch>
			<LayoutRoute exact path="/" layout={MainLayout} component={IntroPage} />
			<LayoutRoute exact path="/list" layout={MainLayout} component={ListPage} />
			<LayoutRoute exact path="/series" layout={MainLayout} component={SeriesPage} />
			<LayoutRoute exact path="/post/:id" layout={PostLayout} component={PostPage} />
			<LayoutRoute exact path="/editor" layout={'div'} component={EditorPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
