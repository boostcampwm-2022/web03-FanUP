import { renderWithContext } from '@utils/test/renderWithContext';
import ScheduleFanUpModal from '@molecules/scheduleFanUpModal';
import { screen } from '@testing-library/react';
import store from '@store/index';

describe('<ScheduleFanUpModal />', () => {
    // const testStore = store;
    // store.
    it('rendering test', () => {
        renderWithContext(<ScheduleFanUpModal />);
        // expect(screen.getByText('제목')).toBeInTheDocument();
        // expect(screen.getByText('설명')).toBeInTheDocument();
        // expect(screen.getByText('FanUP 날짜')).toBeInTheDocument();
        // expect(screen.getByText('FanUP 시간')).toBeInTheDocument();
        // expect(screen.getByText('티켓팅 오픈 날짜')).toBeInTheDocument();
        // expect(screen.getByText('티켓팅 오픈 시간')).toBeInTheDocument();
        // expect(screen.getByText('팀 개수')).toBeInTheDocument();
        // expect(screen.getByText('팀당 인원')).toBeInTheDocument();
        // expect(screen.getByText('팀당 시간')).toBeInTheDocument();
        // expect(screen.getByText('팀당 가격')).toBeInTheDocument();
    });
});
