import React from 'react';
import { Layout, Menu, Button, notification, Popover, Dropdown } from 'antd';
import { LogoutOutlined,UserOutlined } from '@ant-design/icons';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { Category } from '../types/Category';
import { useRecoilState } from 'recoil';
import { categoryState } from '../state/CategoryState';
import Loading from './Loading';

const { Header } = Layout;

const Navbar: React.FC = () => {

  const [category, setCategory] = useRecoilState(categoryState);

  const fetchCategoryQuery = useFetchCategories();
  if (fetchCategoryQuery.isFetching && category.length === 0) {
    return <Loading />;
  }
  if (fetchCategoryQuery.isError) {
    notification.error({
      message: 'Bir hata ile karşılaşıldı',
      description: 'Hata',
    });
  }
  if (category.length === 0 && fetchCategoryQuery.isSuccess) {
    setCategory(fetchCategoryQuery.data.data);
  }
  const isMobile = window.innerWidth < 768;
  const menu = (
    <Menu mode={isMobile ? "vertical" : "horizontal"} style={{ width: isMobile ? '100%' : 'auto' }}>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
       <Menu.Item key="basket">
        <a href="/basket">
         Basket
        </a>
        </Menu.Item>
      <Menu.Item key="orders">
        <a href="/orders">Orders</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <Popover content="Logout">
          <a onClick={()=>logout()}>
            <LogoutOutlined /> Logout
          </a>
       
        </Popover>
      </Menu.Item>
    </Menu>
  );

  const checkAuth = () => {
    if (localStorage.getItem('authToken')) {
      return (
        <>
      <Menu.Item key="userProfile">
      <Dropdown overlay={menu}  trigger={['click']}>
        <Button
          shape="circle"
          icon={<UserOutlined />}
        />
      </Dropdown>
      </Menu.Item>
      
     
        </>
      );
    }
   
  } 

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
      <div className="logo" />
      <Menu theme="light" mode="horizontal" style={{ flex: 1, display: 'flex', alignItems: 'center'  }}>
        {category.map((category: Category) => (
          <Menu.Item key={category.categoryID}>
            <a href={`/products/${category.categoryID}`}>{category.categoryName}</a>
          </Menu.Item>
        ))}
       
      </Menu>
      <Menu theme="light" mode="horizontal" style={{  display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'  }}>
      {checkAuth()}
      </Menu>
     
    </Header>
  );
};

export default Navbar;
