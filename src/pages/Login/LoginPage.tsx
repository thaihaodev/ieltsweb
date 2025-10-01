import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  // notification,
  // message,
  App,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

// Dữ liệu người dùng giả lập
const MOCK_USER_DATA = {
  id: "user-123",
  username: "Lê Văn A",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
  gmail: "tranthaihao199x@gmail.com",
};

const LoginPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const { login, setIsLoading } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // Xóa lỗi cũ trước khi gửi lại
    form.setFields([
      { name: "username", errors: [] },
      { name: "password", errors: [] },
    ]);

    setIsLoading(true);
    setLoadingButton(true);

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (values.username === "test" && values.password === "123456") {
        login(MOCK_USER_DATA); // Lưu vào Context & sessionStorage
        message.success("Đăng nhập thành công!");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        // 2. THIẾT LẬP LỖI THỦ CÔNG CHO CẢ 2 TRƯỜNG
        const errorMessage = "Tài khoản hoặc mật khẩu không chính xác";
        const errorMessage1 = "";
        form.setFields([
          {
            name: "username",
            errors: [errorMessage1],
          },
          {
            name: "password",
            errors: [errorMessage],
          },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      message.error("Lỗi hệ thống.");
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingButton(false);
      }, 1000);
    }
  };

  return (
    <Layout className="login-page-layout">
      <Content className="login-content">
        <Card className="login-card">
          <Row gutter={0}>
            {/* Cột Trái: Hình ảnh Minh họa */}
            <Col xs={0} sm={0} md={12} className="login-illustration-col">
              <div className="login-illustration-placeholder">
                <img
                  src="https://i.pinimg.com/736x/05/d7/84/05d784805e083785e14d8555d9428c1b.jpg"
                  alt="Skill Illustration"
                  className="login-illustration-image"
                />
              </div>
            </Col>

            {/* Cột Phải: Form Đăng nhập */}
            <Col xs={24} sm={24} md={12} className="login-form-col">
              <div className="login-form-container">
                <Title level={3} className="login-title">
                  Đăng Nhập
                </Title>
                <Form
                  form={form}
                  name="login"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  {/* Tên đăng nhập */}
                  <Form.Item
                    label={<Text strong>Tên đăng nhập</Text>}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập!",
                      },
                    ]}
                    className="form-item-spacing"
                  >
                    <Input className="custom-input" size="large" />
                  </Form.Item>
                  {/* Mật khẩu */}
                  <Form.Item
                    label={
                      <div className="password-label-wrapper">
                        {" "}
                        <Text strong>Mật khẩu</Text>
                        <a
                          className="forgot-password-inline"
                          href="/forgot-password"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>
                    }
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu!" },
                    ]}
                    className="form-item-spacing"
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      className="custom-input"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-button"
                      loading={loadingButton}
                      size="large"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
                <Divider plain className="login-divider">
                  Hoặc đăng nhập với
                </Divider>
                <Button
                  className="google-login-button"
                  size="large"
                  icon={<GoogleOutlined />}
                >
                  Đăng nhập với Google
                </Button>
                <div className="register-link-container">
                  <Text>
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="register-link">
                      Đăng ký
                    </a>
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
