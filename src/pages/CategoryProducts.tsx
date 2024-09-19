import { Row, Col, notification} from 'antd';
import { useParams } from 'react-router-dom'; 
import Loading from '../components/Loading';
import { useFetchCategory } from '../hooks/useFetchCategories';
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard';


const CategoryProducts = () => {
    const { categoryid } = useParams();
    const categoryID = Number(categoryid);
    
  const categoryQuery =  useFetchCategory(categoryID)
  if (categoryQuery.isPending){
    return <Loading />;
  }
  if (categoryQuery.isError){
    notification.error({
      message:"Hata",
      description:"hata"
    })                  
  }
            
  if(categoryQuery.isSuccess){
      return (                                                      
        <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {categoryQuery.data?.products.map((product:Product) => (
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
