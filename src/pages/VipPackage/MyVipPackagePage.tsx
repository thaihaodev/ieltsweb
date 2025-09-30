import React from "react";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Tag,
} from "antd";
import { CrownOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./vipPackagesPage.css"; // Import file CSS

const { Content } = Layout;
const { Title, Text } = Typography;

// Giả định dữ liệu trạng thái gói
const mockVipStatus = {
  isVip: false, // Thay đổi thành true để xem trạng thái có gói
  activeSince: "Chưa có",
  totalPackages: 0,
  activePackages: 0,
};

interface ActiveVipPackage {
  id: number;
  title: string;
  duration: string; // 1 tháng, 60 ngày, 1 năm...
  price: string;
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày hết hạn
  status: "Active" | "Pending" | "Expired";
  skills: string; // Tên kỹ năng: Full, Listening, Reading...
}

const mockActivePackages: ActiveVipPackage[] = [
  {
    id: 101,
    title: "Full (Listening, Reading) VIP 90 days",
    duration: "3 tháng",
    price: "450.000 ₫",
    startDate: "01/09/2025",
    endDate: "01/12/2025",
    status: "Active",
    skills: "Full",
  },
  {
    id: 102,
    title: "Writing VIP 30 days",
    duration: "1 tháng",
    price: "200.000 ₫",
    startDate: "15/08/2025",
    endDate: "15/09/2025",
    status: "Expired",
    skills: "Writing",
  },
];

// Component Card cho gói VIP đang hoạt động
const ActivePackageCard: React.FC<{ pkg: ActiveVipPackage }> = ({ pkg }) => {
  // Logic để xác định màu sắc của Tag trạng thái
  let statusColor = "";
  if (pkg.status === "Active") {
    statusColor = "success"; // Màu xanh lá
  } else if (pkg.status === "Expired") {
    statusColor = "error"; // Màu đỏ
  } else {
    statusColor = "processing"; // Màu xanh dương/vàng
  }

  return (
    <Card className={`active-package-card ${pkg.status.toLowerCase()}`}>
      <div className="package-header">
        <Title level={4} className="active-package-title">
          {pkg.title}
        </Title>
        <Tag color={statusColor} className="package-status-tag">
          {pkg.status === "Active"
            ? "ĐANG HOẠT ĐỘNG"
            : pkg.status === "Expired"
            ? "ĐÃ HẾT HẠN"
            : "CHỜ XỬ LÝ"}
        </Tag>
      </div>

      <Row gutter={[16, 16]} className="package-details">
        <Col xs={12} md={6}>
          <Text type="secondary">Kỹ năng</Text>
          <Text strong className="detail-value">
            {pkg.skills}
          </Text>
        </Col>
        <Col xs={12} md={6}>
          <Text type="secondary">Ngày bắt đầu</Text>
          <Text strong className="detail-value">
            {pkg.startDate}
          </Text>
        </Col>
        <Col xs={12} md={6}>
          <Text type="secondary">Ngày hết hạn</Text>
          <Text strong className="detail-value expiry-date">
            {pkg.endDate}
          </Text>
        </Col>
        <Col xs={12} md={6} className="price-and-button">
          <Text type="secondary">Giá</Text>
          <Text strong className="detail-value package-price">
            {pkg.price}
          </Text>
        </Col>
      </Row>

      <div className="package-footer-actions">
        {pkg.status === "Expired" ? (
          <Button type="primary" className="action-button renew-button">
            Gia hạn ngay
          </Button>
        ) : (
          <Button type="default" className="action-button view-detail-button">
            Xem chi tiết
          </Button>
        )}
      </div>
    </Card>
  );
};

// Component cho khối thông tin trạng thái nhỏ (Hoạt động từ, Tổng số gói...)
const StatusCard: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <Card className="status-card">
    <Text className="status-title">{title}</Text>
    <Title level={3} style={{ color }} className="status-value">
      {value}
    </Title>
  </Card>
);

// Danh sách các nút filter cho loại gói
const packageFilters = [
  { key: "all", label: "Gói tất cả kỹ năng", urlParam: null },
  { key: "reading", label: "Gói Reading", urlParam: "reading" },
  { key: "writing", label: "Gói Writing", urlParam: "writing" },
  { key: "listening", label: "Gói Listening", urlParam: "listening" },
  { key: "speaking", label: "Gói Speaking", urlParam: "speaking" },
];

const MyVipPackagePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const navigate = useNavigate();
  // KIỂM TRA TRẠNG THÁI GÓI
  const hasActivePackages = mockActivePackages.length > 0;

  const handleFilterNavigation = (urlParam: string | null, key: string) => {
    setActiveFilter(key);

    // Xây dựng đường dẫn dựa trên urlParam
    let path = "/vip-packages";
    if (urlParam) {
      path += `?type=${urlParam}`;
    }

    // Điều hướng đến trang VipPackagesPage
    navigate(path);
  };

  return (
    <Layout className="my-vip-layout">
      {/* 1. Breadcrumb */}
      <div className="header-bar-my-vip">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Gói VIP của tôi</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="main-content-my-vip">
        {/* 2. Header chính của trang */}
        <div className="vip-header-my-page">
          <CrownOutlined className="crown-icon-star" />
          <Title level={1} className="page-title">
            Gói VIP của tôi
          </Title>
          <Text className="sub-header-text-manage">
            Quản lý và theo dõi hành trình thành viên cao cấp của bạn với lịch
            sử gói
          </Text>
          <Text className="sub-header-text-manage">VIP toàn diện</Text>
          <Text className="sub-header-text-manage bold-text">
            Bạn muốn đăng ký gói VIP? Chọn loại gói:
          </Text>
        </div>

        {/* 3. Thanh Filter theo loại gói */}
        <div className="package-filter-bar">
          <Row justify="center" gutter={[10, 10]} className="filter-tag-row">
            {packageFilters.map((btn) => (
              <Col key={btn.key}>
                <Button
                  className={`package-tag-button ${
                    activeFilter === btn.key ? "active" : ""
                  }`}
                  // onClick={() => setActiveFilter(btn.key)}
                  onClick={() => handleFilterNavigation(btn.urlParam, btn.key)}
                  style={{
                    backgroundColor:
                      btn.key === "all"
                        ? "#66BB6A"
                        : btn.key === "reading"
                        ? "#4D80C6"
                        : btn.key === "writing"
                        ? "#8BC34A"
                        : btn.key === "speaking"
                        ? "#dcae45ff"
                        : "#9575CD",
                    color: "white",
                    borderColor:
                      activeFilter === btn.key ? "transparent" : "#E0E0E0",
                  }}
                >
                  {btn.label}
                </Button>
              </Col>
            ))}
          </Row>
        </div>

        {/* 4. Khối Trạng thái Gói */}
        <Row gutter={[20, 20]} justify="center" className="status-row">
          <Col xs={24} sm={8}>
            <StatusCard
              title="Hoạt động từ"
              value={mockVipStatus.activeSince}
              color="#66BB6A"
            />
          </Col>
          <Col xs={24} sm={8}>
            <StatusCard
              title="Tổng số gói"
              value={mockVipStatus.totalPackages.toString()}
              color="#FFB300"
            />
          </Col>
          <Col xs={24} sm={8}>
            <StatusCard
              title="Gói đang hoạt động"
              value={mockVipStatus.activePackages.toString()}
              color="#03A9F4"
            />
          </Col>
        </Row>

        {/* 5. Nội dung chính: Danh sách Gói hoặc Thông báo trống */}
        <div className="package-list-container">
          {hasActivePackages ? (
            // HIỂN THỊ DANH SÁCH CÁC GÓI ĐANG HOẠT ĐỘNG
            mockActivePackages.map((pkg) => (
              <ActivePackageCard key={pkg.id} pkg={pkg} />
            ))
          ) : (
            // HIỂN THỊ THÔNG BÁO KHÔNG CÓ GÓI (Như hình cũ)
            <Card className="no-package-card">
              <FrownOutlined className="sad-icon" />
              <Title level={4} className="no-package-title">
                Không có gói VIP
              </Title>
              <Text type="secondary" className="no-package-text">
                Bạn chưa đăng ký bất kỳ gói VIP nào.
              </Text>
              <Button
                className="view-packages-button"
                onClick={() => navigate("/vip-packages")} // Điều hướng đến trang mua hàng
              >
                Xem các gói hiện có
              </Button>
            </Card>
          )}
        </div>

        {/* Nếu có gói VIP, bạn sẽ render danh sách gói ở đây */}
      </Content>
    </Layout>
  );
};

export default MyVipPackagePage;
