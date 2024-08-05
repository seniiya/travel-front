import React from 'react';
import styled from 'styled-components';

const TravelerModal = ({ children, onClose }) => {
    return (
        <Overlay onClick={onClose}>
            <Content onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                {children}
            </Content>
        </Overlay>
    );
};

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

export default TravelerModal;
