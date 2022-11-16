import React, { FC } from 'react';
import styled from 'styled-components';

type StyleProps = {
    width: string;
    height: string;
    backgroundColor: string;
    color?: string;
};

interface Props extends StyleProps {
    text: string;
    onClick: () => void;
}

const StyledButton = styled('button')<StyleProps>`
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: 8px;
    color: ${(props) => props.color ?? 'black'};
    font-weight: bold;
    font-size: 20px;
`;

const Button: FC<Props> = ({ text, onClick, ...props }) => {
    return (
        <StyledButton onClick={onClick} {...props}>
            {text}
        </StyledButton>
    );
};

export default Button;
