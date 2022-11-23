import React, { useCallback, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import TodayTicket from '@molecules/todayTicket';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const TodayTicketsWrapper = styled.div`
    position: relative;
    margin-bottom: 40px;
`;

const TicketsWrapper = styled.div``;

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
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <TodayTicketsWrapper>
            {/* <TicketsWrapper>
                {dummyTickets.map((ticket, idx) => (
                    <TodayTicket key={idx + ticket.name} ticket={ticket} />
                ))}
            </TicketsWrapper> */}
            <Slider
                {...settings}
                ref={sliderRef}
                beforeChange={handleBeforeChange}
                afterChange={handleAfterChange}
            >
                {dummyTickets.map((ticket, idx) => (
                    <div key={idx}>{idx}</div>
                    // <TodayTicket key={idx} data-index={idx} ticket={ticket} />
                ))}
            </Slider>
        </TodayTicketsWrapper>
    );
};

const dummyTickets = [
    { date: new Date(), price: 3, time: '13:00', name: 'BTS', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '15:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '12:00', name: 'NMIXX', description: '모두모두모여라' },
    {
        date: new Date(),
        price: 3,
        time: '09:00',
        name: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { date: new Date(), price: 3, time: '15:00', name: 'BTS', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '20:00', name: 'NewJeans', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '15:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '14:00', name: 'BTS', description: '모두모두모여라' },
    {
        date: new Date(),
        price: 3,
        time: '12:00',
        name: 'FROMIS*NINE',
        description: '모두모두모여라',
    },
    { date: new Date(), price: 3, time: '16:00', name: 'NewJeans', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '18:00', name: 'IZ*ONE', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '11:00', name: 'NMIXX', description: '모두모두모여라' },
    { date: new Date(), price: 3, time: '13:00', name: 'IZ*ONE', description: '모두모두모여라' },
];

export default TodayTickets;
