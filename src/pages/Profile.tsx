import React, { useState, useEffect } from "react";
import { Card, Avatar, Form, Input, Button, Col, Row, Typography,  notification, Tabs } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useCustomerDetail } from "../hooks/useFetchCustomers";
import Loading from "../components/Loading";
import { Customer } from "../types/Customer";

const { Title } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const [customerDetail, setCustomerDetail] = useState<Customer | null>(null);
  const token = localStorage.getItem("authToken") ?? '';
  const { data, isFetching, isError, isSuccess } = useCustomerDetail(token);

  useEffect(() => {
    if (isSuccess) {
      setCustomerDetail(data);
    }
  }, [data, isSuccess]);

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    notification.error({
      message: "Bir hata ile karşılaşıldı",
      description: "Hata"
    });
  }

  const onFinishPersonalInfo = (values: any) => {
    console.log("update personal information", values);
  };

  const onFinishCompanyInfo = (values: any) => {
    console.log("update company information", values);
  };

  const onFinishChangePassword = (values: any) => {
    console.log("update password", values);
  };

  const onFinishChangeEmail = (values: any) => {
    console.log("update email", values);
  };

  return (
    <Row gutter={[8,16]} style={{ padding: "20px" }}>
      <Col span={8}>
        <Card
          bordered={false}
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={3} style={{ margin: "10px 0" }}>
              {customerDetail?.contactName}
            </Title>
            <Button type="primary" icon={<EditOutlined />}>
              Edit Profile
            </Button>
          </div>
      </Card>
</Col>
      <Col span={16}>
        <Card>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Personal Information" key="1">
              <Form
                layout="vertical"
                onFinish={onFinishPersonalInfo}
                initialValues={{
                  name: customerDetail?.contactName,
                  email: customerDetail?.user?.email,
                  phone: customerDetail?.phone,
                  address: customerDetail?.address,
                  city: customerDetail?.city,
                  region: customerDetail?.region,
                  postalCode: customerDetail?.postalCode,
                  country: customerDetail?.country,
                  fax: customerDetail?.fax,
                }}
              >
                <Title level={4}>Personal Information</Title>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please input your address!' }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Enter your address" />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: 'Please input your city!' }]}
                >
                  <Input placeholder="Enter your city" />
                </Form.Item>

                <Form.Item
                  label="Region"
                  name="region"
                >
                  <Input placeholder="Enter your region" />
                </Form.Item>

                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  rules={[{ required: true, message: 'Please input your postal code!' }]}
                >
                  <Input placeholder="Enter your postal code" />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: 'Please input your country!' }]}
                >
                  <Input placeholder="Enter your country" />
                </Form.Item>

                <Form.Item
                  label="Fax"
                  name="fax"
                >
                  <Input placeholder="Enter your fax number" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Company Information" key="2">
              <Form
                layout="vertical"
                onFinish={onFinishCompanyInfo}
                initialValues={{
                  companyName: customerDetail?.companyName,
                  contactName: customerDetail?.contactName,
                  contactTitle: customerDetail?.contactTitle,
                }}
              >
                <Title level={4}>Company Information</Title>
                <Form.Item
                  label="Company Name"
                  name="companyName"
                  rules={[{ required: true, message: 'Please input your company name!' }]}
                >
                  <Input placeholder="Enter your company name" />
                </Form.Item>

                <Form.Item
                  label="Contact Name"
                  name="contactName"
                  rules={[{ required: true, message: 'Please input your contact name!' }]}
                >
                  <Input placeholder="Enter your contact name" />
                </Form.Item>

                <Form.Item
                  label="Contact Title"
                  name="contactTitle"
                  rules={[{ required: true, message: 'Please input your contact title!' }]}
                >
                  <Input placeholder="Enter your contact title" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Change Password" key="3">
              <Form
                layout="vertical"
                onFinish={onFinishChangePassword}
              >
                <Title level={4}>Change Password</Title>
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                  <Input.Password placeholder="Enter your current password" />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                  <Input.Password placeholder="Enter your new password" />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm your new password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Change Password
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Change Email" key="4">
              <Form
                layout="vertical"
                onFinish={onFinishChangeEmail}
              >
                <Title level={4}>Change Email</Title>
                <Form.Item
                  label="Current Email"
                  name="currentEmail"
                  rules={[{ required: true, message: 'Please input your current email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Enter your current email" />
                </Form.Item>

                <Form.Item
                  label="New Email"
                  name="newEmail"
                  rules={[{ required: true, message: 'Please input your new email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Enter your new email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Change Email
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;