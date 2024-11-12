import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Skeleton } from "antd";
import { useFetchProducts } from "../hooks/useFetchProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { errorNotification } from "../config/notification";
import FilterComponent from "../components/Filter";

const Home: React.FC = () => {
  const [filters, setFilters] = useState({
    paginatedRequest: {
      page: 1,
      limit: 12,
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
  const [loading, setLoading] = useState(true);
  const fetchProductQuery = useFetchProducts(filters);

  useEffect(() => {
    if (fetchProductQuery.isSuccess) {
      setLoading(false);
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
        limit: 12,
      },
      orberByKey: key,
    });

    setProducts([]);
    setHasMore(true);
    fetchProductQuery.refetch();
  };

  const homeSkeleton = () => (
    <div style={{ padding: "20px" }}>
    <Row gutter={[12, 24]}>
     
      {/* Ana içerik alanı */}
      <Row style={{ width: "100%" }}>
        {/* Filtre alanı */}
        <Col offset={1} span={5}>
          <Card style={{ marginTop: "24px", padding: "16px"  }}>
            <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 20, width: ['90%', '85%', '80%', '75%'] }} />
          </Card>
        </Col>

        {/* Ürün listeleme alanı */}
        <Col span={17}>
          <Row gutter={[12, 12]}>

            {/* Sıralama butonları */}
            <Col span={24}>
              <Card style={{ marginBottom: "16px" }}>
                <Row gutter={8}>
                  {[...Array(4)].map((_, index) => (
                    <Col key={index}>
                      <Skeleton.Button active style={{ width: 120, height: 32 }} />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            {/* Ürün Kartları */}
            {[...Array(6)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <Card style={{ marginTop: 16, borderRadius: "8px" }}>
                  <Skeleton.Image style={{ width: "200px", height: "200px", borderRadius: "8px" }} />
                  <div style={{ padding: "12px 0" }}>
                    <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 1, width: '60%' }} />
                    <Skeleton.Button active style={{ width: "100%", marginTop: "8px" }} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Row>
  </div>
  );

  const renderHome = () => {
    if (loading) {
      return homeSkeleton();
    } else {
      return (
        <div>
          <Row gutter={[12, 24]} style={{background:'white'}}>
            <Col span={24}>{/* <CarouselComponent /> */}</Col>
            <Row>
              <Col offset={1} span={4}>
                <FilterComponent
                  filters={filters}
                  setFilters={setFilters}
                  handleFilter={handleFilter}
                />
              </Col>
              <Col offset={1} span={17}>
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
                  <InfiniteScroll
                    dataLength={products.length}
                    next={nextPage}
                    hasMore={hasMore}
                    loader={
                        filters.paginatedRequest.page !== 1 ? (
                          <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          padding: "20px",
                        }}
                      >
                        <div style={{ textAlign: "center", color: "#333" }}>
                          <div
                            className="spinner"
                            style={{
                              border: "4px solid #ccc",
                              borderTop: "4px solid #009fe1",
                              borderRadius: "50%",
                              width: "30px",
                              height: "30px",
                              animation: "spin 1s linear infinite",
                              marginBottom: "10px",
                            }}
                          />
                        </div>
                      </div>
                        ) :null
                    }
                  >
                    <Row>
                      {products.map((product: Product) => (
                        <Col key={product.productID} xs={24} sm={16} md={16} lg={8}>
                          <ProductCard product={product} imgPath={"error"} />
                        </Col>
                      ))}
                    </Row>
                  </InfiniteScroll>
                </Row>
              </Col>
            </Row>
          </Row>
        </div>
      );
    }
  };

  return <>{renderHome()}</>;
};

export default Home;


