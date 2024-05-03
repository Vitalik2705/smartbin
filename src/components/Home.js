import React, {useState, useEffect} from 'react';
import {Row, Col, Image} from 'antd'; // Імпортуємо компоненти Ant Design
import HomeBinListElement from './HomeBinListElement'; // Імпортуємо компонент HomeBinListElement
import {getAllGarbageBins} from '../services/BinService';
import SmartBinPhoto2 from "../images/0_FZgKu3urSNhIztwj.webp";
import SmartBinPhoto1 from "../images/0_N1p3bLQGvPl6612o.webp";
import '../styles/Home.css';
import HomeCarousel from "./HomeCarousel";

const Home = () => {
    const slidesCarousel1 = [
        {
            header: 'Чому система SmartSort?',
            text: 'SmartSort - це інноваційна система управління відходами, яка розроблена для оптимізації та зручності викидання відходів. Ми створюємо максимально комфортні умови для користувачів, впроваджуючи Інтернет речей (IoT) у сміттєві баки.'
        },
        {
            header: 'Як працюють сміттєві баки SmartSort?',
            text: 'Принцип роботи сміттєвих баків SmartSort полягає в зчитуванні даних з різноманітних датчиків та передачі цих даних користувачам через мобільний додаток.'
        },
        {
            header: 'Проблеми, які вирішує SmartSort',
            text: 'Система SmartSort допомагає у вирішенні проблем, таких як неправильне викидання сміття, загроза життю та здоров\'я, низька обізнаність у сортуванні сміття, наявність шкідливих тварин, ризик пожеж, а також масове вирубування дерев.'
        },
    ];

    const slidesCarousel2 = [
        {
            header: 'Система SmartSort - для кращого середовища',
            text: 'SmartSort пропонує глобальне ознайомлення з проблемами викидів та впроваджує концепцію 3R (Reduce, Reuse, Recycle) у своїй роботі, що допомагає зменшити вплив на навколишнє середовище та створює сталу економіку.'
        },
        {
            header: 'Сприяємо принципу 3R',
            text: 'Ми віримо в важливість принципів Reduce, Reuse, Recycle. Зменшуйте відходи, використовуйте їх повторно та переробляйте. Це наш спосіб сприяти збереженню навколишнього середовища.'
        },
        {
            header: 'Подорожуйте екологічно',
            text: 'Завдяки системі SmartSort, кожен може внести свій вклад у збереження навколишнього середовища, діючи згідно з принципами 3R та уникненням неправильного викидання відходів.'
        },
    ];

    const slidesCarousel3 = [
        {
            header: 'Зменшуйте вплив',
            text: 'Зменшуйте власний вплив на навколишнє середовище, діючи розумно та використовуючи систему SmartSort для оптимізації викидання відходів.'
        },
        {
            header: 'Зберігайте ресурси',
            text: 'Повторне використання та переробка відходів допомагають ефективно використовувати ресурси та зменшувати негативний вплив на навколишнє середовище.'
        },
        {
            header: 'Спільно зберігаємо планету',
            text: 'Візьміть участь у збереженні планети разом з системою SmartSort, яка допомагає зменшувати відходи та пропагує екологічні принципи використання ресурсів.'
        },
    ];

    const [bins, setBins] = useState([]);

    useEffect(() => {
        fetchBins();
    }, []);

    const fetchBins = async () => {
        try {
            const response = await getAllGarbageBins(1, 3);
            setBins(response.content);
        } catch (error) {
            console.error('Error fetching bins:', error);
        }
    };

    return (
        <div className="home">
            <Row justify={"center"}>
                <Col span={24} style={{textAlign: 'center'}}>
                    <p className="home-big-text">Обери сміттєвий бак для себе!</p>
                </Col>
            </Row>
            <Row justify="space-around">
                {bins.slice(0, 3).map(bin => (
                    <Col key={bin.id} xs={8} sm={12} md={8} lg={7}>
                        <HomeBinListElement bin={bin}/>
                    </Col>
                ))}
            </Row>
            <Row align="middle" style={{marginTop: '30px'}}>
                <Col offset={1} span={10} order={1}>
                    <Image width={700} height={360} src={SmartBinPhoto2}/>
                </Col>
                <Col offset={2} span={10} order={2}>
                    <p className="home-big-text">Що таке SmartSort?</p>
                    <p className="home-medium-text">“SmartSort” – це інноваційна система управління відходами,
                        призначенням якої є створення максимально комфортних умов для їх користувачів шляхом
                        впровадження ІоТ.</p>
                </Col>
            </Row>
            <Row justify={"space-around"} style={{marginTop: '30px'}}>
                <Col xs={24} sm={10} md={5} lg={5}><HomeCarousel slides={slidesCarousel3}/></Col>
                <Col xs={24} sm={10} md={5} lg={5}><HomeCarousel slides={slidesCarousel1}/></Col>
                <Col xs={24} sm={10} md={5} lg={5}><HomeCarousel slides={slidesCarousel2}/></Col>
            </Row>
            <Row align="middle" style={{marginTop: '30px'}}>
                <Col offset={1} span={10} order={2}>
                    <Image width={599} height={280} src={SmartBinPhoto1}/>
                </Col>
                <Col offset={1} span={10} order={1}>
                    <p className="home-big-text">Принцип роботи</p>
                    <p className="home-medium-text">Принцип роботи баків заключається в зчитуванні даних з різноманітних
                        датчиків та передача цих даних користувачу через мобільний застосунок.</p>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
