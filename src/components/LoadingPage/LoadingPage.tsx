// src/components/LoadingPage/LoadingPage.tsx
import React from 'react';
import { Spin, Layout } from 'antd';
import './LoadingPage.css'; // Import style riêng

const { Content } = Layout;

const LoadingPage: React.FC = () => {
  return (
    <Layout className="loading-page-layout">
      <Content className="loading-page-content">
        <Spin size="large" tip="Đang xác thực và tải trang..." />
        <p className="loading-text">Xin vui lòng chờ giây lát...</p>
      </Content>
    </Layout>
  );
};

export default LoadingPage;