import React, { useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
// Sử dụng lại CSS của trang Login vì bố cục tương đồng
import './loginPage.css'; 
// *** Quan trọng: Đảm bảo component này được định tuyến KHÔNG có Header/Footer ***

const { Content } = Layout;
const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Sending reset link to:', values.email);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Đã gửi liên kết đặt lại mật khẩu đến: ${values.email}`);
      // Có thể chuyển hướng người dùng đến trang thông báo kiểm tra email
    }, 2000);
  };

  return (
    <Layout className="login-page-layout">
      <Content className="login-content">
        <Card className="login-card">
          <Row gutter={0}>
            
            {/* Cột Trái: Hình ảnh Minh họa (Tái sử dụng style Login) */}
            <Col xs={0} sm={0} md={12} className="login-illustration-col">
              <div className="login-illustration-placeholder">
                <img 
                  src="https://i.pinimg.com/736x/05/d7/84/05d784805e083785e14d8555d9428c1b.jpg" // Đường dẫn hình ảnh minh họa
                  alt="Time Management Illustration" 
                  className="login-illustration-image"
                />
              </div>
            </Col>

            {/* Cột Phải: Form Quên Mật khẩu */}
            <Col xs={24} sm={24} md={12} className="login-form-col">
              <div className="login-form-container">
                <Title level={3} className="login-title">
                  Quên mật khẩu
                </Title>
                
                {/* Thông báo hướng dẫn */}
                <Text className="forgot-password-intro">
                  Nhập địa chỉ email bạn đã dùng để đăng ký tài khoản và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
                </Text>

                <Form
                  name="forgot-password"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                  className="forgot-password-form"
                >
                  {/* Email */}
                  <Form.Item
                    label={<Text strong>Email</Text>}
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập Email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                    className="form-item-spacing email-input-item"
                  >
                    <Input 
                      placeholder="Nhập email của bạn" 
                      className="custom-input" 
                      size="large"
                      prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                  </Form.Item>

                  {/* Nút Gửi */}
                  <Form.Item style={{ marginTop: '20px' }}>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      className="login-button send-link-button" 
                      loading={loading}
                      size="large"
                    >
                      Gửi liên kết đặt lại mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
                
                {/* Quay lại đăng nhập */}
                <div className="back-to-login-container">
                  <a href="/login" className="back-to-login-link">
                    Quay lại trang đăng nhập
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default ForgotPasswordPage;