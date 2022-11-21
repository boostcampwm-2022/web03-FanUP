import React, { FC } from 'react';
import styled from 'styled-components';

import SendIcon from '@icons/send';

type StyleProps = {
    width: string;
    height: string;
    backgroundColor: string;
    color?: string;
    borderRadius?: string;
};

interface Props extends StyleProps {
    content: string | JSX.Element;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    border-radius: ${({ borderRadius }) => borderRadius ?? null};
    color: ${({ color }) => color ?? 'black'};
    font-weight: bold;
    font-size: 20px;
`;

const Button: FC<Props> = ({ content, onClick, ...props }) => {
    return (
        <StyledButton onClick={onClick} {...props}>
            {content}
        </StyledButton>
    );
};

export default Button;
