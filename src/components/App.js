import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'; // Link,
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import HomePage from './pages/Home';

// eslint-disable-next-line
import styles from './../assets/styles/main.scss';

@withRouter
@inject('store')
@observer
export default class App extends Component {
  static propTypes = {
    store: PropTypes.objectOf(PropTypes.object),
  }

  static defaultProps = {
    store: {},
  }

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={HomePage}
          />
        </Switch>
      </div>
    );
  }
}
