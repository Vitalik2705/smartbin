import React, { useState } from 'react';
import {Modal, Input, Button, message, Row, Col} from 'antd';
import { addBalanceToUser } from '../services/UserService';

const BalanceModal = ({ visible, onClose }) => {
    const [amount, setAmount] = useState('');

    const handleAddBalance = async () => {
        try {
            await addBalanceToUser(amount);
            message.success('Баланс успішно поповнено');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            onClose();
        } catch (error) {
            console.error('Помилка при поповненні балансу:', error);
            message.error('Помилка при поповненні балансу');
        }
    };

    return (
        <Modal
            title="Поповнення балансу"
            open={visible}
            onCancel={onClose}
            destroyOnClose={true}
            footer={[
                <Row justify={"space-between"}>
                    <Col>
                <Button key="cancel" className="add-bin-button-style" onClick={onClose}>Скасувати</Button>,
                    </Col>
                    <Col>
                <Button key="add" className="add-bin-button-style" onClick={handleAddBalance}>Поповнити</Button>
                    </Col>
                </Row>
            ]}
        >
            <Input
                type="number"
                placeholder="Введіть суму поповнення"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
        </Modal>
    );
};

export default BalanceModal;
