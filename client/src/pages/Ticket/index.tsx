import React from 'react';
import DetailTicket from '@organisms/detailTicket';
import Header from '@organisms/header';
import styled from 'styled-components';

const TicketDetailWrapper = styled.div`
    padding: 40px 0;
    height: calc(100vh - 75px);
    background: ${({ theme }) => theme.LIGHT_GRAY};
`;

const Ticket = () => {
    return (
        <>
            <Header />
            <TicketDetailWrapper>
                <DetailTicket />
            </TicketDetailWrapper>
        </>
    );
};

export default Ticket;
