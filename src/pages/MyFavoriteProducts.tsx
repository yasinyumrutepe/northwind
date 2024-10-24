import { Card, Col, Row } from "antd";
import ProductCard from "../components/ProductCard";
import { ProductFavorite } from "../types/ProductFavorite";
import { fetchFavoriteProducts } from "../services/ProductFavorite";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "../components/Loading";


const MyFavoriteProducts = () => {
   const fetchProductQuery = useQuery ({
        queryKey: ['products'],
        queryFn: fetchFavoriteProducts,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (fetchProductQuery.isFetching) {
      return <Loading />;
    }



    return (
        <Card title = "My Favorite Products" >
       <Row>
      

         {fetchProductQuery.data?.data.map((favorites: ProductFavorite) => (
          <Col key={favorites.product.productID} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={favorites?.product} imgPath={'error'}/>
          </Col>
        ))}

        
       </Row>
       </Card>
    );
    }

export default MyFavoriteProducts;