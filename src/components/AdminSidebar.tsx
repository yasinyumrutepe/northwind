import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const AdminSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline">
            <Menu.Item key="0"  icon={<UserOutlined />}>
            <Link to="/admin"> Dashboard</Link>
            </Menu.Item>
          <Menu.Item key="2" icon={<OrderedListOutlined />}>
            <Link to ="/admin/products"> Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingOutlined />}>
            <Link to={"/admin/orders"}> Orders</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/admin/customers"> Customers</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
             <Link to="/admin/campaigns"> Campaigns</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/admin/categories"> Categories</Link>
            </Menu.Item>
         
        </Menu>
      </Sider>
    );
    }

export default AdminSidebar;