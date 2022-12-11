import AlarmIcon from '@icons/AlarmIcon';
import Logo from '@/components/icons/Logo';
import SearchIcon from '@/components/icons/SearchIcon';
import UserIcon from '@icons/UserIcon';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserQuery } from '@services/user.service';
import HeaderUser from '../../molecules/HeaderUser';

const HeaderRoot = styled.header`
    height: 75px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.12);
    padding: 20px 42px;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
`;
const HeaderLeft = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    div {
        display: flex;
        gap: 10px;
        button {
            padding: 10px 15px;
            font-weight: 700;
            font-size: 16px;
            &:hover {
                background: ${({ theme }) => theme.LIGHT_GRAY};
            }
        }
    }
`;

const HeaderRight = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    font-weight: 700;

    strong {
        background: linear-gradient(to right, #9e57ff, #7ed0fa);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        //color: ${({ theme }) => theme.LIGHT_SKY};
        //color: white;
        display: inline-block;
    }
`;

const Header = () => {
    const { data: UserData } = useGetUserQuery();
    const navigate = useNavigate();

    //TODO: 이 부분 로직이 복잡해지면, 따로 컴포넌트로 각각 분리
    const clickSearch = useCallback(() => {
        alert('searchCallback');
    }, []);

    const clickAlarm = useCallback(() => {
        alert('alarmCallback');
    }, []);

    const clickUser = useCallback(() => {
        if (!UserData) navigate('/login');
        else alert('로그인이 완료되었어요');
    }, [UserData]);

    const gotoPage = useCallback(
        (url: string) => () => {
            return navigate(url);
        },
        [navigate]
    );

    const icons = useMemo(
        () => [
            { key: 'search', icon: <SearchIcon />, onClick: clickSearch },
            { key: 'alarm', icon: <AlarmIcon />, onClick: clickAlarm },
        ],
        []
    );

    return (
        <HeaderRoot>
            <HeaderLeft>
                <button onClick={gotoPage('/')}>
                    <Logo />
                </button>
                <div>
                    <button onClick={gotoPage('/tickets')}>티켓팅</button>
                    {UserData && <button onClick={gotoPage('/schedule')}>티켓생성</button>}
                    {UserData?.role === 'ARTIST' && (
                        <button onClick={gotoPage('/artist')}>
                            {UserData?.artistId ? (
                                <span>마이페이지</span>
                            ) : (
                                <span>아티스트 정보 등록</span>
                            )}
                        </button>
                    )}
                </div>
            </HeaderLeft>
            <HeaderRight>
                {UserData ? (
                    <HeaderUser nickname={UserData.nickname} />
                ) : (
                    <button data-testid="user" onClick={clickUser}>
                        <UserIcon />
                    </button>
                )}
                {icons.map(({ key, icon, onClick }) => (
                    <button data-testid={key} key={key} onClick={onClick}>
                        {icon}
                    </button>
                ))}
            </HeaderRight>
        </HeaderRoot>
    );
};

export default Header;
