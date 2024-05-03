import React, {useState} from 'react';
import {Row, Col, Button, message, Modal, DatePicker, ConfigProvider} from 'antd';
import '../styles/AdditionalServiceListElement.css';
import {truncateText} from '../utils/utils';
import {addAdditionalServiceToUser} from '../services/UserAdditionalServiceService';
import Login from './Login';
import uk_UA from 'antd/locale/uk_UA';
import 'dayjs/locale/uk'

const AdditionalServiceListElement = ({service}) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleUseService = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoginModalOpen(true);
                return;
            }

            setIsCalendarModalOpen(true);
        } catch (error) {
            console.error('Помилка при додаванні сервісу до користувача:', error);
            message.error('Помилка при додаванні сервісу до вашого списку');
        }
    };

    const handleOk = async () => {
        try {
            const formattedDate = selectedDateTime.format('YYYY-MM-DDTHH:mm:ss');
            await addAdditionalServiceToUser(service.id, formattedDate);
            message.success('Сервіс успішно додано до вашого списку');
            setIsCalendarModalOpen(false);
        } catch (error) {
            console.error('Помилка при додаванні сервісу до користувача:', error);
            message.error('Помилка при додаванні сервісу до вашого списку');
        }
    };


    const handleCancel = () => {
        setIsCalendarModalOpen(false);
    };

    const handleDateTimeChange = (date) => {
        setSelectedDateTime(date);
    };

    return (
        <ConfigProvider
            locale={uk_UA}
        >
            <div className="additional-service-card-container">
                <Row>
                    <Col span={24}>
                        <div className="additional-service-details">
                            <h3>{truncateText(service.name, 50)}</h3>
                            <p>{truncateText(service.description, 200)}</p>
                            <p><strong>Ціна:</strong> {service.price} грн</p>
                        </div>
                    </Col>
                </Row>
                <Row justify={'space-between'}>
                    <Col xs={12} sm={24} md={24} lg={24}>
                        <Button className="add-bin-button-style" size="large" onClick={handleUseService}>
                            Записатись
                        </Button>
                    </Col>
                </Row>
                <Modal
                    title="Виберіть дату та час"
                    open={isCalendarModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <DatePicker showTime onChange={handleDateTimeChange}/>
                </Modal>
                <Login setIsModalOpen={setIsLoginModalOpen} isModalOpen={isLoginModalOpen}/>
            </div>
        </ConfigProvider>
    );
};

export default AdditionalServiceListElement;
