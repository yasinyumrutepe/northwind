import React, { useState, useEffect } from "react";
import { Image, Row, Col, Typography, Button, Divider, Card, Tabs, Rate } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { BasketRequest, Product } from "../types/Product";
import { useParams } from "react-router-dom";
import { useFetchProduct } from "../hooks/useFetchProducts";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { categoryState } from "../state/CategoryState";
import uuid from "react-uuid";
import { useMutation } from "@tanstack/react-query";
import { addBasketService } from "../services/BasketService";
import { errorNotification, successNotification } from "../config/notification";
import type { TabsProps } from 'antd';
import ReviewOrder from "../components/RewiewOrder";
import ProductDescription from "../components/ProductDescription";
const { Title, Text, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { productid } = useParams();
  const productID = Number(productid);
  const [product, setProduct] = useState<Product>();
  const [productRates, setProductRates] = useState<number>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const categoryRecoilData = useRecoilValue(categoryState);
  const productDetail = useFetchProduct(productID);
  const addBasketMutation = useMutation({
    mutationFn: addBasketService,
    onSuccess: () => {
      successNotification("Success", "Product added to cart successfully");
    },
    onError: () => {
      errorNotification("Error", "An error occurred while adding the product to cart");
    },
  });

  useEffect(() => {
    if (productDetail.isSuccess && productDetail.data) {
      const category = categoryRecoilData.find((category) =>
        category.categoryID === productDetail.data.categoryID
      ) ?? undefined;
      productDetail.data.category = category;
      setProduct(productDetail.data);
      if (productDetail.data.productReviews && productDetail.data.productReviews.length > 0) {
        var rates = 0;
        productDetail.data.productReviews?.map((review) => {
          rates += review.star;
  
        });
        setProductRates(rates/productDetail.data.productReviews.length);
      }
     
      
      if (productDetail.data.productImages && productDetail.data.productImages.length > 0) {
        setSelectedImage(productDetail.data.productImages[0].imagePath);
      }
    }
  }, [productDetail.isSuccess, productDetail.data, categoryRecoilData]);

  if (productDetail.isPending) {
    return <Loading />;
  }

  if (productDetail.isError) {
    errorNotification("Error", "An error occurred while fetching product details");
    return null;
  }

  const addBasket = () => {
    const basket: BasketRequest = {
      basketID: uuid(),
      items: [
        {
          productID: product?.productID ?? 0,
          productName: product?.productName ?? '',
          categoryID: product?.categoryID ?? 0,
          categoryName: product?.category?.categoryName ?? 'Category',
          unitPrice: product?.unitPrice ?? 0,
          quantity: 1,
          totalPrice: product?.unitPrice ?? 0,
          images: product?.productImages ?? [],
          discount: 0,
        },
      ],
      totalPrice: product?.unitPrice ?? 0,
    };
    addBasketMutation.mutate(basket);
  };



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Details',
      children: <ProductDescription productDescription={product?.description || ''} />,
    },
    {
      key: '2',
      label: 'Reviews',
      children: <ReviewOrder productReview={product?.productReviews || []} />,
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Row gutter={[16, 32]}>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'center' }}>
            <Image
              src={selectedImage || ""}
              alt="Selected Product Image"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxHeight: '500px',
                minHeight: '300px',
              }}
            />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              {product?.productImages?.map((image) => (
                <div
                  key={image.productImageID}
                  onClick={() => setSelectedImage(image.imagePath)}
                  style={{
                    cursor: 'pointer',
                    border: selectedImage === image.imagePath ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    padding: '5px',
                    margin: '0 5px'
                  }}
                >
                  <Image
                    src={image.imagePath}
                    alt={`Thumbnail ${image.productImageID}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    preview={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ padding: '20px', minHeight: '300px' }}>
            <Title level={2}>{product?.productName}</Title>
            <Rate  value={productRates} disabled />
            <Text type="secondary">Category: {product?.category?.categoryName}</Text>
            <Paragraph>
              <Text strong>Quantity Per Unit:</Text> {product?.quantityPerUnit}
            </Paragraph>
            <Divider />
            <Title level={3} style={{ color: '#ff4d4f' }}>{product?.unitPrice} ₺</Title>
            <Paragraph>{product?.description}</Paragraph>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={addBasket}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Card style={{ minHeight: '200px', overflow: 'auto' }}>
            <Tabs defaultActiveKey="1" items={items}  />
          </Card>
        </Col>
      </Row>

    
    </div>
  );
};

export default ProductDetail;
