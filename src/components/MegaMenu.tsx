import { Col, Row } from 'antd';
import '../styles/megamenu.css';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Category } from '../types/Category';
import { useState, useEffect } from 'react';

interface ComponentProps {
  category: Category[];
}

const MegaMenu: React.FC<ComponentProps> = ({ category }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<null | number>(null);
  const [subHoveredCategoryId, setSubHoveredCategoryId] = useState<null | number>(null);

  const hoverCategory = (categoryID: number | null) => {
    setHoveredCategoryId(categoryID);
  };

  const subHoveredCategory = (categoryID: number | null) => {
    setSubHoveredCategoryId(categoryID);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Kullanıcı giriş durumunu kontrol etme
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
                <li><a href="/profile">Profile</a></li>
                <li><a href="/orders">Orders</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            )}
          </li>
        </>
      );
    }
    return <li><a href="/login">Login</a></li>;
  };

  const renderSubSubCategories = (subHoveredCategoryId: number) => (
    <ul className="sub-category">
      {category.map((subSubItem) => {
     
        if (subSubItem.parent_ID === subHoveredCategoryId) {
          console.log(subSubItem.parent_ID, subHoveredCategoryId);
          return (
            <li key={subSubItem.categoryID}>
              <a href={'/category/' + subSubItem.slug}>
                {subSubItem.name}
              </a>
            </li>
          );
        }
      })}
    </ul>
  );

  useEffect(() => {
    

  }, [hoveredCategoryId, subHoveredCategoryId]);

  return (
    <div style={{ fontWeight: 'bold', textDecoration: 'none', color: '#fff' }}>
      <div className="content">
        <Row>
          <ul className="exo-menu">
            <Col span={8}>
              <div className="left-menu">
                {category.map((item) => {
                  if (item.parent_ID === 0) {
                    return (
                      <li
                        className="mega-drop-down"
                        key={item.categoryID}
                        onMouseEnter={() => hoverCategory(item.categoryID)}
                        onMouseLeave={() => hoverCategory(null)}
                      >
                        <a href={'/category/' + item.slug}>
                          <i className="fa fa-list"></i> {item.name}
                        </a>
                        {hoveredCategoryId === item.categoryID && (
                          <div className="animated fadeIn mega-menu">
                            <div className="mega-menu-wrap">
                              <Row>
                                <Col md={8}>
                                  <ul className="stander">
                                    {category.map((subItem) => {
                                      if (subItem.parent_ID === item.categoryID) {
                                        return (
                                          <li
                                            key={subItem.categoryID}
                                            onMouseEnter={() => subHoveredCategory(subItem.categoryID)}
                                            onMouseLeave={() => subHoveredCategory(null)}
                                          >
                                            <a href={'/category/' + subItem.slug}>
                                              {subItem.name}
                                            </a>
                                          </li>
                                        );
                                      }
                                      return null;
                                    })}
                                  </ul>
                                </Col>
                                <Col md={8}>
                                  {subHoveredCategoryId && 
                                    (
                                      renderSubSubCategories(subHoveredCategoryId)
                                    )
                                  
                                  }
                                </Col>
                              </Row>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }
                  return null;
                })}
              </div>
            </Col>
            <Col span={8}>
              <li className="center-logo">
                <a href="/">
                  <img src="/assets/logo.svg" alt="Logo" />
                </a>
              </li>
            </Col>
            <Col span={8}>
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
