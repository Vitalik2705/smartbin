import React, { useEffect, useState } from 'react';
import { Row, Col, Progress, Button } from 'antd';
import '../styles/HomeBinListElement.css';
import { truncateText } from "../utils/utils";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import PaperLogo from "../images/paper.png";
import PlasticLogo from "../images/plastic.png";
import MetalLogo from "../images/metalbin.png";
import GlassLogo from "../images/glassbin.png";
import EWasteLogo from "../images/e-waste-bin.png";
import OrganicLogo from "../images/organicbin.png";
import { fetchUserBins, handleRemoveBin, handleUseBin } from "../utils/binUtils";

const HomeBinListElement = ({ bin }) => {
    const [isUsed, setIsUsed] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        fetchUserBins(setIsUsed, bin);
    }, [bin.id]);

    const handleNavigateToBinDetails = () => {
        history(`/bins/${bin.id}`);
    };

    const getBinLogo = (trashType) => {
        switch (trashType) {
            case 'Папір':
                return PaperLogo;
            case 'Пластик':
                return PlasticLogo;
            case 'Метал':
                return MetalLogo;
            case 'Скло':
                return GlassLogo;
            case 'Електронні відходи':
                return EWasteLogo;
            case 'Органічні відходи':
                return OrganicLogo;
            default:
                return null;
        }
    };

    return (
        <div className="bin-card-container">
            <Row>
                <Col span={24}>
                    <Row justify="center">
                        <Col>
                            <img width={150} height={220} src={getBinLogo(bin.trashType)} alt={bin.trashType} className="bin-type-logo" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row justify="center">
                        <Col>
                            <p className="type-name">{bin.trashType}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row align="middle">
                        <Col offset={4} span={10}>
                            <Progress percent={bin.fillLevel * 100} status="active" showInfo={false} />
                        </Col>
                        <Col offset={2} span={8}>
                            <p className="fill-level">{(bin.fillLevel * 100).toFixed(2)}%</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="bin-details">
                        <h3>{truncateText(bin.name, 50)}</h3>
                        <p>{truncateText(bin.description, 200)}</p>
                        <p><strong>Ціна за місяць:</strong> {bin.pricePerMonth} грн</p>
                    </div>
                </Col>
            </Row>
            <Row justify={"space-between"}>
                <Col xs={12} sm={24} md={24} lg={12}>
                    <Button className="add-bin-button-style" size="large" onClick={handleNavigateToBinDetails}>Детальніше</Button>
                </Col>
                <Col xs={12} sm={24} md={24} lg={12}>
                    {isUsed ? (
                        <Button className="add-bin-button-style" size="large" onClick={() => handleRemoveBin(setIsUsed, bin)}>Видалити</Button>
                    ) : (
                        <Button className="add-bin-button-style" size="large" onClick={() => handleUseBin(setIsUsed, setIsLoginModalOpen, bin)}>Використати</Button>
                    )}
                </Col>
            </Row>
            <Login setIsModalOpen={setIsLoginModalOpen} isModalOpen={isLoginModalOpen} />
        </div>
    );
};

export default HomeBinListElement;
