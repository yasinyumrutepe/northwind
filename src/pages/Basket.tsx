import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Typography,
  Input,
  Divider,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BasketRequest, UpdateQuantityType } from "../types/Product";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addCampaign,
  deleteBasket,
  fetchAllBaskets,
  updateQuantity,
} from "../services/BasketService";
import { Campaign } from "../types/Campaign";
import { createOrder } from "../services/OrderService";
import { errorNotification, successNotification } from "../config/notification";

const { Title, Text } = Typography;

const Basket: React.FC = () => {
  const [basketItems, setBasketItems] = useState<BasketRequest>() ?? [];
  const [discountCode, setDiscountCode] = useState<string>("");
  const [campaign, setCampaign] = useState<Campaign>() ?? null;

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
      errorNotification("Error", "An error occurred while removing item from cart");
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
        setCampaign({ campaignName: "", discountAmount: 0, isPercent: false });
      } else {
        setDiscountCode(basket.discount.campaignName);
        setCampaign(basket.discount);
      }
    },

    onError: () => {
      errorNotification("Error", "An error occurred while applying discount");
    },
  });

  const addOrderMutation = useMutation({
    mutationFn: () => createOrder(),
    onSuccess: () => {
      successNotification("Success", "Order added successfully");
    },
    onError: () => {
      errorNotification("Error", "An error occurred while adding order");
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
  }, [basketQuery.isSuccess, basketQuery.data,setBasketItems]);

  const applyDiscount = () => {
    addCampaignMutation.mutate(discountCode);
  };

  const handleQuantityChange = (id: number, value: number | null) => {
    updateQuantityMutation.mutate({ productID: id, quantity: value ?? 1 });
  };

  const handleRemove = (id: number) => {
    console.log("Removing item with ID:", id);
    deleteBasketMutation.mutate(id);
  };

  const addOrder = () => {
    addOrderMutation.mutate();
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      <Col span={16}>
        <Card title="Your Basket" bordered={false}>
          {basketItems?.items?.map((item) => (
            <Card key={item.productID} style={{ marginBottom: "16px" }}>
              <Row align="middle">
                <Col span={8}>
                  <img
                    src={item.images[0]?.imagePath ?? ""}
                    alt={item.productName}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col span={8} offset={8} style={{ paddingLeft: "16px" }}>
                  <Card.Meta
                    title={item.productName}
                    description={`Birim Fiyatı: ${item.unitPrice} ₺`}
                  />
                  <div style={{ marginTop: 10 }}>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) =>
                        handleQuantityChange(item.productID, value)
                      }
                      style={{ marginRight: 8 }}
                    />
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(item.productID)}
                    >
                      Sil
                    </Button>
                  </div>
                  <Text strong style={{ marginTop: 10 }}>
                    Toplam: {item.totalPrice} ₺
                  </Text>
                </Col>
              </Row>
            </Card>
          ))}
        </Card>
      </Col>

      <Col span={8}>
        <Card title="Order Summary" bordered={false}>
          <div style={{ marginBottom: 10 }}>
            <List
              bordered
              dataSource={basketItems?.items}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>{item.productName}</Typography.Text>
                  <Typography.Text style={{ marginLeft: "auto" }}>
                    {item.quantity} pcs{" "}
                  </Typography.Text>
                  <Typography.Text style={{ marginLeft: "16px" }}>
                    {item.unitPrice * item.quantity} ₺
                  </Typography.Text>
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <Row gutter={8} style={{ marginBottom: 10 }}>
            <Col span={16}>
              <Input
                placeholder="Promo Code"
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

          {campaign?.discountAmount ? (
            <>
              <Divider />
              <Title level={5}>
                Discount:{" "}
                {campaign?.isPercent
                  ? "%" + campaign.discountAmount
                  : campaign?.discountAmount + "₺"}
              </Title>
            </>
          ) : (
            <></>
          )}
          <Divider />
          <Title level={4}>Total: {basketItems?.totalPrice} ₺</Title>
          <Divider />
          <Button
            type="primary"
            block
            style={{ marginTop: 10 }}
            onClick={addOrder}
          >
            Buy
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Basket;
