import React, { useState, useEffect } from "react";
import {
  Row,
  Typography,
  Table,
  Divider,
  Card,
  Button,
  Col,
  Input,
  InputNumber,
} from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import {
  BasketItem,
  BasketResponse,
  UpdateQuantityType,
} from "../types/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCampaign,
  deleteBasket,
  fetchAllBaskets,
  updateQuantity,
} from "../services/BasketService";
import { CampaignRequest } from "../types/Campaign";
import { errorNotification, successNotification } from "../config/notification";

const { Title, Text } = Typography;

const Basket: React.FC = () => {
  const [basketItems, setBasketItems] = useState<BasketResponse>() ?? [];
  const [discountCode, setDiscountCode] = useState<string>("");
  const basketQuery = useQuery({
    queryKey: ["basket"],
    queryFn: () => fetchAllBaskets(),
  });

  const deleteBasketMutation = useMutation({
    mutationFn: (id: number) => deleteBasket(id),
    onSuccess: (newBasket) => {
      successNotification("Success", "Item removed from cart");
      setBasketItems(newBasket);
    },
    onError: () => {
      errorNotification(
        "Error",
        "An error occurred while removing item from cart"
      );
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (updateQuantityData: UpdateQuantityType) =>
      updateQuantity(updateQuantityData),
    onSuccess: (newBasket) => {
      setBasketItems(newBasket);
      successNotification("Success", "Quantity updated");
    },
    onError: () => {
      errorNotification("Error", "An error occurred while updating quantity");
    },
  });

  const addCampaignMutation = useMutation({
    mutationFn: (campaignName: string) => addCampaign(campaignName),
    onSuccess: (basket) => {
      console.log("Campaign found:", basket);
      setBasketItems(basket);
      if (basket.discount == null) {
        setDiscountCode("");
      } else {
        setDiscountCode(basket.discount.campaignName);
      }
    },

    onError: () => {
      errorNotification("Error", "An error occurred while applying discount");
    },
  });
  useEffect(() => {
    if (basketQuery.isSuccess) {
      if (basketQuery.data.discount == null) {
        setDiscountCode("");
      } else {
        setDiscountCode(basketQuery.data.discount.campaignName);
      }

      setBasketItems(basketQuery.data);
    }
  }, [basketQuery.isSuccess, basketQuery.data, setBasketItems]);

  const applyDiscount = () => {
    addCampaignMutation.mutate(discountCode);
  };

  const handleQuantityChange = (id: number, value: number | null) => {
    updateQuantityMutation.mutate({ productID: id, quantity: value ?? 1 });
  };

  const handleRemove = (id: number) => {
    deleteBasketMutation.mutate(id);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      render: (text: string, record: BasketItem) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.images[0]?.imagePath ?? ""}
            alt={record.productName}
            style={{ width: "60px", marginRight: "16px" }}
          />
          <div>
            <div>{text}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text: number, record: BasketItem) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.productID, value)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      render: (totalPrice: number) => <span>${totalPrice}</span>,
    },
    {
      title: "",
      render: (_: any, record: BasketItem) => (
        <div>
          <Button icon={<HeartOutlined />} style={{ marginRight: "8px" }} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record.productID)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 100px" }}>
      <Card>
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Table<BasketItem>
              columns={columns}
              dataSource={basketItems?.items}
              rowKey="productID"
              pagination={false}
              footer={() => (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button href="/">Continue shopping</Button>
                  <Button href="/orders/checkout" type="primary">
                    Make Purchase
                  </Button>
                </div>
              )}
            />
            <div
              style={{
                marginTop: "16px",
                backgroundColor: "#e6fffb",
                padding: "10px",
              }}
            >
              <Text type="success">Free Delivery within 1-2 weeks</Text>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            {" "}
            {/* Responsive genişlik ayarı */}
            <Card title="Have coupon?" bordered={false}>
              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    placeholder="Coupon Code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                </Col>
                <Col span={8}>
                  <Button type="primary" block onClick={applyDiscount}>
                    Apply
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card
              title="Order Summary"
              bordered={false}
              style={{ marginTop: "20px" }}
            >
              <div>
                <div style={{ fontSize: "16px", margin: "2px" }}>
                  Total price:{" "}
                  {basketItems?.items.reduce(
                    (total, item) => total + item.unitPrice * item.quantity,
                    0
                  )}{" "}
                  TL
                </div>
                {basketItems?.discount != null ? (
                  <div
                    style={{ fontSize: "16px", margin: "2px", color: "green" }}
                  >
                    Discount: -
                    {basketItems?.discount
                      ? basketItems.discount.isPercent
                        ? (
                            (basketItems?.items.reduce(
                              (total, item) =>
                                total + item.unitPrice * item.quantity,
                              0
                            ) *
                              basketItems.discount.discountAmount) /
                            100
                          ).toFixed(2)
                        : basketItems.discount.discountAmount.toFixed(2)
                      : (0).toFixed(2)}
                    TL
                  </div>
                ) : null}

                <Divider />
                <div>
                  <Title level={4}>
                    Total: {basketItems?.totalPrice.toFixed(2)} TL
                  </Title>
                </div>
              </div>
              <Col span={12}>
                <Button
                  href="/orders/checkout"
                  type="primary"
                  block
                  style={{ marginTop: "16px" }}
                >
                  Make Purchase
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Basket;
