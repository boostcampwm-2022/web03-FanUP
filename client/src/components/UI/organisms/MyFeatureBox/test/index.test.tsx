/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderWithContext } from '@utils/test/renderWithContext';
import Schedules from '@/components/UI/organisms/MyFeatureBox';
import { screen } from '@testing-library/react';
import { MOCK_FN } from '@/utils/test/mockFn';

describe('<Schedules />', () => {
    it('rendering test', () => {
        renderWithContext(<Schedules />);
        expect(screen.getByText('내가 구매한 티켓')).toBeInTheDocument();
    });
});
