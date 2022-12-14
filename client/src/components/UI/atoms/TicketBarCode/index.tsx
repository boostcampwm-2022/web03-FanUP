import React from 'react';
import styled from 'styled-components';

const TicketBarCodeWrapper = styled.div<{ width: string; height: string }>`
    background: ${({ theme }) => theme.PRIMARY};
    border-radius: 6px 0px 0px 6px;
    min-width: ${({ width }) => `${width} !important`};
    height: ${({ height }) => `${height} !important`};

    //height: 100%;
`;

const TicketBarCode = ({ width, height }: { width: string; height: string }) => {
    return <TicketBarCodeWrapper data-testid="ticketBarCode" width={width} height={height} />;
};

export default TicketBarCode;
