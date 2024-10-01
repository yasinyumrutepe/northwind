import React from 'react';
import {  Row, Col, notification } from 'antd';
import {useFetchProducts} from '../hooks/useFetchProducts';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';
import CarouselComponent from '../components/Carousel';



const Home: React.FC = () => {
  const fetchProductQuery = useFetchProducts();
 if (fetchProductQuery.isFetching){
  return <Loading/>
 }
 if (fetchProductQuery.isError){
  notification.error({
    message:"Bir hata ile karşılaşıldı",
    description:"Hata"
  })
}

  if(fetchProductQuery.isSuccess){
    return (
      <div   style={{ padding: '20px' }}>

      <Row gutter={[24, 24]}>
        <Col>
           <CarouselComponent />
        </Col>
        {fetchProductQuery.data?.data.map((product: Product) => (
          <Col key={product.productID} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} imgPath={'error'}/>
          </Col>
        ))}
      </Row>
    </div>
    )
  }

 return (
  <div></div>
 )
};



export default Home;
