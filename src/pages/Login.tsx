import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { Link } from "react-router-dom"; // Register sayfasına yönlendirme için eklendi
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../services/AuthService";
import { LoginRequest } from "../types/Auth";
import { errorNotification, successNotification } from "../config/notification";

const Login: React.FC = () => {
  const loginMutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      console.log("Login Data", data);
      if (data.status === 200) {
        successNotification("Login Successful!", "You have logged in successfully.");
        localStorage.setItem("authToken", data.token);
        window.location.href = "/";
      } else {
        errorNotification("Login Failed!", "Email or password is incorrect.");
      }
    },
    onError: () => {
      errorNotification("Login Failed!", "Email or password is incorrect.");
    },
  });

  const onFinish = (values: any) => {
    const loginRequest: LoginRequest = {
      email: values.email,
      password: values.password,
    };
    loginMutation.mutate(loginRequest);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "1rem"
      }}
    >
      <Card 
        title="Login" 
        style={{ 
          width: "100%", 
          maxWidth: "400px", 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
          borderRadius: "8px",
          padding: "20px" 
        }}
      >
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" type="text" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
