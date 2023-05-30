import React, { FC } from 'react';
import styled from 'styled-components';

type StyleProps = {
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    hoverBackgroundColor?: string;
    hoverColor?: string;
    disabled?: boolean;
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
    padding: ${({ padding }) => padding || ''};
    background-color: ${({ backgroundColor }) => backgroundColor || ''};
    width: ${({ width }) => width || ''};
    height: ${({ height }) => height || ''};
    border-radius: ${({ borderRadius }) => borderRadius ?? null};
    color: ${({ color }) => color ?? 'black'};
    font-weight: bold;
    font-size: ${({ fontSize }) => fontSize ?? '20px'};
    &:hover {
        background-color: ${({ hoverBackgroundColor, disabled }) =>
            !disabled ? hoverBackgroundColor || '' : ''};
        color: ${({ hoverColor }) => hoverColor || ''};
    }
`;

const Button: FC<Props> = ({ content, onClick, disabled, ...props }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} {...props}>
            {content}
        </StyledButton>
    );
};

export default Button;
