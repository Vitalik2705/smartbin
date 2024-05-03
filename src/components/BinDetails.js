import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBinById } from '../services/BinService';
import { Button, Col, Progress, Row } from "antd";
import '../styles/BinDetails.css';
import { useLoadScript } from '@react-google-maps/api';
import { fetchUserBins, handleRemoveBin, handleUseBin } from "../utils/binUtils";
import Login from "./Login";
import Map from './Map';

const libraries = ['places'];

const BinDetails = () => {
    const { id } = useParams();
    const [bin, setBin] = useState(null);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyASczUvNPNrOLTW6dg5e26vsuFTbf_gmKA',
        libraries,
    });
    const [isUsed, setIsUsed] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const history = useNavigate();

    const fetchUserBinsCallback = useCallback(() => fetchUserBins(setIsUsed, bin), [bin]);
    useEffect(() => {
        fetchUserBinsCallback();
    }, [fetchUserBinsCallback]);

    const fetchBin = useCallback(async () => {
        try {
            const binData = await getBinById(id);
            setBin(binData);
        } catch (error) {
            console.error('Error fetching bin details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchBin();
    }, [fetchBin]);

    useEffect(() => {
        if (bin) {
            setCenter({ lat: bin && bin.location.latitude, lng: bin && bin.location.longitude });
        }
    }, [bin]);

    const handleNavigateToBins = () => {
        history("/bins");
    };

    if (!isLoaded) return <div>Loading...</div>;
    if (loadError) return <div>Error loading maps</div>;

    return (
        <Row style={{ marginTop: '100px' }} justify="center">
            <Col span={24}>
                <Row justify={"center"}>
                    <div className="bin-details-main-text">{bin && bin.name}</div>
                </Row>
                <Row justify={"center"} style={{ marginTop: '10px' }}>
                    <div className="bin-details-medium-text">Рівні заповнення:</div>
                </Row>
                <Row gutter={[32, 16]} justify="space-around">
                    {bin && (
                        <Col xs={24} sm={12} md={8} lg={4}>
                            <Row>
                                <Col style={{ textAlign: "center" }} span={24}>
                                    <p className="bin-type-name">{bin.trashType}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: "center" }} span={24}>
                                    <Progress type="circle" strokeColor={"#00c391"} percent={bin.fillLevel * 100} status="active"/>
                                </Col>
                            </Row>
                        </Col>
                    )}
                </Row>
                <Row align={"middle"} style={{ marginTop: '30px' }}>
                    <Col offset={1} span={11}>
                        <Map center={center} />
                    </Col>
                    <Col offset={1} span={11}>
                        <div className="bin-details-medium-text">Короткий опис:</div>
                        <div className="bin-details-small-text">{bin && bin.description}</div>
                        <div className="bin-details-medium-text">Ціна за місяць: </div>
                        <div className="bin-details-small-text">{bin && bin.pricePerMonth} грн</div>
                        <Row style={{ marginTop: '20px' }} >
                            <Col xs={12} sm={24} md={24} lg={10}>
                                <Button className="add-bin-button-style" size="large" onClick={handleNavigateToBins}>Назад</Button>
                            </Col>
                            <Col offset={0.5} xs={12} sm={24} md={24} lg={10}>
                                {isUsed ? (
                                    <Button className="add-bin-button-style" size="large" onClick={() => handleRemoveBin(setIsUsed, bin)}>Видалити</Button>
                                ) : (
                                    <Button className="add-bin-button-style" size="large" onClick={() => handleUseBin(setIsUsed, setIsLoginModalOpen, bin)}>Використати</Button>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Login setIsModalOpen={setIsLoginModalOpen} isModalOpen={isLoginModalOpen}/>
        </Row>
    );
};

export default BinDetails;
