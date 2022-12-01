import React, { useCallback, useMemo, useRef } from 'react';
import { useTimer } from '@hooks/useTimer';
import { useGetDetailTicketQuery } from '@services/ticket';
import theme from '@/style/theme';
import { dateForm } from '@utils/dateForm';
import { dummyTickets } from '@utils/dummy';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../atoms/Button';

const DetailTicketWrapper = styled.div`
    width: 50vw;
    min-width: 500px;
    margin: 0 auto;
    h2 {
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 15px;
    }
`;

const BarCode = styled.div`
    width: 100%;
    height: 15px;
    background: ${({ theme }) => theme.PRIMARY};
    border-radius: 10px 10px 0px 0px;
`;

const BackgroundThumbnail = styled.img`
    width: 100%;
    height: 350px;
`;

const TicketContents = styled.div`
    background: white;
    padding: 40px 20px 20px 20px;
    span {
        font-size: 15px;
    }
`;

const TicketingDate = styled.div`
    background: ${({ theme }) => theme.PINK};
    color: white;
    font-size: 20px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 20px;
    border-radius: 8px;
    font-weight: 700;
    margin-bottom: 25px;
    span {
        font-size: 20px !important;
    }
`;

const TicketTitle = styled.h5`
    font-size: 20px;
    padding-left: 10px;
    border-left: 4px solid black;
`;

const FanUpDate = styled.div`
    margin: 20px 0;
    display: flex;
    gap: 5px;
    font-size: 15px;
`;

const TicketingBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const DetailTicket = () => {
    const { ticketId } = useParams();
    const { data: ticket, isLoading } = useGetDetailTicketQuery(String(ticketId));

    const { hour, min, sec, timeEnd } = useTimer(ticket?.salesTime || null);

    const ticketing = useCallback(() => {
        if (!timeEnd) return alert('아직 티켓팅 시간이 되지 않았습니다.');
        alert('ticketing');
    }, [timeEnd]);

    if (isLoading) return <></>;

    return (
        <DetailTicketWrapper>
            <BarCode />
            <BackgroundThumbnail src="/dummyBackgroundThumbnail2.png" alt="thumbnail" />
            <TicketContents>
                <TicketingDate>
                    <strong>Ticketing</strong>
                    <span>{dateForm(ticket!.salesTime)} </span>
                </TicketingDate>
                <h2>{ticket?.name || 'testArtist'}</h2>
                <TicketTitle>{ticket?.title}</TicketTitle>
                <FanUpDate>
                    <span>일시</span>
                    <span>{dateForm(ticket!.startTime)}</span>
                </FanUpDate>
                <span>참가자 {ticket!.totalAmount}명</span>
                <TicketingBtn>
                    <Button
                        onClick={ticketing}
                        disabled={!timeEnd}
                        content={timeEnd ? '티켓팅' : `${hour}:${min}:${sec}`}
                        padding="10px 20px"
                        borderRadius="8px"
                        backgroundColor={timeEnd ? `${theme.PRIMARY}` : `${theme.PRIMARY_LIGHT}`}
                        color={timeEnd ? `white` : `${theme.LIGHT_GRAY}`}
                    />
                </TicketingBtn>
            </TicketContents>
        </DetailTicketWrapper>
    );
};

export default DetailTicket;
