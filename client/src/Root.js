import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import social from 'lib/social';

window.social = social;
const store = configure();

const Root = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
}

export default Root;