import React, { ReactChild, ReactChildren, useCallback } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    z-index: 110;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
`;

const OverLay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
`;

const Content = styled.div`
    max-height: 80vh;
    overflow: auto;
    z-index: 2;
    padding: 40px;
    background-color: white;
    text-align: center;
    color: black;
    border-radius: 6px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.2);
`;

interface Props {
    children: JSX.Element;
    open: boolean;
    onClose: () => void;
}

const Modal = ({ children, open, onClose }: Props) => {
    return (
        <>
            {open && (
                <ModalWrapper>
                    <OverLay onClick={onClose} />
                    <Content>{children}</Content>
                </ModalWrapper>
            )}
        </>
    );
};

export default Modal;
