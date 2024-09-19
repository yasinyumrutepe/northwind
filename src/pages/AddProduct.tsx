import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, notification, Select, Upload, Row, Col, Typography } from 'antd';
import { createProduct } from '../services/ProductService';
import { CreateProduct } from '../types/Product';
import { UploadOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../state/CategoryState';

const { Title } = Typography;
const { Option } = Select;

const AddProduct: React.FC = () => {
  const categories = useRecoilValue(categoryState);


  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
    
      notification.success({
        message: 'Product Added Successfully!',
        description: `${newProduct.productName} has been added.`,
      });
    },
    onError: () => {
      notification.error({
        message: 'Failed to Add Product!',
        description: 'An error occurred. Please try again.',
      });
    },
  });

  const onFinish = (values: any) => {
    const product: CreateProduct = {
      productName: values.productName,
      categoryID: parseInt(values.category, 10), // Convert category to int
      unitPrice: parseFloat(values.unitPrice), // Convert unitPrice to float
      quantityPerUnit: values.quantityPerUnit,
   
    };

    addProductMutation.mutate(product); // Perform product addition
  };

  return (
    <div>
      <Title level={4}>Add Product</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Product Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevent automatic upload
                showUploadList={true}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Images</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: 'Please enter the product name!' }]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select placeholder="Select Category">
                {categories.map((category) => (
                  <Option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Unit Price"
              name="unitPrice"
              rules={[{ required: true, message: 'Please enter the unit price!' }]}
            >
              <Input type="number" placeholder="Unit Price" />
            </Form.Item>

            <Form.Item
              label="Quantity Per Unit"
              name="quantityPerUnit"
              rules={[{ required: true, message: 'Please enter the quantity per unit!' }]}
            >
              <Input placeholder="Quantity Per Unit" />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the product description!' }]}
            >
              <Input.TextArea placeholder="Product Description" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Add Product
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddProduct;
