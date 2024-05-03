import React, {useState, useEffect} from 'react';
import {Row, Col, Pagination, Button, message} from 'antd';
import Message from "./Message";
import AddMessageModal from './AddMessageModal';
import {getMessagesByUserId, sendMessage} from "../services/MessageService";
import "../styles/MessageList.css"

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const pageSize = 9;

    useEffect(() => {
        fetchMessages();
    }, [currentPage]);

    const fetchMessages = async () => {
        try {
            const response = await getMessagesByUserId();
            setMessages(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const handleCreateMessage = async (values) => {
        try {
            await sendMessage({ header: values.header, content: values.content });
            message.success('Повідомлення надіслано успішно');
            setModalVisible(false);
            fetchMessages();
        } catch (error) {
            console.error('Error adding message:', error);
            message.error('Помилка при відправці повідомлення');
        }
    };

    return (
        <div className="message-list">
            <Row>
                <Col offset={20}>
                    <Button className="add-bin-button-style" size={"large"} onClick={() => setModalVisible(true)}>Створити</Button>
                </Col>
            </Row>
            {messages.length === 0 ? (
                <div className="no-messages">Немає повідомлень</div>
            ) : (
                <>
                    <Row justify={"space-evenly"} gutter={[16, 16]} style={{marginTop: '16px'}}>
                        {messages.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(message => (
                            <Col key={message.id} xs={24} sm={12} md={8} lg={7}>
                                <Message message={message}/>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        style={{marginTop: '20px', textAlign: 'center'}}
                        defaultCurrent={1}
                        current={currentPage}
                        pageSize={pageSize}
                        total={messages.length}
                        onChange={handleChangePage}
                    />
                </>
            )}
            <AddMessageModal
                visible={modalVisible}
                onCreate={handleCreateMessage}
                onCancel={() => setModalVisible(false)}
            />
        </div>
    );
};

export default MessageList;
