import React, { useState } from 'react';
import {Modal, Form, Input, Button, ConfigProvider} from 'antd';

const AddMessageModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onCreateHandler = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onCreate(values);
        });
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
        <Modal
            open={visible}
            title="Створити повідомлення"
            okText="Відправити"
            cancelText="Відмінити"
            onCancel={onCancel}
            onOk={onCreateHandler}
            okType={"default"}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="header" label="Заголовок" rules={[{ required: true, message: 'Please input the header!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content" label="Контент" rules={[{ required: true, message: 'Please input the content!' }]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
        </ConfigProvider>
    );
};

export default AddMessageModal;
