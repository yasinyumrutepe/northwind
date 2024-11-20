import { Avatar, Card, Col, Rate, Row, Typography } from "antd";
import { ProductReview } from "../types/ProductReview";

interface ReviewOrderProps {
  productReview: ProductReview[];
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({ productReview }) => {
  return (
    <>
      {productReview.map((review: ProductReview, index: number) => (
        <Card
          key={index}
          style={{
            marginBottom: '16px',
            padding: '16px',
            minWidth: '100%',
            minHeight: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <Avatar size={64} />
            </Col>
            <Col xs={24} sm={16}>
              <Rate
                disabled
                style={{ marginBottom: '10px' }}
                value={review.star}
              />
              <Card style={{ padding: '10px' }}>
                <Typography.Paragraph>
                  <Typography.Text>{review.review}</Typography.Text>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default ReviewOrder;
