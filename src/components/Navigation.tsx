import React, { useEffect } from "react";
import { Layout, Menu, Button, Popover, Dropdown, Row, Col } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { Category } from "../types/Category";
import { useRecoilState } from "recoil";
import { categoryState } from "../state/CategoryState";
import { errorNotification } from "../config/notification";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const NavbarComp: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useRecoilState(categoryState);
  const fetchCategoryQuery = useFetchCategories();

  useEffect(() => {
    if (category.length === 0 && fetchCategoryQuery.isSuccess) {
      setCategory(fetchCategoryQuery.data.data);
    }
  }, [
    category,
    fetchCategoryQuery.isSuccess,
    fetchCategoryQuery.data?.data,
    setCategory,
  ]);

  if (fetchCategoryQuery.isError) {
    errorNotification(
      "An error occurred",
      "An error occurred while fetching categories"
    );
  }

  const checkAdmin = () => {
    if (localStorage.getItem("authToken")) {
        


      return (
        <Menu.Item key="admin">
          <Link to="/admin">Admin</Link>
        </Menu.Item>
      );
    }
  }
  const isMobile = window.innerWidth < 768;
  const menu = (
    <Menu
      mode={isMobile ? "vertical" : "horizontal"}
      style={{ width: isMobile ? "100%" : "auto" }}
    >

      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="basket">
        <Link to="/basket">Basket</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link to="/orders">Orders</Link>
      </Menu.Item>
      {checkAdmin()}
      <Menu.Item key="logout">
        <Popover content="Logout">
          <button
            onClick={() => logout()}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <LogoutOutlined /> Logout
          </button>
        </Popover>
      </Menu.Item>
    </Menu>
  );

  const checkAuth = () => {
    if (localStorage.getItem("authToken")) {
      return (
        <Menu.Item key="userProfile">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </Menu.Item>
      );
    }
  };



  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#fff",
      }}
    >
      <Row style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Col xs={24} sm={12} md={8}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ display: "flex", alignItems: "center", fontSize: "12px" }}
          >
            {category.map((category: Category) => (
              <Menu.Item key={category.categoryID}>
                <Link to={`/products/${category.categoryID}`}>
                  {category.categoryName}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: "center" }}>
          <div style={{ textAlign: "center", flexGrow: 1 }}>
            <Link to="/">
              <img
                src="/assets/logo.svg"
                alt="Logo"
                style={{ height: "40px" }}
              />
            </Link>
          </div>
        </Col>
      
        <Col
          xs={24}
          sm={12}
          md={8}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            style={{ display: "flex", alignItems: "center" }}
          >
            {checkAuth()}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default NavbarComp;
