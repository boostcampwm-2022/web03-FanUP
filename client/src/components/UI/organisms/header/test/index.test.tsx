/**
 * @jest-environment node
 */
import { renderWithContext } from '@/utils/test/renderWithContext';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Header from '..';

import * as router from 'react-router';

describe('<Header />', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    });
    it('rendering test', () => {
        renderWithContext(<Header />);
        expect(screen.getByRole('button', { name: '티켓팅' })).toBeInTheDocument();
        ['search', 'alarm', 'user'].forEach((text) => {
            expect(screen.getByTestId(text)).toBeInTheDocument();
        });
    });

    it('click test', () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation();

        renderWithContext(<Header />);
        fireEvent.click(screen.getByRole('button', { name: '티켓팅' }));
        expect(navigate).toBeCalledWith('/tickets');

        fireEvent.click(screen.getByTestId('search'));
        expect(alertMock).toBeCalledWith('검색 기능은 아직 개발 중입니다.');
    });
});
