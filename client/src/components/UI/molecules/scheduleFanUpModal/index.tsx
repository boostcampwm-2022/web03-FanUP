import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeScheduleModal, initializeSelectedDay } from '@store/artist';
import Modal from '@hoc/modal';
import { ReducerType } from '@store/rootReducer';
import { ArtistStore } from '@/types/artist';
import CloseIcon from '@icons/close';
import { ERR_MESSAGE } from './constants';

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 30vw;

    h1 {
        font-weight: 700;
        font-size: 24px;
    }
    button {
        cursor: pointer;
        border: none;
        background: none;
    }
`;

const ModalContent = styled.div`
    width: 30vw;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    label {
        font-size: 15px;
    }
    input {
        font-family: 'Noto Sans KR';
        font-size: 18px;
        border: none;
        padding: 14px 15px;
        border-radius: 8px;
        background: ${({ theme }) => theme.LIGHT_GRAY};
        &:focus {
            outline: none;
        }
    }
    textarea {
        font-family: 'Noto Sans KR';
        font-size: 18px;
        border: none;
        padding: 14px 15px;
        border-radius: 8px;
        background: ${({ theme }) => theme.LIGHT_GRAY};
        &:focus {
            outline: ${({ theme }) => theme.PRIMARY_LIGHT};
        }
    }
    button {
        border: none;
        color: white;
        padding: 10px 0;
        border-radius: 8px;
        cursor: pointer;
        background: ${({ theme }) => theme.PRIMARY};

        &:hover {
            color: ${({ theme }) => theme.DARK_GRAY};
            background: ${({ theme }) => theme.PRIMARY_LIGHT};
        }
    }
`;

const ContentItem = styled.div`
    text-align: left !important;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const ContentHalf = styled.div`
    display: flex;
    gap: 10px;
    div {
        width: 50%;
        input::-webkit-calendar-picker-indicator {
            cursor: pointer;
        }
    }
`;

const ContentFourth = styled.div`
    display: flex;
    gap: calc(4% / 3);
    div {
        width: 24%;
        position: relative;
        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input {
            padding-right: 35px;
        }
        div {
            width: fit-content;
            position: absolute;
            right: 10px;
            bottom: 16px;
            img {
                margin-bottom: -5px;
            }
        }
    }
`;

const ScheduleFanUpModal = () => {
    const dispatch = useDispatch();
    const { selectedDay } = useSelector<ReducerType, ArtistStore>((state) => state.artistSlice);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const teamNumberRef = useRef<HTMLInputElement>(null);
    const personCountRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const [fanUpDay, setFanUpDay] = useState<string>(
        selectedDay ? `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` : ''
    );
    const [fanUpTime, setFanUpTime] = useState<string>('');
    const [ticketingDay, setTicketingDay] = useState<string>('');
    const [ticketingOpenTime, setTicketingOpenTime] = useState<string>('');

    const { openSchduleModal } = useSelector<ReducerType, ArtistStore>(
        (state) => state.artistSlice
    );

    const onClose = useCallback(() => {
        if (!window.confirm('FanUP 작성을 취소하시겠어요?')) return;
        dispatch(closeScheduleModal());
    }, []);

    const FouthContent = useMemo(
        () => [
            {
                label: '팀 개수',
                ref: teamNumberRef,
                unit: <span>팀</span>,
            },
            {
                label: '팀당 인원',
                ref: personCountRef,
                unit: <span>명</span>,
            },
            {
                label: '팀당 시간',
                ref: timeRef,
                unit: <span>분</span>,
            },
            {
                label: '팀당 가격',
                ref: priceRef,
                unit: <img src="/signature.png" alt="logo" />,
            },
        ],
        []
    );

    const onChangeDay = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            setState: React.Dispatch<React.SetStateAction<string>>
        ) => {
            setState(e.target.value);
        },
        []
    );

    const validation = useCallback(() => {
        if (!titleRef.current?.value) return ERR_MESSAGE.title;
        if (!descriptionRef.current?.value) return ERR_MESSAGE.description;
        if (!fanUpDay) return ERR_MESSAGE.fanUpDay;
        if (!fanUpTime) return ERR_MESSAGE.fanUpDay;
        if (!ticketingDay) return ERR_MESSAGE.ticketingDay;
        if (!ticketingOpenTime) return ERR_MESSAGE.ticketingOpenTime;
        if (!teamNumberRef.current?.value) return ERR_MESSAGE.teamNumber;
        if (!personCountRef.current?.value) return ERR_MESSAGE.personCount;
        if (!timeRef.current?.value) return ERR_MESSAGE.time;
        if (!priceRef.current?.value) return ERR_MESSAGE.price;
        return null;
    }, [fanUpTime, fanUpDay, ticketingDay, ticketingOpenTime]);

    const submit = useCallback(() => {
        const errMessage = validation();
        if (errMessage) return alert(errMessage);
        console.log('submit');
    }, [fanUpTime, fanUpDay, ticketingDay, ticketingOpenTime]);

    useEffect(() => {
        return () => {
            dispatch(initializeSelectedDay());
        };
    }, []);

    return (
        <Modal open={openSchduleModal} onClose={onClose}>
            <>
                <ModalHeader>
                    <h1>Schedule FanUP</h1>
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </ModalHeader>
                <ModalContent>
                    <ContentItem>
                        <label>제목</label>
                        <input ref={titleRef} placeholder="제목을 입력해주세요." />
                    </ContentItem>
                    <ContentItem>
                        <label>설명</label>
                        <textarea
                            ref={descriptionRef}
                            rows={4}
                            placeholder="제목을 입력해주세요."
                        />
                    </ContentItem>
                    <ContentHalf>
                        <ContentItem>
                            <label>FanUP 날짜</label>
                            <input
                                value={fanUpDay}
                                type="date"
                                onChange={(e) => onChangeDay(e, setFanUpDay)}
                            />
                        </ContentItem>
                        <ContentItem>
                            <label>FanUP 시간</label>
                            <input
                                value={fanUpTime}
                                type="time"
                                onChange={(e) => onChangeDay(e, setFanUpTime)}
                            />
                        </ContentItem>
                    </ContentHalf>
                    <ContentHalf>
                        <ContentItem>
                            <label>티켓팅 오픈 날짜</label>
                            <input
                                value={ticketingDay}
                                type="date"
                                onChange={(e) => onChangeDay(e, setTicketingDay)}
                            />
                        </ContentItem>
                        <ContentItem>
                            <label>티켓팅 오픈 시간</label>
                            <input
                                value={ticketingOpenTime}
                                type="time"
                                onChange={(e) => onChangeDay(e, setTicketingOpenTime)}
                            />
                        </ContentItem>
                    </ContentHalf>
                    <ContentFourth>
                        {FouthContent.map(({ label, ref, unit }) => (
                            <ContentItem key={label}>
                                <label>{label}</label>
                                <input ref={ref} type="number" />
                                <div>{unit}</div>
                            </ContentItem>
                        ))}
                    </ContentFourth>
                    <button onClick={submit}>등록하기</button>
                </ModalContent>
            </>
        </Modal>
    );
};

export default ScheduleFanUpModal;
