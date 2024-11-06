'use client';

import React, { useCallback, useState } from 'react';
import Modal from '@/components/modal';
import LoginModal from './login-modal';
import SignUpModal from './signup-modal';

const AuthenticationModals = () => {
    const [openLoginModal, setOpenLoginModal] = useState(true); // Open Login Modal by default
    const [openSignUpModal, setOpenSignUpModal] = useState(false);

    const handleOpenLogin = useCallback(() => {
        setOpenSignUpModal(false); // Close SignUp Modal if open
        setOpenLoginModal(true); // Open Login Modal
    }, []);

    const handleOpenSignUp = useCallback(() => {
        setOpenLoginModal(false); // Close Login Modal if open
        setOpenSignUpModal(true); // Open SignUp Modal
    }, []);

    return (
        <div>
            {/* Login Modal */}
            <Modal title="Login" isOpen={openLoginModal} onClose={() => setOpenLoginModal(false)}>
                <LoginModal onSwitchToSignUp={handleOpenSignUp} />
            </Modal>

            {/* Sign Up Modal */}
            <Modal title="SignUp" isOpen={openSignUpModal} onClose={() => setOpenSignUpModal(false)}>
                <SignUpModal onSwitchToLogin={handleOpenLogin} />
            </Modal>
        </div>
    );
};

export default AuthenticationModals;
