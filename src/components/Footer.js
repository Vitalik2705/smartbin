import {Row, Col, Image} from 'antd';
import '../styles/Footer.css';
import SmartSortLogo from "../images/recycle-bin.png";
import Instagram from "../images/instagram (1).png";
import Linkedin from "../images/linkedin.png";
import Github from "../images/github (1).png";

const Footer = () => {
    return (
        <div className="footer">
            <Row justify="space-between" align="middle" className="footer-container">
                <Col offset={1} span={4}>
                    <Row align="middle">
                        <Col>
                            <Image width={72} height={72} src={SmartSortLogo}/>
                        </Col>
                        <Col>
                            <span className="footer-logo-name">SmartSort</span>
                        </Col>
                    </Row>
                </Col>
                <Col offset={1} span={11}>
                    <Row align="middle">
                        <Col span={6}>
                            <div className="footer-text"><a className="footer-text-link" href="/about">Про нас</a></div>
                        </Col>
                        <Col span={6}>
                            <div className="footer-text"><a className="footer-text-link" href="/">Головна</a></div>
                        </Col>
                        <Col span={6}>
                            <div className="footer-text"><a className="footer-text-link" href="/bins">Сміттєві
                                баки</a>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="footer-text"><a className="footer-text-link" href="/additional-services">Додаткові
                                послуги</a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col offset={1} span={6}>
                    <Row align="middle">
                        <Col span={12}>
                            <div className="footer-text">Наші соцмережі:</div>
                        </Col>
                        <Col span={4}>
                            <div className="footer-text-link-div">
                                <a className="footer-text-link" href="https://github.com/Vitalik2705" target="_blank"
                                   rel="noopener noreferrer">
                                    <img className="footer-text-img" src={Github} alt="GitHub"/>
                                </a>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div className="footer-text-link-div">
                                <a className="footer-text-link" href="https://www.instagram.com/vitalikyatskiv/"
                                   target="_blank" rel="noopener noreferrer">
                                    <img className="footer-text-img" src={Instagram} alt="Instagram"/>
                                </a>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div className="footer-text-link-div">
                                <a className="footer-text-link"
                                   href="https://www.linkedin.com/in/vitalii-yatskiv-686a63249/" target="_blank"
                                   rel="noopener noreferrer">
                                    <img className="footer-text-img" src={Linkedin} alt="LinkedIn"/>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
