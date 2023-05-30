import React from 'react';
import AllTicket from '@molecules/allTicket';
import styled from 'styled-components';
import { useGetAllTicketsQuery } from '@/services/ticket.service';
import NoItems from '@atoms/NoItems';

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
            {allTickets && allTickets?.length === 0 ? (
                <NoItems title="티켓이 없습니다 :(" width="50px" height="50px" fontSize="25px" />
            ) : (
                allTickets?.map((ticket, idx) => (
                    <AllTicket ticket={ticket} key={idx + ticket.title} />
                ))
            )}
        </AllTicketsWrapper>
    );
};

export default AllTickets;
