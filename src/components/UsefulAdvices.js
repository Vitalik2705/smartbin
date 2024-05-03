import React from 'react';
import {Col, Collapse, Row} from 'antd';

const { Panel } = Collapse;

const UsefulAdvices = () => {
    return (
        <div style={{ display: 'grid', placeItems: 'center', marginTop: "100px" }}>
            <Row>
                <Col className="about-large-font">
                    КОРИСНІ ПОРАДИ З СОРТУВАННЯ
                </Col>
            </Row>
            <div style={{ maxWidth: 800, marginTop: 20 }}>
                <Collapse accordion>
                    <Panel style={{ width: 800}} header="Як почати сортувати сміття?" key="1">
                        <p>
                            Почати сортувати сміття простіше, ніж може здаватися. Потрібно лише кілька контейнерів для різних видів відходів і трохи мотивації (а про це — далі). Також для початку варто поцікавитися, як сортують сміття у вашому регіоні, адже вимоги до збору відходів можуть відрізнятися.
                            <br />
                            <br />
                            <b>Поради:</b>
                            <ol>
                                <li>Придбайте необхідні зручні баки для сортування сміття. Зазвичай потрібно мати окремі контейнери для паперу, скла, пластику та органічних відходів.</li>
                                <li>За потреби, позначте контейнери додатковими стікерами, щоб легко звикнути, куди що викидати.</li>
                                <li>Розташуйте контейнери у зручному місці, щоб сортування було простим і не займало багато часу.</li>
                                <li>Навчіть рідних правилам сортування. Це важливо для формування екозвичок.</li>
                            </ol>
                        </p>
                    </Panel>
                    <Panel header="Правила сортування сміття" key="2">
                        <p>
                            Переконайтеся, що ви очистили та висушили сміття перед тим, як покласти його у відповідний контейнер. Пам’ятайте про правильне розподілення батарейок та електронного сміття — для них потрібно виділити окремі ємкості.
                            <br />
                            <br />
                            <b>Поради:</b>
                            <ol>
                                <li>Розділяйте. Почніть з виокремлення паперу, пластику, скла та органічних відходів. Кожен тип відходів має своє місце в сортувальних контейнерах.</li>
                                <li>Очистьте. Перед тим як викинути пластикову пляшку або скляну банку, переконайтеся, що вони чисті. Залишки їжі унеможливлюють перероблення.</li>
                                <li>Скоротіть споживання. Менше сміття — менше проблем. Спробуйте використовувати багаторазові продукти та уникати одноразового пластику.</li>
                                <li>Використовуйте компост. Органічні відходи знадобляться як добриво, а тому не варто викидати їх у загальний контейнер.</li>
                                <li>Навчайтеся та навчайте інших. Чим більше людей знають, як правильно сортувати сміття на переробку, тим краще для екології.</li>
                            </ol>
                        </p>
                    </Panel>
                    <Panel header="Rеducе, Rеusе, Rеcyclе" key="3">
                        <p>
                            Однією з передових ідей зменшення відходів на душу населення є не тільки належне сортування сміття за його типами та переробка, але і повторне використання. Застосовуючи 3R підхід в повсякденному житті, ми зможемо не лише зменшити негативний вплив на навколишнє середовище, але і повторно використовувати предмети, надавши їм так зване «нове життя», що в глобальному застосуванні призведе до більш ефективної переробки та створення сталої економіки, за рахунок використання викидів декілька разів.
                            <br />
                            <br />
                            <b>Концепція 3R (Rеducе, Rеusе, Rеcyclе):</b>
                            <ol>
                                <li><b>Скорочення (Rеducе):</b> більше споживання продуктів харчування несе за собою і зменшення викидів, це є провідною ідеєю скорочення відходів.</li>
                                <li><b>Повторне використання (Rеusе):</b> застосовуючи цей принцип ми отримаємо не тільки економію коштів через уникнення повторного придбання того чи іншого предмету, але і зменшення сміття.</li>
                                <li><b>Переробка (Rеcyclе):</b> третім етапом в концепції 3R є безпосередньо переробка. Скло, пластик, папір, метал, електичні відходи – із кожного типу очікується виготовлення нової продукції.</li>
                            </ol>
                            <b>Навчайтеся та навчайте інших.</b> Чим більше людей знають, як правильно сортувати сміття на переробку, тим краще для екології.
                        </p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
};

export default UsefulAdvices;
