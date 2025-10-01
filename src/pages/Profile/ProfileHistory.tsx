import React from "react";
import { Button, Card, Empty } from "antd";

const ProfileHistory: React.FC = () => {
  return (
    <div style={{ padding: 10 }}>
      <Card
        style={{
          textAlign: "center",
          padding: "30px 0",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ color: "#aaa" }}>
              Không tìm thấy lịch sử bài thi
            </span>
          }
        />
        <Button
          type="link"
          style={{ color: "#8BC34A", fontSize: 16, fontWeight: 500 }}
          href="/testing" // Chuyển đến trang làm bài thi
        >
          Làm bài thi đầu tiên
        </Button>
      </Card>
    </div>
  );
};

export default ProfileHistory;
