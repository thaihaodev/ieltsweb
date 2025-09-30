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
} from "antd";
import {
  GoogleOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // <--- THÊM DÒNG NÀY
import "./registerPage.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Register attempt with:", values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // alert(`Đăng ký thành công tài khoản: ${values.username}`);
      // Chuyển hướng người dùng
      navigate('/register/success'); 
    }, 2000);
  };

  return (
    <Layout className="register-page-layout">
      <Content className="register-content">
        <Card className="register-card">
          <Row gutter={0}>
            {/* Cột Trái: Hình ảnh Minh họa */}
            <Col xs={0} sm={0} md={12} className="register-illustration-col">
              <div className="register-illustration-placeholder">
                <img
                  src="https://i.pinimg.com/1200x/c8/19/e6/c819e693be9e818ac0ea1e497a65c02f.jpg" // Cập nhật đường dẫn hình ảnh minh họa
                  alt="Account Security Illustration"
                  className="register-illustration-image"
                />
              </div>
            </Col>

            {/* Cột Phải: Form Đăng ký */}
            <Col xs={24} sm={24} md={12} className="register-form-col">
              <div className="register-form-container">
                <Title level={3} className="register-title register-title">
                  Tạo Tài Khoản
                </Title>

                <Form
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  {/* Tên người dùng */}
                  <Form.Item
                    label={<Text strong>Tên người dùng</Text>}
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người dùng!",
                      },
                    ]}
                    className="form-item-spacing"
                  >
                    <Input
                      className="custom-input"
                      size="large"
                      placeholder="Tên người dùng"
                      prefix={<UserOutlined />}
                    />
                  </Form.Item>

                  {/* Email */}
                  <Form.Item
                    label={<Text strong>Email</Text>}
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập Email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                    className="form-item-spacing"
                  >
                    <Input
                      className="custom-input"
                      size="large"
                      placeholder="Email"
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>

                  {/* Mật khẩu */}
                  <Form.Item
                    label={
                      <div className="password-label-row">
                        <Text strong>Mật khẩu</Text>
                      </div>
                    }
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu!" },
                      { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
                    ]}
                    className="form-item-spacing"
                    hasFeedback
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      className="custom-input"
                      size="large"
                      placeholder="Mật khẩu"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>

                  {/* Xác nhận mật khẩu */}
                  <Form.Item
                    label={<Text strong>Xác nhận mật khẩu</Text>}
                    name="confirm"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận mật khẩu!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Hai mật khẩu đã nhập không khớp!")
                          );
                        },
                      }),
                    ]}
                    className="form-item-spacing"
                    hasFeedback
                  >
                    <Input.Password
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      className="custom-input"
                      size="large"
                      placeholder="Xác nhận mật khẩu"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>

                  {/* Nút Đăng ký chính */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="register-button register-button"
                      loading={loading}
                      size="large"
                    >
                      Đăng ký
                    </Button>
                  </Form.Item>
                </Form>

                {/* Đăng ký với Google */}
                <Divider plain className="register-divider">
                  Hoặc tiếp tục với
                </Divider>

                <Button
                  className="google-register-button"
                  size="large"
                  icon={<GoogleOutlined />}
                >
                  Đăng ký với Google
                </Button>

                {/* Đã có tài khoản? Đăng nhập */}
                <div className="register-link-container">
                  <Text>
                    Đã có tài khoản?{" "}
                    <a href="/login" className="register-link">
                      Đăng nhập
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

export default RegisterPage;
