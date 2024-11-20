import {
  Card,
  Col,
  Typography,
  Row,
  Divider,
  Image,
  Timeline,
  Button,
  Rate,
  Input,
} from "antd";
import { OrderDetailProps } from "../types/Order";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ProductReviewRequest } from "../types/ProductReview";
import { useMutation } from "@tanstack/react-query";
import { createReview } from "../services/ProductReview";
const { Title, Text } = Typography;
const { TextArea } = Input;

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const [reviews, setReviews] = useState<ProductReviewRequest[]>([]);

  const addReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess() {},
    onError() {},
  });

  const handleRatingChange = (value: number, detail: any) => {
    setReviews((prevReviews) => {
      const existingReview = prevReviews.find(
        (review) =>
          review.productId === detail.product.productID &&
          review.orderID === detail.orderID
      );
      if (existingReview) {
        return prevReviews.map((review) =>
          review.productId === detail.product.productID &&
          review.orderID === detail.orderID
            ? { ...review, star: value }
            : review
        );
      } else {
        return [
          ...prevReviews,
          {
            productId: detail.product.productID,
            star: value,
            review: "",
            orderID: detail.orderID,
          },
        ];
      }
    });
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    detail: any
  ) => {
    const comment = e.target.value;
    setReviews((prevReviews) => {
      const existingReview = prevReviews.find(
        (review) =>
          review.productId === detail.product.productID &&
          review.orderID === detail.orderID
      );
      if (existingReview) {
        return prevReviews.map((review) =>
          review.productId === detail.product.productID &&
          review.orderID === detail.orderID
            ? { ...review, review: comment }
            : review
        );
      } else {
        return [
          ...prevReviews,
          {
            productId: detail.product.productID,
            star: 0,
            review: comment,
            orderID: detail.orderID,
          },
        ];
      }
    });
  };

  const handleSaveReview = (detail: any) => {
    const reviewToSave = reviews.find(
      (review) =>
        review.productId === detail.product.productID &&
        review.orderID === detail.orderID
    );
    if (reviewToSave) {
      addReviewMutation.mutate(reviewToSave);
    }
  };

  const orderDetail = (detail: any) => {
    return (
      <Col xs={24} sm={16}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Title level={5} style={{ margin: "8px 0" }}>
            {detail.product.productName}
          </Title>
          <Divider />
          <p>Price: {detail.product.unitPrice}</p>
          <p>Quantity: {detail.quantity}</p>
        </div>
        {order.orderStatuses[order.orderStatuses.length - 1].status.statusID ===
          7 && reviewRender(detail)}
      </Col>
    );
  };

  const reviewRender = (detail: any) => {
    const currentReview = reviews.find(
      (review) => review.productId === detail.product.productID
    );

    const isReviewExisting = detail.product.productReviews.length > 0;

    return (
      <>
        <Divider />
        <div style={{ marginTop: "20px" }}>
          <Title level={5}>Rate this product</Title>
          <Rate
            value={
              currentReview?.star || detail.product.productReviews[0]?.star
            }
            onChange={(value) => handleRatingChange(value, detail)}
            disabled={isReviewExisting}
          />

          <Title level={5} style={{ marginTop: "20px" }}>
            Write a Review
          </Title>
          <TextArea
            rows={4}
            value={
              currentReview?.review || detail.product.productReviews[0]?.review
            }
            disabled={isReviewExisting}
            onChange={(e) => handleCommentChange(e, detail)}
            placeholder="Share your experience with this product"
          />

          {!isReviewExisting && (
            <Button
              onClick={() => handleSaveReview(detail)}
              type="primary"
              style={{ marginTop: "10px" }}
            >
              Submit Review
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <Row gutter={[12, 12]} style={{ padding: "16px" }}>
      <Col xs={24} lg={18}>
        <Card title="Order Info" style={{ marginBottom: "16px" }}>
          {order.orderDetails?.map((detail, idx) => (
            <Card key={idx} style={{ marginBottom: "16px" }}>
              <Row gutter={[12, 12]} align="middle">
                <Col xs={8} sm={6}>
                  <Image
                    src={
                      detail.product.productImages?.[0]?.imagePath ?? "error"
                    }
                    fallback="data:image/png;base64,..."
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                {orderDetail(detail)}
              </Row>
            </Card>
          ))}
        </Card>
      </Col>

      <Col xs={24} lg={6}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Card title="Order Status" style={{ marginBottom: "16px" }}>
              <Timeline mode="left">
                {order.orderStatuses?.map((status, idx) => (
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
                    color={
                      status.status.statusName === "Delivered"
                        ? "green"
                        : "gray"
                    }
                  >
                    {status.status.statusName}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Address" style={{ marginBottom: "16px" }}>
              <p>
                <strong>Address Name:</strong> {order.shipName || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {order.shipAddress || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {order.shipCity || "N/A"}
              </p>
              <p>
                <strong>Zip Code:</strong> {order.shipPostalCode || "N/A"}
              </p>
              <p>
                <strong>Country:</strong> {order.shipCountry || "N/A"}
              </p>
            </Card>
          </Col>
          <Col xs={24}>
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
