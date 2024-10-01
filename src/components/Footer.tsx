import { Button, Col, Divider, Layout, Row } from "antd";
import {
  RocketOutlined,
  SyncOutlined,
  CustomerServiceOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComp = () => {
  return (
    <Footer style={{ backgroundColor: "#f0f2f5", padding: "20px 50px" }}>
      <Row
        justify="center"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <Col xs={24} sm={8}>
          <RocketOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          <p style={{ fontWeight: "bold" }}>Free Shipping</p>
          <p>On orders over $50</p>
        </Col>
        <Col xs={24} sm={8}>
          <SyncOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          <p style={{ fontWeight: "bold" }}>14-Day Return</p>
          <p>Hassle-free returns</p>
        </Col>
        <Col xs={24} sm={8}>
          <CustomerServiceOutlined
            style={{ fontSize: "24px", color: "#1890ff" }}
          />
          <p style={{ fontWeight: "bold" }}>24/7 Support</p>
          <p>We're always here for you</p>
        </Col>
      </Row>

      <Divider />
      <Row
        justify="space-around"
        style={{ textAlign: "left", padding: "10px 0" }}
      >
        <Col xs={24} sm={8}>
          <h3>About Us</h3>
          <ul>
            <li>
              <Button type="link" href="/about">
                Company Information
              </Button>
            </li>
            <li>
              <Button type="link" href="/contact">
                Contact Us
              </Button>
            </li>
            <li>
              <Button type="link" href="/careers">
                Careers
              </Button>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={8}>
          <h3>Help & Support</h3>
          <ul>
            <li>
              <Button type="link" href="/faq">
                Frequently Asked Questions
              </Button>
            </li>
            <li>
              <Button type="link" href="/shipping">
                Shipping & Delivery
              </Button>
            </li>
            <li>
              <Button type="link" href="/returns">
                Return Policy
              </Button>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={8}>
          <h3>Follow Us</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="link"
              icon={<FacebookOutlined />}
              href="https://facebook.com"
              target="_blank"
            />
            <Button
              type="link"
              icon={<InstagramOutlined />}
              href="https://instagram.com"
              target="_blank"
            />
            <Button
              type="link"
              icon={<TwitterOutlined />}
              href="https://twitter.com"
              target="_blank"
            />
          </div>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col xs={24} style={{ textAlign: "center" }}>
          <p>© 2024 Yasin Yumrutepe.</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComp;
