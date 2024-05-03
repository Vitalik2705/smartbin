import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import {getAllAdditionalServices, searchAdditionalServices} from '../services/AdditionalServiceService';
import AdditionalServiceListElement from './AdditionalServiceListElement';
import Search from "./Search";

const AdditionalServiceList = () => {
    const [additionalServices, setAdditionalServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalServices, setTotalServices] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 9;

    useEffect(() => {
        fetchAdditionalServices();
    }, [currentPage, searchQuery]);

    const fetchAdditionalServices = async () => {
        try {
            const response = await (searchQuery ? searchAdditionalServices(searchQuery, currentPage - 1, pageSize) : getAllAdditionalServices(currentPage, pageSize));
            setAdditionalServices(response.content);
            setTotalServices(response.totalElements);
        } catch (error) {
            console.error('Error fetching additional services:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="additional-service-list" style={{ marginTop: '100px' }}>
            <Row justify={"center"}>
                <Search handleSearch={handleSearch} />
            </Row>
            <Row justify={"space-evenly"} gutter={[16, 16]} style={{ marginTop: '20px' }}>
                {additionalServices.map(service => (
                    <Col key={service.id} xs={24} sm={12} md={8} lg={7}>
                        <AdditionalServiceListElement service={service} />
                    </Col>
                ))}
            </Row>
            <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={pageSize}
                total={totalServices}
                onChange={handleChangePage}
            />
        </div>
    );
};

export default AdditionalServiceList;
