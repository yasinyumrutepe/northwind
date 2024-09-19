import React from 'react';
import { Form, Input, Button, Checkbox, Card, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '../services/AuthService';
import { LoginRequest } from '../types/Auth';

const Login: React.FC = () => {
    const loginMutation = useMutation({
      mutationFn: fetchLogin,
      onSuccess: (data) => {
        console.log("Login Data",data);
        if (data.status === 200){
          notification.success({
            message:'Giriş işlemi başarılı',
            description:'Anasayfaya yönlendiriliyorsunuz'
          });

          localStorage.setItem('authToken', data.token);
          window.location.href = '/';
        }
        else {
          notification.error({
            message: 'Giriş işlemi başarısız!',
            description: 'Email yada şifre hatalı',
          });
        } 
      },
      onError: () => {
        notification.error({
          message: 'Giriş işlemi başarısız!',
          description: 'Email yada şifre hatalı',
        });
      },
    });

    const onFinish = (values: any) => {
      const loginRequest : LoginRequest =
      {
        email : values.email,
        password:values.password
        
      }
  
      loginMutation.mutate(loginRequest); 
    };



  
   


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card title="Giriş Yap" style={{ width: 300 }}>
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
            rules={[{ required: true, message: 'Lütfen email adresinizi girin!' }, {  message: 'Geçerli bir email adresi girin!' }]}
          >
            <Input placeholder="Email" type='text' />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Beni hatırla</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
