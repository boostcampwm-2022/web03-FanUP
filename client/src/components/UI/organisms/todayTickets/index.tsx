import React, { useCallback, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import TodayTicket from '@molecules/todayTicket';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import PrevBtnIcon from '@/components/icons/PrevBtnIcon';
import NextBtnIcon from '@/components/icons/NextBtnIcon';
import { dummyTickets } from '@utils/dummy';
import { useGetTodayTicketsQuery } from '@/services/ticket';

const TodayTicketsWrapper = styled.div`
    position: relative;
    margin-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
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

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };
    return (
        <TodayTicketsWrapper>
            <Slider
                {...settings}
                ref={sliderRef}
                beforeChange={handleBeforeChange}
                afterChange={handleAfterChange}
            >
                {dummyTickets.map((ticket, idx) => (
                    <TodayTicket key={idx} data-index={idx} ticket={ticket} />
                ))}
            </Slider>
            <HandleButton left="0px" onClick={handlePrevCarousel}>
                <PrevBtnIcon stroke="#9E57FF" />
            </HandleButton>
            <HandleButton right="5px" onClick={handleNextCarousel}>
                <NextBtnIcon stroke="#9E57FF" />
            </HandleButton>
        </TodayTicketsWrapper>
    );
};

export default TodayTickets;
