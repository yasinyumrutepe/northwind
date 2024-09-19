import { Row, Table} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState} from 'recoil';
import { orderState } from '../state/OrderState';
import { fetchAllCustomerOrders } from '../services/OrderService';


const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(30); 
    const token = localStorage.getItem('authToken')??undefined;
    const [orders, setOrders] = useRecoilState(orderState); 
    const { data, status, error } = useQuery({
        queryKey: ['orders',token, currentPage, pageSize],
        queryFn: () => fetchAllCustomerOrders(token,currentPage, pageSize),
      },
    );
    if (status === 'success') {
        setOrders(data.data);
      }
    const totalItems = data?.totalCount || 0;
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
            sorter: (a: any, b: any) => a.orderID - b.orderID,
          },
          {
            title: 'Customer',
            dataIndex: 'contactName',
            key: 'contactName',
            render: (text: any, record: any) => record.customer?.contactName || 'Bilinmiyor',
            sorter: (a: any, b: any) => a.customer.contactName.localeCompare(b.customer.contactName),
          },
          {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
            render:(text: any, record: any) => record.employee?.firstName +' '+record.employee?.lastName || 'Bilinmiyor',
            sorter: (a: any, b: any) => a.employee.firstName - b.employee.firstName,
          },
          {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text: Date | null) => text ? new Date(text).toLocaleDateString() : 'N/A',
          },
          {
            title: 'Required Date',
            dataIndex: 'requiredDate',
            key: 'requiredDate',
            render: (text: Date | null) => text ? new Date(text).toLocaleDateString() : 'N/A',
          },
          {
            title: 'Shipped Date',
            dataIndex: 'shippedDate',
            key: 'shippedDate',
            render: (text: Date | null) => text ? new Date(text).toLocaleDateString() : 'N/A',
          },
          {
            title: 'Freight',
            dataIndex: 'freight',
            key: 'freight',
            sorter: (a: any, b: any) => a.freight - b.freight,
          },
          {
            title: 'Ship Name',
            dataIndex: 'shipName',
            key: 'shipName',
          },
          {
            title: 'Ship City',
            dataIndex: 'shipCity',
            key: 'shipCity',
          },
          {
            title: 'Ship Postal Code',
            dataIndex: 'shipPostalCode',
            key: 'shipPostalCode',
          },
          {
            title: 'Ship Country',
            dataIndex: 'shipCountry',
            key: 'shipCountry',
          },
          {
            title: 'Ship Address',
            dataIndex: 'shipAddress',
            key: 'shipAddress',
          },
    ];
  
    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
      };
   
  
    return (
      <div style={{ padding: '24px', backgroundColor: '#fff' }}>
        <Row justify="space-between">
        <h2>Order List</h2>
        </Row>
        <Table
        columns={columns}
        dataSource={orders}
        rowKey="orderID"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        bordered
        loading={status === 'pending'}
        locale={{ emptyText: status === 'error' ? `Hata: ${error?.message}` : 'Ürün bulunamadı' }}
      />
      </div>
    );
  };

    export default Orders;
