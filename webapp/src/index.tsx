import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';

const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
export const history = createBrowserHistory({ basename: baseUrl });
const store = configureStore(history);

ReactDOM.render(  
<Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
