import React from 'react';
import styled from 'styled-components';

const TicketBarCodeWrapper = styled.div<{ width: string }>`
    background: ${({ theme }) => theme.PRIMARY};
    border-radius: 6px 0px 0px 6px;
    width: ${({ width }) => width};
    height: 100%;
`;

const TicketBarCode = ({ width }: { width: string }) => {
    return <TicketBarCodeWrapper width={width} />;
};

export default TicketBarCode;
