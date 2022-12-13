import { dummyTickets } from '@utils/dummy';
import React from 'react';
import AllTicket from '@molecules/allTicket';
import styled from 'styled-components';
import { useGetAllTicketsQuery } from '@/services/ticket.service';
import UnHeartIcon from '@/components/icons/unheart';

const AllTicketsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 50px;
    margin-bottom: 40px;
    padding-left: 3px;
`;

const NoTicket = styled.div`
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    svg {
        width: 50px;
        height: 50px;
    }
    h2 {
        font-size: 25px;
        font-weight: 700;
    }
`;

const AllTickets = () => {
    const { data: allTickets, isLoading } = useGetAllTicketsQuery();

    if (isLoading) return <></>;

    return (
        <AllTicketsWrapper>
            {allTickets && allTickets?.length === 0 ? (
                <NoTicket>
                    <UnHeartIcon />
                    <h2>티켓이 없습니다 :(</h2>
                </NoTicket>
            ) : (
                allTickets?.map((ticket, idx) => (
                    <AllTicket ticket={ticket} key={idx + ticket.title} />
                ))
            )}
        </AllTicketsWrapper>
    );
};

export default AllTickets;
