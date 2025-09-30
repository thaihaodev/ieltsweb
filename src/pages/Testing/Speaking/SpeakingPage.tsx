import React from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Input, Select, Button, Typography, Pagination, Tooltip } from 'antd';
import { SearchOutlined, BarChartOutlined, RightOutlined, CaretRightOutlined } from '@ant-design/icons';
import './speakingStyles.css'; // Tái sử dụng file CSS (đã đổi tên cho phù hợp)

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho một chủ đề Speaking
interface SpeakingTopic {
  id: number;
  part: string; // Ví dụ: 'Part 1', 'Part 2', 'Part 3'
  title: string;
  questions: string; // Ví dụ: '4 questions'
}

// Dữ liệu mẫu cho các chủ đề
const mockTopics: SpeakingTopic[] = [
  { id: 1, part: 'Part 1', title: 'Jewelry', questions: '4 questions' },
  { id: 2, part: 'Part 1', title: 'Accommodation', questions: '4 questions' },
  { id: 3, part: 'Part 1', title: 'Being busy', questions: '4 questions' },
  { id: 4, part: 'Part 1', title: 'Birthday', questions: '4 questions' },
  { id: 5, part: 'Part 1', title: 'Chocolate', questions: '4 questions' },
  { id: 6, part: 'Part 1', title: 'Cooking', questions: '4 questions' },
];

// Component Card cho từng chủ đề Speaking
const SpeakingTopicCard: React.FC<SpeakingTopic> = ({ part, title, questions }) => (
  <Card className="test-card speaking-card" hoverable>
    
    <Tooltip title={`Topic: ${part} - ${title}`} placement="topLeft">
        {/* Tên Topic được in đậm và có tiền tố "Topic:" */}
        <Title level={4} className="test-title ellipsis-title speaking-title-container">
            <Text strong className="test-prefix speaking-prefix">Topic:</Text> {part} - {title}
        </Title>
    </Tooltip>
    
    <div className="speaking-info">
      <div className="info-item">
        {/* Sử dụng BarChartOutlined để mô phỏng icon đồ thị nhỏ */}
        <BarChartOutlined className="speaking-icon" /> 
        <Text type="secondary">{questions}</Text>
      </div>
    </div>

    {/* Nút Bắt đầu nằm ở footer */}
    <Row justify="center" align="middle" className="card-footer speaking-footer">
      <Button 
        type="primary" 
        className="start-button"
        icon={<CaretRightOutlined />} 
      >
        Bắt đầu luyện tập
      </Button>
    </Row>
  </Card>
);


const SpeakingPage: React.FC = () => {
  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  return (
    <Layout className="listening-tests-layout">
      {/* 1. Breadcrumb */}
      <div className="header-bar">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Speaking Topics</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="main-content">
        {/* 2. Filter & Search */}
        <Row gutter={16} align="middle" className="filter-row">
          <Col xs={24} sm={16} md={18}>
            <Input
              placeholder="Search topics..."
              prefix={<SearchOutlined />}
              className="search-input"
              size="large"
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select defaultValue="alphabet" className="sort-select" size="large">
              <Option value="alphabet">Theo Alphabet</Option>
              {/* Thêm các option khác nếu cần */}
            </Select>
          </Col>
        </Row>

        {/* 3. Content: Các Topic Card */}
        <Row gutter={[24, 24]} className="test-cards-grid">
          {mockTopics.map(topic => (
            <Col key={topic.id} xs={24} sm={12} lg={8}>
              <SpeakingTopicCard {...topic} />
            </Col>
          ))}
        </Row>
        
        {/* 4. Footer: Phân trang */}
        <div className="pagination-container">
          <Pagination 
            current={1} 
            total={80} 
            pageSize={10} 
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default SpeakingPage;