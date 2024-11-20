import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Col,
  Row,
  Typography,
  Tabs,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useCustomerDetail } from "../hooks/useFetchCustomers";
import Loading from "../components/Loading";
import {  Personel } from "../types/Customer";
import { errorNotification, successNotification } from "../config/notification";
import { useMutation } from "@tanstack/react-query";
import { updateCustomer } from "../services/CustomerService";
import { changePassword } from "../services/AuthService";
import { ChangePasswordRequest, ChangePasswordResponse } from "../types/Auth";

const { Title } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const [personelDetail, setPersonelDetail] = useState<Personel | null>(null);
  const [form] = Form.useForm(); // Form control
  const token = localStorage.getItem("authToken") ?? "";
  const { data, isFetching, isError, isSuccess } = useCustomerDetail(token);

  const updateCustomerMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: (updatedCustomer) => {
      const updatedCustomerResponse = {
        customerID: updatedCustomer.customerID,
        name: updatedCustomer.contactName,
        phone: updatedCustomer.phone,
        email: updatedCustomer.user.email,
      };
      setPersonelDetail(updatedCustomerResponse);
      successNotification("Update Personel Detail Successfuly", "");
    },

    onError: () => {
      errorNotification(
        "An error occurred",
        "An error occurred while updating customer information"
      );
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (changeResponse: ChangePasswordResponse) => {
      if(changeResponse.statusCode === 404){
        errorNotification("Personel Not Found",'')
        return;

      }else if(changeResponse.statusCode ===510){
        errorNotification("Current Password error",'')
        return;
        
      }else if (changeResponse.statusCode ===304){
        errorNotification("System Error",'')
        return;
      }else {
        successNotification('Password Change Successfuly','')
        return;
      }

     
    },
    onError: () => {
      errorNotification("Current Password error", "");
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const personel: Personel = {
        customerID: data.customerID,
        name: data.contactName,
        phone: data.phone,
        email: data.user.email,
      };

      setPersonelDetail(personel);
      form.setFieldsValue(personel); // Form alanlarını doldur
    }
  }, [isSuccess, data, form]);

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    errorNotification(
      "An error occurred",
      "An error occurred while fetching customer information"
    );
  }

  const onFinishPersonalInfo = (values: any) => {
    const sendUpdateRequest = {
      customerID: personelDetail?.customerID,
      name: values.name,
      email: values.email,
      phone: values.phone,
    };

    updateCustomerMutation.mutate(sendUpdateRequest);
  };

  const onFinishChangePassword = (values: any) => {
    const changePasswordRequest:ChangePasswordRequest = {
      customerID: personelDetail?.customerID || '',
      confirmPassword:values.confirmPassword,
      currentPassword:values.currentPassword,
      newPassword:values.newPassword

    }
    changePasswordMutation.mutate(changePasswordRequest)
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      <Col xs={24} sm={24} md={8}>
        <Card
          bordered={false}
          style={{ maxWidth: "100%", margin: "0 auto", textAlign: "center" }}
        >
          <Avatar
            size={100}
            icon={<UserOutlined />}
            style={{ marginBottom: "20px" }}
          />
          <Title level={3}>{personelDetail?.name}</Title>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={16}>
        <Card>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Personal Information" key="1">
              <Form
                form={form} // Form kontrolü ekleyin
                layout="vertical"
                onFinish={onFinishPersonalInfo}
                initialValues={{
                  name: personelDetail?.name,
                  email: personelDetail?.email,
                  phone: personelDetail?.phone,
                }}
              >
                <Title level={4}>Personal Information</Title>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter your email"
                  />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Change Password" key="3">
              <Form layout="vertical" onFinish={onFinishChangePassword}>
                <Title level={4}>Change Password</Title>
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your current password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your current password" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your new password" />
                </Form.Item>
                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
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
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;
