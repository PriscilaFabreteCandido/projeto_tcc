import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import loginSvg from "../../../assets/images/login.svg";
import img2 from "../../../assets/images/fundologin.svg";
import ifes from "../../../assets/images/logocolatina.png";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Aqui você pode fazer a lógica para autenticar o usuário
    setTimeout(() => {
      console.log("Received values of form:", values);
      setLoading(false);
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        backgroundColor: "#E4FFD0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 550, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ width: "50%" }}>
            <img
              src={ifes}
              alt="Imagem"
              style={{ maxWidth: "100%", height: 90 }}
            />
            <div>
              <h4 className="poppins-bold">Seja Bem-vindo</h4>
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ width: "100%" }}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={loginSvg} alt="Imagem" style={{ maxWidth: "100%" }} />
          </div>
        </div>
      </Card>

      <img src={img2} alt="Imagem" style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default Login;
