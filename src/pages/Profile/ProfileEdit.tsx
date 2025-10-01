import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  //   notification,
  // message,
  Avatar,
  App,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { Text } = Typography;

const ProfileEdit: React.FC = () => {
  const { message } = App.useApp();
  const { user, login } = useAuth(); // Dùng login để cập nhật Context
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Giá trị khởi tạo từ Context
  const initialValues = {
    username: user?.username || "",
    email: user?.gmail || "",
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // --- GIẢ LẬP GỌI API CẬP NHẬT ---
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Cập nhật Context/SessionStorage với dữ liệu mới
      if (user) {
        const updatedUser = {
          ...user,
          username: values.username,
        };
        login(updatedUser);
        message.success("Lưu thay đổi hồ sơ thành công!");
      } else {
        // Xử lý trường hợp user không tồn tại, giả định là lỗi
        throw new Error("Thông tin người dùng không hợp lệ.");
      }
    } catch (error) {
      message.error("Cập nhật hồ sơ thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-tab" style={{ padding: 10 }}>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 500 }}
      >
        <Form.Item label={<Text strong>Ảnh Đại Diện</Text>}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <Avatar
              size={70}
              src={user?.avatarUrl}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#ccc" }}
            />
            <Button>Choose File</Button>
            <Text type="secondary">No file chosen</Text>
          </div>
        </Form.Item>
        <Form.Item
          label={<Text strong>Tên Người Dùng</Text>}
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={<Text strong>Email</Text>}
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập email hợp lệ!",
            },
          ]}
        >
          <Input
            size="large"
            disabled
            style={{ color: "#000", backgroundColor: "#f5f5f5" }}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 30 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Lưu Thay Đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileEdit;
