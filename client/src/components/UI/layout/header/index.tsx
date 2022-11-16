import AlarmIcon from '@/components/icons/alarm';
import Logo from '@/components/icons/logo';
import SearchIcon from '@/components/icons/search';
import UserIcon from '@/components/icons/user';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    gap: 64px;
    align-items: center;
    div {
        display: flex;
        gap: 25px;
        button {
            font-weight: 700;
            font-size: 16px;
        }
    }
`;

const HeaderRight = styled.div`
    display: flex;
    gap: 20px;
`;

const Header = () => {
    //TODO: 서버와 통신을 통해 Artist 여부 확인
    const [isArtist, setIsArtist] = useState(false);
    const navigate = useNavigate();

    //TODO: 이 부분 로직이 복잡해지면, 따로 컴포넌트로 각각 분리
    const clickSearch = useCallback(() => {
        alert('searchCallback');
    }, []);
    const clickAlarm = useCallback(() => {
        alert('alarmCallback');
    }, []);
    const clickUser = useCallback(() => {
        alert('userCallback');
    }, []);

    const gotoPage = useCallback(
        (url: string) => () => {
            return navigate(url);
        },
        [navigate]
    );

    const icons = [
        { key: 'search', icon: <SearchIcon />, onClick: clickSearch },
        { key: 'alarm', icon: <AlarmIcon />, onClick: clickAlarm },
        { key: 'user', icon: <UserIcon />, onClick: clickUser },
    ];

    return (
        <HeaderRoot>
            <HeaderLeft>
                <Logo />
                <div>
                    <button onClick={gotoPage('/')}>홈</button>
                    {isArtist ? (
                        <button onClick={gotoPage('/schedule')}>스케쥴</button>
                    ) : (
                        <button onClick={gotoPage('/ticketing')}>티켓팅</button>
                    )}
                </div>
            </HeaderLeft>
            <HeaderRight>
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
