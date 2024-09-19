import React from "react";
import { Card, Button, Typography, Row, Col, notification } from "antd";
import { BasketRequest, Product } from "../types/Product";
import { useMutation } from "@tanstack/react-query";
import uuid from 'react-uuid';
import { addBasketService } from "../services/BasketService";

const { Meta } = Card;
const { Title, Text } = Typography;

type ProductCardProps = {
  product: Product;
  imgPath: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, imgPath }) => {
  const addBasketMutation = useMutation({
    mutationFn:  addBasketService,
    onSuccess: () => {
      notification.success({
        message: "Success",
        description: `${product.productName} added to cart`,
      });
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while adding to cart",
      });
    }
    


    
  });
  const addBasket = () => {
    
    const basket: BasketRequest[] = [{
      basketID: uuid(),
      productID: product.productID,
      quantity: 1,
    }];
    addBasketMutation.mutate(basket);
  };

  return (
    <Card
      hoverable
      style={{
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
        border: "1px solid #d9d9d9",
        width: "100%", // Kart genişliği
        maxWidth: "300px", // Kartın maximum genişliği
        height: "100%", // Kart yüksekliği
        maxHeight: "400px", // Kartın maximum yüksekliği
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      cover={
        <img
          alt={product.productName}
          src={imgPath}
          style={{
            height: "200px", 
            objectFit: "cover",
            width: "100%", 
          }}
        />
      }
    >
      <Meta
        description={
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <Title level={4} style={{ marginBottom: "5px" }}>
              {product.productName}
            </Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {product.category?.categoryName??'Category'}
            </Text>
            <Row style={{ marginTop: "10px" }}>
              <Col span={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  {product.unitPrice} ₺
                </Text>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#00b894",
                    borderColor: "#00b894",
                    borderRadius: 20,
                    width: "100%",
                  }}
                  onClick={() => addBasket()}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
