import { Row, Col, notification} from 'antd';
import { useParams } from 'react-router-dom'; 
import Loading from '../components/Loading';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';
import { useFetchProductsByCategory } from '../hooks/useFetchProducts';


const CategoryProducts = () => {
    const { categoryid } = useParams();
    const categoryID = Number(categoryid);
    
  const productsByCategoryQuery =  useFetchProductsByCategory({categoryID:categoryID, page:1, limit:30});
  if (productsByCategoryQuery.isPending){
    return <Loading />;
  }
  if (productsByCategoryQuery.isError){
    notification.error({
      message:"Hata",
      description:"hata"
    })                  
  }
            
  if(productsByCategoryQuery.isSuccess){
      return (                                                      
        <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {productsByCategoryQuery.data?.data?.map((product:Product) => (
          <Col key={product.productID} xs={24} sm={12} md={6} lg={4}>
              <ProductCard product={product } imgPath={'https://random.imagecdn.app/300/200'}/>
          </Col>
        ))}
      </Row>
    </div>
      )
  }


  
  
    return (
      <></>

    );
  };

    export default CategoryProducts;
