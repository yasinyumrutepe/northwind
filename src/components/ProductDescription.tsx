import { Divider, Typography, Row, Col } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface ProductDetailProps {
  productDescription: string;
}

const ProductDescription: React.FC<ProductDetailProps> = ({ productDescription }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 24]}>
        <Col xs={24}>
          <Title level={3}>Product Description</Title>
          <Divider />
          <Paragraph style={{ fontSize: '14px' }}>
            {productDescription}
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDescription;
