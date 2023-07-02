import { useState } from 'react';

type Modal = 'register' | 'login' | null;

export const useModal = () => {
    const [modal, setModal] = useState<Modal>(null);

    const openModal = (modal: Modal) => setModal(modal);
    const closeModal = () => setModal(null);

    return { modal, openModal, closeModal };
};
