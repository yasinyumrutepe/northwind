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
 } from "antd";
 import { UploadOutlined } from "@ant-design/icons";
 import { useParams } from "react-router-dom";
 import { ProductImage, UpdateProductRequest } from "../../types/Product";
 import TextArea from "antd/es/input/TextArea";
 import { useFetchProduct } from "../../hooks/useFetchProducts";
 import { useFetchCategories } from "../../hooks/useFetchCategories";
 import { Category } from "../../types/Category";
 import Loading from "../../components/Loading";
 import { useMutation } from "@tanstack/react-query";
 import { deleteImage, uploadImageApi } from "../../services/ImageService";
 import { updateProduct } from "../../services/ProductService";
 import { useFetchAuthorization } from "../../hooks/useFetchAuthorization";
 import {
   errorNotification,
   successNotification,
 } from "../../config/notification";
 import { VariantType } from "../../types/Variant";
 import { useFetchVariants } from "../../hooks/useFetchColor";





 const { Option } = Select;
 interface CategoryTreeNode extends Category {
   children?: CategoryTreeNode[];
 }
 const UpdateProduct: React.FC = () => {
   const { productid } = useParams();
   const productID = Number(productid);

   const [form] = Form.useForm();
   const [imageList, setImageList] = useState<any[]>([]);
   const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
   const [variant, setVariant] = useState<VariantType[]>([]);
   const [selectedSize, setSelectedSize] = useState<number[]>([]);
   const [selectedColor, setSelectedColor] = useState<number[]>([]); // Added color state
   const productQuery = useFetchProduct(productID);
   const categoriesQuery = useFetchCategories();
   const isAuthorized = useFetchAuthorization();
   const variantQuery = useFetchVariants();
   const uploadImageMutation = useMutation({
     mutationFn: uploadImageApi,
     onSuccess: (uploadResponse) => {
       successNotification("Success", "Image uploaded successfully");
       addedImage(uploadResponse);
     },
     onError: () => {
       errorNotification("Error", "An error occurred while uploading image");
     },
   });

   const deleteImageMutation = useMutation({
     mutationFn: (imageID: number) => deleteImage(imageID),
     onSuccess: (deleteResponse) => {
       if (deleteResponse.success) {
         successNotification("Success", "Image deleted successfully");
         setImageList(
           imageList.filter((image) => image.name !== deleteResponse.imageID)
         );
       }
     },
     onError: () => {
       errorNotification("Error", "An error occurred while deleting image");
     },
   });

   const updateProductMutation = useMutation({
     mutationFn: (product: UpdateProductRequest) => updateProduct(product),
     onSuccess: (updatedProduct) => {
       successNotification("Success", "Product updated successfully");

       form.setFieldsValue({
         productName: updatedProduct.productName,
         unitPrice: updatedProduct.unitPrice,
         categories: updatedProduct.productCategories,
         description: updatedProduct.description,
         unitsInStock: updatedProduct.unitsInStock,
       });

       window.location.href = "/admin/products";
     },
     onError: () => {
       errorNotification("Error", "An error occurred while updating product");
     },
   });

   useEffect(() => {
     if (productQuery.isSuccess) {
       const productData = productQuery.data;
       productData.productCategories?.map((category) => {
         setSelectedCategory((prevCategory) => [...prevCategory, category.categoryID]);
         return null; 
       });
       form.setFieldsValue({
         productName: productData.productName,
         unitPrice: productData.unitPrice,
         categories: productData.categoryID,
         description: productData.description,
         unitsInStock: productData.unitsInStock,
        
    
       });

       productData.productVariants?.map((variant) => {
         if (variant.variant.variantGroupName === "Size") {
           setSelectedSize((prevSize) => [...prevSize, variant.variantID]);
         } else if (variant.variant.variantGroupName === "Color") {
           setSelectedColor((prevColor) => [...prevColor, variant.variantID]);
         }
         return null; 
       });


       const formattedImages = productData.productImages?.map(
         (image: ProductImage) => ({
           uid: image.imagePublicID.toString(),
           name: image.productImageID,
           status: "done",
           url: image.imagePath,
         })
       );

       setImageList(formattedImages ?? []);
     }
     if (categoriesQuery.isSuccess) {
       buildCategoryTree(categoriesQuery.data?.data);
     }
     if (variantQuery.isSuccess && variantQuery.data) {
       setVariant(variantQuery.data);
     }
   }, [
     productQuery.isSuccess,
     productQuery.data,
     form,
     categoriesQuery.isSuccess,
     categoriesQuery.data?.data,
     variantQuery.isSuccess,
     variantQuery.data,
   ]);

   if (isAuthorized.isLoading) {
     return <Loading />;
   }
   if (productQuery.isLoading) {
     return <Loading />;
   }

   const onFinish = (values: any) => {

     console.log("Values", values);





     var updatedProduct: UpdateProductRequest = {
       productID: productID,
       productName: values.productName,
       categories: values.categories,
       unitPrice: values.unitPrice,
       unitsInStock: values.unitsInStock,
       description: values.description,
       sizes: selectedSize,
       colors: selectedColor[0],
     };
     updateProductMutation.mutate(updatedProduct);
   };

   const removeImage = (file: any) => {
     deleteImageMutation.mutate(Number(file.name));
   };

   const uploadImage = (file: any, productID: number) => {
     var newImageData = new FormData();
     newImageData.append("images", file);
     newImageData.append("productID", productID.toString());
     uploadImageMutation.mutate(newImageData);
     return false;
   };
   const addedImage = (images: ProductImage[]) => {
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
   function buildCategoryTree(categories: Category[]): CategoryTreeNode[] {
    const categoryMap: { [key: number]: CategoryTreeNode } = {};
    if (!categories) {
      return [];
    }
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
  }
   const renderCategoryOptions = (
     categories: CategoryTreeNode[],
     level = 0
   ): React.ReactNode[] => {
     return categories.reduce<React.ReactNode[]>((acc, category) => {
       acc.push(
         <Select.Option key={category.categoryID} value={category.categoryID}>
         <span style={{ paddingLeft: `${level * 12}px` }}>{category.name}</span>
       </Select.Option>
       );

       if (category.children && category.children.length > 0) {
         acc = acc.concat(renderCategoryOptions(category.children, level + 1));
       }

       return acc;
     }, []);
   };

   return (
     <Card title="Update Product">
       <Button type="primary" href="/admin/products">
         Back to Products
       </Button>
       <Row gutter={24}>
         <Col span={24}>
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
                   onRemove={(file) => removeImage(file)}
                   beforeUpload={(file) => uploadImage(file, productID)}
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
                 name="categories"
                 rules={[
                   { required: true, message: "Please select  category" },
                 ]}
              
               >
                 <Select
                   style={{ width: "100%" }}
                   placeholder="Select  Category"
                   optionLabelProp="label"
                   mode="multiple"
                   defaultValue={selectedCategory}
                 >
                   {renderCategoryOptions(categoryTree)}
                 </Select>
               </Form.Item>
             </Card>
             <Card title="Stock" style={{ marginTop: "10px" }}>
               <Form.Item
                 label="Stock"
                 name="unitsInStock"
                 rules={[
                   { required: true, message: "Please enter product stock" },
                 ]}
               >
                 <InputNumber
                   min={0}
                   step={1}
                   style={{ width: "100%" }}
                   placeholder="Enter product stock"
                 />
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
             <Card title="Variants">
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
                       selected={selectedColor.includes(color.variantID)}
                     >
                       {color.variantName}
                     </Option>
                   ))}
               </Select>
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
     </Card>
   );
 };

 export default UpdateProduct;


