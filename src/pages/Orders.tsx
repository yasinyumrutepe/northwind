import { Collapse, Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { orderState } from "../state/OrderState";
import { fetchAllCustomerOrders } from "../services/OrderService";
import OrderDetail from "../components/OrderDetail";
import OrderLabel from "../components/OrderLabel";
import "../styles/orders.css";
import Loading from "../components/Loading";

const Orders = () => {
  const [orders, setOrders] = useRecoilState(orderState);
  const [isLoading, setIsLoading] = useState(true);
  const { data, status } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchAllCustomerOrders(1, 30),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === "success") {
      setOrders(data.data);
      setIsLoading(false);
    }
  }, [data, status, setOrders]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="orders-container">
          <Divider orientation="left">Orders</Divider>
          {orders && orders.length > 0 ? (
            orders.map((item, idx) => (
              <Collapse
                className="order-collapse"
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
      )}
    </>
  );
};

export default Orders;
