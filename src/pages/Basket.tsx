import React, { useState, useEffect } from "react";
import { List, Button, InputNumber, Row, Col, Card, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { BasketResponse } from "../types/Product"; 
import { useQuery } from "@tanstack/react-query";
import { fetchAllBaskets } from "../services/BasketService";

const { Title } = Typography;



const Basket: React.FC = () => {
  const [basketItems, setBasketItems] = useState<BasketResponse>() ?? [];

  const basketQuery = useQuery({
    queryKey: ["basket"],
    queryFn: () =>fetchAllBaskets(),
  });

  useEffect(() => {
    if (basketQuery.isSuccess) {
      setBasketItems(basketQuery.data);
    }
  }, [basketQuery.data, basketQuery.isSuccess]);




  const handleQuantityChange = (id: number, value: number | null) => {
    // const updatedBasket = basketItems.basketData.map((item) =>
    //   item.basketData.productID === id && value !== null
    //     ? {
    //         ...item,
    //         quantity: value,
    //         totalPrice: value * item.product.unitPrice,
    //       }
    //     : item
    // );
    // setBasketItems(updatedBasket);
    // saveBasketToStorage(updatedBasket);
  };

  const handleRemove = (id: number) => {
    // const updatedBasket = basketItems.filter((item) => item.product.productID !== id);
    // setBasketItems(updatedBasket);
    // saveBasketToStorage(updatedBasket);
  };

  // const totalBasketPrice = basketItems.reduce(
  //   (total, item) => total + item.totalPrice,
  //   0
  // );

  // const handleBuy = () => {
  //   const token = localStorage.getItem("authToken");

  //   const orderDetail :OrderDetail[] = basketItems?.basketData.map((item) => {
  //     return {
  //       productID: item.productID,
  //       unitPrice: item.unitPrice,
  //       quantity: item.quantity,
  //       discount: 0,
  //     };
  //   });

  //   const sendOrder :CreateOrder ={
  //     token: token ? token : "",
  //     orderDetails: orderDetail,
  //     orderDate: new Date(),
  //   };
  //   // addOrderMutation.mutate(sendOrder);
   
  // }
  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      <Col span={16}>
        <Card title="Your Basket" bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={basketItems?.product}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.product.productID, value)}
                  />,
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(item.product.productID)}
                  >
                    Sil
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<img src="https://random.imagecdn.app/200/100" alt={item.product.productName} />}
                  title={item.product.productName}
                  description={`Birim Fiyatı: ${item.product.unitPrice} ₺`}
                />
                <div>{item.quantity * item.product.unitPrice} ₺</div>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card title="Order" bordered={false}>
          <Title level={4}>Total: {basketItems?.totalPrice} ₺</Title>
          <Button type="primary" block >
            Buy
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Basket;
