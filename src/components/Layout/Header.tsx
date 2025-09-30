import React, { useState, useEffect } from "react"; // 1. Import Hooks
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./styles.css";

const { Header } = Layout;

const AppHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    // Kiểm tra nếu vị trí cuộn (window.scrollY) lớn hơn 0
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

      {/* Login/Register */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Button style={{ color: "black" }} type="link">
          <Link to="/login">Đăng nhập</Link>
        </Button>
        <Button type="primary" danger>
          <Link to="/register">Đăng ký</Link>
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
