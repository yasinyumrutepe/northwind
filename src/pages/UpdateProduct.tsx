import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Upload,
  Card,
  Row,
  Col,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Product, ProductImage } from "../types/Product";
import TextArea from "antd/es/input/TextArea";
import { useFetchProduct } from "../hooks/useFetchProducts";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { Category } from "../types/Category";
import Loading from "../components/Loading";
import { useMutation } from "@tanstack/react-query";
import { deleteImage,uploadImageApi } from "../services/ImageService";
import { updateProduct } from "../services/ProductService";
import { useFetchAuthorization } from "../hooks/useFetchAuthorization";

const { Option } = Select;

const UpdateProduct: React.FC = () => {
  const { productid } = useParams();
  const productID = Number(productid);

  const [form] = Form.useForm();
  const [imageList, setImageList] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const productQuery = useFetchProduct(productID);
  const categoriesQuery = useFetchCategories();
  const isAuthorized = useFetchAuthorization();

  

  const uploadImageMutation = useMutation({
    mutationFn: uploadImageApi,
    onSuccess: (uploadResponse) => {
        notification.success({
          message: "Success",
          description: "Image uploaded successfully",
        });
        addedImage(uploadResponse);
    
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while uploading image",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (imageID: number) => deleteImage(imageID),
    onSuccess: (deleteResponse) => {
      
      if (deleteResponse.success) {
        notification.success({
          message: "Success",
          description: "Image deleted successfully",
        })
        setImageList(imageList.filter((image) => image.name !== deleteResponse.imageID));
      }

    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while deleting image",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (product: Product) => updateProduct( product),
    onSuccess: (updatedProduct) => {
      notification.success({
        message: "Success",
        description: "Product updated successfully",
      });

      form.setFieldsValue({
        productName: updatedProduct.productName,
        unitPrice: updatedProduct.unitPrice,
        categoryID: updatedProduct.categoryID,
        description: updatedProduct.description,
      });

    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "An error occurred while updating product",
      });
    },
  });

  useEffect(() => {

    if (productQuery.isSuccess) {
      const productData = productQuery.data;
      form.setFieldsValue({
        productName: productData.productName,
        unitPrice: productData.unitPrice,
        categoryID: productData.categoryID,
        description: productData.description,
      });

      const formattedImages = productData.productImages?.map(
        (image: ProductImage) => ({
          uid: image.imagePublicID.toString(), // benzersiz ID
          name: image.productImageID, // resim adı
          status: "done", // durum 'done' çünkü resimler zaten yüklendi
          url: image.imagePath, // resmin gösterileceği URL
        })
      );

      setImageList(formattedImages ?? []);
    }
    if (categoriesQuery.isSuccess) {
      setCategories(categoriesQuery.data.data);
    }
  }, [productQuery.isSuccess, productQuery.data, form,categoriesQuery.isSuccess,categoriesQuery.data?.data]);

  if (isAuthorized.isLoading) {
    return <Loading />;
  }
  if (productQuery.isLoading) {
    return <Loading />;
  }


  const onFinish = (values: Product) => {
    console.log(values);
    var updatedProduct:Product = {
      productID: productID,
      productName: values.productName,
      categoryID: values.categoryID,
      unitPrice: values.unitPrice,
      quantityPerUnit: "",
      description: values.description,
    };
    updateProductMutation.mutate(updatedProduct);


  };

  const removeImage = (file: any) => {
  deleteImageMutation.mutate(Number(file.name));
  }

  const uploadImage = (file: any,productID:number) => {
    var newImageData = new FormData();
    newImageData.append("images", file);
    newImageData.append("productID", productID.toString());
    uploadImageMutation.mutate(newImageData);
    return false;

  }
  const addedImage = (images : ProductImage[]) => {
    images.forEach((image: ProductImage) => {
      setImageList((prevImageList) => [
        ...prevImageList,
        {
          uid: image.imagePublicID.toString(),
          name: image.productImageID,
          status: "done",
          url: image.imagePath,
        },
      ]);
    });
  }

  return (
    <div>
      <h2>Update Product</h2>
      <Row gutter={16}>
        <Col span={12} offset={6}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Card>
              <Form.Item
                label="Title"
                name="productName"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter product description",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item
                label="Media"
                name="productImages"
                valuePropName="productImages"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload
                  listType="picture-card"
                  onRemove={(file) => removeImage(file) }
                  beforeUpload={(file) => uploadImage(file,productID)}
                  fileList={imageList}
                  accept="image/*"
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Category"
                name="categoryID"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Select category">
                  <Select.Option value={0}>Select category</Select.Option>
                  {categories.map((category) => (
                    <Option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>

            <Card title="Pricing" style={{ marginTop: "10px" }}>
              <Form.Item
                label="Price (₺)"
                name="unitPrice"
                rules={[
                  { required: true, message: "Please enter product price" },
                ]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  style={{ width: "100%" }}
                  placeholder="Enter product price"
                />
              </Form.Item>
            </Card>
            <Card style={{ marginTop: "10px" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Product
                </Button>
              </Form.Item>
            </Card>
            
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateProduct;
