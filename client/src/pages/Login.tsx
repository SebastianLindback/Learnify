import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import RegisterComponent from "../components/Register";
import Signin from "../components/Signin";

const Login = () => {
    const [register, setRegister] = useState(false)

    const toggleRegister = () => setRegister(!register);
    return (
    <Content className="log-in">
        {register ? 
        <RegisterComponent toggleRegister={toggleRegister}/>
        :
        <Signin toggleRegister={toggleRegister}/>}
    </Content>
    );
};

export default Login;