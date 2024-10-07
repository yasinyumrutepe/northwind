import { Card, Col, Row } from "antd";

const Dashboard = () => {
  return (
    <Card title="Dashboard">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Products"></Card>
        </Col>
        <Col span={8}>
          <Card title="Orders"></Card>
        </Col>

        <Col span={8}>
          <Card title="Categories"></Card>
        </Col>
        <Col span={8}>
          <Card title="Campaigns"></Card>
        </Col>
        <Col span={8}>
          <Card title="Customers"></Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
