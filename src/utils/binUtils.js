import {addGarbageBinToUser, getUserById, removeGarbageBinFromUser} from "../services/UserService";
import {message} from "antd";

export const handleUseBin = async (setIsUsed, setIsLoginModalOpen, bin) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoginModalOpen(true);
            return;
        }

        await addGarbageBinToUser(bin.id);
        setIsUsed(true);
        message.success('Бін успішно додано до вашого списку');
    } catch (error) {
        console.error('Помилка при додаванні біна до користувача:', error);
        message.error('Помилка при додаванні біна до вашого списку (Недостатньо коштів)');
    }
};

export const handleRemoveBin = async (setIsUsed, bin) => {
    try {
        await removeGarbageBinFromUser(bin.id);
        message.success('Бін успішно видалено з вашого списку');
        setIsUsed(false);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } catch (error) {
        console.error('Помилка при видаленні біна з користувача:', error);
        message.error('Помилка при видаленні біна з вашого списку');
    }
};

export const fetchUserBins = async (setIsUsed, bin) => {
    try {
        const user = await getUserById();
        const userBins = user ? user.garbageBins : [];
        setIsUsed(userBins.some(userBin => userBin.id === bin.id));
    } catch (error) {
        console.error('Error fetching user bins:', error);
    }
};