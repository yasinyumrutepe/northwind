import { Divider, Typography } from 'antd';
import React from 'react';
const { Title, Paragraph } = Typography;

interface ProductDetailProps {
    productDescription: string;
  }


const ProductDescription: React.FC<ProductDetailProps> = ({ productDescription }) =>{

    return (
       <div style={{minWidth:'1100px',minHeight:'300px'}} >
        <Title level={3}>Product Description</Title>
        <Divider />
        <Paragraph>
            {productDescription}
        </Paragraph>
       
       </div>
    )


}

export default ProductDescription