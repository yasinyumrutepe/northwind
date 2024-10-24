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
import {  useNavigate } from "react-router-dom";
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
    product.productFavorites?.length != 0
  );
  const [review, setReview] = React.useState<number>(0);
  useEffect(() => {
    if (product.productReviews?.length != 0) {
      const lenght = product.productReviews?.length ?? 0;
      var rev = 0;
      product.productReviews?.map((review) => {
        rev += review.star;
      });
      setReview(rev / lenght);
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
          categoryName: product.category?.categoryName ?? "Category",
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
        style={{ margin: "10px" }}
        cover={
          <img
            src={product.productImages?.[0]?.imagePath ?? imgPath}
            className=""
            alt="..."
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
            color="default"
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
