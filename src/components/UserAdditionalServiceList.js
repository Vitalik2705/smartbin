import React, { useState, useEffect } from 'react';
import {Row, Col, Pagination, Empty, Button} from 'antd';
import UserAdditionalServiceListElement from "./UserAdditionalServiceListElement";
import { getAllAdditionalServicesForUser } from "../services/UserAdditionalServiceService";
import {useNavigate} from "react-router-dom";

const UserAdditionalServiceList = () => {
    const [additionalServices, setAdditionalServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalServices, setTotalServices] = useState(0); // Додали стейт для загальної кількості послуг
    const pageSize = 9;
    const history = useNavigate();

    useEffect(() => {
        fetchAdditionalServices();
    }, [currentPage]);

    const fetchAdditionalServices = async () => {
        try {
            const response = await getAllAdditionalServicesForUser(currentPage, pageSize); // Викликаємо сервіс з пагінацією
            setAdditionalServices(response.content);
            setTotalServices(response.totalElements); // Оновлюємо загальну кількість послуг
        } catch (error) {
            console.error('Error fetching additional services:', error);
        }
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{marginTop: '100px'}}>
            <Row>
                <Col offset={20}>
                    <Button className="add-bin-button-style" size={"large"} onClick={() => history('/additional-services')}>Додати</Button>
                </Col>
            </Row>
            {additionalServices.length === 0 ? (
                <div className="no-messages">Немає додаткових послуг</div>
            ) : (
                <>
                    <Row justify={"space-evenly"} gutter={[16, 16]} style={{marginTop: '10px'}}>
                        {additionalServices.map(service => (
                            <Col key={service.id} xs={24} sm={12} md={8} lg={7}>
                                <UserAdditionalServiceListElement service={service} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        style={{ marginTop: '20px', textAlign: 'center' }}
                        defaultCurrent={1}
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalServices} // Використовуємо totalServices замість additionalServices.length
                        onChange={handleChangePage}
                    />
                </>
            )}
        </div>
    );
};

export default UserAdditionalServiceList;
