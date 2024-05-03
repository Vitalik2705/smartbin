import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Spin, Button, Image, ConfigProvider} from 'antd';
import { getUserById } from '../services/UserService';
import BalanceModal from './BalanceModal';
import '../styles/UserProfile.css';
import UserProfilePhoto from '../images/1-Figure1-1.png';

const { Title, Text } = Typography;

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [balanceModalVisible, setBalanceModalVisible] = useState(false); // Стан видимості модального вікна для поповнення балансу

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById();
            setUser(userData);
        };

        fetchUser();
    }, []);

    if (!user) {
        return (
            <div className="loading-spinner-container">
                <Spin size="large" />
            </div>
        );
    }

    const handleOpenBalanceModal = () => {
        setBalanceModalVisible(true);
    };

    const handleCloseBalanceModal = () => {
        setBalanceModalVisible(false);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultBg: "#00c391",
                        defaultColor: "#ffffff",
                        defaultHoverBg: "#ffffff",
                        defaultHoverColor: "#00c391",
                        defaultHoverBorderColor: "#00c391"
                    },
                },
            }}
        >
        <div className="user-profile-container">
            <Row gutter={[16, 16]} align={"middle"}>
                <Col offset={4} span={10}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Title level={2} className="profile-title">Профіль користувача</Title>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text className="user-details-label">Ім'я: </Text>
                            <Text className="user-details-value">{user.name}</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text className="user-details-label">Електронна пошта: </Text>
                            <Text className="user-details-value">{user.email}</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text className="user-details-label">Адреса:</Text>
                            <br />
                            <Text className="user-details-value">місто: {user.address.city}</Text>
                            <br />
                            <Text className="user-details-value">вул: {user.address.street}</Text>
                            <br />
                            <Text className="user-details-value">буд: {user.address.houseNumber}</Text>
                            <br />
                            <Text className="user-details-value">кв: {user.address.flatNumber}</Text>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Text className="user-details-label">Баланс: </Text>
                            <Text className="user-details-value">{user.balance} грн{' '}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button size={"large"} onClick={handleOpenBalanceModal}>Поповнити баланс</Button>
                        </Col>
                    </Row>
                </Col>
                <Col style={{marginTop: '20px'}} pan={6}>
                    <Image src={UserProfilePhoto} width={450} height={380}></Image>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24} style={{textAlign: "center", marginTop: '20px'}}>
                    <Text className="user-details-label">Кількість доступних сервісів: {user.services.length}</Text>{' '}
                    <Button style={{marginLeft: '10px'}} href="/user-additional-services">Перейти до сервісів</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{textAlign: "center", marginTop: '20px'}}>
                <Col span={24}>
                    <Text className="user-details-label">Кількість доступних смітників: {user.garbageBins.length}</Text>{'  '}
                    <Button style={{marginLeft: '10px'}} href="/user-bins">Перейти до смітників</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{textAlign: "center", marginTop: '20px'}}>
                <Col span={24}>
                    <Text className="user-details-label">Кількість повідомлень: {user.messages.length}</Text>{' '}
                    <Button style={{marginLeft: '10px'}} href="/messages">Перейти до повідомлень</Button>
                </Col>
            </Row>
            <BalanceModal visible={balanceModalVisible} onClose={handleCloseBalanceModal} />
        </div>
        </ConfigProvider>
    );
};

export default UserProfile;
