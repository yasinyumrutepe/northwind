import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, Typography, Button } from 'antd';
import { createOrder } from '../services/OrderService';
import { CreateOrder } from '../types/Order';
import { errorNotification } from '../config/notification';


const { Title } = Typography;
 const  ConfirmPayment = ()=> {

  const addOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      localStorage.removeItem('address');
    },
    onError: () => {
      errorNotification('Error','There was an error creating the order');
    },
  });

  useEffect(() => {
    const address = localStorage.getItem('address');
    if (address) { 
      const paymentAddress = JSON.parse(address);
      const createOrder: CreateOrder = {
        orderDate: new Date(),
        requiredDate: new Date(),
        shippedDate: new Date(),
        shipName: paymentAddress.shipName,
        shipAddress: paymentAddress.shipAddress,
        shipCity: paymentAddress.shipCity,
        shipRegion: paymentAddress.shipRegion,
        shipPostalCode: paymentAddress.shipPostalCode,
        shipCountry: paymentAddress.shipCountry,
      };
      addOrderMutation.mutate(createOrder);
      localStorage.removeItem('address'); 
    }
  }, [addOrderMutation]);
  
   return (
    <div>
      
        <Card style={{minWidth:'1000px',minHeight:'300px'}}>
          <Title level={4}>Payment Confirmed</Title>
          <Title level={5}>Thank you for your purchase</Title>
          <Button href='/' type="primary">Continue Shopping</Button>
        </Card>
    </div>
   )
}


export default ConfirmPayment;
