import React, { useEffect } from 'react';
import { Layout, Menu, Button, notification, Popover, Dropdown, Row, Col } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { Category } from '../types/Category';
import { useRecoilState } from 'recoil';
import { categoryState } from '../state/CategoryState';


const { Header } = Layout;

const NavbarComp: React.FC = () => {
  const [category, setCategory] = useRecoilState(categoryState);
  const fetchCategoryQuery = useFetchCategories();

  useEffect(() => {
    if (category.length === 0 && fetchCategoryQuery.isSuccess) {
      setCategory(fetchCategoryQuery.data.data);
    }
  }, [category, fetchCategoryQuery.isSuccess, fetchCategoryQuery.data?.data, setCategory]);

  if (fetchCategoryQuery.isError) {
    notification.error({
      message: 'Bir hata ile karşılaşıldı',
      description: 'Hata',
    });
  }

  const isMobile = window.innerWidth < 768;
  const menu = (
    <Menu mode={isMobile ? 'vertical' : 'horizontal'} style={{ width: isMobile ? '100%' : 'auto' }}>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="basket">
        <a href="/basket">Basket</a>
      </Menu.Item>
      <Menu.Item key="orders">
        <a href="/orders">Orders</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <Popover content="Logout">
          <a onClick={() => logout()}>
            <LogoutOutlined /> Logout
          </a>
        </Popover>
      </Menu.Item>
    </Menu>
  );

  const checkAuth = () => {
    if (localStorage.getItem('authToken')) {
      return (
        <Menu.Item key="userProfile">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </Menu.Item>
      );
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        background: '#fff',
      }}
    >
      <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <Col xs={24} sm={12} md={8}>
      <Menu theme="light" mode="horizontal" style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
        {category.map((category: Category) => (
          <Menu.Item key={category.categoryID}>
            <a href={`/products/${category.categoryID}`}>{category.categoryName}</a>
          </Menu.Item>
        ))}
      </Menu>
      </Col>
      <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'center', flexGrow: 1 }}>
        <a href="/">
        <img src="/assets/logo.svg" alt="Logo" style={{ height: '40px' }}  />
        </a>
      </div>
      </Col>
      <Col xs={24} sm={12} md={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Menu theme="light" mode="horizontal" style={{ display: 'flex', alignItems: 'center' }}>
    {checkAuth()}
  </Menu>
</Col>
    </Row>
      
    </Header>
  );
};

export default NavbarComp;
