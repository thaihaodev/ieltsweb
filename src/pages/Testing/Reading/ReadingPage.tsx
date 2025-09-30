import React from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Input, Select, Button, Typography, Pagination, Tooltip } from 'antd';
import { SearchOutlined, ClockCircleOutlined, BarChartOutlined, RightOutlined, CaretRightOutlined } from '@ant-design/icons';
import './readingStyles.css'; // Import file CSS

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho một bài kiểm tra
interface ReadingTest {
  id: number;
  title: string;
  duration: string;
  questions: string;
  status: string; // Ví dụ: "Chưa làm bài", "Đã hoàn thành"
  isFeatured?: boolean; // Dùng cho bài "Free ngẫu nhiên hàng tuần"
}

// Dữ liệu mẫu cho các bài kiểm tra
const mockTests:ReadingTest[] = [
  { id: 1, title: 'Free ngẫu nhiên hàng tuần - Reading Test 11', duration: '30 - 36 phút', questions: '40 câu hỏi', status: 'Chưa làm bài', isFeatured: true },
  { id: 2, title: 'Reading Test 1', duration: '60 phút', questions: '40 câu hỏi', status: 'Chưa làm bài' },
  { id: 3, title: 'Reading Test 2', duration: '60 phút', questions: '40 câu hỏi', status: 'Chưa làm bài' },
  { id: 4, title: 'Reading Test 3', duration: '60 phút', questions: '40 câu hỏi', status: 'Chưa làm bài' },
  { id: 5, title: 'Reading Test 4', duration: '60 phút', questions: '40 câu hỏi', status: 'Chưa làm bài' },
  { id: 6, title: 'Reading Test 5', duration: '60 phút', questions: '40 câu hỏi', status: 'Chưa làm bài' },
];

// Component Card cho từng bài kiểm tra
const TestCard: React.FC<ReadingTest> = ({ title, duration, questions, status }) => (
  <Card className="test-card" hoverable>
    {/* <Title level={4} className="test-title">{title}</Title> */}
    <Tooltip title={title} placement="topLeft">
        <Title level={4} className="test-title ellipsis-title">{title}</Title>
    </Tooltip>
    
    <div className="test-info">
      <div className="info-item">
        <ClockCircleOutlined />
        <Text>{duration}</Text>
      </div>
      <div className="info-item">
        <BarChartOutlined />
        <Text>{questions}</Text>
      </div>
    </div>

    <Row justify="space-between" align="middle" className="card-footer">
      <Text className="test-status">{status}</Text>
      <Button 
        type="primary" 
        className="start-button"
        icon={<CaretRightOutlined />}
      >
        Bắt đầu
      </Button>
    </Row>
  </Card>
);


const ReadingPage: React.FC = () => {
  return (
    <Layout className="reading-tests-layout">
      {/* 1. Breadcrumb */}
      <div className="header-bar">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Reading Tests</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="main-content">
        {/* 2. Filter & Search */}
        <Row gutter={16} align="middle" className="filter-row">
          <Col xs={24} sm={16} md={18}>
            <Input
              placeholder="Tìm kiếm bài thi..."
              prefix={<SearchOutlined />}
              className="search-input"
              size="large"
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select defaultValue="alphabet" className="sort-select" size="large">
              <Option value="alphabet">Theo Alphabet</Option>
              <Option value="newest">Mới nhất</Option>
              <Option value="oldest">Cũ nhất</Option>
            </Select>
          </Col>
        </Row>

        {/* 3. Content: Các Test Card */}
        <Row gutter={[24, 24]} className="test-cards-grid">
          {mockTests.map(test => (
            <Col key={test.id} xs={24} sm={12} lg={8}>
              <TestCard {...test} />
            </Col>
          ))}
        </Row>
        
        {/* 4. Footer: Phân trang */}
        <div className="pagination-container">
          <Pagination 
            current={1} 
            total={60} 
            pageSize={6} 
            showSizeChanger={false}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ReadingPage;