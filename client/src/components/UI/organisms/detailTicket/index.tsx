import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTimer } from '@hooks/useTimer';
import { useGetDetailTicketQuery, useTicketingMutation } from '@/services/ticket.service';
import theme from '@/style/theme';
import { dateForm } from '@utils/dateForm';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@atoms/Button';
import Loading from '@atoms/Loading';
import DefaultImg from '../../atoms/defaultImg';
import { useGetUserQuery } from '@/services/user.service';

const DetailTicketWrapper = styled.div`
    width: 30vw;
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
    aspect-ratio: 4 / 3;
    //height: 100%;
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
    margin-bottom: 20px;
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
    &:hover {
        /* button {
            background: ${({ theme }) => theme.PRIMARY_DARK};
        } */
    }
`;

const DetailTicket = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticketLoading, setTicketLoading] = useState(false);
    const { data: ticket, isLoading } = useGetDetailTicketQuery(String(ticketId));
    const [ticketingMutation] = useTicketingMutation();
    const { hour, min, sec, timeEnd } = useTimer(ticket?.salesTime || null);
    const { data: userData } = useGetUserQuery();

    const ticketing = async () => {
        if (!timeEnd) return alert('아직 티켓팅 시간이 되지 않았습니다.');
        if (!userData) return alert('로그인 후 이용 가능합니다 :(');
        setTicketLoading(true);
        const { error } = (await ticketingMutation(ticketId as string)) as any;
        setTimeout(() => {
            if (error) return navigate('/ticketing/failure');
            else navigate('/ticketing/success');
        }, 2000);
    };

    if (isLoading) return <Loading />;

    return (
        <DetailTicketWrapper>
            <BarCode />
            {ticket?.artist?.profileUrl ? (
                <BackgroundThumbnail src={ticket?.artist?.profileUrl} alt="thumbnail" />
            ) : (
                <DefaultImg width="100%" height="350px" borderRadius="0" />
            )}

            <TicketContents>
                <TicketingDate>
                    <strong>Ticketing</strong>
                    <span>{dateForm(ticket!.salesTime)} </span>
                </TicketingDate>
                <h2>{ticket?.artist?.name || 'testArtist'}</h2>
                <TicketTitle>{ticket?.title}</TicketTitle>
                <span>{ticket?.content}</span>
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
            {ticketLoading && <Loading />}
        </DetailTicketWrapper>
    );
};

export default DetailTicket;
