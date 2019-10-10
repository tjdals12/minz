import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IntroPage, ListPage, PostPage, EditorPage, RegisterPage, LoginPage, SearchPage, NotFoundPage, SeriesListPage, SeriesPage } from 'pages';

const App = () => {
    return(
        <div>
            <Switch>
                <Route exact path='/' component={IntroPage} />
                <Route path='/list/:page?' component={ListPage} />
                <Route path='/post/:id' component={PostPage} />
                <Route exact path='/series/list/:page?' component={SeriesListPage} />
                <Route path='/series/:seq' component={SeriesPage} />
                <Route path='/editor' component={EditorPage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/search/:keyword?' component={SearchPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default App;