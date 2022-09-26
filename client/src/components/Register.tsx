import { Button, Card, Form, Input, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import agent from "../actions/agent";
import { Register } from "../models/user";

const RegisterComponent = () => {
  const [values, setValues] = useState<Register>({
    email:"",
    password:"",
    username:"",
  });

  const {email, password, username} = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const submitUser = async (e: SyntheticEvent) => {
    e.preventDefault;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length >= 6 && username.length >= 5){
        const response = await agent.Users.register(values);
        setValues({...values, email:"", password:""});
        console.log(response);
        
    }
  }
  return (
    <Card className='log-in-card'>
        <div className="log-in-card__intro">
            <Typography>
                <Title level={2} className="log-in-card__intro-title">
                    Sign up to Learnify! 
                </Title>
                <Text>
                    Enter your credentials to register
                </Text>
            </Typography>
        </div>
        <Content className="log-in__form">
            <Form 
            name='login'
            labelCol={{span:8}}
            wrapperCol={{span: 16}}
            autoComplete="off"
            onSubmitCapture={submitUser}
            >
                <Form.Item
                label="username"
                name="username"
                rules={[
                        {
                        required: true,
                        message: "Please input your username!",
                        min: 5,
                        },
                    ]}
                >
                <Input onChange={handleChange} value={username} name="username"></Input>
                    
                </Form.Item>
                <Form.Item
                label="Email"
                name="email"
                rules={[
                        {
                        required: true,
                        message: "Please input your email!",
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        },
                    ]}
                >
                <Input onChange={handleChange} value={email} name="email"></Input>
                    
                </Form.Item>
                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: "Please input your password!",
                    min: 6,
                    },
                ]}
                >
                <Input.Password
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button onClick={submitUser} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
        <div className="log-in-card__toggle">
            Already a user yet? Login here
        </div>
    </Card>
  )
}
export default RegisterComponent;