import React, { useCallback } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import styles from './style.module.less';
import { routerRedux } from 'dva/router';

const SingleInput = ({ label, right, ...restProps }) => (
  <div className={styles.singleInput}>
    <div className={styles.inputLabel} style={{ width: 95 }}>
      {label}
    </div>
    <input className={styles.input} {...restProps}></input>
    {right}
  </div>
);

function Login(props) {
  const { dispatch } = props;
  const account = 'admin';
  const password = 'admin';
  const onLogin = useCallback(() => {
    dispatch({
      type: 'root/save',
      payload: {
        accountInfo: {
          name: 'admin',
        },
      },
    });
    dispatch(routerRedux.replace('/home'));
  }, [dispatch]);
  return (
    <div className={styles.page}>
      <img className={styles.img} src="./images/logo.png" alt="" />
      <div className={styles.divider}></div>
      <div className={styles.formBox}>
        <div
          className={styles.title}
          style={{ width: '100%', textAlign: 'center' }}
        >
          欢迎登录
        </div>
        <SingleInput
          value={account}
          label="账号"
          placeholder="请输入账号"
          maxLength="11"
        />
        <SingleInput
          value={password}
          label="密码"
          placeholder="请输入密码"
          type="password"
        />
        <Button
          size="large"
          block
          type="primary"
          className={styles.loginBtn}
          onClick={onLogin}
        >
          登录
        </Button>
      </div>
    </div>
  );
}

export default connect(({ login }) => ({ ...login }))(Login);
