import React, {useState, useEffect} from 'react';
import {Button, Col, Image, Row, Avatar, Dropdown, Menu} from "antd";
import SmartBinLogo from "../images/recycle-bin.png";
import '../styles/Header.css';
import Login from "./Login";
import {checkTokenValidity} from "../utils/validation";
import {getUserById} from "../services/UserService";
import {Link, useNavigate} from "react-router-dom";
import BalanceModal from "./BalanceModal";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [userBalance, setUserBalance] = useState(0); // Стан для зберігання балансу користувача
    const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false); // Стан для відображення модального вікна поповнення балансу
    const history = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            checkTokenValidity(storedToken);
            setIsLoggedIn(true);
            getUserInitials();
        }
    }, []);

    const getUserInitials = async () => {
        try {
            const userData = await getUserById();
            if (userData && userData.name) {
                setUserInitials(userData.name.charAt(0).toUpperCase());
                setUserBalance(userData.balance); // Оновлення стану з балансом користувача
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = () => {
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        window.location.reload();
    };

    const handleOpenBalanceModal = () => {
        setIsBalanceModalVisible(true);
    };

    const handleCloseBalanceModal = () => {
        setIsBalanceModalVisible(false);
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" onClick={() => {
                history('profile')
            }}>Мій профіль</Menu.Item>
            <Menu.Item key="messages" onClick={() => {
                history('messages')
            }}>Мої повідомлення</Menu.Item>
            <Menu.Item key="bins" onClick={() => {
                history('user-bins')
            }}>Мої смітники</Menu.Item>
            <Menu.Item key="additional-services" onClick={() => {
                history('user-additional-services')
            }}>Мої додаткові послуги</Menu.Item>
            <Menu.Item key="useful-advices" onClick={() => {
                history('useful-advices')
            }}>Корисні поради з сортування</Menu.Item>
            <Menu.Item key="add-balance" onClick={handleOpenBalanceModal}>Поповнити баланс</Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>Вийти</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row align="middle" className="header">
                <Col span={2} offset={1}>
                    <Link to='/'>
                        <Row align="middle">
                            <Col span={12}>
                                <Image width={42} height={42} src={SmartBinLogo}/>
                            </Col>
                            <Col span={12}>
                                <span className="header-logo">SmartSort</span>
                            </Col>
                        </Row>
                    </Link>
                </Col>
                <Col offset={5} span={9}>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <a href="/" className="header-list-elements-element-link">
                                <p className="header-list-elements-element">Головна</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/bins" className="header-list-elements-element-link">
                                <p className="header-list-elements-element">Сміттєві баки</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/additional-services" className="header-list-elements-element-link">
                                <p className="header-list-elements-element">Додаткові послуги</p>
                            </a>
                        </Col>
                        <Col>
                            <a href="/about" className="header-list-elements-element-link">
                                <p className="header-list-elements-element">Про нас</p>
                            </a>
                        </Col>
                    </Row>
                </Col>
                <Col offset={2} span={4}>
                    {isLoggedIn ? (
                        <Row align={"middle"}>
                            <Col span={8}>
                                <Dropdown overlay={menu} placement="bottom" trigger={['click']}>
                                    <a href="/#" onClick={e => e.preventDefault()}>
                                        <Avatar size={44} className="user-initials-circle">
                                            {userInitials}
                                        </Avatar>
                                    </a>
                                </Dropdown>
                            </Col>
                            <Col span={14}>
                                <span className="user-balance">Баланс: {userBalance} грн</span>
                            </Col>
                        </Row>
                    ) : (
                        <Button className="button-style" size="large" onClick={handleLogin}>Логін</Button>
                    )}
                </Col>
            </Row>
            <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsLoggedIn={setIsLoggedIn}/>
            <BalanceModal visible={isBalanceModalVisible} onClose={handleCloseBalanceModal}/>
        </>
    );
};

export default Header;
