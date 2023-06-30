import { useState, useEffect } from 'react';

const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => {
        setIsVisible(!isVisible);
    }

    const keyListener = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyListener);

        return () => window.removeEventListener('keydown', keyListener);
    }, []);

    return {
        isVisible,
        toggle
    }
};

export default useModal;
