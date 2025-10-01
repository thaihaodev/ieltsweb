import React, { useEffect, useState } from "react";
import { Layout, Card, Typography, Spin, Empty, Tabs } from "antd";
import { UserOutlined, EditOutlined, HistoryOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./profilePage.css";

// Import các components con
import ProfileOverview from "./ProfileOverview";
import ProfileEdit from "./ProfileEdit";
import ProfileHistory from "./ProfileHistory";

const { Content } = Layout;
const { Title } = Typography;

// --- Dữ liệu Tabs ---
const tabItems = [
  {
    key: "overview",
    label: "Tổng quan hồ sơ",
    icon: <UserOutlined />,
    content: <ProfileOverview />,
  },
  {
    key: "edit",
    label: "Chỉnh sửa hồ sơ",
    icon: <EditOutlined />,
    content: <ProfileEdit />,
  },
  {
    key: "history",
    label: "Lịch sử bài thi",
    icon: <HistoryOutlined />,
    content: <ProfileHistory />,
  },
];

const ProfilePage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy tab key từ URL (ví dụ: /my-profile?tab=edit)
  const urlParams = new URLSearchParams(location.search);
  const initialTab = urlParams.get("tab") || "overview";
  const [activeTabKey, setActiveTabKey] = useState(initialTab);

  // Đồng bộ trạng thái tab khi người dùng dùng nút Back/Forward của trình duyệt
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab") || "overview";
    setActiveTabKey(tab);
  }, [location.search]);

  // --- Xử lý Auth và Loading ---
  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}
      />
    );
  }

  if (!isAuthenticated) {
    // Chuyển hướng người dùng về trang đăng nhập nếu chưa xác thực
    navigate("/login");
    return <Empty description="Vui lòng đăng nhập để xem hồ sơ" />;
  }

  // Đồng bộ trạng thái tab với URL khi người dùng chuyển tab
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    navigate(`/my-profile?tab=${key}`, { replace: true });
  };

  return (
    <Content className="profile-page-content">
      <div className="profile-container">
        <Card className="profile-main-card">
          <Title className="profile-page-title">
            Hồ sơ học viên
          </Title>
          <Tabs
            activeKey={activeTabKey}
            onChange={handleTabChange}
            tabPosition="top"
            className="profile-tabs"
            items={tabItems.map((item) => ({
              key: item.key,
              label: (
                <span>
                  {item.icon}
                  {item.label}
                </span>
              ),
              children: (
                <div className="profile-tab-content">{item.content}</div>
              ),
            }))}
          />
        </Card>
      </div>
    </Content>
  );
};

export default ProfilePage;
