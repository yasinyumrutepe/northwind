import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { useFetchProductsByCategory } from "../hooks/useFetchProducts";
import { errorNotification } from "../config/notification";
import FilterComponent from "../components/Filter";

const CategoryProducts = () => {
  const { slug } = useParams();

  const productsByCategoryQuery = useFetchProductsByCategory({
    slug: slug?.toString() || "",
    page: 1,
    limit: 30,
  });
  if (productsByCategoryQuery.isPending) {
    return <Loading />;
  }
  if (productsByCategoryQuery.isError) {
    errorNotification(
      "An error occurred",
      "An error occurred while fetching products"
    );
  }

  if (productsByCategoryQuery.isSuccess) {
    return (
      <div style={{ padding: "20px" }}>
        <Row gutter={[12, 24]}>
          <Col span={6}>
                <FilterComponent filters={{
              paginatedRequest: {
                page: 0,
                limit: 0
              },
              orberByKey: "",
              productFilterKeys: {
                categories: undefined,
                minPrice: undefined,
                maxPrice: undefined,
                colors: undefined,
                sizes: undefined,
                ratings: undefined
              }
            }} setFilters={undefined} handleFilter={undefined} />
            </Col>
          <Col span={18} flex={"auto"}>
            <Row>
              {productsByCategoryQuery.data?.data?.map((product: Product) => (
                <Col key={product.productID} xs={24} sm={12} md={8} lg={6}>
                  <ProductCard product={product} imgPath={"error"} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  return <></>;
};

export default CategoryProducts;
