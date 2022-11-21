import React from 'react';
import styled from 'styled-components';

const ImageChipWrapper = styled.div<{ width: string; height: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
    div {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background: ${({ theme }) => theme.PRIMARY};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }
`;

interface Props {
    src: string;
    width: string;
    height: string;
}

const ImageChip = ({ src, width, height }: Props) => {
    return (
        <ImageChipWrapper width={width} height={height}>
            {src ? <img src={src} alt="thumbnail" /> : <div>FanUP</div>}
        </ImageChipWrapper>
    );
};

export default ImageChip;
