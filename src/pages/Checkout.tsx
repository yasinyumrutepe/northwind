import React, { useEffect, useState } from "react";
import {
  Button,
  Tabs,
  Card,
  Image,
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Input,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBaskets } from "../services/BasketService";
import { BasketRequest } from "../types/Product";
import StripeTest from "../components/CheckoutForm";




const { TabPane } = Tabs;
const { Text } = Typography;

const Checkout: React.FC = () => {
  const [basketItems, setBasketItems] = useState<BasketRequest>() ?? [];
  const [discountCode, setDiscountCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState("1"); // Tab state yönetimi
  const basketQuery = useQuery({
    queryKey: ["basket"],
    queryFn: () => fetchAllBaskets(),
  });

  useEffect(() => {
    if (basketQuery.isSuccess) {
      if (basketQuery.data.discount == null) {
        setDiscountCode("");
      } else {
        setDiscountCode(basketQuery.data.discount.campaignName);
      }

      setBasketItems(basketQuery.data);
    }
  }, [basketQuery.isSuccess, basketQuery.data, setBasketItems]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const addAddress = (values: any) => {
    localStorage.removeItem("address");
    localStorage.setItem("address", JSON.stringify(values));
    setActiveTab("2");
  }

  const renderAddressForm = () => {
    return (
      <>
       <Card title="Shipping Address" style={{ marginBottom: "2%" }}>
      <Form
        layout="vertical" 
        requiredMark="optional" 
        onFinish={addAddress}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ship Name"
              name="shipName"
              rules={[{ required: true, message: "Please enter the ship name" }]}
            >
              <Input placeholder="Ship Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ship Address"
              name="shipAddress"
              rules={[
                { required: true, message: "Please enter the ship address" },
              ]}
            >
              <Input placeholder="Ship Address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ship City"
              name="shipCity"
              rules={[{ required: true, message: "Please enter the ship city" }]}
            >
              <Input placeholder="Ship City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ship Country"
              name="shipCountry"
              rules={[
                { required: true, message: "Please enter the ship country" },
              ]}
            >
              <Input placeholder="Ship Country" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ship Postal Code"
              name="shipPostalCode"
              rules={[
                {
                  required: true,
                  message: "Please enter the ship postal code",
                },
              ]}
            >
              <Input placeholder="Ship Postal Code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ship Region"
              name="shipRegion"
              rules={[{ required: true, message: "Please enter the ship region" }]}
            >
              <Input placeholder="Ship Region" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Save Address
        </Button>
      </Form>
    </Card>
      </>
    );
  };



  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card style={{ width: "70%" }} headStyle={{ fontSize: "18px" }}>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
         
          <TabPane tab="Select Address & Billing" key="1">
            <div style={{ padding: "16px" }}>{renderAddressForm()}</div>
          </TabPane>
          <TabPane tab="Payment" key="2">
          <StripeTest totalPrice={basketItems?.totalPrice || 0}/>
          </TabPane> 
        </Tabs>
      </Card>

      <Card title="Order Summary" style={{ width: "30%" }}>
        {basketItems?.items?.map((item) => (
          <>
            <Row key={item.productID} gutter={[16, 16]}>
              <Col span={8}>
                <Image
                  width="100%"
                  height="100%"
                  preview={false}
                  src={item.images[0]?.imagePath ?? ""}
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col span={16}>
                <Card.Meta
                  title={item.productName}
                  description={
                    <>
                      <Text strong>Quantity: {item.quantity}</Text>
                      <br />
                    </>
                  }
                />
                <Text strong style={{ marginTop: 10, display: "block" }}>
                  Total Price: {item.totalPrice} TL
                </Text>
              </Col>
            </Row>
            <Divider />
          </>
        ))}

        <Row justify="space-between" style={{ marginTop: 20 }}>
          <Text>Total ({basketItems?.items.length} product ):</Text>
          <Text>{basketItems?.totalPrice} TL</Text>
        </Row>
        <Divider />
        <Row>
          <Text strong>Campaign Code:</Text>
          <Text strong>{discountCode}</Text>
        </Row>
        <Divider />
        <Row justify="space-between">
          <Text strong>Total:</Text>
          <Text strong>{basketItems?.totalPrice} TL</Text>
        </Row>
      </Card>
    </div>
  );
};

export default Checkout;
