import { CloseOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input, Space } from 'antd';
import { createCategory, deleteCategory } from '../../services/CategoryService';
import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { useFetchCategories } from '../../hooks/useFetchCategories';
import { errorNotification, successNotification } from '../../config/notification';

const AddCategory = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);

  const categoriesQuery = useFetchCategories();

  useEffect(() => {
    if (categoriesQuery.status === "success") {
      setCategories(categoriesQuery.data.data);
      form.setFieldsValue({ items: categoriesQuery.data.data });
    }
  }, [categoriesQuery.status, categoriesQuery.data, form]);

  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log('Error');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data == 0) {
        errorNotification("Error", "Category is not deleted");
      } else {
        successNotification("Success", "Category is deleted");
      }
    },
    onError: () => {
      errorNotification("Error", "An error occurred while deleting category");
    },
  });

  const onFinish = (values: any) => {
    const newCategories = values.items.map((item: any) => ({
      ...item,
      categoryID: item.categoryID || undefined,
    }));

    addCategoryMutation.mutate(newCategories);
  };

  const handleRemoveCategory = (index: number) => {
    const items = form.getFieldValue('items');
    const itemId = items[index]?.categoryID;
    if (itemId) {
      deleteCategoryMutation.mutate(itemId);
    }
    setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
    form.setFieldsValue({
      items: items.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <Card title="Add Category">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 1000 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => {
                const mainCategory = form.getFieldValue(['items', field.name, 'categoryID']);
                const subCategories = categories.filter(
                  (cat) => cat.mainCategoryID === mainCategory
                );

                return (
                  <Card
                    size="small"
                    title={`Category - ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => handleRemoveCategory(field.name)}
                      />
                    }
                  >
                    <Form.Item
                      label="Main Category"
                      name={[field.name, 'categoryName']}
                      rules={[{ required: true, message: 'Please input main category name!' }]}
                    >
                      <Input />
                    </Form.Item>

                    {/* Alt kategoriler */}
                    <div style={{ paddingLeft: '24px', marginTop: '10px' }}>
                      <h4>Sub Categories</h4>
                      {subCategories.length > 0 ? (
                        subCategories.map((subCat, subIndex) => (
                          <Space
                            key={subIndex}
                            style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                          >
                            <Input
                              defaultValue={subCat.categoryName}
                              placeholder="Sub Category Name"
                              style={{ width: '80%' }}
                              readOnly
                            />
                            <CloseOutlined
                              onClick={() => deleteCategoryMutation.mutate(subCat.categoryID)}
                            />
                          </Space>
                        ))
                      ) : (
                        <p style={{ color: 'gray' }}>No sub categories available.</p>
                      )}
                      <Button
                        type="dashed"
                        onClick={() => form.setFieldsValue({ items: [...categories, { mainCategoryID: mainCategory }] })}
                        block
                      >
                        + Add Sub Category
                      </Button>
                    </div>
                  </Card>
                );
              })}

              <Button type="dashed" onClick={() => add()} block>
                + Add Main Category
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategory;
