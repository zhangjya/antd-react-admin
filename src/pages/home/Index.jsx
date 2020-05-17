import React from 'react';
import { connect } from 'dva';

import styles from './style.module.less';

function Home(props) {
  return (
    <div className={styles.page}>
      home
    </div>
  );
}

export default connect(({ home }) => ({ ...home }))(Home);
