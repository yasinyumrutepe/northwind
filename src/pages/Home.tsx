import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Skeleton, Drawer, Grid } from "antd";
import { useFetchProducts } from "../hooks/useFetchProducts";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { errorNotification } from "../config/notification";
import FilterComponent from "../components/Filter";

const { useBreakpoint } = Grid;

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
      slug: "",
    },
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const fetchProductQuery = useFetchProducts(filters);
  const screens = useBreakpoint();

  useEffect(() => {
    if (fetchProductQuery.isSuccess) {
      setLoading(false);
      if (
        fetchProductQuery.data?.data.length === 0 ||
        fetchProductQuery.data.totalCount <= 12
      ) {
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
    fetchProductQuery.data?.data,
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
        <Row style={{ width: "100%" }}>
          <Col offset={1} span={5}>
            <Card style={{ marginTop: "24px", padding: "16px" }}>
              <Skeleton
                active
                title={{ width: "60%" }}
                paragraph={{ rows: 20, width: ["90%", "85%", "80%", "75%"] }}
              />
            </Card>
          </Col>
          <Col span={17}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Card style={{ marginBottom: "16px" }}>
                  <Row gutter={8}>
                    {[...Array(4)].map((_, index) => (
                      <Col key={index}>
                        <Skeleton.Button
                          active
                          style={{ width: 120, height: 32 }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
              {[...Array(6)].map((_, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8}>
                  <Card style={{ marginTop: 16, borderRadius: "8px" }}>
                    <Skeleton.Image
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "8px",
                      }}
                    />
                    <div style={{ padding: "12px 0" }}>
                      <Skeleton
                        active
                        title={{ width: "80%" }}
                        paragraph={{ rows: 1, width: "60%" }}
                      />
                      <Skeleton.Button
                        active
                        style={{ width: "100%", marginTop: "8px" }}
                      />
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
          <Row gutter={[12, 24]} style={{ background: "white" }}>
            <Row>
              {screens.xs ? (
                <Button
                  type="primary"
                  onClick={() => setIsFilterVisible(true)}
                  style={{ margin: "10px" }}
                >
                  Show Filters
                </Button>
              ) : (
                <Col offset={1} span={4}>
                  <FilterComponent
                    filters={filters}
                    setFilters={setFilters}
                    handleFilter={handleFilter}
                  />
                </Col>
              )}

              <Col offset={screens.xs ? 0 : 1} span={screens.xs ? 24 : 17}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Card>
                      <Row gutter={[8, 8]} justify="start">
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <Button
                            style={{ width: "100%" }}
                            onClick={() => handleSort("priceAsc")}
                          >
                            Price Ascending
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <Button
                            style={{ width: "100%" }}
                            onClick={() => handleSort("priceDesc")}
                          >
                            Price Descending
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <Button
                            style={{ width: "100%" }}
                            onClick={() => handleSort("newest")}
                          >
                            Newest
                          </Button>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6}>
                          <Button
                            style={{ width: "100%" }}
                            onClick={() => handleSort("bestSelling")}
                          >
                            Best Selling
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <InfiniteScroll
                    dataLength={fetchProductQuery.data?.pageSize || 1}
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
                      ) : null
                    }
                  >
                    <Row>
                      {products.map((product: Product) => (
                        <Col
                        
                          key={product.productID}
                          style={{
                            paddingLeft: screens.xs ? "8px" : "0px",
                            paddingRight: screens.xs ? "8px" : "0px",
                          }}
                        >
                          <ProductCard product={product} imgPath={"error"} />
                        </Col>
                      ))}
                    </Row>
                  </InfiniteScroll>
                </Row>
              </Col>
            </Row>
          </Row>

          <Drawer
            title="Filters"
            placement="left"
            onClose={() => setIsFilterVisible(false)}
            visible={isFilterVisible}
          >
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              handleFilter={handleFilter}
            />
          </Drawer>
        </div>
      );
    }
  };

  return <>{renderHome()}</>;
};

export default Home;
