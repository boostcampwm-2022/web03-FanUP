import { dummyTickets } from '@utils/dummy';
import React from 'react';
import AllTicket from '@molecules/allTicket';
import styled from 'styled-components';
import { useGetAllTicketsQuery } from '@/services/ticket.service';

const AllTicketsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 50px;
    margin-bottom: 40px;
    padding-left: 3px;
`;

const AllTickets = () => {
    const { data: allTickets, isLoading } = useGetAllTicketsQuery();

    if (isLoading) return <></>;

    return (
        <AllTicketsWrapper>
            {allTickets?.map((ticket, idx) => (
                <AllTicket ticket={ticket} key={idx + ticket.title} />
            ))}
        </AllTicketsWrapper>
    );
};

export default AllTickets;
