import React, { useEffect, useState } from 'react';
import { Layout, ConfigProvider, Modal, Menu, Divider } from 'antd';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import styles from './style.module.less';

const { Header, Footer, Content } = Layout;
const confirm = Modal.confirm;

function Root(props) {
  const { dispatch, pageTitle, accountInfo, children } = props;
  const [currentMenu, setCurrentMenu] = useState(0);
  useEffect(() => {
    return () => {
      dispatch({ type: 'root/clear' });
    };
  }, [dispatch]);
  const onLoginOut = () => {
    confirm({
      title: '提示',
      content: '确认退出登录？',
      okType: 'danger',
      okText: '退出',
      onOk() {
        dispatch(routerRedux.replace('/login'));
        sessionStorage.clear();
        window.location.reload();
      },
    });
  };
  return (
    <div className={styles.commonPage}>
      <ConfigProvider locale={zhCN}>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <div className={styles.headerContent}>
              <img className={styles.logo} src="./images/logo.png" alt="" />
              <span className={styles.title}>管理后台</span>
              <div className={styles.menuBox}>
                {accountInfo && (
                  <Menu
                    onClick={({ key }) => setCurrentMenu(key)}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                  >
                    <Menu.Item key={0}>首页</Menu.Item>
                    <Menu.Item key={1}>订单</Menu.Item>
                  </Menu>
                )}
              </div>
              {accountInfo ? (
                <div className={styles.accountBox}>
                  <span>{accountInfo.name}</span>
                  <Divider type="vertical"></Divider>
                  <span onClick={onLoginOut}>退出</span>
                </div>
              ) : (
                <Link to="">入驻</Link>
              )}
            </div>
          </Header>
          <Content className={styles.content}>
            {pageTitle && (
              <div className={styles.contentTitle}>{pageTitle}</div>
            )}
            <div className={styles.contentPage}>{children}</div>
          </Content>
          <Footer
            style={{ textAlign: 'center', color: '#999999', fontSize: 12 }}
          >
            Copyright 2014-2020 All Rights Reserved ****有限公司
            ICP备11111111号-1 公网安备 111111111111
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default connect((state) => {
  return { ...state.root };
})(Root);
