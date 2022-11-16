import { renderWithContext } from '@/utils/test/renderWithContext';
import { screen } from '@testing-library/react';
import ChatBox from '..';

describe('<ChatBox />', () => {
    it('rendering test', () => {
        renderWithContext(<ChatBox />);
        expect(screen.getByTestId('chatBox')).toBeInTheDocument();
    });
});
