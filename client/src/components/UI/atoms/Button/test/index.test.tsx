import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../Button';
describe('first', () => {
    const props = {
        content: 'test',
        onClick: jest.fn(),
    };
    it('rendering test', () => {
        render(<Button {...props} />);
        expect(screen.getByRole('button', { name: props.content })).toBeInTheDocument();
    });
    it('click test', () => {
        render(<Button {...props} />);
        const btn = screen.getByRole('button', { name: props.content });
        fireEvent.click(btn);
        expect(props.onClick).toHaveBeenCalled();
    });
});
