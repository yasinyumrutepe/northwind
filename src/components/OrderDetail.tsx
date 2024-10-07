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
import { OrderDetailProps } from "../types/Order";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { errorNotification, successNotification } from "../config/notification";
import { createReview } from "../services/ProductReview";
import { useMutation } from "@tanstack/react-query";
import { ProductReviewRequest } from "../types/ProductReview";

const { Title } = Typography;

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [reviews, setReviews] = useState<Record<number, ProductReviewRequest>>({});

  const addReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: (newReview) => {
      successNotification("Success", "Review added successfully");
      const updatedOrderDetails = order.orderDetails?.map((detail) => {
        if (detail.product.productID === newReview.productId) {
          return {
            ...detail,
            product: {
              ...detail.product,
              productReviews: [
                ...(detail.product.productReviews || []),
                {
                  productReviewID: newReview.productReviewID,
                  productId: newReview.productID,
                  review: newReview.review,
                  star: newReview.star,
                  customerID: newReview.customerID,
                  customer: newReview.customer,
                  product: newReview.product,
                },
              ],
            },
          };
        }
        return detail;
      });
    },
    onError: () => {
      errorNotification("Error", "An error occurred while adding review");
    },
  });

  const sendReview = (productId: number) => {
    const productReview = reviews[productId];
    if (!productReview || productReview.star === 0 || productReview.review === "") {
      errorNotification("Error", "Please fill in the required fields");
      return;
    }
    addReviewMutation.mutate(productReview);
  };

  const handleReviewChange = (productId: number, value: Partial<ProductReviewRequest>) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: {
        ...prevReviews[productId],
        productId: productId,
        ...value,
      },
    }));
  };

  const orderReview = (detail: any) => {
    if (order.orderStatus.status === 3) {
      return (
        <>
          <Col span={8}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title level={5} style={{ margin: 0 }}>
                {detail.product.productName}
              </Title>
              <Rate
                style={{ marginLeft: "10px", marginTop: "5px" }}
                allowHalf
                onChange={(value) =>
                  handleReviewChange(detail.product.productID, { star: value })
                }
              />
            </div>
            <Divider />
            <p>Price: {detail.product.unitPrice}</p>
            <p>Quantity: {detail.quantity}</p>
          </Col>
          <Col span={10} style={{ padding: "10px" }}>
            <TextArea
              placeholder="Enter your review"
              autoSize={{ minRows: 8, maxRows: 8 }}
              minLength={10}
              onChange={(e) =>
                handleReviewChange(detail.product.productID, { review: e.target.value })
              }
            />
          </Col>

          <Button
            type="primary"
            onClick={() => sendReview(detail.product.productID)}
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </>
      );
    } else {
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
  };

  return (
    <Row gutter={[12, 12]}>
      <Col span={16}>
        <Card title={"Order Info"}>
          {order.orderDetails?.map((detail, idx) => (
            <Card key={idx}>
              <Row>
                <Col span={6}>
                  <Image
                    src={
                      detail.product.productImages?.[0]?.imagePath ?? "error"
                    }
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIA..."
                  />
                </Col>
                {orderReview(detail)}
              </Row>
            </Card>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default OrderDetail;
