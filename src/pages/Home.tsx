import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button} from "antd";
import { useFetchProducts } from "../hooks/useFetchProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import CarouselComponent from "../components/Carousel";
import { errorNotification } from "../config/notification";
import FilterComponent from "../components/Filter";

const Home: React.FC = () => {
  const [filters, setFilters] = useState({
    paginatedRequest: {
      page: 1,
      limit: 3,
    },
    orberByKey: "",
    productFilterKeys: {
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      colors: [],
      sizes: [],
      ratings: [],
    },
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const fetchProductQuery = useFetchProducts(filters);

  useEffect(() => {
    if (fetchProductQuery.isSuccess) {
      if (fetchProductQuery.data?.data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      if (filters.paginatedRequest.page === 1) {
        setProducts(fetchProductQuery.data.data);
      } else {
        setProducts((prev) => [...prev, ...fetchProductQuery.data.data]);
      }
    }
  
    if (fetchProductQuery.isError) {
      setHasMore(false);
      errorNotification("Error", "An error occurred while fetching products");
    }
  }, [
    fetchProductQuery.isSuccess,
    fetchProductQuery.isError,
    filters.paginatedRequest.page,
    fetchProductQuery.data?.data, // Eksik bağımlılık eklendi
  ]);


  const nextPage = () => {
    if (hasMore) {
      setFilters((prev) => ({
        ...prev,
        paginatedRequest: {
          page: prev.paginatedRequest.page + 1,
          limit: prev.paginatedRequest.limit,
        },
      }));
    }
  };
  const handleFilter = () => {
    setProducts([]);
    setHasMore(true);
    fetchProductQuery.refetch();
  };
  const handleSort = (key: string) => {
    setFilters({
      ...filters,
      paginatedRequest: {
        page: 1,
        limit: 3,
      },
      orberByKey: key,
    });

    setProducts([]);
    setHasMore(true);
    fetchProductQuery.refetch();
  };
  
  return (
  
    <InfiniteScroll
      dataLength={products.length}
      next={nextPage}
      hasMore={hasMore}
      loader={<p>Product Loading...</p>}
    >
      <div >
        <Row gutter={[12, 24]}>
          <Col span={24}>
            {/* <CarouselComponent /> */}
          </Col>
          <Row>
            <Col offset={1}  span={5}>
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            handleFilter={handleFilter}
          />
          </Col>
          <Col span={17}  >
            <Row>
              <Col span={24}>
                <Card>
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleSort("priceAsc")}
                  >
                    Price Ascending
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleSort("priceDesc")}
                  >
                    Price Descending
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleSort("newest")}
                  >
                    Newest
                  </Button>
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleSort("bestSelling")}
                  >
                    Best Selling
                  </Button>
                </Card>
              </Col>
              {products.map((product: Product) => (
                <Col key={product.productID} xs={24} sm={16} md={16} lg={8}>
                  <ProductCard product={product} imgPath={"error"} />
                </Col>
              ))}
            </Row>
          </Col>
          </Row>
        </Row>
      </div>
    </InfiniteScroll>
 
  );
};

export default Home;
