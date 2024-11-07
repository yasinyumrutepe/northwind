import { Col, Row } from 'antd';
import '../styles/megamenu.css';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import { Category } from '../types/Category';
import { useState } from 'react';

interface ComponentProps {
  category: Category[];
}




const MegaMenu:React.FC<ComponentProps> = (category) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const checkLogin = () => {
    if (localStorage.getItem('authToken')) {
      return (
        <>
        <li>
          <a href="/basket"><ShoppingCartOutlined /></a>
        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <a href="#profile" className="dropdown-toggle">
          <UserOutlined />

           
          </a>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="/profile">Profile</a>
              </li>
              <li>
                <a href="/orders">Orders</a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          )}
        </li>
      </>
      );
    }
    return (
      <>
        
       
        <li>
        <a href="/login">Login</a>
      </li>
      </>
    
    );
  }


  return (
    <div
      style={{
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#fff',
      }}
    >
      <div className="content">
      <Row >
        <ul className="exo-menu">
        
          <Col span={8} >
          <div className="left-menu">
            {category.category.map((item) => {
              if (item.mainCategoryID === 0) {
                return (
                  <li className="mega-drop-down" key={item.categoryID}>
                    <a href={'/category/' + item.slug}>
                      <i className="fa fa-list"></i> {item.categoryName}
                    </a>
                    <div className="animated fadeIn mega-menu">
                      <div className="mega-menu-wrap">
                        <Row className="row">
                          <Col md={8} className="col-md-2 stander-col">
                            <ul className="stander">
                              {category.category.map((subItem) => {
                                if (subItem.mainCategoryID === item.categoryID) {
                                  return (
                                    <li key={subItem.categoryID}>
                                      <a href={'/category/' + subItem.slug}>
                                        {subItem.categoryName}
                                      </a>
                                    </li>
                                  );
                                }
                                return null;
                              })}
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </div>
          </Col>
          <Col span={8} >
          <li className="center-logo">
            <a href="/">
              <img src="/assets/logo.svg" alt="Logo" />
            </a>
          </li>
          </Col>
          <Col span={8} >
          <div className="right-menu">
            <li>
              <a href="/myfavoriteproducts">
                <HeartOutlined />
              </a>
            </li>
       
        
            {checkLogin()}
          </div>
          </Col>
         
        </ul>
        </Row>
      </div>
    </div>
  );
};
export default MegaMenu;
