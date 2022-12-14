import React, { useCallback, useRef, useState } from 'react';
import Slider from 'react-slick';
import TodayTicket from '@molecules/todayTicket';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import PrevBtnIcon from '@/components/icons/PrevBtnIcon';
import NextBtnIcon from '@/components/icons/NextBtnIcon';
import { useGetTodayTicketsQuery } from '@/services/ticket.service';
import NoItems from '@atoms/NoItems';

const TodayTicketsWrapper = styled.div<{ innerWidth: number }>`
    position: relative;
    margin-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    width: ${({ innerWidth }) => (innerWidth > 1525 ? '1075px' : '730px')};
    .slick-slide {
        //width:  !important;
    }
`;

export const TodayTicketsList = styled.div`
    display: flex;
    gap: 20px;
`;

const HandleButton = styled.button<{ left?: string; right?: string }>`
    border: none;
    background: ${({ theme }) => theme.SECONDARY};
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    width: 35px;
    height: 35px;
    bottom: 100px;
    left: ${({ left }) => left || null};
    right: ${({ right }) => right || null};
    svg {
        width: 7.5px;
        height: 15px;
    }
`;

const TodayTickets = () => {
    const { data: todayTickets, isLoading } = useGetTodayTicketsQuery();
    const sliderRef = useRef<any>(null);
    const [dragging, setDragging] = useState(false);

    const handleBeforeChange = useCallback(() => {
        setDragging(true);
    }, [setDragging]);

    const handleAfterChange = useCallback(() => {
        setDragging(false);
    }, [setDragging]);

    const handleNextCarousel = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current?.slickNext();
    }, []);

    const handlePrevCarousel = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current?.slickPrev();
    }, []);

    if (isLoading) return <></>;
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth > 1525 ? 3 : 2,
        slidesToScroll: 2,
    };
    return (
        <TodayTicketsWrapper innerWidth={window.innerWidth}>
            {!todayTickets || todayTickets?.length === 0 ? (
                <NoItems
                    title="오늘 마감 예정인 티켓이 없습니다 :("
                    width="50px"
                    height="50px"
                    fontSize="25px"
                />
            ) : todayTickets.length < 3 ? (
                <TodayTicketsList>
                    {todayTickets?.map((ticket, idx) => (
                        <TodayTicket key={idx} data-index={idx} ticket={ticket} />
                    ))}
                </TodayTicketsList>
            ) : (
                <>
                    <Slider
                        {...settings}
                        ref={sliderRef}
                        beforeChange={handleBeforeChange}
                        afterChange={handleAfterChange}
                    >
                        {todayTickets?.map((ticket, idx) => (
                            <TodayTicket key={idx} data-index={idx} ticket={ticket} />
                        ))}
                    </Slider>
                    <HandleButton left="0px" onClick={handlePrevCarousel}>
                        <PrevBtnIcon stroke="#9E57FF" />
                    </HandleButton>
                    <HandleButton right="15px" onClick={handleNextCarousel}>
                        <NextBtnIcon stroke="#9E57FF" />
                    </HandleButton>
                </>
            )}
        </TodayTicketsWrapper>
    );
};

export default TodayTickets;
