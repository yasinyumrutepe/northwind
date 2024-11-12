import React, { useState } from "react";
import { Form, Input, Button, Upload, Row, Col, Card, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct } from "../../services/ProductService";
import { useMutation } from "@tanstack/react-query";
import {
  errorNotification,
  successNotification,
} from "../../config/notification";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { Category } from "../../types/Category";
import { VariantType } from "../../types/Variant";
import { useFetchVariants } from "../../hooks/useFetchColor";

const { Option } = Select;
interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[];
}
const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>([]);
  const [variant, setVariant] = useState<VariantType[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<number[]>([]); // Added color state
  const fetchCategory = useFetchCategories();
  const variantQuery = useFetchVariants();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      successNotification(
        "Product Added",
        `Product ${newProduct.productName} has been added!`
      );
    },
    onError: () => {
      errorNotification(
        "An error occurred",
        "An error occurred while adding the product"
      );
    },
  });

  React.useEffect(() => {
    if (fetchCategory.isSuccess && fetchCategory.data.data) {
      setCategories(fetchCategory.data.data);
      buildCategoryTree(fetchCategory.data.data);
    }
    if (variantQuery.isSuccess && variantQuery.data) {
      setVariant(variantQuery.data);
    }
  }, [
    fetchCategory.isSuccess,
    fetchCategory.data,
    variantQuery.isSuccess,
    variantQuery.data,
  ]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const onFinish = (values: any) => {
    if (fileList.length === 0) {
      errorNotification("No Image", "Please upload at least one image");
      return;
    }

    if (selectedSize.length === 0) {
      errorNotification("No Size", "Please select at least one size");
      return;
    }

    if (selectedColor.length === 0) {
      errorNotification("No Color", "Please select at least one color");
      return;
    }

    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("categories", values.category);
    formData.append("unitPrice", values.unitPrice);
    formData.append("stock", values.stock);
    formData.append("description", values.description);
    formData.append("size", selectedSize.join(","));
    formData.append("color", selectedColor.join(","));
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    addProductMutation.mutate(formData);
  };



  const handleSizeChange = (value: number) => {
    const selectedVariantID = variant.find(
      (v) => v.variantID === value
    )?.variantID;
    if (selectedVariantID) {
      setSelectedSize(
        selectedSize.includes(value)
          ? selectedSize.filter((size) => size !== value)
          : [...selectedSize, value]
      );
    }
  };
  const buildCategoryTree = (categories: Category[]): CategoryTreeNode[] => {
    const categoryMap: { [key: number]: CategoryTreeNode } = {};
  
    categories.forEach(category => {
      categoryMap[category.categoryID] = { ...category, children: [] };
    });
  
    const tree: CategoryTreeNode[] = [];
  
    categories.forEach(category => {
      if (category.parent_ID === null) {
        tree.push(categoryMap[category.categoryID]);
      } else {
        const parentCategory = categoryMap[category.parent_ID];
        if (parentCategory) {
          parentCategory.children!.push(categoryMap[category.categoryID]);
        }
      }
    });
    setCategoryTree(tree);
    return tree;
  };
  const renderCategoryOptions = (categories: CategoryTreeNode[], level = 0): React.ReactNode[] => {
    return categories.reduce<React.ReactNode[]>((acc, category) => {
      acc.push(
        <Select.Option key={category.categoryID} value={category.categoryID}>
          {"- ".repeat(level) + category.name}
        </Select.Option>
      );

      if (category.children && category.children.length > 0) {
        acc = acc.concat(renderCategoryOptions(category.children, level + 1));
      }

      return acc;
    }, []);
  };

  return (
    <Card title="Add Product" style={{ padding: "20px" }}>
      <Button
        type="primary"
        style={{ marginBottom: "10px" }}
        href="/admin/products"
      >
        Back to Products
      </Button>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%", margin: "0" }}
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
              rules={[
                { required: true, message: "Please enter the product name!" },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select a Category"
                optionLabelProp="label"
                mode="multiple"
              >
      {renderCategoryOptions(categoryTree)}
      </Select>
            </Form.Item>

            <Form.Item
              label="Unit Price"
              name="unitPrice"
              rules={[
                { required: true, message: "Please enter the unit price!" },
              ]}
            >
              <Input type="number" placeholder="Unit Price" />
            </Form.Item>

            <Form.Item
              label="Product Stock"
              name="stock"
              rules={[
                { required: true, message: "Please enter the product stock!" },
              ]}
            >
              <Input placeholder="Stock" />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter the product description!",
                },
              ]}
            >
              <Input.TextArea placeholder="Product Description" rows={4} />
            </Form.Item>

            {/* Size Selection */}
            <Form.Item label="Select Size">
              <Row gutter={8}>
                {variant
                  .filter((v) => v.variantGroupName === "Size")
                  .map((size) => (
                    <Col key={size.variantID}>
                      <Button
                        type={
                          selectedSize.includes(size.variantID)
                            ? "primary"
                            : "default"
                        }
                        onClick={() => handleSizeChange(size.variantID)}
                        style={{ width: "80px" }}
                      >
                        {size.variantName}
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Form.Item>

            <Form.Item label="Select Color">
              <Select
                placeholder="Select Color"
                onChange={(value) => setSelectedColor([value])}
              >
                {variant
                  .filter((v) => v.variantGroupName === "Color")
                  .map((color) => (
                    <Option
                      key={color.variantID}
                      value={color.variantID}
                      style={{ backgroundColor: color.hexCode }}
                    >
                      {color.variantName}
                    </Option>
                  ))}
              </Select>
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
