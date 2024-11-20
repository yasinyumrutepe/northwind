import React, { useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  notification,
  Rate,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { BasketRequest, Product } from "../types/Product";
import { useMutation } from "@tanstack/react-query";
import uuid from "react-uuid";
import { addBasketService } from "../services/BasketService";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
} from "../services/ProductFavorite";
import { errorNotification, successNotification } from "../config/notification";

const { Title, Text } = Typography;

type ProductCardProps = {
  product: Product;
  imgPath: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, imgPath }) => {
  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = React.useState<boolean>(
    product.productFavorites?.length !== 0
  );
  const [review, setReview] = React.useState<number>(0);

  useEffect(() => {
    if (product.productReviews?.length !== 0) {
      const length = product.productReviews?.length ?? 0;
      let rev = 0;
      product.productReviews?.forEach((review) => {
        rev += review.star;
      });
      setReview(rev / length);
    } else {
      setReview(0);
    }
  }, [product.productReviews]);

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteProduct,
    onSuccess: () => {
      successNotification("Success", "Added to favorites");
      setIsFavorited(true);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while adding to favorites",
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: deleteFavoriteProduct,
    onSuccess: () => {
      successNotification("Success", "Removed from favorites");
      setIsFavorited(false);
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while removing from favorites",
      });
    },
  });

  const addBasketMutation = useMutation({
    mutationFn: addBasketService,
    onSuccess: () => {
      successNotification("Success", "Added to cart");
    },
    onError: () => {
      errorNotification("Error", "An error occurred while adding to cart");
    },
  });

  const addBasket = () => {
    const basket: BasketRequest = {
      basketID: uuid(),
      items: [
        {
          productID: product.productID,
          productName: product.productName,
          categoryID: product.categoryID,
          categoryName: product.category?.name ?? "Category",
          unitPrice: product.unitPrice,
          quantity: 1,
          totalPrice: product.unitPrice,
          images: product.productImages ?? [],
          discount: 0,
        },
      ],
      totalPrice: product.unitPrice,
    };
    addBasketMutation.mutate(basket);
  };

  const toggleFavorite = () => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/login";
      return;
    }
    if (isFavorited) {
      removeFavoriteMutation.mutate(product.productID);
    } else {
      addFavoriteMutation.mutate(product.productID);
    }
  };

  const goToProductDetail = () => {
    navigate(`/product/${product.productID}`);
  };

  return (
    <Card
      style={{
        margin: "10px",
        width: "100%",
        maxWidth: "300px", // Masaüstünde 300px genişlik ile sınırlı
      }}
      className="product-card" // className ekleyerek stil uygulama
      cover={
        <img
          src={product.productImages?.[0]?.imagePath ?? imgPath}
          alt="Product"
          className="product-image"
          onClick={goToProductDetail}
        />
      }
    >
      <Title
        level={5}
        onClick={goToProductDetail}
        style={{
          maxHeight: "60px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {product.productName}
      </Title>
      <div style={{ marginBottom: "15px" }}>
        <Row>
          <Col span={24}>
            <Rate disabled value={review} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong> {product.unitPrice} ₺</Text>
          </Col>
        </Row>
      </div>
      <Button.Group style={{ width: "100%" }}>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={addBasket}
          disabled={product.unitsInStock === 0}
        >
          <ShoppingCartOutlined />
        </Button>
        <Button
          style={{ width: "100%" }}
          onClick={toggleFavorite}
          icon={
            isFavorited ? (
              <HeartFilled style={{ color: "#ff4757" }} />
            ) : (
              <HeartOutlined style={{ color: "#ff4757" }} />
            )
          }
        />
      </Button.Group>
    </Card>
  );
};

export default ProductCard;

const styles = `
  .product-card {
    transition: all 0.3s ease;
  }
  @media (max-width: 768px) {
    .product-card {
      max-width: 100%; /* Mobilde genişliği %100 yap */
      margin: 5px auto; /* Mobilde ortala */
    }
    .product-image {
      max-height: 300px; /* Görsel boyutunu mobilde küçült */
      object-fit: contain; /* Görsel oranını koru */
    }
    .ant-card-body {
      padding: 10px; /* Mobilde daha az boşluk */
    }
    .ant-typography {
      font-size: 14px; /* Yazı boyutunu mobilde küçült */
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
