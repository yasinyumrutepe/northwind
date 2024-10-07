import { Avatar, Card, List } from "antd";
import { fetchAllCustomers } from "../../services/CustomerService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Customer } from "../../types/Customer";



const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchAllCustomers(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (customersQuery.status === "success") {
      setCustomers(customersQuery.data.data);
    }
  }, [customersQuery, customersQuery.status]);

  return (
    <Card title="Customers">
      <List
        
        dataSource={customers}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<p> Contact Name: {item.contactName}</p>}
              description={
                <div>
                <p>Contact Title:  {item.contactTitle}</p>
                  <p>Company Name: {item.companyName}</p>
                  <p>Phone: {item.phone}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdminCustomers;
