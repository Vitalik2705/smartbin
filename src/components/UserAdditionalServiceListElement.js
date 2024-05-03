import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import '../styles/AdditionalServiceListElement.css';
import { truncateText } from "../utils/utils";
import { payForAdditionalService, removeUserAdditionalService } from "../services/UserAdditionalServiceService";
import Login from "./Login";
import dayjs from 'dayjs';

const UserAdditionalServiceListElement = ({ service }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPaid, setIsPaid] = useState(service.paid);

    const formattedDate = dayjs(service.date).format('DD MMM YYYY, HH:mm'); // Форматування дати

    const handlePayService = async () => {
        try {
            await payForAdditionalService(service.id);
            setIsPaid(true);
            message.success('Оплата успішно здійснена');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Помилка при оплаті сервісу:', error);
            message.error('Помилка при оплаті сервісу');
        }
    };

    const handleRemoveService = async () => {
        try {
            await removeUserAdditionalService(service.id);
            message.success('Сервіс успішно видалено з вашого списку');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Помилка при видаленні біна з користувача:', error);
            message.error('Помилка при видаленні біна з вашого списку');
        }
    };

    return (
        <div className="additional-service-card-container">
            <Row>
                <Col span={24}>
                    <div className="additional-service-details">
                        <h3>{truncateText(service.additionalService.name, 50)}</h3>
                        <p>{truncateText(service.additionalService.description, 200)}</p>
                        <p><strong>Ціна:</strong> {service.additionalService.price} грн</p>
                        <p><strong>Дата замовлення:</strong> {formattedDate}</p> {/* Виведення форматованої дати */}
                    </div>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col xs={12} sm={24} md={24} lg={12}>
                    <Button className="add-bin-button-style" size="large" onClick={handleRemoveService}>Видалити</Button>
                </Col>
                {isPaid ? (
                    <Col xs={12} sm={24} md={24} lg={12}>
                        <Button className="add-bin-button-style" size="large" disabled>Оплачено</Button>
                    </Col>
                ) : (
                    <Col xs={12} sm={24} md={24} lg={12}>
                        <Button className="add-bin-button-style" size="large" onClick={handlePayService}>Оплатити</Button>
                    </Col>
                )}
            </Row>
            <Login setIsModalOpen={setIsLoginModalOpen} isModalOpen={isLoginModalOpen}/>
        </div>
    );
};

export default UserAdditionalServiceListElement;
