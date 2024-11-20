import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Link } from 'react-router-dom'; 
import { useMutation } from '@tanstack/react-query';
import { fetchRegister } from '../services/AuthService';
import { RegisterRequest } from '../types/Auth';
import { errorNotification, successNotification } from '../config/notification';

const Register: React.FC = () => {

    const registerMutation = useMutation({
      mutationFn: fetchRegister,
      onSuccess: (newUser) => {
        console.log("Login Data", newUser);
        if (newUser.status === 200) {
          successNotification("Register Successful!", "You have logged in successfully.");
          localStorage.setItem("authToken", newUser.token);
          window.location.href = "/";
        } else {
          errorNotification("Register Failed!", "Email is already exist");
        }
      },
      onError: () => {
        errorNotification('Registration Failed!', 'An error occurred.');
      },
    });

    const onFinish = (values: any) => {
      const registerRequest: RegisterRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword :values.confirmPassword
      };
      registerMutation.mutate(registerRequest);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '1rem'
      }}>
        <Card 
          title="Register" 
          style={{ 
            width: '100%', 
            maxWidth: '400px', 
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px',
            padding: '20px' 
          }}
        >
          <Form
            name="registerForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email address!' }, { type: 'email', message: 'Please enter a valid email address!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Register
              </Button>
            </Form.Item>
          </Form>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </Card>
      </div>
    );
};

export default Register;
