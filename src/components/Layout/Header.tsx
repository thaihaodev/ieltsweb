import React, { useState, useEffect } from "react"; // 1. Import Hooks
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./styles.css";

const { Header } = Layout;

const AppHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === "logout") {
          handleLogout();
        } else if (key === "profile") {
          navigate("/my-profile");
        } else if (key === "vip-package") {
          navigate("/my-vip-package");
        }
      }}
      items={[
        {
          key: "user-info",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size={40}
                src={user?.avatarUrl}
                icon={<UserOutlined />}
                style={{ marginRight: 10, backgroundColor: "#8BC34A" }}
              />
              <div>
                <div style={{ fontWeight: 600, color: "#000" }}>
                  {user?.username}
                </div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  {" "}
                  {user?.gmail}
                </div>
              </div>
            </div>
          ),
          disabled: true,
          style: { cursor: "default" },
        },
        { type: "divider" },
        {
          key: "profile",
          icon: <UserOutlined />, 
          label: "My Profile",
        },
        {
          key: "vip-package",
          icon: <BookOutlined />,
          label: "My VIP Package",
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined style={{ color: "#E53935" }} />,
          label: <span style={{ color: "#E53935" }}>Sign out</span>,
        },
      ]}
    />
  );

  const userInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",
    padding: "0 10px",
    backgroundColor: "#fff",
  };

  const headerClassName = scrolled ? "header-scrolled" : "header-default";

  return (
    <Header
      className={headerClassName}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 999,
        color: "#000",
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: "bold", fontSize: 20, marginRight: 50 }}>
        THE <span style={{ color: "#000" }}>LOGO</span>
      </div>

      {/* Menu */}
      <Menu
        mode="horizontal"
        style={{ flex: 1, borderBottom: "none" }}
        selectable={false}
      >
        <Menu.Item key="1">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.SubMenu key="2" title="Khoá học">
          <Menu.Item key="2-1">
            <Link to="/vip-packages">Danh sách khoá học</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="3" title="Thi thử IELTS">
          <Menu.Item key="3-1">
            <Link to="/testing/listening">Listening</Link>
          </Menu.Item>
          <Menu.Item key="3-2">
            <Link to="/testing/writing">Writing</Link>
          </Menu.Item>
          <Menu.Item key="3-3">
            <Link to="/testing/reading">Reading</Link>
          </Menu.Item>
          <Menu.Item key="3-4">
            <Link to="/testing/speaking">Speaking</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4">
          <a href="#contact">Liên hệ</a>
        </Menu.Item>
      </Menu>

      {/* Nút VIP ở giữa */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Button className="vip-button" icon={<PlusOutlined />}>
          <a href="/my-vip-package">Đăng Ký VIP</a>
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {isAuthenticated && user ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            {/* THAY ĐỔI: Avatar hiển thị trên Header (giống hình) */}
            <div style={userInfoStyle}>
              <Avatar
                size="default"
                src={user.avatarUrl}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#8BC34A" }}
              />
              {/* Hiển thị tên (giống hình) */}
              <span style={{ fontWeight: 600, color: "#000" }}>
                {user.username}
              </span>
            </div>
          </Dropdown>
        ) : (
          // ... (Nút Đăng nhập/Đăng ký giữ nguyên)
          <>
            <Button style={{ color: "black" }} type="link">
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button
              type="primary"
              danger
              style={{ backgroundColor: "#8BC34A", borderColor: "#8BC34A" }}
            >
              <Link to="/register" style={{ color: "#fff" }}>
                Đăng ký
              </Link>
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
