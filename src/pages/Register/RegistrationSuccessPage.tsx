import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Card, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import "./registerPage.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const REDIRECTION_DELAY_MS = 3000; // 3 giây

const RegistrationSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Chuyển hướng về trang Đăng nhập
    }, REDIRECTION_DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <Layout className="login-page-layout">
      <Content className="login-content">
        <Card className="success-card">
          <div className="success-container">
            <div className="success-icon-circle">
              <CheckOutlined className="success-icon" />
            </div>
            <Title level={3} className="success-title">
              Đăng Ký Thành Công!
            </Title>
            <Text className="success-description">
              Tài khoản của bạn đã được tạo thành công.
              <br/>
              Chuyển hướng đến trang đăng nhập...
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegistrationSuccessPage;