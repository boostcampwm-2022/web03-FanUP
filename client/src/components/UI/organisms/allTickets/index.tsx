import { dummyTickets } from '@utils/dummy';
import React from 'react';
import AllTicket from '@molecules/allTicket';
import styled from 'styled-components';
import { useGetAllTicketsQuery } from '@/services/ticket';

const AllTicketsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 25vw;
    margin-bottom: 40px;
    padding-left: 3px;
`;

const AllTickets = () => {
    const { data: allTickets, isLoading } = useGetAllTicketsQuery();

    console.log(allTickets);

    if (isLoading) return <></>;

    return (
        <AllTicketsWrapper>
            {dummyTickets.map((ticket, idx) => (
                <AllTicket ticket={ticket} key={ticket.artistName + ticket.description} />
            ))}
        </AllTicketsWrapper>
    );
};

export default AllTickets;
