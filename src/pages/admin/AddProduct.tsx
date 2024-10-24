import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, Select, Upload, Row, Col,  Card } from 'antd';
import { createProduct } from '../../services/ProductService';
import { UploadOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../../state/CategoryState';
import { useFetchAuthorization } from '../../hooks/useFetchAuthorization';
import Loading from '../../components/Loading';
import { errorNotification, successNotification } from '../../config/notification';

const { Option } = Select;

const AddProduct: React.FC = () => {
  const categories = useRecoilValue(categoryState);
  const [fileList, setFileList] = useState<any[]>([]); // Resimleri tutmak için state

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      successNotification('Product Added', `Product ${newProduct.productName} has been added!`);
    },
    onError: () => {
     errorNotification('An error occurred', 'An error occurred while adding the product');
    },
  });
  const isAuthorized = useFetchAuthorization();
  if (isAuthorized.isLoading) {
    return <Loading />;
  }

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('categoryID', values.category);
    formData.append('unitPrice', values.unitPrice);
    formData.append('stock', values.stock);
    formData.append('description', values.description);
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj); 
    });
  
    addProductMutation.mutate(formData); 
  };
  

  return (
    <Card title="Add Product" style={{ padding: '20px' }}>
      <Button type="primary" style={{ marginBottom: '10px' }} href="/admin/products">
        Back to Products
      </Button>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '100%', margin: '0' }}
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
                listType="picture-card"
                beforeUpload={() => false} 
                fileList={fileList} 
                onChange={handleUploadChange} 
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
              label="Product Stock"
              name="stock"
              rules={[{ required: true, message: 'Please enter the product stock!' }]}
            >
              <Input placeholder="Stock" />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the product description!' }]}
            >
              <Input.TextArea placeholder="Product Description" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddProduct;
