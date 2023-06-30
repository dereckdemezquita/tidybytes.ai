// client/src/App.tsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Login from './components/Login';
import Register from './components/Register';
import Modal from './components/Modal';
import GlobalStyle from './GlobalStyles';
import useModal from './hooks/useModal'

const App: React.FC = () => {
    const loginModal = useModal();
    const registerModal = useModal();

    return (
        <Router>
            <GlobalStyle />
            <AppRoutes showLoginModal={loginModal.toggle} showRegisterModal={registerModal.toggle}/>
            {loginModal.isVisible &&
                <Modal onClose={loginModal.toggle}>
                    <Login onClose={loginModal.toggle} />
                </Modal>
            }
            {registerModal.isVisible &&
                <Modal onClose={registerModal.toggle}>
                    <Register onClose={registerModal.toggle} />
                </Modal>
            }
        </Router>
    );
};

export default App;
