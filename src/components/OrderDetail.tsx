import {
  Card,
  Col,
  Typography,
  Row,
  Divider,
  Image,
  Timeline,
} from "antd";
import { OrderDetailProps } from "../types/Order";
import { ClockCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {

  const orderReview = (detail: any) => {
   
      return (
        <>
          <Col span={8}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title level={5} style={{ margin: 0 }}>
                {detail.product.productName}
              </Title>
            </div>
            <Divider />
            <p>Price: {detail.product.unitPrice}</p>
            <p>Quantity: {detail.quantity}</p>
          </Col>
        </>
      );
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={18}>
        <Card title={"Order Info"}>
          {order.orderDetails?.map((detail, idx) => (
            <Card key={idx}>
              <Row>
                <Col span={6}>
                  <Image
                    src={
                      detail.product.productImages?.[0]?.imagePath ?? "error"
                    }
                    fallback="data:image/png;base64,..."
                  />
                </Col>
                {orderReview(detail)}
              </Row>
            </Card>
          ))}
        </Card>
      </Col>
      <Col span={6}>
        <Row>
          <Col span={24}>
            <Card title="Order Info">
              <Timeline mode="left">
                {
                  order.orderStatuses?.map((status, idx) => (
                    <Timeline.Item
                      key={idx}
                      label={new Date(status.createdAt).toLocaleString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
                      color={status.status.statusName === "Delivered" ? "green" : "gray"}
                    >
                      {status.status.statusName}
                    </Timeline.Item>
                  ))
                }
              </Timeline>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Order Summary">
              <p>Total Price: {order.totalPrice}</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderDetail;
