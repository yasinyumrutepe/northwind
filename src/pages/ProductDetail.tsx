import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Divider,
  notification,
} from "antd";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";
import { useFetchProduct } from "../hooks/useFetchProducts";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { categoryState } from "../state/CategoryState";

const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
  const { productid } = useParams();
  const productID = Number(productid);
  const [product, setProduct] = useState<Product | null>(null);
  const categoryRecoilData = useRecoilValue(categoryState);
  const productDetail = useFetchProduct(productID);

  useEffect(() => {
    if (productDetail.isSuccess && productDetail.data) {
        const category = categoryRecoilData.find((category) => 
            category.categoryID === productDetail.data.categoryID
          ) ?? undefined;
          
          productDetail.data.category = category;
      setProduct(productDetail.data);
    }
  }, [productDetail.isSuccess, productDetail.data,categoryRecoilData]);

  if (productDetail.isPending) {
    return <Loading />;
  }

  if (productDetail.isError) {
    notification.error({
      message: "Error",
      description: "An error occurred while fetching product",
    });
    return null;
  }

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col xs={24} md={24}>
        <Card bordered={false}>
          {product && (
            <Row gutter={16}>
              <Col span={12}>
                <img
                  alt={product.productName}
                  src={"https://random.imagecdn.app/300/200"}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Col>
              <Col span={12}>
                <Title level={3}>{product.productName}</Title>
                <Text type="secondary">
                  {product.category?.categoryName ?? "Category Name"}
                </Text>
                <Divider />
                <Title level={4}>Price: {product.unitPrice} ₺</Title>
                <Divider />
                <Text>{"Description"}</Text>
                <Divider />
                <Button
                  type="primary"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                  }}
                >
                  Add to Basket
                </Button>
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;
