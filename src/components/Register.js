import '../styles/Register.css';
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import {loginRequest, registrationRequest} from "../services/AuthService";
import Login from "./Login";
import {emailValidator} from "../utils/validation";

const Register = ({ isModalOpen, setIsModalOpen }) => {

    const onFinish = async (values) => {
        const {name, email, password, city, street, houseNumber, flatNumber} = values;
        const requestBody = {
            name: name,
            email: email,
            password: password,
            balance: 0.0,
            address: {
                city: city,
                street: street,
                houseNumber: houseNumber,
                flatNumber: flatNumber
            },
            roles: [
                {
                    name: "ROLE_USER"
                }
            ]
        };
        await registrationRequest(requestBody);
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
            <Row gutter={[16, 16]} align="middle" justify="center" className="register">
                <Form className="register-form" onFinish={onFinish}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <div className="login-head-name">SmartBin</div>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={24} style={{textAlign: 'center', marginBottom: '10px'}}>
                            <div className="login-head-text">Реєстрація</div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваше ім\'я' },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Введіть ім'я" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваш email' },
                                    { ...emailValidator },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Введіть email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваш пароль' },
                                ]}
                            >
                                <Input.Password className="register-input" size="large" placeholder="Введіть пароль" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="city"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть ваше місто' },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Введіть місто" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="street"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть вашу вулицю' },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Введіть вулицю" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="houseNumber"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть номер будинку' },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Номер будинку" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="flatNumber"
                                rules={[
                                    { required: true, message: 'Будь ласка, введіть номер квартири' },
                                ]}
                            >
                                <Input className="register-input" size="large" placeholder="Номер квартири" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <div className="register-button-wrapper">
                                <Button htmlType="submit" className="register-button-style">
                                    Зареєструватись
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Row gutter={[16, 8]} justify="center">
                    <Col span={24} style={{textAlign: 'center'}}>
                        <div className="login-copyright">
                            &copy; SmartBin 2024. All rights reserved.
                        </div>
                    </Col>
                </Row>
            </Row>
        </Modal>
        </>
    );
};

export default Register;
