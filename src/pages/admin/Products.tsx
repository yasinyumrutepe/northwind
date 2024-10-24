import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, List, Rate, Skeleton } from "antd";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { Product } from "../../types/Product";
const AdminProducts = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<Product[]>([]);

  const fetchProductQuery = useFetchProducts();

  useEffect(() => {
    if (!fetchProductQuery.isLoading) {
      setInitLoading(false);
    }
    if (fetchProductQuery.isSuccess) {
      setList(fetchProductQuery.data?.data ?? []);
    }
  }, [fetchProductQuery.isLoading, fetchProductQuery.isSuccess, fetchProductQuery.data?.data]);

  return (
    <Card title="Products">
      <Button
        href="/admin/product/add"
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>

      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                href={`/admin/product/update/${item.productID}`}
                key="list-loadmore-edit"
              >
                Edit
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.productImages?.[0]?.imagePath ?? ""} />
                }
                title={
                  <a href={`/product/${item.productID}`}>{item.productName}</a>
                }
                description={item.description}
              />
              <div>
                <Rate
                  disabled
                  defaultValue={
                    item.productReviews?.reduce(
                      (acc, review) => acc + review.star,
                      0
                    ) ?? 0
                  }
                />
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdminProducts;
