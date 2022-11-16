import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import Participants from '..';

describe('<Participants>', () => {
    const props = {
        nickname: 'testNickname',
        isMute: false,
        isCameraOn: true,
    };
    it('rendering test', () => {
        renderWithContext(
            <Participants
                nickname={props.nickname}
                isMute={props.isMute}
                isCameraOn={props.isCameraOn}
            />
        );
        expect(screen.queryByTestId('muteOnIcon')).not.toBeInTheDocument();
        expect(screen.getByTestId('muteOffIcon')).toBeInTheDocument();
        expect(screen.queryByTestId('cameraOffIcon')).not.toBeInTheDocument();
        expect(screen.getByTestId('cameraOnIcon')).toBeInTheDocument();
    });

    it('interaction test', () => {
        renderWithContext(
            <Participants
                nickname={props.nickname}
                isMute={props.isMute}
                isCameraOn={props.isCameraOn}
            />
        );
        expect(screen.getByTestId('notOpenMore')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('notOpenMore'));
        expect(screen.getByTestId('openMore')).toBeInTheDocument();
    });
});
