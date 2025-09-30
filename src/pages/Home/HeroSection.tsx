import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Avatar,
  Space,
  Carousel,
} from "antd";
import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import "./styles.css";

const { Title, Paragraph, Text } = Typography;

const carouselImages = [
  "https://thiieltstrenmay.com/img/hp4.webp",
  "https://thiieltstrenmay.com/img/hp2.webp",
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate(); // 2. Khởi tạo Hook

  // 3. Định nghĩa hàm xử lý click
  const handleStartClick = () => {
    navigate("/testing/listening");
  };

  return (
    <div className="hero-container-compact">
      <Row gutter={40} align="middle">
        {/* Cột 1: Nội dung (Text và CTA) */}
        <Col xs={24} md={12}>
          {/* Giảm size của Space để tiết kiệm không gian dọc */}
          <Space direction="vertical" size={4}>
            {/* Tag Giới thiệu */}
            <Tag
              color="orange"
              style={{
                padding: "3px 10px",
                fontSize: 12,
                fontWeight: "600",
                borderRadius: "4px",
              }}
            >
              IELTS Computer-Based Test
            </Tag>

            {/* Tiêu đề chính (Giảm level xuống 2 hoặc 3 tùy ý) */}
            <Title level={2} className="hero-title-compact">
              Thi IELTS trên máy
              <br />
              với đề thi gốc
              <br />
              <span className="highlight-text-compact"> chuẩn quốc tế</span>
            </Title>

            {/* Mô tả */}
            <Paragraph className="hero-description-compact">
              Trải nghiệm thi thử IELTS trên máy tính với đề thi thật, giao diện
              chuẩn, chấm điểm tự động và phân tích chi tiết giúp bạn nâng band
              hiệu quả.
            </Paragraph>

            {/* Danh sách lợi ích */}
            <Row gutter={[12, 8]}>
              {" "}
              {/* Giảm khoảng cách gutter */}
              <Col span={12}>
                <Text className="benefit-item">
                  <CheckCircleFilled
                    style={{ color: "#0194ff", marginRight: 6, fontSize: 14 }}
                  />
                  Đề thi chuẩn quốc tế
                </Text>
              </Col>
              <Col span={12}>
                <Text className="benefit-item">
                  <CheckCircleFilled
                    style={{ color: "#0194ff", marginRight: 6, fontSize: 14 }}
                  />
                  Giao diện giống thật 100%
                </Text>
              </Col>
              <Col span={24}>
                <Text className="benefit-item">
                  <CheckCircleFilled
                    style={{ color: "#0194ff", marginRight: 6, fontSize: 14 }}
                  />
                  Chấm chữa Writing bằng AI...
                </Text>
              </Col>
            </Row>

            {/* Nút CTA và Social Proof */}
            <Space size="middle" align="center" style={{ marginTop: 12 }}>
              {/* Nút CTA (Có thể giảm kích thước từ size="large" xuống size="default" hoặc tùy chỉnh height) */}
              <Button
                onClick={handleStartClick}
                type="primary"
                size="large"
                style={{
                  height: 45,
                  padding: "0 25px",
                  backgroundColor: "#ff8c42",
                  borderColor: "#ff8c42",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                Bắt đầu ngay
                <ArrowRightOutlined />
              </Button>

              {/* Social Proof Avatars */}
              <Space direction="horizontal" size={-8}>
                <Avatar.Group
                  maxCount={3}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    width: 28,
                    height: 28,
                  }}
                >
                  {/* ... (Avatars) ... */}
                  <Avatar
                    src="https://i.pravatar.cc/30?img=1"
                    style={{ width: 30, height: 30 }}
                  />
                  <Avatar
                    src="https://i.pravatar.cc/30?img=2"
                    style={{ width: 30, height: 30 }}
                  />
                  <Avatar
                    src="https://i.pravatar.cc/30?img=3"
                    style={{ width: 30, height: 30 }}
                  />
                </Avatar.Group>
                <Text
                  style={{ marginLeft: 16, color: "#4a4a4a", fontSize: 13 }}
                >
                  5k+ Người tin dùng
                </Text>
              </Space>
            </Space>
          </Space>
        </Col>

        {/* Cột 2: Carousel hình ảnh */}
        <Col xs={24} md={12} className="image-col-compact">
          <Carousel autoplay dots={{ className: "carousel-dots-custom" }}>
            {carouselImages.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`IELTS Test ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default HeroSection;
