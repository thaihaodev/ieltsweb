import React from 'react';
import { Row, Col, Card, Typography, List } from 'antd';
import { UserOutlined, BookOutlined, RiseOutlined, TrophyOutlined } from '@ant-design/icons';
import './styles.css'; // File CSS cho phần tùy chỉnh thêm

const { Title, Text } = Typography;

// Định nghĩa kiểu dữ liệu cho một mục đối tượng
interface TargetItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Dữ liệu cho danh sách đối tượng mục tiêu
const targetAudiences: TargetItem[] = [
  {
    icon: <UserOutlined style={{ color: '#52c41a', fontSize: '20px' }} />,
    title: 'Người mới luyện thi IELTS.',
    description: 'Làm quen với hình thức thi, giao diện và các dạng câu hỏi thường gặp.',
  },
  {
    icon: <BookOutlined style={{ color: '#1890ff', fontSize: '20px' }} />,
    title: 'Người thi lại 1 kỹ năng IELTS.',
    description: 'Các bài thi riêng biệt cho từng kỹ năng, tập trung vào điểm yếu cần cải thiện.',
  },
  {
    icon: <RiseOutlined style={{ color: '#faad14', fontSize: '20px' }} />,
    title: 'Người hướng tới tăng điểm IELTS cao nhanh chóng.',
    description: 'Phân tích chi tiết từng câu trả lời, cung cấp mẫu câu đạt điểm cao để tham khảo.',
  },
  {
    icon: <TrophyOutlined style={{ color: '#eb2f96', fontSize: '20px' }} />,
    title: 'Người muốn trúng đề thi IELTS.',
    description: 'Làm quen với những dạng đề "đề được chọn lọc, nắm vững các chủ đề thường xuất hiện trong đề thi, rút gọn thời gian và công sức khi học.',
  },
];

const TargetAudienceSection: React.FC = () => {
  return (
    <div className="target-audience-section">
      <Title level={2} className="section-title">
        <span className="sparkle-left">✨</span> Phù hợp cho <span className="sparkle-right">✨</span>
      </Title>
      
      <Card className="audience-card" bordered={false}>
        <Row gutter={[32, 32]} align="middle">
          {/* Cột 1: Hình ảnh */}
          <Col xs={24} lg={10}>
            <div className="image-container">
              {/* Thay thế bằng component hình ảnh thực tế của bạn hoặc dùng img tag */}
              {/*  */}
              <img
                src="https://thiieltstrenmay.com/img/hp3.webp" // **Thay thế bằng URL hình ảnh thực tế của bạn**
                alt="Người học IELTS"
                className="target-image"
              />
            </div>
          </Col>

          {/* Cột 2: Danh sách đối tượng */}
          <Col xs={24} lg={14}>
            <List
              itemLayout="horizontal"
              dataSource={targetAudiences}
              renderItem={(item) => (
                <List.Item className="target-list-item">
                  <div className="list-item-content">
                    {/* Icon và Title cùng nằm trên 1 hàng ngang */}
                    <div className="item-header">
                      {item.icon}
                      <Text strong className="item-title">{item.title}</Text>
                    </div>
                    {/* Mô tả nằm dưới */}
                    <Text type="secondary" className="item-description">{item.description}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TargetAudienceSection;