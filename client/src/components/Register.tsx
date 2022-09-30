import { Button, Card, Form, Input, notification, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import agent from "../actions/agent";
import { Register } from "../models/user";
import { registerUser } from "../redux/slice/userSlice";
import { AppDispatch, useAppDispatch } from "../redux/store/ConfigureStore";

interface Props {
    toggleRegister: () => void
}

const RegisterComponent = ({toggleRegister}: Props) => {
const dispatch = useAppDispatch();

  const [values, setValues] = useState<Register>({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const [form] = Form.useForm();
  const navigation = useNavigate();
      
  const resetForm = () => {
    setValues({ ...values, email: "", password: "" });
    form.resetFields();
  };

  const submitUser = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (
        email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
        password.length >= 6 &&
        username.length >= 5
      ) {
        await dispatch(registerUser(values));
      }
      navigation("/profile");
      resetForm();
    } catch (err: any) {
      if(err.error) {
        for (const val of err.error) {
          notification.error({
            message: val,
          });
        }
      }
      resetForm();
    }
  };
  return (
    <Card className='log-in-card'>
        <div className="log-in-card__intro">
            <Typography>
                <Typography.Title level={2} className="log-in-card__intro-title">
                    Sign up to Learnify! 
                </Typography.Title>
                <Typography.Text>
                    Enter your credentials to register
                </Typography.Text>
            </Typography>
        </div>
        <Content className="log-in__form">
            <Form 
            name='login'
            labelCol={{span:8}}
            wrapperCol={{span: 16}}
            autoComplete="off"
            onSubmitCapture={submitUser}
            form={form}
            >
                <Form.Item
                label="Username"
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
                        message: "Please enter a valid email!",
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
        <div onClick={toggleRegister} className="log-in-card__toggle">
            Already a user yet? Login here
        </div>
    </Card>
  )
}
export default RegisterComponent;