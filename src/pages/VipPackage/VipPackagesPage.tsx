import React, { useEffect } from "react";
import { Layout, Breadcrumb, Row, Col, Card, Button, Typography } from "antd";
import {
  CrownOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  BookOutlined,
  AudioOutlined,
  EditOutlined,
  CommentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./vipPackagesPage.css"; // Import file CSS

const { Content } = Layout;
const { Title, Text } = Typography;

// Định nghĩa kiểu dữ liệu cho một gói VIP
interface VipPackage {
  id: number;
  duration: string;
  title: string;
  description: string;
  price: string;
  skills: ("full" | "listening" | "reading" | "writing" | "speaking")[];
  icon: React.ReactNode;
}

// Dữ liệu mẫu cho các gói VIP
const mockPackages: VipPackage[] = [
  {
    id: 1,
    duration: "1 tháng",
    title: "Full (Listening, Reading) VIP 30 days",
    description:
      "Được truy cập Listening, Reading không giới hạn trong vòng 30 ngày",
    price: "250.000 ₫",
    // skills: ['full', 'listening', 'reading'],
    skills: ["full"],
    icon: <ClockCircleOutlined />,
  },
  {
    id: 2,
    duration: "2 tháng",
    title: "Full (Listening, Reading) VIP 60 days",
    description: "Được truy cập Listening và READING trong vòng 60 ngày",
    price: "350.000 ₫",
    skills: ["full"],
    icon: <ClockCircleOutlined />,
  },
  {
    id: 3,
    duration: "3 tháng",
    title: "Reading VIP 60 days",
    description: "Được truy cập tất cả bài đọc - Reading trong vòng 60 ngày",
    price: "200.000 ₫",
    skills: ["reading"],
    icon: <BookOutlined />,
  },
  {
    id: 4,
    duration: "2 tháng",
    title: "Listening VIP 60 days",
    description: "Được truy cập tất cả bài nghe - Listening trong vòng 60 ngày",
    price: "200.000 ₫",
    skills: ["listening"],
    icon: <AudioOutlined />,
  },
  {
    id: 5,
    duration: "3 tháng",
    title: "Writing VIP 90 days",
    description: "Được truy cập Writing trong vòng 90 ngày",
    price: "10.000 ₫",
    skills: ["writing"],
    icon: <ClockCircleOutlined />,
  },
  {
    id: 6,
    duration: "12 tháng",
    title: "TEST VIP 1 năm",
    description:
      "Được truy cập không giới hạn tất cả bài nghe và bài đọc trong vòng 1 năm",
    price: "1.500.000 ₫",
    skills: ["full", "listening", "reading"],
    icon: <ClockCircleOutlined />,
  },
  {
    id: 7,
    duration: "12 tháng",
    title: "Writing VIP 6 tháng",
    description: "Được truy cập không giới hạn tất cả trong vòng 1 năm",
    price: "500.000 ₫",
    skills: ["writing"],
    icon: <ClockCircleOutlined />,
  },
  {
    id: 8,
    duration: "12 tháng",
    title: "Writing VIP 1 năm",
    description: "Được truy cập không giới hạn tất cả bài trong vòng 1 năm",
    price: "1.500.000 ₫",
    skills: ["writing"],
    icon: <ClockCircleOutlined />,
  },
];

// Component cho một Gói VIP
const VipPackageCard: React.FC<VipPackage> = ({
  duration,
  title,
  description,
  price,
  icon,
}) => (
  <Card className="vip-card" hoverable>
    {/* Phần Header Card */}
    <div className="card-header-info">
      <div className="duration-pill">
        {icon}
        <Text strong>Thời hạn:</Text>
        <Text>{duration}</Text>
      </div>
    </div>

    {/* Tiêu đề gói */}
    <Title level={4} className="package-title">
      {title}
    </Title>

    {/* Mô tả tính năng */}
    <div className="package-features">
      <CheckCircleOutlined className="feature-icon" />
      <Text className="feature-description">{description}</Text>
    </div>

    {/* Footer Card: Giá và Nút */}
    <div className="card-footer-vip">
      <div className="price-group">
        <Text type="secondary">Giá gói</Text>
        <Title level={3} className="package-price">
          {price}
        </Title>
      </div>
      <Button type="primary" className="register-button">
        Đăng ký ngay
      </Button>
    </div>
  </Card>
);

// Danh sách các nút filter
const filterButtons = [
  { key: "all", label: "Tất cả kỹ năng", icon: <AppstoreOutlined /> },
  { key: "listening", label: "Nghe", icon: <AudioOutlined /> },
  { key: "reading", label: "Đọc", icon: <BookOutlined /> },
  { key: "writing", label: "Viết", icon: <EditOutlined /> },
  { key: "speaking", label: "Nói", icon: <CommentOutlined /> },
];

const VipPackagesPage: React.FC = () => {
  // const [activeFilter, setActiveFilter] = React.useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlType = searchParams.get("type");
  const initialFilter =
    filterButtons.find((btn) => btn.key === urlType)?.key || "all";

  const [activeFilter, setActiveFilter] = React.useState(initialFilter);

  // Logic lọc gói (đơn giản hóa)
  const filteredPackages = mockPackages.filter((pkg) => {
    if (activeFilter === "all") return true;
    return pkg.skills.includes(activeFilter as any);
  });

  useEffect(() => {
    const currentType = searchParams.get("type");
    const newFilter =
      filterButtons.find((btn) => btn.key === currentType)?.key || "all";
    setActiveFilter(newFilter);
  }, [searchParams]);

  const handleFilterClick = (key: string) => {
    setActiveFilter(key);

    if (key === "all") {
      // Nếu là 'all', xóa tham số 'type' khỏi URL
      setSearchParams({});
      // Hoặc nếu dùng navigate: navigate('/vip-packages');
    } else {
      // Nếu là kỹ năng cụ thể, thêm/cập nhật tham số 'type' vào URL
      setSearchParams({ type: key });
      // Hoặc nếu dùng navigate: navigate(`/vip-packages?type=${key}`);
    }
  };

  return (
    <Layout className="vip-page-layout">
      {/* 1. Breadcrumb */}
      <div className="header-bar-vip">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Gói VIP</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="main-content-vip">
        {/* Header chính của trang */}
        <div className="vip-header">
          <CrownOutlined className="crown-icon" />
          <Title level={1} className="site-title">
            Gói VIP thiieltstrenmay.com
          </Title>
          <Text className="sub-header-text">
            Chọn gói VIP phù hợp nhất cho hành trình IELTS của bạn
          </Text>
        </div>

        {/* 2. Thanh Filter theo kỹ năng */}
        <div className="skill-filter-bar">
          <Row justify="center" gutter={[16, 16]} className="filter-button-row">
            {filterButtons.map((btn) => (
              <Col key={btn.key}>
                {/* <Button
                  className={`skill-button ${activeFilter === btn.key ? 'active' : ''}`}
                  icon={btn.icon}
                  onClick={() => setActiveFilter(btn.key)}
                >
                  {btn.label}
                </Button> */}
                <Button
                  className={`skill-button ${
                    activeFilter === btn.key ? "active" : ""
                  }`}
                  icon={btn.icon}
                  // GỌI HÀM MỚI KHI BẤM NÚT
                  onClick={() => handleFilterClick(btn.key)}
                >
                  {btn.label}
                </Button>
              </Col>
            ))}
          </Row>
        </div>

        {/* 3. Lưới các Gói VIP */}
        <Row gutter={[30, 30]} className="package-grid">
          {filteredPackages.map((pkg) => (
            <Col key={pkg.id} xs={24} sm={12} lg={8}>
              <VipPackageCard {...pkg} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default VipPackagesPage;
