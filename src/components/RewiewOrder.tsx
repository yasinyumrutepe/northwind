import { Avatar, Card, Col, Rate, Row, Typography } from "antd";
import { ProductReview } from "../types/ProductReview";

interface ReviewOrderProps {
  productReview: ProductReview[];
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({ productReview }) => {
  return (
    <>
      {productReview.map((review: ProductReview) => (
        <Card style={{minWidth:'1000px',minHeight:'300px'}}>
          <Row align="middle">
            <Col span={8}>
              <Avatar size={64} />
            </Col>
            <Col  span={16}>
              <Rate
                disabled
                style={{ margin: "0px", marginBottom: "10px" }}
                value={review.star}
              />
              <Card>
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
