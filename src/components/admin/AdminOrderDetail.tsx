import {
    Card,
    Col,
    Typography,
    Row,
    Divider,
    Image,
    Rate,
    Button
  } from "antd";
  import { OrderDetailProps } from "../../types/Order";
  
  const { Title } = Typography;
  
  const AdminOrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
   
  

    const orderRewiew = (detail: any) => {
    
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
      }

  
    return (
      <Row gutter={[12, 12]}>
        <Col span={16}>
          <Card title={"Order Info"} >
            {order.orderDetails?.map((detail, idx) => (
              <Card key={idx} style={{padding:'20px', margin:'10px'}}>
                <Row>
                  <Col span={6}>
                    <Image
                      src={
                        detail.product.productImages?.[0]?.imagePath ?? "error"
                      }
                    fallback="data:image/png;base64,..."
                      preview={false}
                      alt={detail.product.productName}
                      style={{
                        width: "80%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  {orderRewiew(detail)}
                </Row>
              </Card>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title={"Checkout Info"}>
            <p>Product: {order.totalPrice} </p>
            <p>Campaing:</p>
            <Divider />
            <p>Total: {order.totalPrice} TL</p>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default AdminOrderDetail;
  