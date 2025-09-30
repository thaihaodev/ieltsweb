// src/components/HomePage/StatisticSection.tsx

import React from "react";
import { Row, Col, Typography, Card, Space } from "antd";
import useCounterAnimation from "../../hooks/useCounterAnimation";
import "./styles.css"; // File CSS vẫn cần thiết để định dạng

const { Title, Paragraph } = Typography;

// --- 1. INTERFACE & DỮ LIỆU ---

// Định nghĩa Interface
interface IStatisticItem {
  id: number;
  value: string; // Giá trị thô (ví dụ: "8+", "5,000+")
  label: string;
  bgImage: string;
}

// Dữ liệu thống kê mẫu
const statisticData: IStatisticItem[] = [
  {
    id: 1,
    value: "8+",
    label: "Năm hoạt động",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block1bg.png",
  },
  {
    id: 2,
    value: "10+",
    label: "Cơ sở trên toàn quốc",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block4bg.png",
  },
  {
    id: 3,
    value: "200+",
    label: "Học viên xuất sắc đạt IELTS 8.0+",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block1bg.png",
  },
  {
    id: 4,
    value: "100%",
    label: "Giáo viên chuyên môn chất lượng cao",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block6bg.png",
  },
  {
    id: 5,
    value: "5000+",
    label: "Học viên cam kết",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block5bg.png",
  },
  {
    id: 6,
    value: "10+ Top",
    label: "Đối tác bạch kim của IDP và British Council Vietnam",
    bgImage:
      "https://theforumcenter.com/wp-content/themes/the-forum/assets/images/block2bg.png",
  },
];

// --- 2. STATISTIC CARD COMPONENT (Inner Component) ---

// Khuyến khích dùng component con bên trong để phân tách UI
const StatisticCard: React.FC<{ data: IStatisticItem }> = ({ data }) => {
  // Sử dụng Hook chạy số (Giả sử Hook đã ở đúng đường dẫn)
  const animatedValue = useCounterAnimation(data.value, 2000);

  return (
    <Card
      className="statistic-card"
      bodyStyle={{ padding: 24, minHeight: 180 }}
      style={{
        backgroundImage: `url(${data.bgImage})`,
        // backgroundSize: 'cover', // hoặc 'contain' tùy ý
        backgroundSize: "contain",
        backgroundPosition: "center right", // Căn chỉnh vị trí ảnh nền
        backgroundRepeat: "no-repeat",
      }}
    >
      <Space direction="vertical" size={4} style={{ display: "flex" }}>
        <Title level={1} className="stat-value">
          {animatedValue}
        </Title>
        <Paragraph className="stat-label">{data.label}</Paragraph>
      </Space>
    </Card>
  );
};

// --- 3. MAIN SECTION COMPONENT ---

const StatisticSection: React.FC = () => {
  return (
    <div className="section-padding statistic-section-container">
      {/* Tiêu đề Section */}
      <Title level={2} className="section-title">
        Chương trình đào tạo chất lượng cao
        <span className="sparkles">✨</span>
      </Title>

      {/* Bố cục lưới cho 6 thẻ Card */}
      <Row gutter={[20, 20]} justify="center">
        {statisticData.map((item) => (
          // Lớp CSS lg={4} làm cho mỗi thẻ chỉ chiếm 1/6 (6 thẻ trên 1 hàng)
          <Col xs={24} sm={12} md={8} lg={4} key={item.id} className="stat-col">
            <StatisticCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatisticSection;
