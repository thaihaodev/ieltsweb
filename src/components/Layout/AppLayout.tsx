import React from 'react';
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className="main-layout" style={{ minHeight: "100vh" }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};
export default AppLayout;
