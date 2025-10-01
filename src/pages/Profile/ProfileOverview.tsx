import React from 'react';
import { Row, Col, Typography, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const ProfileOverview: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    // Dữ liệu giả lập cho thống kê
    const mockStats = [
        { label: 'Tổng số bài thi', value: 0 },
        { label: 'Bài nghe đã hoàn thành', value: 0 },
        { label: 'Bài viết đã làm', value: 0 },
    ];

    return (
        <div style={{ padding: 10 }}>
            {/* THÔNG TIN CÁ NHÂN */}
            <Row align="middle" style={{ marginBottom: 30 }}>
                <Col style={{ marginRight: 20 }}>
                    <Avatar size={64} src={user.avatarUrl} icon={<UserOutlined />} style={{ backgroundColor: '#8BC34A' }} />
                </Col>
                <Col>
                    <Title level={4} style={{ margin: 0 }}>{user.username}</Title>
                    <Text type="secondary">{user.gmail}</Text>
                    <div style={{ marginTop: 5 }}>
                        <Tag color="green">Đang hoạt động</Tag>
                        <Tag color="gold">Chưa có gói VIP</Tag>
                    </div>
                </Col>
            </Row>

            <Title level={5} style={{ marginBottom: 20 }}>Tổng quan thống kê</Title>
            <div style={{ borderRadius: 10 }}>
                <Row gutter={16}>
                    {mockStats.map((stat, index) => (
                        <Col span={8} key={index}>
                            <div style={{ textAlign: 'center', padding: '15px 0', backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                                <Text type="secondary" style={{ display: 'block' }}>{stat.label}</Text>
                                <Title level={3} style={{ margin: 0, color: '#000' }}>{stat.value}</Title>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProfileOverview;