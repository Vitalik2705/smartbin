import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import HomeBinListElement from './HomeBinListElement';
import { getAllGarbageBins, searchGarbageBins } from '../services/BinService';
import Search from "./Search";

const BinList = () => {
    const [bins, setBins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBins, setTotalBins] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 9;

    useEffect(() => {
        fetchBins();
    }, [currentPage, searchQuery]);

    const fetchBins = async () => {
        try {
            const response = await (searchQuery ? searchGarbageBins(searchQuery, currentPage - 1, pageSize) : getAllGarbageBins(currentPage, pageSize));
            setBins(response.content);
            setTotalBins(response.totalElements);
        } catch (error) {
            console.error('Error fetching bins:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query); // Зберігаємо пошуковий запит
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bin-list" style={{ marginTop: '100px' }}>
            <Row justify={"center"}>
                <Search handleSearch={handleSearch} />
            </Row>
            <Row justify={"space-evenly"} gutter={[16, 16]} style={{ marginTop: '20px' }}>
                {bins.slice(0, 6).map(bin => (
                    <Col key={bin.id} xs={24} sm={12} md={8} lg={7}>
                        <HomeBinListElement bin={bin} />
                    </Col>
                ))}
            </Row>
            <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={pageSize}
                total={totalBins}
                onChange={handleChangePage}
            />
        </div>
    );
};


export default BinList;
