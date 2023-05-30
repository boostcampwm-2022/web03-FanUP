import React from 'react';
import styled from 'styled-components';
import DefaultImg from '@atoms/defaultImg';

const ImageChipWrapper = styled.div<{ width: string; height: string }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
    }
    div {
        font-size: 12px !important;
    }
`;

interface Props {
    src: string;
    width: string;
    height: string;
}

const ImageChip = ({ src, width, height }: Props) => {
    return (
        <ImageChipWrapper data-testid="imageChip" width={width} height={height}>
            {src ? (
                <img src={src} alt="thumbnail" />
            ) : (
                <DefaultImg width={width} height={height} borderRadius="8px" />
            )}
        </ImageChipWrapper>
    );
};

export default ImageChip;
