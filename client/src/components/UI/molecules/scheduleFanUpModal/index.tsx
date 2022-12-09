import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closeScheduleModal, initializeSelectedDay } from '@/store/artist';
import Modal from '@/components/hoc/modal';
import { ReducerType } from '@store/rootReducer';
import { dateDiff } from '@utils/dateDiff';
import CloseIcon from '@icons/CloseIcon';
import { ERR_MESSAGE } from './constants';
import Fish from '@icons/Fish';
import { useSubmitTicketMutation } from '@/services/ticket.service';
import { TicketSubmitData } from '@/types/ticket';
import { addZero } from '@utils/addZero';

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
    min-width: 500px;
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
    svg {
        width: 25px;
        height: 25px;
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
            display: flex;
            align-items: center;
            img {
                margin-bottom: -5px;
            }
        }
    }
`;

const ScheduleFanUpModal = () => {
    const dispatch = useDispatch();
    const [submitMutation] = useSubmitTicketMutation();
    const selectedDay = useSelector<
        ReducerType,
        null | { year: number; month: number; day: number }
    >(({ artistSlice }) => artistSlice.selectedDay);

    const openScheduleModal = useSelector<ReducerType, boolean>(
        ({ artistSlice }) => artistSlice.openSchduleModal
    );

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const teamNumberRef = useRef<HTMLInputElement>(null);
    const numberteamRef = useRef<HTMLInputElement>(null);
    const timeTeamRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const [startTime, setStartTime] = useState<string>('');
    const [salesTime, setSalesTime] = useState<string>('');

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
                ref: numberteamRef,
                unit: <span>명</span>,
            },
            {
                label: '팀당 시간',
                ref: timeTeamRef,
                unit: <span>분</span>,
            },
            {
                label: '팀당 가격',
                ref: priceRef,
                unit: <Fish />,
            },
        ],
        []
    );

    const onChangeDay = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            setState: React.Dispatch<React.SetStateAction<string>>
        ) => {
            const [diff] = dateDiff(new Date(e.target.value), new Date());
            if (diff < 0) return alert('이미 지나간 시간을 그리워하지마세요');
            setState(e.target.value);
        },
        []
    );

    const validation = useCallback(() => {
        if (!titleRef.current?.value) return ERR_MESSAGE.title;
        if (!contentRef.current?.value) return ERR_MESSAGE.content;
        if (!startTime) return ERR_MESSAGE.startTime;
        if (!salesTime) return ERR_MESSAGE.salesTime;
        if (!teamNumberRef.current?.value || teamNumberRef.current?.value === '0')
            return ERR_MESSAGE.teamNumber;
        if (!numberteamRef.current?.value || numberteamRef.current?.value === '0')
            return ERR_MESSAGE.numberTeam;
        if (!timeTeamRef.current?.value || timeTeamRef.current?.value === '0')
            return ERR_MESSAGE.timeTeam;
        if (!priceRef.current?.value || priceRef.current?.value === '0') return ERR_MESSAGE.price;
        return null;
    }, [startTime, salesTime]);

    const submit = useCallback(async () => {
        const errMessage = validation();
        if (errMessage) return alert(errMessage);

        const reqData = {
            title: String(titleRef.current?.value),
            content: String(contentRef.current?.value),
            salesTime: new Date(salesTime),
            startTime: new Date(startTime),
            totalAmount:
                Number(teamNumberRef.current?.value) * Number(numberteamRef.current?.value),
            numberTeam: Number(numberteamRef.current?.value),
            timeTeam: Number(timeTeamRef.current?.value),
            price: Number(priceRef.current?.value),
        };
        await submitMutation(reqData);
        dispatch(closeScheduleModal());
    }, [startTime, salesTime]);

    useEffect(() => {
        if (!openScheduleModal) dispatch(initializeSelectedDay());
        else {
            if (selectedDay)
                setStartTime(
                    `${selectedDay.year}-${addZero(selectedDay.month)}-${addZero(
                        selectedDay.day
                    )}T14:00`
                );
        }
    }, [openScheduleModal, selectedDay]);

    return (
        <Modal onClose={onClose} open={openScheduleModal}>
            <div data-testid="scheduleFanUpModal">
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
                        <textarea ref={contentRef} rows={4} placeholder="제목을 입력해주세요." />
                    </ContentItem>
                    <ContentHalf>
                        <ContentItem>
                            <label>FanUP 날짜</label>
                            <input
                                value={startTime}
                                type="datetime-local"
                                onChange={(e) => onChangeDay(e, setStartTime)}
                            />
                        </ContentItem>
                        <ContentItem>
                            <label>티켓팅 오픈 날짜</label>
                            <input
                                value={salesTime}
                                type="datetime-local"
                                onChange={(e) => onChangeDay(e, setSalesTime)}
                            />
                        </ContentItem>
                    </ContentHalf>
                    <ContentHalf></ContentHalf>
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
            </div>
        </Modal>
    );
};

export default ScheduleFanUpModal;
