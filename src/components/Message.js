import React from 'react';
import {Card, Typography, Button, Popconfirm, message as antdMessage, ConfigProvider} from 'antd';
import {format} from "date-fns";
import {deleteMessageById} from '../services/MessageService';

const {Title, Text} = Typography;

const Message = ({message}) => {
    const formattedTime = format(new Date(message.time), 'MMMM dd, yyyy HH:mm:ss');

    const handleDelete = async () => {
        try {
            await deleteMessageById(message.id);
            antdMessage.success('Повідомлення успішно видалено');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Помилка при видаленні повідомлення:', error);
            antdMessage.error('Помилка при видаленні повідомлення');
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultBg: "#00c391",
                        defaultColor: "#ffffff",
                        defaultHoverBg: "#ffffff",
                        defaultHoverColor: "#00c391",
                        defaultHoverBorderColor: "#00c391"
                    },
                    Input: {
                        hoverBorderColor: "#00c391",
                        activeBorderColor: "#00c391"
                    },
                },
            }}
        >
            <Card
                title={message.header}
                style={{marginBottom: '16px'}}
                extra={
                    <Popconfirm
                        title="Ви впевнені, що хочете видалити це повідомлення?"
                        onConfirm={handleDelete}
                        okText="Так"
                        cancelText="Ні"
                        okType={"default"}
                    >
                        <Button type="link" danger>Видалити</Button>
                    </Popconfirm>
                }
            >
                <Title level={4}>Контент:</Title>
                <Text>{message.content}</Text>
                <Title level={5} style={{marginTop: '16px'}}>Час:</Title>
                <Text>{formattedTime}</Text>
            </Card>
        </ConfigProvider>
    );
};

export default Message;
