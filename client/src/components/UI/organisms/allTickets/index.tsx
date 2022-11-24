import { dummyTickets } from '@utils/dummy';
import React from 'react';
import AllTicket from '@molecules/allTicket';
import styled from 'styled-components';

const AllTicketsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 25vw;
    margin-bottom: 40px;
    padding-left: 3px;
`;

const AllTickets = () => {
    return (
        <AllTicketsWrapper>
            {dummyTickets.map((ticket, idx) => (
                <AllTicket ticket={ticket} key={ticket.name + ticket.description} />
            ))}
        </AllTicketsWrapper>
    );
};

export default AllTickets;
