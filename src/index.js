import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { rehydrate, hotRehydrate } from 'rfx-core';

import * as isProduction from './lib/constants';
import App from './components/App';
import stores from './stores/stores'; // eslint-disable-line

// import('./assets/styles/main.scss');

const store = rehydrate();

// eslint-disable-next-line
const renderApp = (Component) => {
  render(
    <AppContainer>
      <Router>
        <Provider store={isProduction ? store : hotRehydrate()}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('root') // eslint-disable-line
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}
