import React from 'react';
import DashBoard from '../../DashBoard';

import styles from './Home.scss';

const Home = () => (
  <div data-test-hook="homePage" className={styles.home}>
    <DashBoard />
  </div>
);

export default Home;
