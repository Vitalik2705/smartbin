import '../styles/Login.css';
import {Button, Col, Form, Input, Modal, Row} from "antd";
import {loginRequest} from "../services/AuthService";
import {useState} from "react";
import Register from "./Register";

const Login = ({isModalOpen, setIsModalOpen}) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleRegisterModalOpen = () => {
        setIsModalOpen(false);
        setIsRegisterModalOpen(true);
    };

    const onFinish = async (values) => {
        const {email, password} = values;
        const requestBody = {
            email: email,
            password: password
        };
        await loginRequest(requestBody);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                footer={null}
                open={isModalOpen}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Row gutter={[16, 16]} align="middle" justify="center" className="login">
                    <Form className="login-form" onFinish={onFinish}>
                        <Row justify="center" gutter={[16, 16]}>
                            <Col span={24} style={{textAlign: 'center'}}>
                                <div className="login-head-name">SmartBin</div>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={[16, 16]}>
                            <Col span={24} style={{textAlign: 'center', marginBottom: '10px'}}>
                                <div className="login-head-text">Логін</div>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {required: true, message: 'Будь ласка, введіть ваш email'},
                                    ]}
                                >
                                    <Input className="login-input" size="large" placeholder="Введіть email"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {required: true, message: 'Будь ласка, введіть ваш пароль'},
                                    ]}
                                >
                                    <Input.Password className="login-input" size="large" placeholder="Введіть пароль"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div className="login-button-wrapper">
                                    <Button htmlType="submit" className="login-button-style">
                                        ЛОГІН
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Row gutter={[16, 8]} justify="center">
                        <Col span={24} style={{textAlign: 'center'}}>
                            <a className="login-without-account" onClick={handleRegisterModalOpen}>
                                Ще не маєте акаунта? Зареєструйтесь
                            </a>
                        </Col>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <div className="login-copyright">
                                &copy; SmartBin 2024. All rights reserved.
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Modal>
            <Register isModalOpen={isRegisterModalOpen} setIsModalOpen={setIsRegisterModalOpen}/>
        </>
    );
};


export default Login;