import { Collapse, Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderState } from "../state/OrderState";
import { fetchAllCustomerOrders } from "../services/OrderService";
import OrderDetail from "../components/OrderDetail";
import OrderLabel from "../components/OrderLabel";

const Orders = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const { data, status } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchAllCustomerOrders(1, 30),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === "success") {
      setOrders(data.data);
    }
  }, [data, status, setOrders]);

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Divider orientation="left">Orders</Divider>
      {orders && orders.length > 0 ? (
        orders.map((item, idx) => (
          <Collapse
            style={{ margin: "10px" }}
            key={idx}
            size="large"
            items={[
              {
                key: "1",
                label: <OrderLabel order={item} />,
                children: <OrderDetail order={item} />,
              },
            ]}
          />
        ))
      ) : (
        <h1>No Orders</h1>
      )}
    </div>
  );
};

export default Orders;
