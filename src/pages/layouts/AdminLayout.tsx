import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb } from 'antd';
import "../../index.css";
import AdminSidebar from '../../components/AdminSidebar';

const { Header, Content, Footer } = Layout;

type Props = {};


const AdminLayout = (props: Props) => {
  return (    
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout