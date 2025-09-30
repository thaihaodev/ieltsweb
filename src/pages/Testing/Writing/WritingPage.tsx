import React from 'react';
import { Layout, Breadcrumb, Row, Col, Card, Input, Select, Button, Typography, Pagination, Tooltip } from 'antd';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import './writingStyles.css'; // Sử dụng lại file CSS cũ

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Định nghĩa kiểu dữ liệu cho một bài kiểm tra Writing
interface WritingTest {
  id: number;
  title: string;
  part1Words: string;
  part2Words: string;
}

// Dữ liệu mẫu cho các bài kiểm tra
const mockWritingTests: WritingTest[] = [
  { id: 1, title: 'Focus Writing Test 19', part1Words: '150 words', part2Words: '250 words' },
  { id: 2, title: 'Focus Writing Test 21', part1Words: '150 words', part2Words: '250 words' },
  { id: 3, title: 'Focus Writing Test 23', part1Words: '150 words', part2Words: '250 words' },
  { id: 4, title: 'Focus Writing Test 24', part1Words: '150 words', part2Words: '250 words' },
  { id: 5, title: 'Focus Writing Test 25', part1Words: '150 words', part2Words: '250 words' },
  { id: 6, title: 'Focus Writing Test 26', part1Words: '150 words', part2Words: '250 words' },
];

// Component Card cho từng bài kiểm tra Writing
const WritingTestCard: React.FC<WritingTest> = ({ title, part1Words, part2Words }) => (
  <Card className="test-card writing-card" hoverable>
    
    <Tooltip title={`Test: ${title}`} placement="topLeft">
        {/* Tên test được in đậm và có tiền tố "Test:" */}
        <Title level={4} className="test-title ellipsis-title">
            <Text strong className="test-prefix">TEST:</Text> {title}
        </Title>
    </Tooltip>
    
    <div className="writing-info">
      <div className="info-item">
        <Text>Part 1</Text>
        <Text className="word-count">{part1Words}</Text>
      </div>
      <div className="info-item">
        <Text>Part 2</Text>
        <Text className="word-count">{part2Words}</Text>
      </div>
    </div>

    {/* Nút Bắt đầu nằm ở footer */}
    <Row justify="center" align="middle" className="card-footer writing-footer">
      <Button 
        type="primary" 
        className="start-button"
        // icon={<RightOutlined />}
        size='small'
      >
        Bắt đầu
      </Button>
    </Row>
  </Card>
);


const WritingPage: React.FC = () => {
  // Hàm xử lý phân trang và sắp xếp (giữ nguyên logic như trang Listening)
  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  return (
    <Layout className="writing-tests-layout">
      {/* 1. Breadcrumb */}
      <div className="header-bar">
        <Breadcrumb separator="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Writing Tests</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Content className="main-content">
        {/* 2. Filter & Search */}
        <Row gutter={16} align="middle" className="filter-row">
          <Col xs={24} sm={16} md={18}>
            <Input
              placeholder="Search tests..." // Đã đổi placeholder
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
          {mockWritingTests.map(test => (
            <Col key={test.id} xs={24} sm={12} lg={8}>
              <WritingTestCard {...test} />
            </Col>
          ))}
        </Row>
        
        {/* 4. Footer: Phân trang */}
        <div className="pagination-container">
          <Pagination 
            current={1} 
            total={70}
            pageSize={10} 
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default WritingPage;