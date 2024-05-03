import React, { useEffect, useState } from "react";
import { Col, Pagination, Row, Empty, Button } from "antd";
import HomeBinListElement from "./HomeBinListElement";
import { getAllGarbageBins } from "../services/BinService";
import { getUserById } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const UserBinList = () => {
    const [bins, setBins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBins, setTotalBins] = useState(0);
    const history = useNavigate();
    const pageSize = 9;

    useEffect(() => {
        fetchBins();
    }, [currentPage]);

    const fetchBins = async () => {
        try {
            const userData = await getUserById();
            if (userData && userData.garbageBins) {
                setBins(userData.garbageBins);
                setTotalBins(userData.garbageBins.length);
            } else {
                console.error('No bins found for the user');
            }
        } catch (error) {
            console.error('Error fetching bins:', error);
        }
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <Row>
                <Col offset={20}>
                    <Button className="add-bin-button-style" size={"large"} onClick={() => history('/bins')}>Додати</Button>
                </Col>
            </Row>
            {bins.length === 0 ? (
                <div className="no-messages">Немає смітників</div>
            ) : (
                <>
                    <Row justify={"space-evenly"} gutter={[16, 16]} style={{ marginTop: '10px' }}>
                        {bins.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(bin => (
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
                </>
            )}
        </div>
    );
};

export default UserBinList;
