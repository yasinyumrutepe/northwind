import { Card,  Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderState } from "../../state/OrderState";
import {  fetchAllOrders } from "../../services/OrderService";
import AdminOrderLabel from "../../components/admin/AdminOrderLabel";
import AdminOrderDetail from "../../components/admin/AdminOrderDetail";

const AdminOrders = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const { data, status} = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchAllOrders( 1, 30),
    retry:false,
    refetchOnWindowFocus:false
  });
  

useEffect(() => {
  if (status === "success") {
    setOrders(data.data);
  }
}, [data,status,setOrders])



  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Divider orientation="left">Orders</Divider>
      {orders.map((item,idx) => (

        <div key={idx}>
          <Card style={{margin:'10px'}}>
          <AdminOrderLabel order={item}/>
          <AdminOrderDetail order={item} />
          </Card>
        
        
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
