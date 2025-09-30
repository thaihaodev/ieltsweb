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
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
// import { useAuth } from "../../context/AuthContext";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

// Dữ liệu người dùng giả lập
const MOCK_USER_DATA = {
  id: "user-123",
  username: "Lê Văn A",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { login, setIsLoading } = useAuth();

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Login attempt with:", values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // alert(`Đăng nhập thành công với tài khoản: ${values.username}`);
      // Redirect user
    }, 2000);
  };

  // const onFinish = async (values: any) => {
  //       setIsLoading(true); // BẬT LOADING TOÀN CỤC

  //       try {
  //           // 1. Giả lập gọi API đăng nhập (Delay 1.5s để thấy Loading Page)
  //           await new Promise(resolve => setTimeout(resolve, 1500)); 
            
  //           // 2. Xử lý logic đăng nhập thành công
  //           if (values.username === 'test' && values.password === '123456') {
                
  //               // 3. Lưu thông tin người dùng
  //               login(MOCK_USER_DATA);

  //               notification.success({
  //                   message: 'Đăng nhập thành công',
  //                   description: `Chào mừng ${MOCK_USER_DATA.username} trở lại!`,
  //                   placement: 'topRight',
  //                   duration: 1.5,
  //               });

  //               // 4. Chuyển hướng về trang chủ
  //               setTimeout(() => {
  //                   setIsLoading(false); // TẮT LOADING
  //                   navigate('/'); // Chuyển về trang chủ
  //               }, 500); // Đợi thêm 0.5s sau thông báo

  //           } else {
  //               // Xử lý đăng nhập thất bại
  //               notification.error({
  //                   message: 'Đăng nhập thất bại',
  //                   description: 'Tên đăng nhập hoặc mật khẩu không đúng.',
  //                   placement: 'topRight',
  //               });
  //               setIsLoading(false); // TẮT LOADING ngay khi thất bại
  //           }
  //       } catch (error) {
  //           notification.error({
  //               message: 'Lỗi hệ thống',
  //               description: 'Không thể kết nối đến máy chủ đăng nhập.',
  //               placement: 'topRight',
  //           });
  //           setIsLoading(false); // TẮT LOADING khi có lỗi
  //       } 
  //   };

  return (
    <Layout className="login-page-layout">
      <Content className="login-content">
        <Card className="login-card">
          <Row gutter={0}>
            {/* Cột Trái: Hình ảnh Minh họa */}
            <Col xs={0} sm={0} md={12} className="login-illustration-col">
              {/* Vị trí để đặt hình ảnh hoặc component minh họa */}
              <div className="login-illustration-placeholder">
                <img
                  src="https://i.pinimg.com/736x/05/d7/84/05d784805e083785e14d8555d9428c1b.jpg" // Đổi đường dẫn này cho khớp với hình ảnh của bạn trong thư mục public
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
                  name="login"
                  // initialValues={{ remember: true }}
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

                  {/* Nút Đăng nhập chính */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-button"
                      loading={loading}
                      size="large"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>

                {/* Đăng nhập với Google */}
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

                {/* Đăng ký */}
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
