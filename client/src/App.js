import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { LayoutRoute, MainLayout, PostLayout } from 'components/Layout';
import { 
	IntroPage, 
	ListPage, 
	PostPage, 
	SeriesListPage, 
	SeriesPage, 
	EditorPage, 
	SearchPage, 
	LinkListPage
} from 'pages';

const App = () => (
	<BrowserRouter>
		<Switch>
			<LayoutRoute exact path="/" layout={MainLayout} component={IntroPage} />
			<LayoutRoute exact path="/list" layout={MainLayout} component={ListPage} />
			<LayoutRoute exact path="/series" layout={MainLayout} component={SeriesListPage} />
			<LayoutRoute exact path="/series/:seq" layout={MainLayout} component={SeriesPage} />
			<LayoutRoute exact path="/post/:id" layout={PostLayout} component={PostPage} />
			<LayoutRoute exact path="/editor" layout={'div'} component={EditorPage} />
			<LayoutRoute exact path="/search" layout={MainLayout} component={SearchPage} />
			<LayoutRoute exact path="/links" layout={MainLayout} component={LinkListPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
