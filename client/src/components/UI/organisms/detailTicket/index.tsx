import theme from '@/style/theme';
import { dateDiff } from '@/utils/dateDiff';
import { dateForm } from '@/utils/dateForm';
import { dummyTickets } from '@/utils/dummy';
import { IsTimeOver } from '@/utils/isTimeOver';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const TicketDescription = styled.span`
    font-size: 15px;
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

const padNumber = (num: number, length: number) => {
    return String(num).padStart(length, '0');
};

let now = new Date();

const ONE_SECOND = 1000;

const DetailTicket = () => {
    const params = useParams();

    const interval = useRef<NodeJS.Timer | null>(null);
    const [timeEnd, setTimeEnd] = useState(false);
    const [hour, setHour] = useState('');
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('');

    const ticket = useMemo(
        () => dummyTickets.find(({ ticketId }) => ticketId === Number(params.ticketId)),
        []
    );

    const ticketing = useCallback(() => {
        if (!timeEnd) return alert('아직 티켓팅 시간이 되지 않았습니다.');
        alert('ticketing');
    }, [timeEnd]);

    const timer = () => {
        now = new Date();
        const [diffHours, diffMin, diffSec] = dateDiff(ticket!.ticketingDate, now);
        if (IsTimeOver(diffHours, diffMin, diffSec)) {
            if (interval.current) clearTimeout(interval?.current);
            setTimeEnd(true);
            return;
        }
        setHour(padNumber(diffHours, 2));
        setMin(padNumber(diffMin, 2));
        setSec(padNumber(diffSec, 2));
    };

    useEffect(() => {
        timer();
        interval.current = setInterval(() => {
            timer();
        }, ONE_SECOND);
        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, []);

    return (
        <DetailTicketWrapper>
            <BarCode />
            <BackgroundThumbnail src="/dummyBackgroundThumbnail2.png" alt="thumbnail" />
            <TicketContents>
                <TicketingDate>
                    <strong>Ticketing</strong>
                    <span>{dateForm(ticket!.ticketingDate)} </span>
                    <span>{ticket?.ticketingTime}</span>
                </TicketingDate>
                <h2>{ticket?.artistName}</h2>
                <TicketDescription>{ticket?.description}</TicketDescription>
                <FanUpDate>
                    <span>일시</span>
                    <span>{dateForm(ticket!.fanUpDate)}</span>
                    <span>{ticket?.fanUpTime}</span>
                </FanUpDate>
                <span>참가자 {ticket?.userCount}명</span>
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
