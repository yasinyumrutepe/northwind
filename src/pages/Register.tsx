import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchRegister } from '../services/AuthService'; // Kayıt servisini burada kullanacaksınız
import { RegisterRequest } from '../types/Auth';
import { errorNotification, successNotification } from '../config/notification';

const Register: React.FC = () => {

    const registerMutation = useMutation({
      mutationFn: fetchRegister,
      onSuccess: () => {
        successNotification('Kayıt işlemi başarılı!', 'Başarıyla kayıt oldunuz.');
      },
      onError: () => {
        errorNotification('Kayıt işlemi başarısız!', 'Bir hata oluştu.');
      },
    });

    const onFinish = (values: any) => {
      const registerRequest: RegisterRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      };

      registerMutation.mutate(registerRequest);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <Card title="Kayıt Ol" style={{ width: 300 }}>
          <Form
            name="registerForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Ad"
              name="firstName"
              rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
            >
              <Input placeholder="Ad" />
            </Form.Item>

            <Form.Item
              label="Soyad"
              name="lastName"
              rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
            >
              <Input placeholder="Soyad" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Lütfen email adresinizi girin!' }, { type: 'email', message: 'Geçerli bir email adresi girin!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name="password"
              rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
            >
              <Input.Password placeholder="Şifre" />
            </Form.Item>

            <Form.Item
              label="Şifreyi Tekrar Girin"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Lütfen şifrenizi tekrar girin!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Şifreyi Tekrar Girin" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Beni hatırla</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Kayıt Ol
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
};

export default Register;
